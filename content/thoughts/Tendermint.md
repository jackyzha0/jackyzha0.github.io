---
title: "Tendermint"
date: 2022-07-03
tags:
- seed
---

Authored by Buchman, Kwon, Milosevic in 2018, stabilized in 2019.

A [[thoughts/consensus#State Machine Replication|state machine replication]] protocol that, when $f < \frac n 3$, satisfies always [[thoughts/consistency|consistency]] and eventually satisfies [[thoughts/liveness|liveness]] (under the presence of an attack)

High-level ideas:
1. Iterated single-shot consensus (something that looks like [[thoughts/consensus#Byzantine Agreement|Byzantine Agreement]]) where the output of each single-shot consensus instance outputs a block (ordered list of transactions)
	- Each node maintains it's own height (which block it is currently working on) and ignores all messages about other heights
2. For a fixed height, keep proposing + voting until agreement is reached
3. Two stages of voting as different nodes may see different voting schemes

We assume [[thoughts/Public-key Infrastructure|PKI]] and a shared global [[thoughts/clocks|clock]]. A round is $4 \Delta$ timesteps, leaders are rotated once per round.

Quorum certificate (QC) Lemma: a collection of a supermajority ($\geq \frac 2 3$) of votes for a block $B$ in a particular round at some height $h$ and some stage $s$. Any two QCs overlap in at least one honest node as $overlap \geq n - \frac 1 3 n - \frac 1 3 n > f$ and thus any two QCs must support the same block $B$.

Each node maintains a ($B_i$, $QC_i$) and periodically updates these variables block-QC pair it's heard about.

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
4. $t = 4\Delta + 3 \Delta$:
	1. if node $i$ receives $\geq \frac 2 3 n$ round-$r$ stage-2 votes for block $B$,
		1. set $QC_i := QC_\textrm{assembed}$, $B_i := B$
		2. commit $B$ to local history
		3. broadcast $(B_i, QC_i)$ signed by $i$
	2. else, do nothing
5. $t = 4 \Delta + 4 \Delta$ (just before round $r + 1$):
	1. If we have heard of a stage-2 QC for block $h_i$ supporting block B
		1. commit $B$ to local history
	2. else, do nothing

In the background,
- All honest nodes store all QCs received for future blocks $h_i + 1, h_i + 2, \dots$

## Proof of consistency
Definition of [[thoughts/consistency|consistency]]: For a given block number, all honest nodes commit the same block.

Proof:
1. Fix a height $h$.
2. Let $r$ be the first round in which $> \frac n 3$ honest nodes (set $S$) cast stage-2 votes for some block $B^*$. $r$ is the first round in which a stage-2 QC could have been created.
3. 

## Proof of liveness
