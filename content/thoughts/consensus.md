---
title: "Consensus"
date: 2021-08-09T21:41:42-04:00
tags:
- sapling
---

Consensus in human systems is actually usually pretty easy because of the social layer of society. This [fault tolerance](thoughts/fault%20tolerance.md) against 51% attacks is due to the fact that convincing the community that any engineered 'truth' is the real on requires subverting every trusted member in the community, most notably media and news sources (also why systems of authoritarian power are so scary). 

A difficult problem for [governance](thoughts/governance.md) within [communities](thoughts/communities.md)

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

See also: [[thoughts/33% Impossibility Result|33% Impossibility Result]]

### Total order broadcast
> Consensus is traditionally formulated as several nodes needing to come to an agreement about a single value. Consensus in the context of [[thoughts/message broadcast#Total order broadcast|total order broadcast]] is on *what the next message to deliver is*

One way to do it is using a single leader, but what happens if the leader crashes/becomes unavailable? Manual failover: human operator chooses a new leader and reconfigures each node to use new leader, but this is non-ideal.

- Common consensus algorithms (all assume partially synchronous, crash-recovery [[thoughts/system model|system model]])
	- Paxos: single-value consensus
	- Multi-Paxos: generalization to [[thoughts/message broadcast#Total order broadcast|total order broadcast]]
	- [[thoughts/Raft Consensus Algorithm|Raft]], Viewstamped Replication, Zab: [[thoughts/message broadcast#Total order broadcast|total order broadcast]] by default
- Blockchain consensus models assume partially synchronous Byzantine [[thoughts/system model|system model]]

[[thoughts/FLP Result|FLP Result]] states that these consensus algorithms cannot assume an *asynchronous* [[thoughts/system model|system model]] without giving up either [[thoughts/safety|safety]] or [[thoughts/liveness|liveness]].

### State Machine Replication
A subset of the algorithmic consensus problem about agreeing on the same state

1. Consistency: all notes agree on the same history
2. [[thoughts/liveness|Liveness]]: every transaction submitted eventually added to all node's histories

SMR can be reduced to [[thoughts/Byzantine Broadcast|BB]]

### Byzantine Agreement
Differs from [[thoughts/Byzantine Broadcast|Byzantine Broadcast]]

Every node has a private input, there is no distinguished sender. 

All non-Byzantine nodes need to agree on a single common value.