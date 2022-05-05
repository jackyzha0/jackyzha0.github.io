---
title: "Raft Consensus Algorithm"
date: 2022-05-01
tags:
- seed
- technical
---

> An understandable [[thoughts/consensus|consensus]] algorithm.

A distilled version of the [Raft paper](https://raft.github.io/raft.pdf). For a more graphic version, see this [visualization of Raft by The Secret Lives of Data](http://thesecretlivesofdata.com/raft/).

A really good [video review of the algorithm by Martin Kleppmann](https://www.youtube.com/watch?v=uXEYuDwm7e4&list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB&index=18)

## Distributed Consensus
When you only have one machine, it is easy to figure out what the state of that machine is in. But what happens when you have multiple machines that need to agree on some value or state?

How do we arrive at a shared set of state across multiple machines that can be as far as opposite sides of the world? How do we handle machines crashing and become unable to respond to incoming requests?

This is the problem of *distributed consensus*

## Replicated State Machines
Generally, this is done using a log of actions that are *replicated* across all machines. Keeping this replicated log consistent between all the machines is the job of the *consensus algorithm*. They allow a collection of machines to agree on some shared state which still make sense even when there is latency or unavailability.

In more formal language, consensus algorithms should typically have the following properties:
1. Safety in the face of network delays, partitions, packet loss, duplication, and reordering (except under certain cases where there are no known solutions, e.g. [[thoughts/fault tolerance#Byzantine Faults|Byzantine Faults]])
2. Functional (available) as long as the majority of servers are operational and can communicate
3. Latency resilient and does not depend on timing of messages to ensure consistency

Raft is one such consensus algorithm for managing a replicated log. It is an alternative to [Paxos](<https://en.wikipedia.org/wiki/Paxos_(computer_science)>) which is the main consensus algorithm in use over the last decade. The main aim is to make it *understandable* to builders and students alike.

It is important to note that Raft assumes that all messages have been authenticated/authourized. It hands this responsibility to the [[thoughts/Transport Layer|transport layer]] to deal with. As such, Raft *does not have any protection against malicious actors*. More discussion in this [Google Groups conversation](https://groups.google.com/g/raft-dev/c/8WIrWfzIkvM).

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

A server remains in the follower state as long as it receives valid RPCs from a leader or candidate (this is usually in the form of a 'heartbeat' from a leader which is an empty AppendEntries [[thoughts/RPC|RPC]] with no log entries).

If a follower receives no communication over a period of time called the *election timeout* (randomized between 150ms and 300ms), then it assumes there is no viable leader and begins an election to choose a new leader.

### Beginning an Election
A follower increments its current term and transitions to candidate state. It then votes for itself and issues RequestVote RPCs in parallel to each of the other servers in the cluster.

It is important to note that a server can only vote once per election. *It will give its vote to the first server that asks for it and meets the requirements for election.* A server should *only* vote for a candidate if the candidate's log is more up-to-date than its own. If the logs have different terms, the one with the larger term is more up to date. If the logs have the same term, the longer log is more up-to-date.

A candidate remains a candidate until one of 3 events happens:
1. It wins the election. It received votes from a majority of servers in the cluster. Majority rule ensures that at most one candidate can win the election for a particular term. It then sends heartbeat messages to all other servers to establish authority and prevent new elections.
2. Another server establishes itself as leader. Received an AppendEntries [[thoughts/RPC|RPC]] from another server claiming to be leader. This claim is legitimate if the leader's term is at least as large as the candidate's current term.
3. A period of time goes by with no winner. Possible if many followers become candidates at the same time, votes can be split so no candidate wins majority. When this happens, each candidate times out and starts a new election by incrementing its term and initiating another election. Raft uses randomized election timeouts to ensure split votes are rare.

After a leader has been elected, it beings servicing client requests.

### Properties
Generally, Raft will be able to elect and maintain a steady leader as long as the system roughly follows the timing requirement: `broadcastTime < 10 * electionTimeout < 100 * MTBF` where `broadcastTime` is amount of time for a server to send an [[thoughts/RPC|RPC]] to every server in the cluster and `MTBF` is the mean time between failure for a server.

Broadcast time should be roughly an order of magnitude less than the election timeout so that leaders can reliably send heartbeat messages required to keep followers from starting elections (similar to having RTT be roughly a magnitude smaller than request timeout). 

The election timeout should be a few orders of magnitude less than MTBF so that the system makes steady progress. When a system crashes, it will be down for roughly the period of the election timeout.

## Log Replication
Each client request is a command to be executed by the replicated state machines. The leader appends the command to its own log as a new entry, then issues AppendEntries RPCs in parallel to each of the other servers to replicate the entry.

A single log entry contains the state machine command from the client request along with the term number when the entry was received by the leader. A log entry is considered 'safely replicated' or *committed* once it is replicated on a majority of servers.

After an entry is committed, it applies the entry to its own state machine and returns the result of that execution to the client. When a follower learns a log entry is committed, it too applies the entry to its own state machine.

The *Log Matching Property* is maintained by Raft which guarantees
1. Log entries with same index and term number store the same command
2. Log entries with same index and term number mean that all preceding entries must identical (all log entries prior to that index are correctly replicated)

When a leader comes to power, it just begins normal operation, and the logs automatically converge in response to failures of the AppendEntries consistency check.

To bring a follower's log into consistency with its own, the leader must find the latest log entry where the two logs agree. To do this, the leader keeps a value `nextIndex` for each follower which is the number of the *next log entry the leader will send to that follower*. The leader pings each follower with a AppendEntries [[thoughts/RPC|RPC]] call with that `nextIndex` value. If this call is successful, the leader knows that this follower is up to date. If it fails, then the leader decrements `nextIndex` again until it reaches a log entry that does succeed.  At this point, the follower's logs will be removed (as anything between `nextIndex` and what the follower currently has is conflicting) and the follower's log is now consistent with the leader's and will remain that way for the rest of the term.

## Unbounded Logs (Log Compaction)
In a practical system, a log cannot grow without bounds. The simplest solution is to use snapshotting where the entire current system state is written to a snapshot on stable storage, then the entire log up until that point is discarded.

All snapshots are taken independently by each server. Each snapshot contains data like last included index, last included term, and the state machine state.

Sometimes, snapshots need to be sent from leader to followers if the followers lag behind using the InstallSnapshot [[thoughts/RPC|RPC]]. This can happen when the leader has discarded the next log entry that needs to be send to a follower (e.g. new server joining cluster).

When a server receives a InstallSnapshot [[thoughts/RPC|RPC]] call, it usually discard its entire log. In the odd case where the server receiving the [[thoughts/RPC|RPC]] call has *more* entries in its log than the snapshot, it deletes all log entries covered by the snapshot but entries following the snapshot are still valid and must be kept.

Other options like log cleaning and log-structured merge trees are also possible.

## RPCs
All Raft RPCs are idempotent so sending multiple RPCs causes no harms (e.g. telling a follower to AppendEntries it already has does nothing). 

```rust
type NodeId = u64 // can be pretty much anything that satisfies Ord + Clone + Display

struct LogEntry {
	payload: Any
	term: u64
}

struct Server {
	// Persistent State
	id: NodeId
	// last term we have seen
	currentTerm: u32
	// id of server that received our vote in current term
	votedFor: Option<NodeId>
	log: Vec<LogEntry>

	// Volatile State
	// index of highest log entry known to be committed
	commitIndex: u32
	// index of highest log entry applied to state machine
	lastApplied: u32

	// Volatile State on leaders
	// map of server id -> index of the next log entry to send to that server
	// initialize all to last log index + 1
	nextIndex: Map<NodeId, u32>
	// map of server id -> index of highest log entry known to be replicated
	// initialize all to 0
	matchIndex: Map<NodeId, u32>
}

impl Server {
	// Invoked by leader to replicate log entries, also used as heartbeat
	// Returns: (term, success)
	//   term: currentTerm for leader to update itself
	//   success: true if follower contained entry matching prevLogIndex and prevLogTerm
	fn appendEntries(
		&mut self,
		term: u32,          // leader's term
		leaderId: NodeId,   // so follower can redirect clients
		prevLogIndex: u32,  // index of log entry immediately preceding new ones
		prevLogTerm: u32,   // term of prevLogIndex entry
		entries: [LogEntry] // log entries to store
		leaderCommit: u32   // leader's commit index
	) -> (u32, bool) {
		// If a server receives a request with a stale term number, it rejects the request.
		if term < self.currentTerm {
			false
		}

		// Consistency check for second property of Log Matching Property:
		// If two entries in different logs have the same index and term,
		// then the logs are identical in all preceding entries.
		if self.log[prevLogIndex].term != prevLogTerm {
			false
		}

		// Remove any conflicting entries in the follower's log
		// Conflict is defined as when an entry has the same index but different terms
		for (i, entry) in entries.vec().enumerate() {
			let our_term = self.log.get_term(i);
			if our_term != entry.term {
				self.log.drain(i..self.log.len())
			}
		}
		
		// Appends entries from the leader's log that are not already in the log
		for (i, entry) in entries.vec().enumerate() {
			if i == self.log.len() + 1 {
				self.log.append(entry)
			}
		}
		
		// Update commitIndex if applicable
		if leaderCommit > self.commitIndex {
			// set commit index to be the minimum of leaderCommit and index of last new entry
			self.commitIndex = min(leaderCommit, self.log.len() - 1);
		}
	}
	
	fn requestVote(
		&mut self,
		term: u32,           // candidate's term
		candidateId: NodeId, // candidate requesting vote
		lastLogIndex: u32,   // index of candidate's last log entry
		lastLogTerm: u32,    // term of candidate's last log entry
	) -> (u32, bool) {
		// If a server receives a request with a stale term number, it rejects the request.
		if term < self.currentTerm {
			false
		}

		// Only grant vote if we haven't voted this term and candidate's log is
		// at least as up-to-date as our log
		if self.votedFor.is_none() && lastLogIndex >= self.log.len() - 1 {
			true
		}

		// Don't vote by default
		false
	}
}
```