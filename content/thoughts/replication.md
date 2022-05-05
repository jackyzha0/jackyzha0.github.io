---
title: "Replication"
date: 2022-05-05
tags:
- seed
---

- A node that has a copy of the data is called a *replica*
- If one replica is faulty, others are ideally accessible
- If data doesn't change, this is an easy problem: just copy it. Hard problem is when the data changes
- RAID (Redundant Array of Independent Disks) which is used to replicate within a single computer
	- RAID has a single controlled whereas distributed systems have nodes that act independently
- How do we avoid cases where losing an ACK could lead to users doing an action multiple times (e.g. pressing the like button)?
- Idempotence is important
	- $f$ is idempotent if $f(x) = f(f(x))$
	- e.g.
		- Not idempotent: $f(likeCount) = likeCount + 1$
		- Idempotent: $f(likeSet) = likeSet \cup \{userID\}$
	- Idempotent requests can be retried without deduplication
	- But problematic when other functions are in the mix: $f(f(x))= f(x)$ but $f(g(f(x))) \neq g(x)$
- Retry semantics
	- At-most-once: send request, don't retry, update may not happen
	- At-least-once: retry request until acknowledged, may repeat update
	- Exactly-once: retry + idempotence / deduplication
- To somewhat fix this, use tombstones and record logical timestamp for when events happen
	- Then, we can reconcile replicas by propagating the record with the latest timestamp and discard the records with earlier timestamps
	- Then, to fix concurrent writes by different clients
		- Last writer wins (LWW): resolve conflicts using a [[thoughts/clocks|logical clock]] that gives total ordering (e.g. Lamport clock) 
		- Multi-value register (give all options to let user/algorithm above resolve it): use a Vector clock, $v_2$ replaces $v_1$ if $t_2 > t_1$; preserver both $\{v_1, v_2\}$ if $t_1 \parallel t_2$

### State machine replication
- Can be done by FIFO-total order broadcasting every updated to all replicas. Whenever a replica delivers an update message, it applies it to its own state
- Underlies a lot of [[thoughts/blockchain|blockchains]], distributed ledgers, smart contracts, etc.
- Broadcast and associated assumptions about state update function
	- Total order: deterministic
		- Whenever two replicas are in the same state, giving them the same input, they will transition to the same next state
		- Limitations: cannot update state immediately, have to wait for delivery through broadcast
	- Causal broadcast: deterministic + concurrent updates are commutative 
		- Replicas can process updates in different orders and still end up in the same state
	- Reliable broadcast: deterministic + all updates are commutative
	- Best-effort broadcast: deterministic + commutative + idempotent + tolerates message loss