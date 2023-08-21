---
title: "Linearizability"
date: 2023-04-03
tags:
  - seed
---

Defined as consistency in the face of concurrent reads/writes.

Informally: every operation takes effect atomically sometime after it started and before it finished. All operations behave as if executed on a _single copy of the data_

Not to be confused with serializability: transactions having the same effect as if they were run in some serial order. Also contrasting with [[thoughts/causality|causal]] relationships, linearizability is defined in terms of real-time whereas [[thoughts/causality|causal]] is defined in terms of message sending and receiving.

The consequence/desired property of linearizability is that every operation returns an "up-to-date" value, sometimes called "strong consistency"

We can guarantee linearizability of get (quorum read + read repair) and set (blind write to quorum). If events overlap, either order could happen and is ok.

Not without downsides

- Performance costs: lots of messages and waiting for responses
- Scalability limits: leader can be a bottleneck
- Availability problems: if you can't contact a quorum of nodes, you can't process any operations
