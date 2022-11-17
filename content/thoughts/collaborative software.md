---
title: "Collaborative software"
date: 2022-05-05
tags:
- seed
---

Each user device has a local replica of the data and this local replica can be updated anytime (ideally even while offline), and re-sync with others when network is available
Challenge: how do we reconcile concurrent updates?

Two main families of algorithms
- Conflict-free Replicated Data Types ([[thoughts/CRDT|CRDTs]])
- Operational Transformation

## A spectrum
[Source](https://publish.obsidian.md/jessmartin/Collaboration+is+a+spectrum+from+asynchronous+to+fully+synchronous)

-   full async - no collaboration ever - has to be completely disconnected
-   async branching - git flow, working in parallel universes temporarily, then merging back together
-   peripheral awareness - working in the same space while working separately (parallel play)
-   fully sync - pair programming  

When we're collaborating with others, there's a natural human tendency to desire some privacy while working through something, the freedom to take a piece of the creative work and play out different ideas, move things around, edit and refactor, without fear of judgement or the burden of having to explain or communicate our thinking or concern for overhauling sections where another is actively reading or working.

How do we make private 'forking' really easy and seamless?