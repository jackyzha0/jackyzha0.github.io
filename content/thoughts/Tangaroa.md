---
title: "Tangaroa"
date: 2022-08-08
tags:
  - seed
---

> A [[thoughts/Byzantine Faults|Byzantine fault-tolerant]] [[thoughts/Raft Consensus Algorithm|Raft]] algorithm inspired by [[thoughts/PBFT|PBFT]]

[Source Paper](https://www.scs.stanford.edu/14au-cs244b/labs/projects/copeland_zhong.pdf)

Byzantine nodes are problematic for Raft:

- Node can keep calling for elections to terminate the current term. As Raft cannot progress until a leader is elected, this makes Raft unavailable (breaking [[thoughts/liveness|liveness]])
- Byzantine leader could modify a client's request and violate correctness

Differences from Raft

- Message Signatures: Uses [[thoughts/digital signatures|digital signatures]] to authenticate messages and verify integrity. This prevents a Byzantine leader from modifying the message contents or forging messages
- Client Intervention: Clients can force interrupt leadership if the cluster fails to make progress. This prevents a Byzantine leader from continuously calling elections
- Incremental Hashing: each entry has a [[thoughts/hash function|hash]] that is computed over the previous hash and the newly appended log entry, preventing Byzantine nodes from reorganizing the event log
- Election Certificates: on a successful leader election, its first heartbeat will contain a quorum certificate with all the RequestVoteResponse RPCs it received to become leader. Nodes can individually verify this is the case (all public keys are known ahead of time)
- Commit Verification: rather than having leader be responsible for incrementing the commit index, it keeps track of this itself by broadcasting AppendEntriesResponse RPC to every node (not just the leader). That way, when a node receives quorum on the number of AppendEntriesResponses, it will increment the commit index (similar to the prepare phase in [[thoughts/PBFT|PBFT]])
- Lazy Voters: a node does not grant a vote to a candidate unless it believes the current leader is faulty. This prevents unnecessary elections from being started in attempts to starve the system
