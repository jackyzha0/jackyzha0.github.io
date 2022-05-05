---
title: "quorum"
date: 2022-05-05
tags:
- seed
---

- Faults
	- Probability of all $n$ replicas being faulty: $p^n$
	- Probability of 1 or more replicas being faulty: $1 - (1-p)^n$
- Read-after-write
	- Client writes to servers A and B but request to A fails (so only B has correct state)
	- Client reads from servers A and B but request to B fails (so only client gets A's incorrect state)
	- Fix this by quorum
		- In a system with $n$ replicas
		- If a write is acknowledged by $w$ replicas (write quorum)
		- We request reads from $r$ replicas (read quorum)
			- e.g. send 3 requests, only 2 have to come back. Choose most up to date based on timestamp
		- $r + w > n$
			- Typically, $r = w = \frac{n+1}{2}$
			- Reads can tolerate $n-r$ unavailable replicas
			- Writes can tolerate $n - w$ unavailable replicas
		- Then the read will see the previously written value (as the read and write quorum share $\geq 1$ replica)
			- Client can then 'repair' the servers by sending its most up to state to servers that are out of date (with original logical timestamp! idempotent, should be fine)
