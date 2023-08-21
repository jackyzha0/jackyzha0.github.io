---
title: "Upwelling"
date: 2023-04-10
tags:
  - seed
---

[Source](https://www.inkandswitch.com/upwelling/)

- [[thoughts/Fishbowl effect|Fishbowl effect]] of real-time [[thoughts/collaborative software]]
- File-based collaboration creates problems of versioning and merging edits from different co-authors.
- Versioning in file-based collaboration does not suffer from the fishbowl effect. They work well for people writing alone, but have the downside of requiring manual version management when collaborating with others.
- Reviewing changes
  - Carefully reviewing a document is important in many professional contexts, but existing software makes it difficult to visualize and review the changes that have been made to a document.
- Layers and drafts
  - An Upwelling document is always edited within a layer. We call unmerged layers “drafts”.
  - An Upwelling document can have multiple drafts at the same time, all of which are separate from each other: edits made in one draft do not appear in other drafts. As such, a writer who needs a private space can create a new draft and work there in solitude.
  - When the draft is ready, it is merged onto the stack: ![[thoughts/images/upwell-merge.png]]
  - The stack captures the full editing history of the document, starting from the moment it was created as an empty document, and each merged layer represents a batch of changes relative to the previous (lower) layer.
  - All drafts *float* on top of the stack of merged layers; when one draft is merged, all other drafts are updated to include the changes in the merged layer. Using a Git analogy, every time a branch is merged into main, all other branches are automatically *rebased* on top of the latest main: ![[thoughts/images/floating-draft.png]]
