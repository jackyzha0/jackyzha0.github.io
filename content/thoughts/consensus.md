---
title: "Consensus"
date: 2021-08-09T21:41:42-04:00
tags:
- sapling
---

Consensus in human systems is actually usually pretty easy because of the social layer of society. This [fault tolerance](thoughts/fault%20tolerance.md) against 51% attacks is due to the fact that convincing the community that any engineered 'truth' is the real on requires subverting every trusted member in the community, most notably media and news sources (also why systems of authoritarian power are so scary). 

A difficult problem for [governance](thoughts/governance.md) within [communities](thoughts/communities.md)

Note that this is inherently *different* from collaboration methods like [[thoughts/CRDT|CRDTs]]. Collaboration involves keeping *all* edits and merging them. Consensus involves picking one of several proposed values and agreeing on it.

Example applications include: [[thoughts/State Machine Replication (SMR)|SMR]], [[thoughts/Byzantine Agreement|Byzantine Agreement]]

## Consensus and Humming in the IETF
[Source: IETF](https://datatracker.ietf.org/doc/html/rfc7282)

On rough consensus
- Humming as 'temp checks' for people to voice disagreement but default assumption is optimistic trust
- "While counting heads might give a good guess as to what the rough consensus will be, doing so can allow important minority views to get lost in the noise. One of the strengths of a consensus model is that minority views are addressed, and using a rough consensus model should not take away from that."
- "We can't know who the "members" of any given working group would be at any one time, and we certainly can't know who all of the "members" of the IETF would be: That's why we refer to "participants" in the IETF; the IETF doesn't really have "members". Indeed, we often recruit additional implementers and other experts into working groups in order to ensure that broader views are brought into the discussion. So, voting is simply not practical."

## Algorithmic Consensus
There are four requirements to such an algorithm:

1. Validity. The result must be a value that was submitted by at least one of the processes. The consensus algorithm cannot just make up a value.
2. Uniform agreement. All nodes must select the same value.
3. Integrity. A node can select only a single value. That is, a node cannot announce one outcome and later change its mind.
4. Termination. Also known as progress, every node must eventually reach a decision.

There are two main protocol paradigms for achieving consensus in the presence of Byzantine nodes:
1. Classic [[thoughts/Byzantine Faults|BFT]] protocols: typically uses two voting rounds to ensure [[thoughts/consistency|consistency]]
	1. One phase to guarantee proposal uniqueness using a quorum certificate of $n-f$ votes
	2. The other phase is to convince replicas that the leader is safe to propose new entries
	3. Examples include: [[thoughts/Tendermint|Tendermint]], [[thoughts/Tangaroa|Tangaroa]], [[thoughts/HotStuff|HotStuff]], [[thoughts/PBFT|PBFT]]
2. [[thoughts/longest-chain consensus|Longest-chain consensus]]
	1. Examples include: most consensus mechanisms for cryptocurrencies like [[thoughts/bitcoin|Bitcoin]], [[thoughts/ethereum|Ethereum]]

| |Classic BFT|Longest-chain Consensus|
|--|--|--|
|Safety/Liveness tradeoff|Favours [safety](/thoughts/safety) in the face of an attack|Favour [liveness](/thoughts/liveness) in the face of an attack|
|Finality|Instant and deterministic|Probabilistic (at risk of potentially large chain reorganizations and double-spend attacks)|
|Fork behaviour|Rare but difficult to recover from|Embrace forks, uses in-protocol methods for resolving ambiguity as to which fork is correct|
|[FLP Result](/thoughts/FLP%20Result) Behaviour|sacrifice either liveness or consistency in the face of an attack (assuming <33% Byzantine as per FLP Result)|Does not apply as longest-chain consensus is non-deterministic|

### Comparisons between different BFT SMR protocols
All protocols are of the following:
1.  protocols for [[thoughts/Byzantine Faults|byzantine fault-tolerant]] [[thoughts/State Machine Replication (SMR)|SMR]]
2.  All work in the partially synchronous [[thoughts/system model|system model]] and obtain safety (always) and liveness (after GST) in the face of an adversary that controls $f$ replicas out of a total of $n=3f+1$ replicas (per [[thoughts/FLP Result|FLP Result]])
3.  All these protocols are based on the classic leader-based primary-backup approach where leaders are replaced in a _view-change_ (or election to use [[thoughts/Raft Consensus Algorithm|Raft]] terminology) protocol.

Below is a comparison of a few top protocols and their tradeoffs

| |Best-case Latency (rounds)|Normal-case Communication|View-change Communication|Leader Rotation|
|--|--|--|--|--|
|[PBFT](/thoughts/PBFT)|2|$O(n^2)$|$O(n^2)$|On suspected fault|
|[Tendermint](/thoughts/Tendermint)|2|$O(n)$|$O(n)$|Every round|
|[SBFT](/thoughts/SBFT)|1|$O(n)$|$O(n^2)$|On suspected fault|
|[HotStuff](/thoughts/HotStuff)|3|$O(n)$|$O(n)$|Every round|

Leader rotation tradeoff:
- maintaining a stable leader means less overhead and better performance due to stability when the leader is honest and trusted
- constantly rotating the leader provides a stronger fairness guarantee against stable malicious leaders

### Pipelining
In [[thoughts/PBFT|PBFT]] and [[thoughts/SBFT|SBFT]], the leader maintains a _window_ of open slots and is allowed to concurrently work on committing all open slots in his active window. Conceptually, this is like [[thoughts/TCP|TCP]] where a sender does not have to wait for the ACK of packet $i$ before sending message $i+1$. This window can *significantly increase throughput* by allowing the leader to concurrently coordinate several actions of slot commitments.