---
title: "Antimatter"
date: 2023-02-05
tags:
  - seed
---

[Source](https://braid.org/antimatter)

A [[thoughts/CRDT|CRDT]] + [[thoughts/Operational Transform|OT]] text editing algorithm with history pruning (read: GC). Permissionless [[thoughts/system model]].

## Components

- Acknowledgements: require all peers to have acknowledged up to a certain point, then we can bloop
- Blooping: collapsing history. This is kind of like span-merging which [[thoughts/Yjs]] implements
  - When we get acknowledgement from all peers up to a certain point, we can then 'bloop'/flatten all history that is not used in producing the current state
  - ![[thoughts/images/antimatter-bloop.png|400]]
- Fissures: keeps track of disconnections and network partitions
  - During a fissure/disconnect, all events concurrent with that disconnect are marked to prevent from being blooped
