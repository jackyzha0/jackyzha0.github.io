---
title: "CodeMirror and ProseMirror"
date: 2023-06-15
tags:
  - seed
aliases:
  - ProseMirror
---

[Source](https://codemirror.net/docs/guide/)

An extensible and fast rope-based code/prose editor component for the web.

## Functional Core, Imperative Shell

To resolve this contradiction, the library's state representation is strictly functional—the document and state data structures are immutable, and operations on them are pure functions, whereas the view component and command interface wrap these in an imperative interface

**It also means that directly changing a state value, or writing extensions like additional state fields in an imperative way will not do what you'd hope (and probably just break things).**

## Document Changes

Document changes are themselves values, describing precisely which ranges of the old document are being replaced by which bits of new text. This allows extensions to track precisely what happens to the document, allowing things like an undo history and collaborative editing to be implemented outside the library core

When creating a change set, all changes are described in terms of the original document—they conceptually all happen at once. If you really need to combine lists of changes where later changes refer to the document created by earlier ones, you can use the change set [`compose`](https://codemirror.net/docs/ref/#state.ChangeSet.compose) method

### Offsets

CodeMirror uses plain numbers to address positions in the document. These represent character counts—more precisely, they count UTF16 code units (so astral characters count as two units)

Line breaks *always* count as a single unit.

It is sometimes necessary to figure out where a position in a start document ends up in a changed document. For this purpose, the library provides a position mapping feature, which, given a transaction (or just a change set) and a start position, can give you the corresponding new position.

This is similar to [[thoughts/Operational Transform#Position Mapping|position mapping in OT]]

### Selections

Overlapping ranges are automatically merged, and ranges are sorted, so that a selection's ranges property always holds a sorted, non-overlapping array of ranges

## CRDTs

[Source](https://marijnhaverbeke.nl/blog/collaborative-editing.html)

`dmonad` (creator of Yjs) on a ProseMirror plugin for Yjs:

> Mapping a CRDT to a ProseMirror document is not always possible, because ProseMirror has a schema that the document needs to comply to. E.g. given a `blockquote` that must have at least one child. If `client1` deletes the first child, and `client2` concurrently deletes the second child, you may end up with a `blockquote` without children (well, that depends on the CRDT). In this case I simply delete the node that does not comply with the schema anymore.

Enforcing that a CRDT complies to a schema might be impossible without an inordinate amount of bookkeeping. But something you could try is to create a *view* on the data that complies to the schema. For example, if a blockquote does not have any children, ignore it.

"For doing offline work (where you keep editing when not connected) or for a branching type of work flow, where you do a bunch of work and *then* merge it with whatever other people have done in the meantime, the model I described here is useless (as is OT)."
