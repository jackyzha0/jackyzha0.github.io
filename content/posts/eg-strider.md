---
title: Making Eg-walker even faster
description: "A set of improvements on top of Eg-walker that make it faster to merge and reopen documents while using less memory and disk. Most of the gains come from faster text operations, taking the cheap path more often, and skipping work that is already done or not yet needed."
socialImage: ../thoughts/images/eg-strider-og.png
date: 2026-10-25
tags:
  - technical
  - seed
draft: false
---
Eg-walker is a collaborative text editing algorithm first published in 2024. It totally shifted how we thought about what we initially assumed was an inherent tradeoff between the two dominant families of collaborative text editing algorithms: [[thoughts/Operational Transform|OT]] and [[thoughts/CRDT|CRDT]].

OT is generally fast in the simple sequential merge case but can blow up when merging large numbers of concurrent operations (for example if someone goes offline, makes a bunch of edits, and comes back to the document).[^1]

[^1]: Normally, people also argue that OT is hard to implement correctly. However, this is generally only true in the peer-to-peer case, where the transform functions need to satisfy both TP1 and TP2, and not in the centralized server case, which only needs TP1. 

CRDTs are generally fast to merge large numbers of concurrent operations but keep a ridiculous amount of metadata overhead (IDs for every character typed and tombstones for every character deleted) and are usually slow to load/open a saved document.

Eg-walker tries to combine the best of both worlds by constructing an event graph of plain index-based operations, applying sequential edits directly, and only building up CRDT-like state temporarily to merge concurrent ones.

In this blog post, I introduce eg-strider, a set of improvements on top of Eg-walker that result in significantly better performance on every measurable axis (merge time, reopen time, peak memory, memory at rest, and snapshot size).

<div class="egs-charts"></div>

## The intuition behind Eg-walker

To talk about eg-strider though, we must first understand Eg-walker.

At a high level, we record an event graph of operations. Each operation is either an `ins(idx, text)` or a `del(idx, len)`, where the index is relative to the document text as its author saw it. We group linear (non-branching) sections of consecutive operations into *runs*.

Looking at the event graph, we can pretty easily tell where history is linear and where it is concurrent.

The graph becomes non-linear when peers make edits to the document concurrently. Here, we mean the [[thoughts/causality|causal definition]] of concurrency, denoted $a \parallel b$, where it does not mean simultaneous, but rather that neither event knew about the other when it was made. In real life, this usually happens when a peer goes offline and continues making edits.

<div class="egs-diagram" data-egs="graph"></div>

### Linear case

One of Eg-walker's key observations is that when history is linear, no merge needs to happen and we can simply apply it to the document as the indices of the operations are already relative to the correct document state. It is important that the linear case is cheap as this regime dominates in the vast majority of traces.

<div class="egs-diagram" data-egs="linear"></div>

### Concurrent case

In the concurrent merge case, we start from the end of the last linear run and track a list of *records* that describes every character inserted and deleted so far in the merge.

We look at these records through two views:

1. **The effect view** is the set containing every operation we've merged so far.
2. **The prepare view** is the set containing only the operations that the document was composed of as of the operation's creation. This, for example, excludes any operations that were concurrent with it or happened after it.

Rebasing an operation can be thought of as transforming an operation's prepare view index into its effect view index.

For each operation, the steps are as follows:
1. Move the prepare view to be accurate as of that operation. In paper terminology, we *retreat* (hide) events that aren't in this view and *advance* (show) ones that are.
2. If the operation is:
	- an insert, we find the position at that operation's prepare index and insert a new record. If a concurrent insert happened at the same position, we tie-break the insert index in the list of records using a deterministic rule (usually by the unique ID of the peer).
	- a delete, we mark the record at its prepare index as deleted. If a concurrent delete already removed it, there's nothing left to delete and so the operation is a no-op.
3. We find the index of that record in the effect view and use that as the transformed index.

<div class="egs-diagram" data-egs="concurrent"></div>

Applying this to all operations creates a 'rebased' list of operations. Note that this list is the _only_ output retained as a result of the merge, and the records can be thrown away as soon as the merge reaches the next linear section. This means that the records and the views over them are purely ephemeral merge metadata that do not need to be kept in steady state.

## Where the gains come from

> You can't make the computer faster. You can only make it do less work.
>
> Joseph Gentle, [5000x faster CRDTs: An Adventure in Optimization](https://josephg.com/blog/crdts-go-brrr/)

Now, equipped with a good understanding of Eg-walker, let's turn to the main ideas eg-strider uses to improve upon it.

### Faster text operations

In the linear case there's nothing to merge, so applying the operations to the text is a large share of the merge time.

diamond-types applies every transformed operation to a [rope](https://en.wikipedia.org/wiki/Rope_(data_structure)). On every operation, the rope does a bunch of pointer-chasing from the top of its skip list to find the node holding a given index, copies the inserted text in twice (once into its write buffer, then into the rope), and shuffles text around inside a node to make room. This turns out to be redundant work when merging operations in bulk as we only care about the end result.

Instead, eg-strider builds the text with a reverse [piece table](https://en.wikipedia.org/wiki/Piece_table) with a [finger](https://en.wikipedia.org/wiki/Finger_search). The intuition here is two-fold:

1. By traversing the operations in reverse order, we know exactly where each insert is going to end up in the final document or whether it gets deleted. Surviving text gets copied straight to its spot exactly once and deleted text is never copied at all.
2. Finding each piece for the index is relatively cheap if we start our search from the last piece we touched. Edits tend to land near each other which keeps the average search distance low.

<div class="egs-diagram" data-egs="pieces"></div>

On paper, the piece table seems like it would have significantly worse indexing performance (operating in $O(n)$ to locate a piece given the index instead of $O(\log n)$ to locate a node given the index).

The main win here is not in the asymptotic behavior but rather the pragmatic constant factors. The piece table is tiny. Each piece is 8 bytes, and across all of the traces they never take up more than about 50 KB which means all of the pieces fit in L1/L2 cache on most modern processors. A short linear walk over memory already in cache will almost always beat a logarithmic one that needs to chase pointers all over the heap!

Looking at the numbers, building the text using the reverse piece table is 2–7× faster than diamond-types' rope on the same operations. It's most noticeable in editing traces with a lot of churn (where only a small fraction of the characters typed end up in the final document).

### Maximizing cheap work

As we know from above, the linear merge case is the cheap path as each operation just gets applied to the text directly. Eg-walker has a very conservative rule for what can go through the fast path and only assumes that linear sections qualify.

One important observation we exploit is that in most real editing traces, concurrent edits land in different parts of the document (people collaborating tend to avoid working on the same thing). These non-overlapping concurrent operations can actually use a much simpler merge algorithm: if an operation's span doesn't overlap with any span touched by the concurrent events, its index can just shift by the net change in document length of the concurrent operations before it.

We only fall back to the CRDT when an operation lands inside one of those textually conflicting spans or when the concurrent range is very large. As neither happens often, we get to take the cheap path for most concurrent edits too.

<div class="egs-diagram" data-egs="shift"></div>

### Making common work faster

Work that happens often in the hot path (like lookups) matters a surprising amount.

For example, in the fallback CRDT case, finding the record for an operation happens frequently because of retreating and advancing the prepare view. As such, records have two ways to index them:

- by position in a view
- by operation

diamond-types makes the second index a B-tree whose entries point at the same leaves. Since operations within a concurrent range are numbered consecutively, we can make it a flat array instead. This turns record lookup from $O(\log n)$ to $O(1)$. With this change, traces that fall back to the CRDT merge about 4–6× faster.

### Saving work
#### Incremental planning

Before merging, Eg-walker needs to know which parts of the history conflict. diamond-types works this out on every merge by walking back through the graph to the last point where the graph was linear. On concurrent traces, this planning takes about half of its merge time.

eg-strider instead keeps the runs and their causality metadata up to date as events are appended. This costs a little extra work and memory on every append but shaves off a significant amount of time. With incremental planning, merging the concurrent traces is about 1.7–1.8× faster, and merging a single new edit (the common online edit case) is hundreds of times faster than planning from scratch each time.

<div class="egs-diagram" data-egs="runs"></div>

#### Lazy document opening

Another speed trick is to make reopening a serialized document lazy. Most libraries (with the exception of Loro) put the whole event graph or operation log into the document and read all of it on open, which is very expensive. Instead, we can split the file into sections that are selectively unpacked as needed:

- **header**: which peers are in the document, the number of events and characters, the frontier of the event graph, where each part of the history starts in the file.
- **text**: the document text as of the frontier.
- **history**: the event graph and operations in parts cut where the history is linear (keeping concurrent regions whole), aiming for about 32k events in the newest part and doubling the target for each part before it.

This allows eg-strider to only read the header and text before being ready to apply an edit which makes reopening about 25× faster than reading the whole file.

#### Smaller structs and file compression

We save on memory by keeping our structs small and packing data as a struct of arrays rather than an array of structs. Each run of operations is represented with 16 bytes whereas diamond-types uses 64, and the event graph itself is a few arrays of 4-byte numbers rather than a 72-byte struct per run. This helps us fit more per cache line and avoids unnecessary struct padding (see [What Every Programmer Should Know About Memory](https://lwn.net/Articles/259710/) and [Practical Data-Oriented Design](https://www.youtube.com/watch?v=IroPQ150F6c)). Together, this cuts the memory a document holds at steady state by more than half.

Finally, we make file sizes smaller by compressing the text and history sections of the document with zstd, where diamond-types only compresses the inserted text with LZ4. This makes our files about 3.7× smaller than they would be uncompressed, and about 1.3–4.1× smaller than diamond-types' file format.

## A note on measurement

The Eg-walker paper measures merge time as the time it takes to merge a set of operations that are already in the event graph. Since some of eg-strider's wins come from moving bookkeeping work out of the merge and into appending, measuring only merge time would be slightly deceptive, so our merge times include appending the operations as well.

All measurements are the median of 100 runs, with each library cycling through all of the traces in turn so we aren't accidentally measuring the CPU's branch predictor overfitting a single trace.

## Caveats & Conclusion

eg-strider is a research project. Like the Eg-walker paper, it assumes that replicas aren't Byzantine and that every event is valid (following the Eg-walker paper's C.1 definition), so it doesn't check its input (and thus even a single invalid event can make it panic). 

In practice, any real usage is bound to have buggy clients that look Byzantine and each library handles this to differing extents. Yjs, Loro and Automerge validate what they receive while diamond-types checks what it decodes but panics on out-of-range positions (like eg-strider). If we wanted to add this kind of fault tolerance, a natural home for these checks would be in a server sitting in front of eg-strider, much like how client-server OT algorithms validate operations centrally.[^2]

[^2]: A sketch of what this could look like: the server accepts or rejects every event and fixes one canonical order but unlike OT it never transforms operations for clients, as each client still runs Eg-walker itself. The server first checks structure: the replica comes from the authenticated session, sequence numbers are contiguous (so IDs can't be forged), parents are events it already has in ascending order, etc. Accepted events are appended in arrival order and broadcast and a client whose event is rejected just resyncs from the server's snapshot as in OT.

That said, I still think these ideas are broadly portable to real-world implementations. My hope is that this blog post taught you something :)

Source is open and MIT licensed on [GitHub](https://github.com/jackyzha0/eg-strider).

<script>
;(() => {
  if (window.__egsDiagrams) return
  window.__egsDiagrams = true

  // a line is plain text with {p:...} path, {d:...} dim, {h:...} highlighted and {w:...} bold marks, and
  // {a:...} / {b:...} for each author's colour ({A:...} / {B:...} highlighted, {x:...} struck through in A's), and {c:...} on a grey ground for a
  // critical version, {o:...} faded and {s:...} struck through; no angle brackets, ampersands or double
  // quotes anywhere, since this sits inside markdown
  const TOKEN = /\{([pdhwabABxcosS]):([^}]*)\}/g
  const visible = (s) => s.replace(TOKEN, '$2')
  const pad = (s, n) => s + ' '.repeat(Math.max(0, n - visible(s).length))

  const mk = (tag, text) => {
    const n = document.createElement(tag)
    if (text !== undefined) n.textContent = text
    return n
  }
  const glyph = (kind, text) => {
    if (kind === 'h') {
      const s = mk('span', text)
      s.setAttribute('data-highlighted-chars', '')
      return s
    }
    if (kind === 'A' || kind === 'B') {
      const s = mk('span')
      s.setAttribute('data-highlighted-chars', '')
      s.appendChild(glyph(kind.toLowerCase(), text))
      return s
    }
    if (kind === 'w') {
      const s = mk('span', text)
      s.style.fontWeight = 'bold'
      return s
    }
    if (kind === 'o') {
      // a record the view does not have yet
      const s = mk('span', text)
      s.style.opacity = '0.3'
      return s
    }
    if (kind === 's' || kind === 'S') {
      // a record the view has deleted, highlighted (S) when this step deletes it
      const s = mk('span', text)
      s.style.textDecoration = 'line-through'
      if (kind === 'S') s.setAttribute('data-highlighted-chars', '')
      return s
    }
    if (kind === 'c') {
      const s = mk('span', text)
      s.style.background = 'var(--lightgray)'
      s.style.color = 'var(--dark)'
      // enough to meet the cell above or below, so a cut down both rows is one stripe
      s.style.padding = '0.1em 0'
      return s
    }
    if (kind === 'b') {
      const s = mk('span', text)
      s.style.color = 'var(--secondary)'
      return s
    }
    // path, which is also author A (struck through for x), or dim
    const m = mk('mark')
    m.setAttribute('data-chars-id', kind === 'd' ? 'dim' : 'path')
    if (kind === 'x') m.style.textDecoration = 'line-through'
    m.appendChild(mk('span', text))
    return m
  }
  const plain = (row, text, auto) => {
    let buf = ''
    for (const ch of text) {
      const kind = auto[ch]
      if (kind) {
        if (buf) row.appendChild(document.createTextNode(buf))
        buf = ''
        row.appendChild(glyph(kind, ch))
      } else {
        buf += ch
      }
    }
    if (buf) row.appendChild(document.createTextNode(buf))
  }
  const line = (text, auto) => {
    const row = mk('span')
    row.setAttribute('data-line', '')
    let last = 0
    for (const m of text.matchAll(TOKEN)) {
      plain(row, text.slice(last, m.index), auto)
      row.appendChild(glyph(m[1], m[2]))
      last = m.index + m[0].length
    }
    plain(row, text.slice(last), auto)
    if (!row.childNodes.length) row.textContent = ' '
    return row
  }

  // a fixed-height ascii panel: `head` lines, then the step, padded to the tallest step so nothing moves;
  // under it, back and next as filled text in the panel\u2019s font
  const fill = (lines, height) => lines.concat(Array(Math.max(0, height - lines.length)).fill(''))
  const textButton = (text) => {
    const b = mk('button', text)
    b.style.border = '0'
    b.style.padding = '1px 1ch'
    b.style.margin = '0'
    b.style.font = 'inherit'
    // greyed out at the ends at once, not through the site\u2019s colour transition
    b.style.transition = 'none'
    return b
  }
  const stepper = (root, { head, steps, auto }) => {
    const bodyHeight = Math.max(...steps.map((s) => s.lines.length))
    const pre = mk('pre')
    pre.setAttribute('data-language', 'plaintext')
    pre.style.margin = '1.5rem 0 0.5rem'
    const code = mk('code')
    code.setAttribute('data-language', 'plaintext')
    pre.appendChild(code)
    const controls = mk('div')
    controls.style.margin = '0 0 1.5rem'
    controls.style.whiteSpace = 'pre'
    controls.style.color = 'var(--dark)'
    controls.style.fontFamily = 'var(--codeFont, monospace)'
    const back = textButton('← back')
    back.className = 'egs-back'
    const next = textButton('next →')
    next.className = 'egs-next'
    const where = mk('span')
    where.className = 'egs-where'
    controls.append(back, '  ', next, '  ', where)
    let at = 0
    const ends = () => {
      for (const [b, off] of [ [back, at === 0], [next, at === steps.length - 1] ]) {
        b.disabled = off
        // filled, as in a terminal\u2019s inverse video; greyed out at the ends
        b.style.color = off ? 'var(--gray)' : 'var(--light)'
        b.style.backgroundColor = off ? 'var(--lightgray)' : 'var(--dark)'
        b.style.cursor = off ? 'default' : 'pointer'
      }
    }
    ends()
    root.append(pre)
    if (steps.length > 1) root.append(controls)
    else pre.style.marginBottom = '1.5rem'
    if (window.getComputedStyle) {
      const font = getComputedStyle(code)
      controls.style.fontFamily = font.fontFamily
      controls.style.fontSize = font.fontSize
      controls.style.lineHeight = font.lineHeight
      // in line with the panel\u2019s text
      const box = getComputedStyle(pre)
      controls.style.paddingLeft = 'calc(' + box.paddingLeft + ' + ' + box.borderLeftWidth + ')'
    }
    const show = () => {
      const lines = [...head, ...fill(steps[at].lines, bodyHeight)]
      code.replaceChildren(...lines.map((t) => line(t, auto)))
      ends()
      where.textContent = 'step ' + (at + 1) + ' of ' + steps.length
    }
    // plays itself while at least 40% of it is on screen, a step every 3 seconds and round again from
    // the start, until back or next is pressed; not at all for a reader who asked for reduced motion
    const reduced = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
    let playing = steps.length > 1 ? !reduced : false
    let visible = false
    let timer = 0
    // while it plays, next fills with vermilion from the left over the 3 seconds to the next step
    next.style.backgroundImage = 'linear-gradient(var(--tertiary), var(--tertiary))'
    next.style.backgroundRepeat = 'no-repeat'
    next.style.backgroundSize = '0% 100%'
    const sweep = (on) => {
      next.style.transition = 'none'
      next.style.backgroundSize = '0% 100%'
      if (!on) return
      void next.offsetWidth
      next.style.transition = 'background-size 3000ms linear'
      next.style.backgroundSize = '100% 100%'
    }
    const pause = () => {
      clearTimeout(timer)
      timer = 0
      sweep(false)
    }
    const play = () => {
      pause()
      if (!playing) return
      if (!visible) return
      const last = at === steps.length - 1
      sweep(!last)
      timer = setTimeout(() => {
        if (!root.isConnected) return
        at = last ? 0 : at + 1
        show()
        play()
      }, 3000)
    }
    const takeOver = () => {
      playing = false
      pause()
    }
    back.addEventListener('click', () => {
      takeOver()
      at = Math.max(0, at - 1)
      show()
    })
    next.addEventListener('click', () => {
      takeOver()
      at = Math.min(steps.length - 1, at + 1)
      show()
    })
    show()
    if (playing ? 'IntersectionObserver' in window : false) {
      const watch = new IntersectionObserver(
        ([entry]) => {
          if (!root.isConnected) {
            watch.disconnect()
            return pause()
          }
          // a diagram taller than 40% of the screen counts once it fills that much of it
          const seen = entry.intersectionRatio >= 0.4 ? true : entry.intersectionRect.height >= 0.4 * window.innerHeight
          if (seen === visible) return
          visible = seen
          if (visible) play()
          else pause()
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1] },
      )
      watch.observe(pre)
    }
  }

  // 1. the history as events are made: runs grow and split, and events in linear runs are critical;
  // events are coloured by who made them, dashed lines mark B going offline and coming back, and each
  // peer's text shows what it has seen
  const L = 'linear'
  const C = 'concurrent'
  const EVENTS = [
    ['e1', 'ins(0, \u0022tea\u0022)', 'A'],
    ['e2', 'ins(3, \u0022 eggs\u0022)', 'B'],
    ['e3', 'ins(8, \u0022 milk\u0022)', 'B'],
    ['e4', 'ins(3, \u0022 jam\u0022)', 'A'],
    ['e5', 'del(12, 5)', 'A'],
    ['e6', 'ins(3, \u0022 ham\u0022)', 'B'],
    ['e7', 'ins(17, \u0022 rice\u0022)', 'B'],
    ['e8', 'del(11, 5)', 'A'],
    ['e9', 'ins(16, \u0022 oil\u0022)', 'B'],
  ]
  const BY = Object.fromEntries(EVENTS.map((e) => [e[0], e.at(2)]))
  // an author's colour, highlighted if `fresh`
  const by = (author, text, fresh) => '{' + (fresh ? author : author.toLowerCase()) + ':' + text + '}'
  // both graph rows, events coloured by author and the newest highlighted
  const paintGraph = (graph, newest, retreated = []) =>
    fill(graph, 2).map((g) => g.replace(/e\d/g, (id) => (retreated.includes(id) ? '{d:' + id + '}' : by(BY[id], id, id === newest))))
  const runTable = (runs, height) => fill(['{w:run events         parents kind}', ...runs.map((r) => pad(r[0], 4) + pad(r[1], 15) + pad(r[2], 8) + r[3])], height + 1)
  // the first `seen` events have been made and the last of them is highlighted; both graph rows, all
  // nine event rows and all four run rows keep their space from the start
  const graphStep = (graph, seen, status, texts, runs, quiet) => {
    const newest = quiet ? '' : EVENTS[seen - 1][0]
    return {
      lines: [
        ...paintGraph(graph, newest),
        '',
        '{w:peer status  text}',
        pad(by('A', 'A'), 5) + pad(status[0], 8) + texts[0],
        pad(by('B', 'B'), 5) + pad(status[1], 8) + texts[1],
        '',
        '{w:event  op                by}',
        ...fill(
          EVENTS.slice(0, seen).map((e) => {
            const fresh = e[0] === newest
            return pad(by(e[2], e[0], fresh), 7) + pad(fresh ? '{h:' + e[1] + '}' : e[1], 18) + by(e[2], e[2], fresh)
          }),
          EVENTS.length,
        ),
        '',
        ...runTable(runs, 4),
      ],
    }
  }
  // e4 sits where it will be once e6 splits r1, so nothing moves when it does
  const OFF = '         ┊'
  const TOP = 'e1─e2─e3─┊─┬─e4─e5'
  const BOTTOM = OFF + ' └─e6─e7─┘ ┊'
  const GRAPH = [
    graphStep(['e1─e2'], 2, ['online', 'online'], ['tea eggs', 'tea eggs'], [ ['r1', 'e1,e2', '', L] ], true),
    graphStep(['e1─e2─e3'], 3, ['online', 'online'], ['{h:tea eggs milk}', '{h:tea eggs milk}'], [ ['r1', 'e1,e2,{h:e3}', '', L] ]),
    graphStep(['e1─e2─e3─┊───e4', OFF], 4, ['online', '{h:offline}'], ['{h:tea jam eggs milk}', 'tea eggs milk'], [ ['r1', 'e1,e2,e3,{h:e4}', '', L] ]),
    graphStep(['e1─e2─e3─┊───e4─e5', OFF], 5, ['online', 'offline'], ['{h:tea jam eggs}', 'tea eggs milk'], [ ['r1', 'e1,e2,e3,e4,{h:e5}', '', L] ]),
    graphStep(
      [TOP, OFF + ' └─e6'],
      6,
      ['online', 'offline'],
      ['tea jam eggs', '{h:tea ham eggs milk}'],
      [ ['r1', '{h:e1,e2,e3}', '', L], ['r2', '{h:e4,e5}', 'r1', '{h:' + C + '}'], ['r3', '{h:e6}', 'r1', '{h:' + C + '}'] ],
    ),
    graphStep([TOP, OFF + ' └─e6─e7'], 7, ['online', 'offline'], ['tea jam eggs', '{h:tea ham eggs milk rice}'], [ ['r1', 'e1,e2,e3', '', L], ['r2', 'e4,e5', 'r1', C], ['r3', 'e6,{h:e7}', 'r1', C] ]),
    graphStep(
      [TOP + '─┬─┊─e8', BOTTOM],
      8,
      ['online', '{h:online}'],
      ['{h:tea jam ham rice}', '{h:tea jam ham rice}'],
      [ ['r1', 'e1,e2,e3', '', L], ['r2', 'e4,e5', 'r1', C], ['r3', 'e6,e7', 'r1', C], ['r4', '{h:e8}', '{h:r2,r3}', L] ],
    ),
    graphStep(
      [TOP + '─┬─┊─e8─e9', BOTTOM],
      9,
      ['online', 'online'],
      ['{h:tea jam ham rice oil}', '{h:tea jam ham rice oil}'],
      [ ['r1', 'e1,e2,e3', '', L], ['r2', 'e4,e5', 'r1', C], ['r3', 'e6,e7', 'r1', C], ['r4', 'e8,{h:e9}', 'r2,r3', L] ],
    ),
  ]

  // 5. the bookkeeping as events are appended: most extend the last run, and the critical versions
  // eg-strider keeps, where runs start (dashed, on grey), only change when a new run starts
  // `cuts`: how many of the kept critical versions there are, named under the graph at their columns
  const runsStep = (graph, newest, runs, cuts) => ({
    lines: [...paintGraph(graph, newest), '{d:' + [0, 11, 23].slice(0, cuts).reduce((row, at) => row.padEnd(at) + 'boundary', '') + '}', '', ...runTable(runs, 4)],
  })
  const KEPT = '{c:┊}'
  // the graph two columns in, for the cut at the start of r1
  const IN = KEPT + ' '
  const SPLIT = 'e1─e2─e3─' + KEPT + '─┬─e4─e5'
  const BELOW = KEPT + ' '.repeat(10) + KEPT + ' └─e6'
  const RUNS = [
    runsStep([IN + 'e1─e2', KEPT], '', [ ['r1', 'e1,e2', '', L] ], 1),
    runsStep([IN + 'e1─e2─e3', KEPT], 'e3', [ ['r1', 'e1,e2,{h:e3}', '', L] ], 1),
    runsStep([IN + 'e1─e2─e3─────e4', KEPT], 'e4', [ ['r1', 'e1,e2,e3,{h:e4}', '', L] ], 1),
    runsStep([IN + 'e1─e2─e3─────e4─e5', KEPT], 'e5', [ ['r1', 'e1,e2,e3,e4,{h:e5}', '', L] ], 1),
    runsStep(
      [IN + SPLIT, BELOW],
      'e6',
      [ ['r1', '{h:e1,e2,e3}', '', L], ['r2', '{h:e4,e5}', 'r1', '{h:' + C + '}'], ['r3', '{h:e6}', 'r1', '{h:' + C + '}'] ],
      2,
    ),
    runsStep([IN + SPLIT, BELOW + '─e7'], 'e7', [ ['r1', 'e1,e2,e3', '', L], ['r2', 'e4,e5', 'r1', C], ['r3', 'e6,{h:e7}', 'r1', C] ], 2),
    runsStep(
      [IN + SPLIT + '─┬─' + KEPT + '─e8', BELOW + '─e7─┘ ' + KEPT],
      'e8',
      [ ['r1', 'e1,e2,e3', '', L], ['r2', 'e4,e5', 'r1', C], ['r3', 'e6,e7', 'r1', C], ['r4', '{h:e8}', '{h:r2,r3}', '{h:' + L + '}'] ],
      3,
    ),
    runsStep(
      [IN + SPLIT + '─┬─' + KEPT + '─e8─e9', BELOW + '─e7─┘ ' + KEPT],
      'e9',
      [ ['r1', 'e1,e2,e3', '', L], ['r2', 'e4,e5', 'r1', C], ['r3', 'e6,e7', 'r1', C], ['r4', 'e8,{h:e9}', 'r2,r3', L] ],
      3,
    ),
  ]

  // 2 and 3. every step has the same rows: the graph, the runs, then what the step computes
  // `retreated`: events merged already but unseen by this one, greyed out
  const step = (graph, newest, runs, rows, body, retreated) => ({
    lines: [...paintGraph(graph, newest, retreated), '', ...runTable(runs, rows), '', ...body],
  })

  // 2. merging a linear run: there is nothing to merge, so no prepare or effect view either; each op is applied
  // to the document as it is
  const linearBody = (applied, text, caret, op) => [
    '{w:doc}      = ' + applied,
    '',
    '{d:index    0    5    10   15   20}',
    '{d:         |    |    |    |    |}',
    '{w:doc}      ' + text,
    ' '.repeat(9 + caret) + '{p:^}',
    '',
    '{w:op}       ' + op + '  {d:as it is}',
  ]
  const LINEAR = [
    step(['e1─e2─e3'], 'e1', [ ['r1', '{h:e1},{d:e2,e3}', '', L] ], 1, linearBody('no events', '', 0, 'ins(0, \u0022tea\u0022)'), ['e2', 'e3']),
    step(['e1─e2─e3'], 'e2', [ ['r1', 'e1,{h:e2},{d:e3}', '', L] ], 1, linearBody('e1', 'tea', 3, 'ins(3, \u0022 eggs\u0022)'), ['e3']),
    step(['e1─e2─e3'], 'e3', [ ['r1', 'e1,e2,{h:e3}', '', L] ], 1, linearBody('e1 e2', 'tea eggs', 8, 'ins(8, \u0022 milk\u0022)')),
  ]

  // 3. merging a concurrent range: one list of records, with a flag over each for each view (in it, not in
  // it yet, deleted) and the text each view reads as under its flags; the caret is where in the list
  // the op lands
  // 3 only: the graph and then what the step computes, without the runs
  const viewStep = (graph, newest, body, retreated) => ({ lines: [...paintGraph(graph, newest, retreated), '', ...body] })
  const CONCURRENT = [
    viewStep([TOP, OFF + ' └─e6─e7'], 'e4', [
      '{w:in} {d:(e4)}  ins(3, \u0022 jam\u0022)',
      '',
      '{w:prepare}  ∅',
      '{w:effect}   ∅',
      '',
      '{w:records}  P',
      '{w:prepare}  tea eggs milk',
      '            {p:^}',
      '{w:effect}   tea eggs milk',
      '            {p:^}',
      '',
      '{w:records}  P   {h:e4}  P1',
      '{w:rendered} tea {h:jam} eggs milk',
      '',
      '{w:out}      ins(3, \u0022 jam\u0022)',
      '',
      'P is the placeholder for e1..e3 so we',
      'don\u0027t load them at merge. e4 lands',
      'inside P so we split it.',
    ], ['e5', 'e6', 'e7']),
    viewStep([TOP, OFF + ' └─e6─e7'], 'e5', [
      '{w:in} {d:(e5)}  del(12, 5)',
      '',
      '{w:prepare}  e4',
      '{w:effect}   e4',
      '',
      '{w:records}  P   e4  P1',
      '{w:prepare}  tea jam eggs milk',
      '                     {p:^^^^^}',
      '{w:effect}   tea jam eggs milk',
      '                     {p:^^^^^}',
      '',
      '{w:records}  P   e4  P1   {h:P2}',
      '{w:rendered} tea jam eggs {S:milk}',
      '',
      '{w:out}      del(12, 5)',
      '',
      'e5 deletes the end of P1 so we split it',
      'into P1 and P2.',
    ], ['e6', 'e7']),
    viewStep([TOP, OFF + ' └─e6─e7'], 'e6', [
      '{w:in} {d:(e6)}  ins(3, \u0022 ham\u0022)',
      '',
      '{w:prepare}  {o:e4} {o:e5}',
      '{w:effect}   e4 e5',
      '',
      '{w:records}  P   e4  P1   P2',
      '{w:prepare}  tea {o:jam} eggs milk',
      '            {p:^}',
      '{w:effect}   tea jam eggs {s:milk}',
      '                {p:^}',
      '',
      '{w:records}  P   e4  {h:e6}  P1   P2',
      '{w:rendered} tea jam {h:ham} eggs {s:milk}',
      '',
      '{w:out}      ins(7, \u0022 ham\u0022)',
      '',
      'e4 || e6 and both insert @ idx 3 so we',
      'tie-break on author, e6 goes after e4',
      'which shifts its index by +4.',
    ], ['e4', 'e5', 'e7']),
    viewStep([TOP, OFF + ' └─e6─e7'], 'e7', [
      '{w:in} {d:(e7)}  ins(17, \u0022 rice\u0022)',
      '',
      '{w:prepare}  {o:e4} {o:e5} e6',
      '{w:effect}   e4 e5 e6',
      '',
      '{w:records}  P   e4  e6  P1   P2',
      '{w:prepare}  tea {o:jam} ham eggs milk',
      '                              {p:^}',
      '{w:effect}   tea jam ham eggs {s:milk}',
      '                         {p:^}',
      '',
      '{w:records}  P   e4  e6  P1   P2   {h:e7}',
      '{w:rendered} tea jam ham eggs {s:milk} {h:rice}',
      '',
      '{w:out}      ins(16, \u0022 rice\u0022)',
      '',
      'in the effect view, e4 adds 4 and milk',
      'removes 5 so the index shifts by -1.',
    ], ['e4', 'e5']),
  ]


  // 4. a concurrent range whose branches edit distinct regions, one op at a time: the merged text and
  // the op\u2019s own text lined up character by character drift apart by each range it has not seen
  // (greyed), so its position only shifts
  const SHIFT = [
    {
      lines: [
        '{a:e1}─┬─{A:e2}─{d:e3}',
        '   └─{d:e4}',
        '',
        '{w:merged}   {a:jam }tea eggs milk',
        '{d:         0   4}',
        '{a:A}        {a:jam }tea eggs milk',
        '{d:         0   4}',
        '',
        '{w:edited}   {w:merged  event  grew}',
        '         {h:0–4}     {a:e2}     +4',
        '',
        '',
        '',
        '{w:shift}    0, so A\u2019s 0 is 0',
        '',
        '   {w:in}                {w:out}',
        '{a:e2} ins(0, \u0022jam \u0022)    {h:ins(0, \u0022jam \u0022)}',
        '{a:e3} del(7, 5)',
        '{b:e4} ins(13, \u0022 rice\u0022)',
      ],
    },
    {
      lines: [
        '{a:e1}─┬─{a:e2}─{A:e3}',
        '   └─{d:e4}',
        '',
        '{w:merged}   {a:jam }tea      milk',
        '{d:         0   4  7}',
        '{a:A}        {a:jam }tea{x: eggs} milk',
        '{d:         0   4  7    12}',
        '',
        '{w:edited}   {w:merged  event  grew}',
        '         0–4     {a:e2}     +4',
        '         {h:7–7}     {a:e3}     −5',
        '',
        '',
        '{w:shift}    0, so A\u2019s 7 is 7',
        '',
        '   {w:in}                {w:out}',
        '{a:e2} ins(0, \u0022jam \u0022)    ins(0, \u0022jam \u0022)',
        '{a:e3} del(7, 5)         {h:del(7, 5)}',
        '{b:e4} ins(13, \u0022 rice\u0022)',
      ],
    },
    {
      lines: [
        '{a:e1}─┬─{d:e2}─{d:e3}',
        '   └─{B:e4}',
        '',
        '{w:merged}   {a:jam }tea      milk{b: rice}',
        '{d:         0   4  7         12}',
        '{b:B}            tea{x: eggs} milk{b: rice}',
        '{d:             0  3    8    13}',
        '',
        '{w:edited}   {w:merged  event  grew}',
        '         0–4     {d:e2}     +4',
        '         7–7     {d:e3}     −5',
        '         {h:12–17}   {b:e4}     +5',
        '',
        '{w:shift}    +4 −5 = −1, so B\u2019s 13 is 12',
        '',
        '   {w:in}                {w:out}',
        '{a:e2} ins(0, \u0022jam \u0022)    ins(0, \u0022jam \u0022)',
        '{a:e3} del(7, 5)         del(7, 5)',
        '{b:e4} ins(13, \u0022 rice\u0022)  {h:ins(12, \u0022 rice\u0022)}',
      ],
    },
  ]

  const DIM = { '─': 'd', '┊': 'd', '┬': 'd', '└': 'd', '┘': 'd' }

  // 6. the document's text, built by undoing the ops last to first. Under the document as it was
  // then, split into pieces, is where each character ends up in the final text, or × if it is deleted
  // later: an undone insert's characters are copied to where they end up, and an undone delete puts
  // back characters that end up nowhere
  const PIECES = [
    {
      lines: [
        '{w:stack}    │ ins(1, \u0022 big\u0022)     │',
        '         │ del(1, 5)          │',
        '         │ ins(10, \u0022!\u0022)       │',
        '         │ ins(1, \u0022 tiny\u0022)    │',
        '         │ ins(0, \u0022a cat\u0022)    │',
        '         └────────────────────┘',
        '',
        '         {w:before          after}',
        '{w:doc}      {h:a big cat!}',
        '{d:lands}    {h:0123456789}',
        '',
        '{w:pieces}   {d:len lands at    len lands at}',
        '         {h:10  0}',
        '',
        '',
        '',
        '',
        '{w:final}    __________',
        '         {d:0123456789}',
        '',
        '{w:copied}   0',
        '{w:skipped}  0',
        '',
        'We know the final document is of',
        'length 10 from the ops: 15 characters',
        'inserted, 5 deleted. The table starts',
        'as one piece: (length 10, lands at 0).',
        '',
      ],
    },
    {
      lines: [
        '{w:stack}    │ {h:ins(1, \u0022 big\u0022)}   {p:↑} │',
        '         │ del(1, 5)          │',
        '         │ ins(10, \u0022!\u0022)       │',
        '         │ ins(1, \u0022 tiny\u0022)    │',
        '         │ ins(0, \u0022a cat\u0022)    │',
        '         └────────────────────┘',
        '',
        '         {w:before          after}',
        '{w:doc}      a│{h: big}│ cat!    a│ cat!',
        '{d:lands}    {d:0│}{h:1234}{d:│56789    0│56789}',
        '',
        '{w:pieces}   {d:len lands at    len lands at}',
        '         1   0           1   0',
        '         {h:4   1}           5   5',
        '         5   5',
        '',
        '',
        '{w:final}    _{h: big}_____',
        '         {d:0123456789}',
        '',
        '{w:copied}   {h:4}',
        '{w:skipped}  0',
        '',
        'Undoing the last insert cuts the doc',
        'into pieces. It copies the \u0022 big\u0022',
        'piece into the final text and removes',
        'that piece from the doc.',
        '',
      ],
    },
    {
      lines: [
        '{w:stack}    │                    │',
        '         │ {h:del(1, 5)}        {p:↑} │',
        '         │ ins(10, \u0022!\u0022)       │',
        '         │ ins(1, \u0022 tiny\u0022)    │',
        '         │ ins(0, \u0022a cat\u0022)    │',
        '         └────────────────────┘',
        '',
        '         {w:before          after}',
        '{w:doc}      a│ cat!         a│{h: tiny}│ cat!',
        '{d:lands}    {d:0│56789         0│}{h:×××××}{d:│56789}',
        '',
        '{w:pieces}   {d:len lands at    len lands at}',
        '         1   0           1   0',
        '         5   5           {h:5   ×}',
        '                         5   5',
        '',
        '',
        '{w:final}    _ big_____',
        '         {d:0123456789}',
        '',
        '{w:copied}   4',
        '{w:skipped}  0',
        '',
        'Undoing the delete creates the 5',
        'characters it removed. Because we',
        'know this text will end up deleted,',
        'its index mappings for the piece are',
        'marked as × (can be discarded).',
      ],
    },
    {
      lines: [
        '{w:stack}    │                    │',
        '         │                    │',
        '         │ {h:ins(10, \u0022!\u0022)}     {p:↑} │',
        '         │ ins(1, \u0022 tiny\u0022)    │',
        '         │ ins(0, \u0022a cat\u0022)    │',
        '         └────────────────────┘',
        '',
        '         {w:before          after}',
        '{w:doc}      a│ tiny│ cat│{h:!}  a│ tiny│ cat',
        '{d:lands}    {d:0│×××××│5678│}{h:9}{d:  0│×××××│5678}',
        '',
        '{w:pieces}   {d:len lands at    len lands at}',
        '         1   0           1   0',
        '         5   ×           5   ×',
        '         4   5           4   5',
        '         {h:1   9}',
        '',
        '{w:final}    _ big____{h:!}',
        '         {d:0123456789}',
        '',
        '{w:copied}   {h:5}',
        '{w:skipped}  0',
        '',
        'Undoing the insert of \u0022!\u0022 cuts it off',
        'the last piece, copies it into the',
        'final text and removes it from the',
        'doc.',
        '',
      ],
    },
    {
      lines: [
        '{w:stack}    │                    │',
        '         │                    │',
        '         │                    │',
        '         │ {h:ins(1, \u0022 tiny\u0022)}  {p:↑} │',
        '         │ ins(0, \u0022a cat\u0022)    │',
        '         └────────────────────┘',
        '',
        '         {w:before          after}',
        '{w:doc}      a│{x: tiny}│ cat    a│ cat',
        '{d:lands}    {d:0│}{x:×××××}{d:│5678    0│5678}',
        '',
        '{w:pieces}   {d:len lands at    len lands at}',
        '         1   0           1   0',
        '         {x:5   ×}           4   5',
        '         4   5',
        '',
        '',
        '{w:final}    _ big____!',
        '         {d:0123456789}',
        '',
        '{w:copied}   5',
        '{w:skipped}  {h:5}',
        '',
        'Undoing the insert of \u0022 tiny\u0022 deletes',
        'it from the doc. We don\u2019t copy any of',
        'it into the final text because all of',
        'the index mappings are marked as ×.',
        '',
      ],
    },
    {
      lines: [
        '{w:stack}    │                    │',
        '         │                    │',
        '         │                    │',
        '         │                    │',
        '         │ {h:ins(0, \u0022a cat\u0022)}  {p:↑} │',
        '         └────────────────────┘',
        '',
        '         {w:before          after}',
        '{w:doc}      {h:a}│{h: cat}',
        '{d:lands}    {h:0}{d:│}{h:5678}',
        '',
        '{w:pieces}   {d:len lands at    len lands at}',
        '         {h:1   0}',
        '         {h:4   5}',
        '',
        '',
        '',
        '{w:final}    {h:a} big{h: cat}!',
        '         {d:0123456789}',
        '',
        '{w:copied}   {h:10}',
        '{w:skipped}  5',
        '',
        'Undoing the first insert takes out',
        'the rest: \u0022a\u0022 lands at 0 and \u0022 cat\u0022',
        'lands at 5–8.',
        '',
        '',
      ],
    },
  ]
  const PIECES_AUTO = { ...DIM, '│': 'd', '·': 'd', '_': 'd' }

  const WIDGETS = {
    graph: { head: [], steps: GRAPH, auto: DIM },
    linear: { head: [], steps: LINEAR, auto: DIM },
    concurrent: { head: [], steps: CONCURRENT, auto: DIM },
    shift: { head: [], steps: SHIFT, auto: DIM },
    runs: { head: [], steps: RUNS, auto: DIM },
    pieces: { head: [], steps: PIECES, auto: PIECES_AUTO },
  }
  // 7. the benchmark charts, drawn as svg in the site\u2019s own inks from compare\u2019s results: for each trace, a
  // bar per library on a log or linear scale, eg-strider in vermilion and the rest in navy and grey
  const CHART_RUNS = 100
  const CHART_TRACES = ['S1', 'S2', 'S3', 'C1', 'C2', 'A1', 'A2']
  const CHART_LIBRARIES = [
    { name: 'eg-strider (ours)', ink: 'var(--tertiary)', opacity: 1, url: 'https://github.com/jackyzha0/eg-strider' },
    { name: 'diamond-types (Eg-walker)', ink: 'var(--secondary)', opacity: 1, url: 'https://github.com/josephg/diamond-types' },
    { name: 'Yjs (yrs)', ink: 'var(--secondary)', opacity: 0.5, url: 'https://github.com/y-crdt/y-crdt' },
    { name: 'Loro', ink: 'var(--gray)', opacity: 1, url: 'https://github.com/loro-dev/loro' },
    { name: 'Automerge', ink: 'var(--gray)', opacity: 0.45, url: 'https://github.com/automerge/automerge' },
  ]
  const CHARTS = {
    merge: { title: 'Merge time', definition: 'Appending a history\u0027s ops and merging them, until the document is produced, through each library\u0027s own API.', unit: 'time', values: [ [0.9672, 2.4667, 4.6895, 16.4693, 466.1947], [1.3747, 3.373, 7.0354, 29.8882, 604.1937], [1.1327, 4.4408, 6.5177, 47.9446, 1235.8873], [5.3715, 46.2462, 49.9122, 286.1364, 625.147], [6.7429, 67.5022, 63.9566, 384.6045, 705.1487], [2.8328, 7.697, 51.2108, 107.8344, 490.3009], [6.2584, 18.5894, 25.0617, 141.4307, 411.8696] ], same: [ [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 0] ] },
    open: { title: 'Reopen time', definition: 'From a saved document\u0027s bytes until it is ready for more edits, all parsing counted. diamond-types reads its history file and a copy of the text.', unit: 'time', values: [ [0.0709, 1.5448, 6.3902, 0.2233, 166.5594], [0.0504, 2.6015, 9.2826, 0.2794, 237.856], [0.0654, 3.3012, 9.4011, 0.4182, 496.3806], [0.0625, 8.208, 8.9679, 0.4005, 190.0038], [0.0618, 13.006, 6.2047, 0.4044, 217.1002], [0.0249, 2.0954, 23.0313, 0.2925, 165.2531], [0.0763, 1.9339, 27.9164, 0.2453, 122.1702] ], same: [ [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 0] ] },
    peak: { title: 'Peak memory', definition: 'The most heap allocated while merging, the ops being merged included.', unit: 'memory', values: [ [3966352, 21689783, 8189267, 12824862, 406336551], [3343467, 15015023, 10589130, 15892270, 594930236], [5851772, 20872075, 11620406, 18332750, 1214645772], [18345926, 84465099, 55366814, 173111646, 631579159], [22880351, 99148105, 76659384, 246060346, 693364669], [5165071, 12866619, 11538053, 56580218, 407852040], [6807940, 11751406, 8286203, 148954890, 394058095] ], same: [ [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 0] ] },
    rest: { title: 'Memory at rest', definition: 'What a document holds once a merge is done, ready for more edits.', unit: 'memory', values: [ [1386294, 4407864, 7332235, 7448254, 85808709], [1856879, 6111644, 9369850, 10515662, 44428306], [3453708, 11145236, 10444678, 15282670, 24208139], [8069136, 19956404, 10558645, 118837726, 195886042], [9821767, 23944478, 7264131, 171622158, 217683475], [1955910, 5357924, 10665045, 13029890, 14090757], [1805267, 4424790, 8047687, 129118802, 48452955] ], same: [ [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 0] ] },
    size: { title: 'Snapshot size', definition: 'The size of a saved document.', unit: 'memory', values: [ [250268, 345823, 680870, 721960, 342632], [323152, 493568, 832205, 939037, 601808], [505238, 767337, 1421115, 1437621, 832488], [144213, 476377, 937187, 1250759, 119168], [166178, 685619, 777249, 1359093, 173317], [245247, 346889, 877863, 991406, 787233], [264755, 351204, 844978, 769385, 576427] ], same: [ [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 0, 1, 0] ] },
  }
  const TICKS = {
    time: [ [0.01, '0.01 ms'], [0.1, '0.1 ms'], [1, '1 ms'], [10, '10 ms'], [100, '100 ms'], [1000, '1 s'], [10000, '10 s'], [100000, '100 s'] ],
    memory: [ [0.01, '10 KiB'], [0.1, '100 KiB'], [1, '1 MiB'], [10, '10 MiB'], [100, '100 MiB'], [1000, '1 GiB'], [10000, '10 GiB'] ].map(([v, t]) => [v * 1048576, t]),
  }
  const milliseconds = (v) => (v >= 1000 ? (v / 1000).toFixed(1) + ' s' : v >= 100 ? v.toFixed(0) + ' ms' : v >= 10 ? v.toFixed(1) + ' ms' : v >= 0.1 ? v.toFixed(2) + ' ms' : v.toFixed(3) + ' ms')
  const bytes = (v) => {
    for (const [unit, size] of [ ['GiB', 1073741824], ['MiB', 1048576], ['KiB', 1024] ]) {
      if (v >= size) return (v >= 10 * size ? (v / size).toFixed(0) : (v / size).toFixed(1)) + ' ' + unit
    }
    return v + ' B'
  }
  const timesOver = (r) => (r >= 100 ? r.toFixed(0) : r >= 10 ? r.toFixed(1) : r.toFixed(2))
  const SVG_NS = 'http://www.w3.org/2000/svg'
  const svgEl = (parent, tag, attrs, style) => {
    const n = document.createElementNS(SVG_NS, tag)
    for (const k in attrs) n.setAttribute(k, attrs[k])
    if (style) Object.assign(n.style, style)
    parent.appendChild(n)
    return n
  }
  const wrapWords = (text, width) => {
    const lines = ['']
    for (const word of text.split(' ')) {
      const last = lines[lines.length - 1]
      if (last.length + word.length + 1 > width) lines.push(word)
      else lines[lines.length - 1] = last ? last + ' ' + word : word
    }
    return lines
  }
  // a linear axis runs from 0 to a round number past the largest value, with a tick every 1, 2 or 5 of its unit
  const linearAxis = (spec) => {
    const most = Math.max(...spec.values.flat().filter((v) => v))
    const units = spec.unit === 'time' ? [ ['s', 1000], ['ms', 1] ] : [ ['GiB', 1073741824], ['MiB', 1048576], ['KiB', 1024] ]
    const [unit, size] = units.find(([, size]) => most >= size) || units[units.length - 1]
    const rough = most / size / 4
    const power = Math.pow(10, Math.floor(Math.log10(rough)))
    const step = [1, 2, 5, 10].map((m) => m * power).find((s) => s >= rough)
    const count = Math.ceil(most / size / step)
    const ticks = []
    for (let i = 0; count >= i; i++) ticks.push([i * step * size, i ? +(i * step).toPrecision(4) + ' ' + unit : '0'])
    return { high: count * step * size, ticks }
  }
  const drawChart = (root, spec, lines, scale) => {
    const W = 400, LEFT = 30, RIGHT = 268, ROW = 10, GAP = 8
    const ink = (name) => 'var(--' + name + ')'
    const code = { fontFamily: 'var(--codeFont)', fill: ink('darkgray') }
    const format = spec.unit === 'time' ? milliseconds : bytes
    const top = 13 * lines + 12
    const bottom = top + CHART_TRACES.length * (CHART_LIBRARIES.length * ROW + GAP)
    const H = bottom + 18
    const svg = svgEl(root, 'svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': spec.title }, { width: '100%', display: 'block' })
    wrapWords(spec.definition, 70).forEach((line, i) => {
      svgEl(svg, 'text', { x: 0, y: 10 + 13 * i, 'font-size': 9.5 }, { fontFamily: 'var(--bodyFont)', fill: ink('gray') }).textContent = line
    })
    const gridline = (gx, width) => {
      svgEl(svg, 'line', { x1: gx.toFixed(1), y1: top - 3, x2: gx.toFixed(1), y2: bottom, 'stroke-width': width }, { stroke: ink('lightgray') })
    }
    let x, labels
    if (scale === 'log') {
      const ticks = TICKS[spec.unit]
      const origin = ticks[0][0]
      const decades = spec.values.flat().filter((v) => v).map((v) => Math.log10(v / origin))
      const low = Math.floor(Math.min(...decades)), high = Math.ceil(Math.max(...decades))
      x = (v) => LEFT + ((Math.log10(v / origin) - low) / (high - low)) * (RIGHT - LEFT)
      for (let decade = low; high > decade; decade++) {
        for (let step = 1; 10 > step; step++) gridline(x(step * Math.pow(10, decade) * origin), step === 1 ? 1 : 0.5)
      }
      labels = ticks.filter(([value]) => {
        const d = Math.round(Math.log10(value / origin))
        return d >= low ? high >= d : false
      })
    } else {
      const axis = linearAxis(spec)
      x = (v) => LEFT + (v / axis.high) * (RIGHT - LEFT)
      axis.ticks.forEach(([value]) => gridline(x(value), 1))
      labels = axis.ticks
    }
    labels.forEach(([value, label]) => {
      svgEl(svg, 'text', { x: x(value).toFixed(1), y: bottom + 13, 'font-size': 8.5, 'text-anchor': 'middle' }, { ...code, fill: ink('gray') }).textContent = label
    })
    svgEl(svg, 'line', { x1: LEFT, y1: bottom, x2: RIGHT, y2: bottom }, { stroke: ink('gray') })
    let y = top
    CHART_TRACES.forEach((trace, t) => {
      const row = spec.values[t]
      const least = Math.min(...row.filter((v) => v))
      svgEl(svg, 'text', { x: LEFT - 6, y: y + (CHART_LIBRARIES.length * ROW) / 2 + 4, 'font-size': 10.5, 'text-anchor': 'end' }, { ...code, fill: ink('dark') }).textContent = trace
      svgEl(svg, 'line', { x1: LEFT, y1: y - 1, x2: LEFT, y2: y + CHART_LIBRARIES.length * ROW }, { stroke: ink('darkgray'), strokeWidth: '1.2' })
      CHART_LIBRARIES.forEach((library, l) => {
        const value = row[l]
        if (value) {
          const end = x(value)
          svgEl(svg, 'rect', { x: LEFT, y: y, width: Math.max(end - LEFT, 1).toFixed(1), height: ROW - 2.5 }, { fill: library.ink, opacity: library.opacity })
          const label = svgEl(svg, 'text', { x: (end + 3).toFixed(1), y: y + 7.3, 'font-size': 8.8 }, code)
          label.textContent = format(value)
          if (value > least) {
            svgEl(label, 'tspan', {}, { fill: ink('gray') }).textContent = ' (' + timesOver(value / least) + '×)'
          }
        } else {
          svgEl(svg, 'text', { x: LEFT + 3, y: y + 7.3, 'font-size': 8.8 }, { ...code, fill: ink('gray') }).textContent = 'did not finish'
        }
        y += ROW
      })
      y += GAP
    })
  }
  // the five charts behind tabs styled as the diagrams’ back and next, under one legend and over one note
  const drawCharts = (root) => {
    const small = (text, style) => {
      const n = mk('div', text)
      Object.assign(n.style, { fontFamily: 'var(--codeFont)', fontSize: '0.8rem', color: 'var(--gray)' }, style)
      return n
    }
    const tabs = mk('div')
    tabs.setAttribute('role', 'tablist')
    Object.assign(tabs.style, { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1.5rem 0 0.75rem' })
    const legend = small('', { display: 'flex', flexWrap: 'wrap', gap: '0.3rem 1rem', margin: '0 0 0.75rem', color: 'var(--darkgray)' })
    CHART_LIBRARIES.forEach((library) => {
      const item = mk('a')
      item.href = library.url
      const swatch = mk('span')
      Object.assign(swatch.style, { display: 'inline-block', width: '0.65em', height: '0.65em', marginRight: '0.4em', background: library.ink, opacity: library.opacity })
      item.append(swatch, library.name)
      legend.append(item)
    })
    const panel = mk('div')
    panel.style.width = 'min(560px, 100%)'
    const specs = Object.values(CHARTS)
    const lines = Math.max(...specs.map((spec) => wrapWords(spec.definition, 70).length))
    const cards = specs.map(() => {
      const card = mk('div')
      card.setAttribute('role', 'tabpanel')
      panel.append(card)
      return card
    })
    // the chosen button filled as an enabled one is, the rest greyed as a disabled one, but still clickable
    const fill = (buttons, i, state) => {
      buttons.forEach((b, j) => {
        const open = j === i
        b.style.color = open ? 'var(--light)' : 'var(--darkgray)'
        b.style.backgroundColor = open ? 'var(--dark)' : 'var(--lightgray)'
        b.style.cursor = open ? 'default' : 'pointer'
        b.setAttribute(state, open ? 'true' : 'false')
      })
    }
    const button = (text, size, onClick) => {
      const b = textButton(text)
      b.style.fontFamily = 'var(--codeFont)'
      b.style.fontSize = size
      b.addEventListener('click', onClick)
      return b
    }
    const buttons = specs.map((spec, i) => {
      const b = button(spec.title, '0.85rem', () => pick(i))
      b.setAttribute('role', 'tab')
      tabs.append(b)
      return b
    })
    const pick = (i) => {
      cards.forEach((card, j) => {
        card.style.display = j === i ? 'block' : 'none'
      })
      fill(buttons, i, 'aria-selected')
    }
    // log or linear under the charts, every chart redrawn on the scale picked
    const SCALES = ['log', 'linear']
    const foot = small('', { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0 1.5rem' })
    const scales = SCALES.map((name, i) => {
      const b = button(name, '0.8rem', () => pickScale(i))
      foot.append(b)
      return b
    })
    foot.append(mk('span', 'Median of ' + CHART_RUNS + ' runs, less is better.'))
    const pickScale = (i) => {
      cards.forEach((card, j) => {
        card.textContent = ''
        drawChart(card, specs[j], lines, SCALES[i])
      })
      fill(scales, i, 'aria-pressed')
    }
    pickScale(0)
    pick(0)
    root.append(tabs, legend, panel, foot)
  }

  const init = () => {
    document.querySelectorAll('.egs-diagram').forEach((root) => {
      const widget = WIDGETS[root.dataset.egs]
      if (!widget) return
      if (root.dataset.mounted) return
      root.dataset.mounted = '1'
      stepper(root, widget)
    })
    document.querySelectorAll('.egs-charts').forEach((root) => {
      if (root.dataset.mounted) return
      root.dataset.mounted = '1'
      drawCharts(root)
    })
  }
  // on a narrow screen a diagram nested in the outline is pulled out to the article’s left edge and full
  // width, so that its 38 columns fit and a chart’s text stays readable
  const fitAll = () => {
    document.querySelectorAll('.egs-diagram, .egs-charts').forEach((root) => {
      root.style.marginLeft = ''
      root.style.width = ''
      const article = root.closest('article')
      if (!article) return
      if (article.clientWidth >= 560) return
      const shift = root.getBoundingClientRect().left - article.getBoundingClientRect().left
      if (shift > 0) {
        root.style.marginLeft = -shift + 'px'
        root.style.width = article.clientWidth + 'px'
      }
    })
  }
  const mount = () => {
    init()
    fitAll()
  }
  document.addEventListener('nav', mount)
  window.addEventListener('resize', fitAll)
  if (document.readyState !== 'loading') mount()
})()
</script>
