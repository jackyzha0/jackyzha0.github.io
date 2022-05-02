---
title: "Raft Consensus Algorithm"
date: 2022-05-01
tags:
- seed
- technical
---

> An understandable [[thoughts/consensus|consensus]] algorithm.

A distilled version of the [Raft paper](https://raft.github.io/raft.pdf)

## Replicated State Machines
How do we arrive at a shared set of state across multiple machines that can be as far as opposite sides of the world? How do we handle machines crashing and become unable to respond to incoming requests?

Generally, this is done using a log of actions that are *replicated* across all machines. Keeping this replicated log consistent between all the machines is the job of the *consensus algorithm*. They allow a collection of machines to agree on some shared state which still make sense even when there are bad actors, latency, or unavailability.

In more formal language, consensus algorithms should typically have the following properties:
1. Safety in the face of network delays, partitions, packet loss, duplication, and reordering (except under certain cases where there is no known solutions, e.g. [[thoughts/fault tolerance#Byzantine Faults|Byzantine Faults]])
2. Functional (available) as long as the majority of servers are operational and can communicate
3. Latency resilient and does not depend on timing of messages to ensure consistency

Raft is one such consensus algorithm for managing a replicated log. It is an alternative to [Paxos](<https://en.wikipedia.org/wiki/Paxos_(computer_science)>) which is the main consensus algorithm in use over the last decade. The main aim is to make it *understandable* to builders and students alike.

## Consensus
Raft implements consensus by first electing a *leader*, then giving that leader temporary but complete responsibility for managing the replicated log. When a leader fails or becomes disconnected, a new leader is elected.

Given this approach, Raft decomposes this consensus into 3 independent subproblems
1. Leader election: how do we choose a new leader when an existing leader fails?
2. Log replication: how does the leader accept new log entries from clients and replicate them across all the other machines?
3. Safety: when is it safe to consider log entries as 'agreed upon' and fully replicated across all machines?

A server can only be in one of 3 states:
1. Leader: handles all client requests
2. Follower: issues no requests but respond to requests from leaders and candidates 
3. Candidate: used to elect a new leader

State transitions follow the state diagram below:
![[thoughts/images/raft-state-diagram.png]]

All Raft servers communicate using remote procedure calls (RPCs) that happen over the network. The basis consensus algorithm only requires 2 types of RPCs, RequestVote and Append-Entries. These are retried if a request times out and are issued in parallel for best performance.

## Leader Election
Leaders are active for *terms* of arbitrary length (this is randomly determined as we will see later). These are numbered with consecutive and monotonically increasing integers.

Each term begins with an election in which one or more candidates attempt to become leader. If a candidate wins the election, then it serves as leader for the rest of the term.

![[thoughts/images/raft-elections.png]]

### Initiate State
Servers start up in the follower state.

A server remains in the follower state as long as it receives valid RPCs from a leader or candidate (this is usually in the form of a 'heartbeat' from a leader which is an empty AppendEntries RPC with no log entries).

If a follower receives no communication over a period of time called the *election timeout*, then it assumes there is no viable leader and begins an election to choose a new leader.

### Beginning an Election
A follower increments its current term and transitions to candidate state. It then votes for itself and issues RequestVote RPCs in parallel to each of the other servers in the cluster.

A candidate remains a candidate until one of 3 events happens:
1. It wins the election. It received votes from a majority of servers in the cluster. Majority rule ensures that at most one candidate can win the election for a particular term. It then sends heartbeat messages to all other servers to establish authority and prevent new elections.
2. Another server establishes itself as leader. Received an AppendEntries RPC from another server claiming to be leader. This claim is legitimate if the leader's term is at least as large as the candidate's current term.
3. A period of time goes by with no winner. Possible if many followers become candidates at the same time, votes can be split so no candidate wins majority. When this happens, each candidate times out and starts a new election by incrementing its term and initiating another election. Raft uses randomized election timeouts to ensure split votes are rare.

After a leader has been elected, it beings servicing client requests.

## Log Replication
Each client request is a command to be executed by the replicated state machines. The leader appends the command to its own log as a new entry, then issues AppendEntries RPCs in parallel to each of the other servers to replicate the entry.

The leader handles inconsistencies by forcing the follower's logs to duplicate its own. Conflicting entries in follower logs will be overwritten with entries from the leader's log. To figure out 

A single log entry contains the state machine command from the client request along with the term number when the entry was received by the leader. A log entry is considered 'safely replicated' or *committed* once it is replicated on a majority of servers.

After an entry is committed, it applies the entry to its own state machine and returns the result of that execution to the client. When a follower learns a log entry is committed, it too applies the entry to its own state machine.