---
title: "Operational Transform"
date: 2023-04-10
tags:
- seed
aliases:
- OT
---

[Source](https://marijnhaverbeke.nl/blog/collaborative-editing.html)

It defines a way to describe changes that has two properties:

1.  You can transform changes relative to other changes. So if user A inserted an “O” at offset 1, and user B concurrently inserted a “T” at offset 10, user A can transform B's change relative to its own change, an insert the “T” at offset 11, because an extra character was added in front of the change's offset.
2.  No matter in which order concurrent changes are applied, you end up with the same document. This allows A to transform B's change relative to its own change, and B to transform A's change similarly, without the two users ending up with different documents.

An Operational Transformation (OT) based system applies local changes to the local document immediately, and broadcasts them to other users

In its simplest form, a _transformation function_ that takes two changes A and B, which both apply to the same document, and produces a new pair Aᴮ (a version of A that applies to the document produced by B) and Bᴬ (B but applies to the document created by A), such that A + Bᴬ and B + Aᴮ (where + indicates change composition) produce the same document.

```
    Docˢ
 A ↙   ↘ B
Docᴬ    Docᴮ
Bᴬ ↘   ↙ Aᴮ
    Docᴬᴮ
```

## Position Mapping
Something that comes up quite a lot in an editor is the need to transform a document position in an original document into a corresponding position in the changed document. If text is inserted somewhere before the selection, the selection should move forward with the surrounding text. Some OT systems call this “cursor transformation”, but it also applies to things like ranges of collapsed code, lint warnings, breakpoint markers, and so on.