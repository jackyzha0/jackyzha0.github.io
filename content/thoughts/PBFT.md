---
title: "PBFT"
date: 2022-08-05
tags:
- seed
---

*[Practical Byzantine Fault Tolerance](http://css.csail.mit.edu/6.824/2014/papers/castro-practicalbft.pdf)* by Miguel Castro and Barbara Liskov

A form of [[thoughts/State Machine Replication (SMR)|state machine replication]] which offers both [[thoughts/liveness|liveness]] and [[thoughts/safety|safety]] under the [[thoughts/33% Impossibility Result|33% Impossibility Result]] and only uses [[thoughts/encryption|public-key cryptography]] during faults to prevent major speed bottlenecks (typically just uses [[thoughts/signed messages#Signed Message Digest|signed message digests]]).

The primary of a view is replica $p$ such that $p = v \mod |\mathcal{R}|$ where $\mathcal{R}$ is the set of replicas. Note that this *explicitly allows for faulty primaries* as the algorithm actually handles this.

Roughly, the algorithm works as follows (very similar to [[thoughts/Raft Consensus Algorithm|Raft]] and Paxos)
1. A client $c$ sends a request for operation $o$ to a node in the cluster: $\langle Request, o, t, c \rangle_{\sigma_c}$
	1. If a replica receives the request, it forwards it to the leader
2. The primary multicasts the request to the backup nodes in a three-phase protocol. The pre-prepare and prepare phases are used to totally order requests sent in the same view even when the primary, which proposes the ordering of requests, is faulty
	1. Pre-prepare
	2. Prepare
	3. Commit
3. Replicas execute the request and send a reply to the client
4. The client waits for $f + 1$ replies from different replicas with the same result; this is the end result
	1. If the client doesn't receive replies in a timely manner, it broadcasts the request to all replicas. If the request has already been processed, the replicas simply re-send the reply (as replicas cache the last reply sent to each client)

