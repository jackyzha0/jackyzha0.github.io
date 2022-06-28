---
title: "Consistency"
date: 2022-05-05
tags:
- seed
aliases:
- linearizability
---

## Definitions
### ACID Consistency
The state satisfies application-specific invariants (e.g. every course with students enrolled must have at least one lecturer) at any given point in time

### Replication Consistency
Many models to choose from! Most common being read-after-write consistency

Imagine a scenario where
- Client writes to servers A and B but request to A fails (so only B has correct state)
- Client reads from servers A and B but request to B fails (so only client gets A's incorrect state)

Clearly, client is getting inconsistent results. We can fix this via a **[[thoughts/quorum|quorum]] read.**

## Atomic Commitment Problem
Big problem with distributed transactions: atomic commitment problem
- Either all nodes must commit or all must abort
- If any node crashes, all must abort

Usually done through two-phase commit (2PC)
- Client begins a transaction with database nodes A and B
- When done, the client *commits* the transaction with the coordinator
- Coordinator tells both A and B to prepare for the commit
- If both A and B think it is fine for them to commit, then coordinator tells both to commit (A and B cannot go back on their response to prepare, if they said they are prepared for the commit they must commit when the coordinator tells them to)

But what if the coordinator crashes? The algorithm is blocked until coordinator recovers. We can use a fault-tolerant two-phase commit (uses [[thoughts/message broadcast#Total order broadcast|total order broadcast]])

## Linearizability
Defined as consistency in the face of concurrent reads/writes.

Informally: every operation takes effect atomically sometime after it started and before it finished. All operations behave as if executed on a *single copy of the data*

Not to be confused with serializability: transactions having the same effect as if they were run in some serial order. Also contrasting with [[thoughts/causality|causal]] relationships, linearizability is defined in terms of real-time whereas [[thoughts/causality|causal]] is defined in terms of message sending and receiving.

The consequence/desired property of linearizability is that every operation returns an "up-to-date" value, sometimes called "strong consistency"

We can guarantee linearizability of get (quorum read + read repair) and set (blind write to quorum). If events overlap, either order could happen and is ok.

Not without downsides
- Performance costs: lots of messages and waiting for responses
- Scalability limits: leader can be a bottleneck
- Availability problems: if you can't contact a quorum of nodes, you can't process any operations

## Eventual Consistency
Alternative to linearizability is eventual consistency.

If there are no more updates, **eventually** all replicas will be in the same state.

But how do we know when there are no more updates? This can be an indefinite amount of time. An upgraded version of this is strong eventual consistency which has a few additional rules:
- Eventual delivery: every update made to one non-faulty replica is eventually processed by every non-faulty replica
- Convergence: any two replicas that have processed the same set of updates are in the same state

Properties
- Does not require waiting for network communication
- [[thoughts/causality|Causal]] broadcast can disseminate updates
- Conflicts arising from concurrent updates need to be resolved

## Summary
Summary of minimum [[thoughts/system model|system model]] requirements for various forms of consistency

|Problem|Must wait for communication|Requires synchrony|
|--|--|--|
|atomic commit|all participating nodes|partially synchronous|
|consensus, total order broadcast|quorum|partially synchronous|
|linearizable get/set|quorum|asynchronous|
|eventual consistency, causal broadcast, FIFO broadcast|local replica only|asynchronous|
