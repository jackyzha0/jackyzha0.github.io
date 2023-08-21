---
title: "Tendermint"
date: 2022-07-03
tags:
  - seed
---

> Tendermint is most useful as an analog of Paxos/[[thoughts/Raft Consensus Algorithm|Raft]] but in a multi-stakeholder, or otherwise more adversarial, setting. However, the performance may not be as high due to the overhead of cryptographic operations

[Source Paper](https://tendermint.com/static/docs/tendermint.pdf), authored by Buchman, Kwon, Milosevic in 2018, stabilized in 2019.

A [[thoughts/consensus#State Machine Replication|state machine replication]] protocol with a partially synchronous [[thoughts/system model|system model]] that, when $f < \frac n 3$, satisfies always [[thoughts/consistency|consistency]] and eventually satisfies [[thoughts/liveness|liveness]] (under the presence of an attack). However, the time to obtain a supermajority increases linearly with the number of nodes in the network.[^1]

[^1]: "There is a practical limit to how decentralized a blockchain with [[thoughts/PBFT|PBFT]]-based consensus can be. For instance, most Tendermint based blockchains only have 100-150 validators; this is done to strike a balance between time to finality and decentralization" (from Scott's _[Guide to Finality](https://www.smsunarto.com/blog/guide-to-finality)_)

High-level ideas:

1. Iterated single-shot consensus (something that looks like [[thoughts/consensus#Byzantine Agreement|Byzantine Agreement]]) where the output of each single-shot consensus instance outputs a block (ordered list of transactions)
2. For a fixed height, keep proposing + voting until agreement is reached
3. Two stages of voting as different nodes may see different voting schemes

We assume [[thoughts/Public-key Infrastructure|PKI]] and a shared global [[thoughts/clocks|clock]]. A round is $4 \Delta$ timesteps, leaders are rotated once per round.

## Properties

### Quorum Certificate (QC) Lemma

A collection of a supermajority ($\geq \frac 2 3$) of votes for a block $B$ in a particular round at some height $h$ and some stage $s$. Any two QCs overlap in at least one honest node as $overlap \geq n - \frac 1 3 n - \frac 1 3 n > f$ and thus any two QCs must support the same block $B$.

![[thoughts/images/tendermint proof of consistency.png]]

### State

- Each node maintains a ($B_i$, $QC_i$) and periodically updates these variables block-QC pair it's heard about
- Each node also keeps a local append-only data structure for blocks considered 'delivered'
- Each node maintains it's own height (which block it is currently working on) and ignores all messages about other heights

## Pseudocode

Assume a specific height $h$ and round $r$ with leader $l$. We split each round into 4 phases ($t = 4 \Delta r$).

1. $t = 4 \Delta r$:
   1. $l$ updates $(B_l,QC_l)$ to most recent QC known
   2. broadcast $(B_l, Q_l)$ signed by $l$ to all other nodes
2. $t = 4\Delta r + \Delta$:
   1. honest node $i$ will ignore the proposal if it seems out of date ($QC_l$ seems behind $QC_i$)
   2. if node $i$ receives $(B_l, QC_l)$ from $l$ and it is up to date
      1. broadcast first-stage vote for $vote_1(B_l)$
      2. update $(B_i, Q_i) := (B_l, Q_l)$
      3. broadcast $(B_l, Q_l)$ signed by $i$
   3. else, do nothing
3. $t = 4 \Delta r + 2\Delta$:
   1. if node $i$ receives $\geq \frac 2 3 n$ round-$r$ stage-1 votes (supermajority) for block $B$,
      1. if this occurs, all possible QCs must all support the same block (by QC overlap property)
      2. assemble QC from supermajority of votes
      3. set $QC_i := QC_\textrm{assembed}$, $B_i := B$
      4. after witnessing a conclusive winner to the first stage, we broadcast second stage vote for $vote_2(B_i)$
      5. broadcast $(B_i, QC_i)$ signed by $i$
   2. else, do nothing
4. $t = 4\Delta r + 3 \Delta$:
   1. if node $i$ receives $\geq \frac 2 3 n$ round-$r$ stage-2 votes for block $B$,
      1. set $QC_i := QC_\textrm{assembed}$, $B_i := B$
      2. commit $B$ to local history
      3. broadcast $(B_i, QC_i)$ signed by $i$
      4. increment $h_i$, re-initialize $B_i$ and $QC_i$ to null
   2. else, do nothing
5. $t = 4 \Delta r + 4 \Delta$ (just before round $r + 1$):
   1. If we have heard of a stage-2 QC for block $h_i$ supporting block B
      1. commit $B$ to local history
   2. else, do nothing

In the background,

- All honest nodes store all QCs received for future blocks $h_i + 1, h_i + 2, \dots$

## Proof of consistency

Definition of [[thoughts/consistency|consistency]]: For a given block number, all honest nodes commit the same block $B^*$.

This seems pretty obvious from the QC lemma but we can formalize this through proof by induction:

Assumptions

1. Fix a height $h$.
2. Let $r$ be the first round in which $> \frac n 3$ honest nodes (set $S$) cast stage-2 votes for some block $B^*$. $r$ is the first round in which a stage-2 QC could have been created.

Induction: at the end of round $r$

- we know $B_i = B^*$, $\forall i \in S$
- current $QC_i$ is from round-$r$ stage-1 or later
- all QCs for other blocks are from round $r - 1$ or earlier

These properties remain to be held in round $r + 1$ given they hold in round $r$ as no nodes of $S$ change their mind.

## Proof of liveness

Definition of [[thoughts/liveness|liveness]]: if a transaction $T$ is known by all honest nodes, then it will get added to all of their local histories.

Note: this is a weaker definition of liveness than usual for [[thoughts/State Machine Replication (SMR)|SMR]] which states that if a single honest node knows about a transaction, then all honest nodes will eventually add that transaction to their local histories.

We define a **clean** round when

1. we are post-GST
2. there is an honest leader
3. all honest nodes are working on the same block number

Proofs:

- Fast forward to pair of $r_1$, $r_2$ consecutive rounds after $GST + \Delta$ with honest leaders $l_1$, $l_2$ (this must be true for $f < \frac n 3$)
- Lemma: at the start of round $r_1$, every honest node is working on either block $h$ or $h+1$
  - True because of the broadcast of a stage-2 QC at the end of $t = 4\Delta (r - 1) + 3 \Delta$, and all nodes should pick this up by $t = 4 \Delta r + 3 \Delta$ and be working on at least $h$
  - Nodes could possibly be split between working on $h$ and $h + 1$ if a Byzantine node keeps secret a stage-2 QC for $h$ and selectively forward it to honest nodes.
- Lemma: if there is a clean round, all honest nodes commit the block proposed by the leader
  - By part 2 in assumption of clean round, after the update in the first phase, the leader's QC is at least as recent as any other honest nodes.
  - As we are post-GST, vote request will arrive at each node for $4 \Delta r + \Delta$ where they all broadcast stage-1 votes for $B_l$ and have their local variable updated.
  - Nodes assemble super majority for $B_l$ and can create a QC... same argument for stage-2 votes
  - All nodes then commit $B_l$ to their local history
