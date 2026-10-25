---
title: "Eg-walker"
date: "2026-10-10"
tags:
  - seed
---
A collaborative text-editing algorithm that is a blend of [[thoughts/CRDT|CRDT]] and [[thoughts/Operational Transform|OT]]. It assumes the presence of a non-[[thoughts/Byzantine Faults|Byzantine]] [[thoughts/message broadcast|reliable broadcast protocol]].

[Source](https://arxiv.org/abs/2409.14252)

## Intuition

Eg-walker keeps ops in the form the user made them, as a graph of events where each event points to the version it was made against. Merge in this mode “rebases” a DAG of operations into a linear operation history with the same effect. The input of the algorithm is the event graph, and the output is this topologically sorted sequence of transformed operations

Here's an example event-graph with a history of "ab" and then 3 concurrent sets of edits come in:
- `e3`, `e4` (insert `X`, then delete the first character)
- `e5`
- `e6`, `e7`

```plaintext /│/#dim /├/#dim /┬/#dim /┐/#dim /─/#dim
  e1 ins(0, "a")
  │
  e2 ins(1, "b")
  ├────────────────┬────────────────┐
  e3 ins(1, "X")   e5 ins(1, "Y")   e6 ins(1, "Z")
  │                                 │
  e4 del(0)                         e7 ins(2, "W")

  replay order: e5 e3 e4 e6 e7
  smallest branch first (e5 has 1 event, the others 2)
  transformed result is
  e1 ins(0, "a")
  e2 ins(1, "b")
  e5 ins(1, "Y")
  e3 ins(1, "X")
  e4 del(0)
  e6 ins(2, "Z")
  e7 ins(3, "W")
  final text: XYZWb
  
```

Here's the merge of `e5`, `e3`, `e4`, `e6`, `e7`, in that replay order:

```plaintext /○/#dim /□/#dim /^/#path /Y/#path
  ● record                  ■ deleted record
  ○ insert retreated        □ delete retreated
  ^ insert position
  by agent, smaller name goes left

e5 = ins(1, "Y")        by B   sees e1 e2

  list        a   b
  view        ●   ●

  insert pos    ^
  skip          ^

  list        a   Y   b
  view        ●   ●   ●

  effect     └┬┘
  out     ins(1, "Y")
```

```plaintext /○/#dim /□/#dim /^/#path /X/#path
e3 = ins(1, "X")        by A   sees e1 e2

  list        a   Y   b
  by              B
  view        ●   ○   ●
  retreat         e5

  insert pos    ^
  skip          ^

  list        a   X   Y   b
  view        ●   ●   ○   ●

  effect     └┬┘
  out     ins(1, "X")
```

```plaintext /a/2#path /○/#dim /□/#dim /^/#path
e4 = del(0)             by A   sees e1 e2 e3

  list        a   X   Y   b
  by              A   B
  view        ●   ●   ○   ●

  list        a   X   Y   b
  view        ■   ●   ○   ●

  effect     └┘
  out        del(0)
```

```plaintext /○/#dim /□/#dim /^/#path /Z/#path
e6 = ins(1, "Z")        by C   sees e1 e2

  list        a   X   Y   b
  by              A   B
  view        □   ○   ○   ●
  retreat     e4  e3  e5

  insert pos    ^
  skip                  ^

  list        a   X   Y   Z   b
  view        □   ○   ○   ●   ●

  effect         └──┬──┘
  out           ins(2, "Z")
```

```plaintext /○/#dim /□/#dim /^/#path /W/#path
e7 = ins(2, "W")        by C   sees e1 e2 e6

  list        a   X   Y   Z   b
  by              A   B   C
  view        □   ○   ○   ●   ●
  retreat     e4  e3  e5

  insert pos                ^
  skip                      ^

  list        a   X   Y   Z   W   b
  view        □   ○   ○   ●   ●   ●

  effect         └────┬────┘
  out             ins(3, "W")
```

In each header, `sees` lists the events the op was made against: its parent and all of the parent's ancestors.

Each record in the `view` row is one glyph with two properties. The shape shows whether it is deleted: a circle is not and a square is. The fill shows the prepare view: filled means the events that touch it are in the parent's history (the parent and its ancestors), hollow means one of them is retreated, its insert for `○` and its delete for `□`. So `●` is a normal record, `○` was inserted concurrently and is retreated, `■` is deleted, and `□` is deleted by an event that is retreated (`a` in `e6` and `e7`, because `e4` is retreated).

The insert position (`^`) is the spot between two neighbouring records where the new record lands. Its index counts only the records visible in prepare, `●` and `□`. A delete finds its target the same way, and the output index of either kind of op is the number of records in the document to its left, `●` and `○`, which is what the bracket spans. That is where `ins(1, "Z")` becomes `ins(2, "Z")`: `X` and `Y` are `○`, retreated but not deleted, so they count, while `a` is `□` and does not.

The paper leaves the order of concurrent inserts to an underlying list CRDT (its implementation uses a Yjs variant). diamond-types breaks ties by agent name, with the smaller name to the left.

### Critical versions

An event is critical when nothing is concurrent with it, so every other event either happened before it or after it. At a critical event the internal state can be cleared, and critical events are passed through unchanged without touching the CRDT at all. Most real histories are mostly sequential, so most of the work is skipped. (The paper phrases this as critical versions, which for a single event is the same thing.)

```plaintext /e1/#path /e2/#path /e8/#path /─/#dim /┬/#dim /├/#dim /└/#dim /┐/#dim /┼/#dim /┘/#dim
  e1 ── e2 ──┬── e3 ── e4 ──┐
             ├── e5 ────────┼── e8
             └── e6 ── e7 ──┘

  colored = critical event: nothing is concurrent with it
  e3 to e7 each have something concurrent with them, so none of them is critical
  e8 is a future event with parents {e4, e5, e7}
```

A future event can create new critical events. If `e8` arrives with parents `{e4, e5, e7}`, nothing is concurrent with it, so it is critical. The state from the three branches can then be cleared, and `e8` is passed through unchanged without touching the CRDT.

A critical event can also stop being critical. If a delayed peer later sends `e9` with parent `e2`, it is concurrent with `e3` to `e8`, so `e8` is no longer critical (`e2` still is, since `e9` comes after it) and the next replay has to start from `e2`.

Clearing state at a critical version is local to a replica and only an optimization. The event graph is kept, so if a delayed peer sends events that are concurrent with already-processed ones, the replica rebuilds the state by replaying from the latest critical version before them (worst case the whole graph). Unlike CRDT compaction, no consensus is needed, because only a cache is discarded.

The event graph itself can only be discarded if no future event can be concurrent with an existing one, and a replica cannot know that on its own. It needs extra coordination, such as replicas acknowledging what they have seen (causal stability, usually carried on the normal sync messages, with a known set of replicas) or a server that rejects events made against versions older than a cutoff. Without that the graph is kept, mostly on disk and in memory only while merging concurrent changes.

See also: [[thoughts/CRDT#Merge complexity vs OT|merge complexity vs OT]], [[thoughts/causality]]

