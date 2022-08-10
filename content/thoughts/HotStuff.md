---
title: "HotStuff"
date: 2022-08-09
tags:
- seed
---

> A [[thoughts/Byzantine Faults|byzantine fault-tolerant]] [[thoughts/State Machine Replication (SMR)|state machine replication]] protocol for the partially synchronous [[thoughts/system model|system model]]. It can express other known protocols (e.g. [[thoughts/PBFT|PBFT]], [[thoughts/Tendermint|Tendermint]], [[thoughts/Casper FFG|Casper FFG]]) in this common framework.

[Source Paper](https://arxiv.org/pdf/1803.05069.pdf)

## The Scaling Challenge
Original BFT SMR protocol were designed with a typical target system size of $n = 5$ or $n = 7$ for local-area deployments. As such, they don't scale well to high $n$ as required by permissioned and permissionless [[thoughts/blockchain|blockchains]]. 

HotStuff aims to overcome this by improving the bound of total number of authenticators communicated from $O(n^4)$ to $O(n^2)$

The first BFT SMR protocol with the following properties:
1. **Linear view change:** After GST, any correct leader, once designated, sends only $O(n)$ authenticators to drive a consensus decision in the best-case. In the worst-case, communication costs to reach consensus after GST is $O(n^2)$ authenticators in the worst case of cascading leader failures
2. **Optimistic Responsiveness**: : After GST, any correct leader, once designated, needs to wait just for the first $n − f$ responses to guarantee that it can create a proposal that will make progress

HotStuff does this by adding another phase to each view, with the assumption that the network delay is less than the $\Delta$ required to wait for GST.