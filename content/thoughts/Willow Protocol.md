---
title: Willow Protocol
date: 2024-02-02
tags:
  - seed
---
[Source](https://willowprotocol.org/)

A protocol for peer-to-peer data stores.

- We made Willow to make running a network _together_ a sustainable practice.
- We made Willow to reconcile peer-to-peer networks with social realities. Wrangling the complexity of distributed systems shouldn’t mean we trade away basic features like deletion, or accept data structures which can only grow without limit.

### Properties
- As many of these stores as you want, keyed to different namespaces. When stores from different devices belong to the same namespace, they deterministically sync with each other.
- Private and end-to-end encrypted. Other users can't find out what you’re interested in unless they already know about it themselves.
- Total [[thoughts/deletion|delete]] via prefix pruning (essentially cutting a tree of causal dependencies by trimming down to root and marking that with a single tombstone). Destructive edits. When you update a value, the old values and associated metadata are overwritten.
- Fine grained [[thoughts/access control|access control]]. Restrict read and write access by semantically meaningful ranges of data, or time range.
- Peers can communicate resource budgets, so devices with very limited memory can sync too.