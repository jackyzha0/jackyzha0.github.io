---
title: "Conflict-free Replicated Data Type (CRDT)"
date: 2022-05-05
tags:
- seed
aliases:
- conflict-free replicated data type
---

Provides [[thoughts/causality|causal consistency]] as well as [[thoughts/consistency#Eventual Consistency|strong eventual consistency]]: over time, all actors converge to same state without data loss *but* there is no guarantee of exact same state across actors at any given moment (not [[thoughts/consistency#ACID Consistency|ACID]]).

CRDTs should always strive to preserve user intent.

Two main families of CRDTs are operation-based and state-based CRDTs. They have their trade offs
1. Operation-based typically has smaller messages
2. State-based can tolerate message loss/duplication

## Causal Consistency
Causality is in each change (delta) as a [[thoughts/clocks#Vector Clocks|vector clock]] which encodes all of that delta's causal dependencies. Each delta is then queued until its vector clock is complete.

## Operation-based
Replication as commutative operations (order doesn't matter!)

### Set
Only 2 operations: `add(x)`, `delete(t)`

1. `add(x)`: generates a new unique `t` and adds element `e := (t, x)` to the set. This is serialized as `(t,x)` and causally broadcasted to all other nodes
2. `delete(t)`: deletes the element `e = (t, x)` from the set. This is serialized as `t` and is broadcasted to all other nodes. `t` is guaranteed to exist due to causal ordering.

### Strings/Arrays
We need to translate indices into unique immutable positions (what the user intuitively means when they say 'insert here').

This assumption of relative order of elements remains constant over time is called the **strong list specification**.

Indices are based off of what % of the text they get inserted at. 0.0 is the index of the start sequence, 1.0 is the index of the end sequence. 

```
0.0       1.0
NUL       NUL
```

Inserting a single character would be halfway between 0.0 and 1.0 so it would have an index of 0.5.

```
0.0   0.5   1.0
NUL   'B'   NUL
```

Inserting to the left of 'B' would be between 0.0 and 0.5 so 0.25.

```
0.0  0.25  0.5   1.0
NUL   'A'  'B'   NUL
```

Indices are never ambiguous! Causal broadcast is required so the insertion of a character is delivered before its deletion.

### Arbitrary JSON
Can work for *any* JSON using only 4 operations: `set`, `delete`, `increment`, `insert`

`set` is the only operation among them which is *convergent* instead of commutative. Convergent means that all actors will arrive at the same state but values during convergence (i.e. as they receive updates) may differ. Usually last-writer-wins (LWW).

Concept of time is implemented by giving each field (including nested ones!) a UUID. Assigns give a field a new UUID. All other operations specify which field they are operating on by UUID (nested ones need to provide the UUID of each parent required to reach the nested field). It is a sort of versioning that holds the state that CRDTs need to autonomously resolve conflicts *without* consensus.

## State Based
Can broadcast the values of the state using [[thoughts/message broadcast#Best-effort|best-effort broadcast]] and then merging using a defined merge operator $\sqcup$.

The merge operator $\sqcup$ must be:
1. Commutative: $s_1 \sqcup s_2 = s_2 \sqcup s_1$
2. Associative: $(s_1 \sqcup s_2) \sqcup s_3 = s_1 \sqcup (s_2 \sqcup s_3)$
3. Idempotent: $s_1 \sqcup s_1 = s_1$

## State Compaction
Technically requires achieving [[thoughts/consensus|consensus]] on nodes in order to do this.

> So, as far as I know, we would need a consensus protocol attached to the CRDT in order to get garbage collection / compaction. [(#2)](https://github.com/ipfs-inactive/dynamic-data-and-capabilities/issues/2)

## Strategies
- Add-wins
- Remove-wins
- Last-writer-wins