---
title: "Consistency"
date: 2022-05-05
tags:
- seed
aliases:
- linearizability
---

- ACID Consistency: satisfies application-specific invariants (e.g. every course with students enrolled must have at least one lecturer)
- Replication Consistency: many models to choose from
	- Read-after-write
- Distributed transactions: atomic commitment problem
	- Either all nodes must commit or all must abort
	- If any node crashes, all must abort
- Usually done through two-phase commit (2PC)
	- Client begins a transaction with database nodes A and B
	- When done, the client *commits* the transaction with the coordinator
	- Coordinator tells both A and B to prepare for the commit
	- If both A and B think it is fine for them to commit, then coordinator tells both to commit (A and B cannot go back on their response to prepare, if they said they are prepared for the commit they must commit when the coordinator tells them to)
- What if the coordinator crashes? The algorithm is blocked until coordinator recovers
	- We can use a fault-tolerant two-phase commit (uses total order broadcast)

## Linearizability
- Defined as consistency in the face of concurrent reads/writes
- Not to be confused with serializability: transactions having the same effect as if they were run in some serial order
- Also contrasts with happens-before relationships, linearizability is defined in terms of real-time whereas happens-before is defined in terms of message sending and receiving
- Informally: every operation takes effect atomically sometime after it started and before it finished. All operations behave as if executed on a single copy of the data
- Consequence: every operation returns an "up-to-date" value, sometimes called "strong consistency"
	- Can guarantee linearizability of get (quorum read + read repair) and set (blind write to quorum) 
- If events overlap, either order could happen and is ok
- Downsides
	- Performance costs: lots of messages and waiting for responses
	- Scalability limits: leader can be a bottleneck
	- Availability problems: if you can't contact a quorum of nodes, you can't process any operations

## Eventual Consistency
- If there are no more updates, **eventually** all replicas will be in the same state
- Strong eventual consistency
	- Eventual delivery: every update made to one non-faulty replica is eventually processed by every non-faulty replica
	- Convergence: any two replicas that have processed the same set of updates are in the same state
	- Properties
		- Does not require waiting for network communication
		- Causal broadcast can disseminate updates
		- Conflicts arising from concurrent updates need to be resolved

Summary of minimum system model requirements

|Problem|Must wait for communication|Requires synchrony|
|--|--|--|
|atomic commit|all participating nodes|partially synchronous|
|consensus, total order broadcast|quorum|partially synchronous|
|linearizable get/set|quorum|asynchronous|
|eventual consistency, causal broadcast, FIFO broadcast|local replica only|asynchronous|
