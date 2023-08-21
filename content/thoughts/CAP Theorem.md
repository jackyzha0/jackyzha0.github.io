---
title: "CAP Theorem"
date: 2022-04-26
tags:
  - seed
---

CAP theorem states that when designing and deploying applications in distributed environments, you can only optimize for 2 out of the following 3 properties:

1. [[thoughts/consistency|Consistency]]: a system operates fully or not at all, all nodes agree (the system's behaviour is indistinguishable from a centralized system)
2. Availability: system is always able to answer a request
3. Partition Tolerance: if data is distributed and some nodes fail, the whole system can continue to function

One way to illustrate this is to imagine a set of clusters trying to agree on a value. There is a network partition between two groups of nodes in the cluster called A and B. They all initially have a value `x = 0`. A client ever issues a command `x = 1` to a node `i` in A and sometime in the future, a client issues another command `return x`.

1. If node `i` ever returns 1, this violates consistency as B cannot have heard of the update from A.
2. If it only ever answers 0, this violates availability as `x = 1` was never appropriately set.

ACID vs BASE

- ACID stands for atomicity, consistency, isolation, durability
  - Prioritizes C and A
  - Immediate consistency limits scale-out performance
- BASE stands for basically available, soft state, eventual consistency
  - Prioritizes A and P
  - Scale-out performance is greatly enhanced
  - Fine when nature of the data can tolerate some imprecision in query results
