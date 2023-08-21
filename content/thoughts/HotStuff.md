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

HotStuff aims to overcome this by improving the bound of total number of [[thoughts/authenticator complexity|authenticators]] communicated from $O(n^4)$ to $O(n^2)$

The first BFT SMR protocol with the following properties:

1. **Linear view change:** After GST, any correct leader, once designated, sends only $O(n)$ authenticators to drive a consensus decision in the best-case. In the worst-case, communication costs to reach consensus after GST is $O(n^2)$ authenticators in the worst case of cascading leader failures
2. **Optimistic Responsiveness**: After GST, any correct leader, once designated, needs to wait just for the first $n − f$ responses to guarantee that it can create a proposal that will make progress

HotStuff does this by adding another phase to each view, with the assumption that the network delay is less than the $\Delta$ required to wait for GST. This solves the hidden QC problem.

> If a leader doesn't wait for the $\Delta$ expiration time of a round. Simply receiving $n-f$ replies from participants (up to $f$ of which may be Byzantine) is not sufficient to ensure that the leader gets to see the highest QC

Such an impatient leader may propose a lower QC value than what is accepted and this may lead to a liveness violation. In order not to wait the maximum Δ expiration time of a round, HotStuff introduces another round, Pre-commit, before the actual Commit round.

Both [[thoughts/Casper FFG|Casper]] and [[thoughts/Tendermint|Tendermint]] wait the full $\Delta$ period instead of incurring the cost of a new round.

## Cryptographic Primitives

Uses [[thoughts/digital signatures|thresholded signatures]] with a threshold of $k = 2f+1$

## Three-phase Protocol

HotStuff is a view-based protocol. Each view $v$ has a unique leader known to all. Each replicas has a tree of pending commands (as opposed to a list used by more classical [[thoughts/Byzantine Faults|BFT]] protocols).

During the protocol, a monotonically growing branch becomes committed. To become committed, the leader of a particular view proposing the branch must collect votes from a quorum of $(n − f)$ replicas (the QC) in three phases: prepare, pre-commit, and commit.

## Chained HotStuff

Note that each of the three-phases have very similar structure and that the protocol isn't doing "useful" work except collecting votes from replicas. To optimize this, we can pipeline the phases, similar to what [[thoughts/Casper FFG|Casper FFG]] does.

![[thoughts/images/chained-hotstuff.png]]

### Commit Rule

HotStuff uses the concept of chains which maps nicely onto Chained HotStuff.

The decision when a block is considered committed rests purely on a simple graph structure, a three-chain.

![[thoughts/images/hotstuff-3-chain.png]]

The three-chain commit rule provides the following guarantee.

1. The first link (corresponding to prepare) in the chain `QC|B' -> QC|B` guarantees $n-f$ votes on a unique block `B`.
2. The second link (corresponding to pre-commit) in the chain `QC|B'' -> QC|B'` guarantees $n-f$ replicas have a QC on a unique block.
3. The last link (corresponding to commit) `QC|B''' -> QC|B''` guarantees that $n-f$ replicas have the highest QC of any two-chain that has a vote.
