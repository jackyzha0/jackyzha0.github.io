---
title: "Distributed Systems"
date: 2022-05-03
tags:
- seed
---

A distributed system can be defined as multiple computers (nodes) communicating via a network trying to achieve some task together.

## Martin Kleppmann's Course
Notes from [Martin Kleppmann's Distributed Systems Course](https://www.youtube.com/watch?v=UEAMfLPZZhE&list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB) (he's the guy who wrote "Designing Data-Intensive Applications" O'Reilly 2017)

> How do we share data amongst different concurrent entities?

### 1.1: Introduction
- Recommended Reading
	- "Distributed Systems" by van Steen & Tanenbaum: Implementation detail heavy, more practical
	- "Introduction to Reliable and Secure Distributed Programs" (2nd ed) by Cachin, Guerraoui & Rodrigues: Theory heavy
	- "Designing Data-Intensive Applications" by Kleppmann: More oriented toward distributed databases
	- "Operating Systems: Concurrent and Distributed Software Design" by Addison-Wesley: links to Operating Systems
- Why distributed?
	- Things are inherently distributed: sending a message from your phone to your friend's phone
	- Reliability: even if one node fails, the system as a whole keeps functioning
	- Performance: get data from a nearby node rather than one centralized server halfway around the world
	- Solve bigger problems: some amounts of data can't fit on just one machine
- Why *not* distributed?
	- Communication may fail (and we might not even know it has failed)
	- Processes may crash (and we might not know)
	- All of this can happen nondeterministically
	- Thus we need to think about [[thoughts/fault tolerance|fault tolerance]]
### 1.3: RPC
- RPC: Remote Procedure Call
	- sometimes called a remote function call
- Call a function whose implementation is on another node
- Needs an RPC client/server to mediate the call.
	- Client marshals (encode) arguments and passes it to the server
	- Server unmarshals (decodes) arguments and runs the implementation
	- ... same in reverse for response
- Generally an HTTP request but other types of RPCs exists as well (e.g. gRPC)
### 2.1 + 2.2: Fault Tolerance
- See [[thoughts/fault tolerance#Two Generals Problem|Two Generals Problem]] and [[thoughts/fault tolerance#Byzantine Generals Problem|Byzantine Generals Problem]]
- Failure: system as a whole isn't working
- Fault: some part of the system isn't working
### 2.3: System Models
- How do we capture assumptions in a system model consisting of 
	- Network behaviour (e.g. message loss)
		- Reliable: message is received if and only if it is sent, messages may be reordered
		- Fair-loss: messages may be lost, duplicated, or reordered. A message eventually gets through if you keep retrying (can be upgraded to reliable using retry + packet deduplication)
		- Arbitrary: active adversary, may interfere with messages (can be upgraded to fair-loss using TLS)
		- Network partition: some links dropping/delaying all messages for an extended period of time
	- Node behaviour (e.g. crashes)
		- Crash-stop: node is faulty if it crashes. After it crashes, it stops executing forever
		- Crash-recovery: node may crash at any moment, losing in-memory state. It may resume executing sometime later
		- Byzantine: a node is faulty if it deviates from the algorithm. Faulty nodes may do anything, including crashing or malicious behaviour
		- Correct: not faulty
	- Timing behaviour (e.g. latency)
		- Synchronous: message latency no greater than a known upper bound
		- Partially synchronous: asynchronous for some finite (but unknown) periods of time, synchronous otherwise
		- Asynchronous: messages can be delayed arbitrarily, no timing guarantees
### 3.1: Physical Time
- Two types of clock
	- Physical clock: number of seconds elapsed
	- Logical clock: count events, e.g. messages sent
- Time is hard!
	- Greenwich Mean Time (GMT): the normal human time format, based on Earth rotation
	- International Atomic Time (TAI): some multiple of Caesium-133 resonant frequency
	- Compromise, UTC is TAI with corrections to account for Earth rotation
	- Unix Time: number of seconds since the epoch (Jan 1, 1970) not counting leap seconds
	- ISO8601: year, month, day, hour, minute, second, and timezone offset relative to UTC
- Periodically adjust local clock with a server with a more accurate time source using Network Time Protocol (NTP) or Precision Time Protocol (PTP)
- Estimating time over a network
	- NTP Client sends out a request at $t_1$
	- NTP Server receives request at $t_2$
	- NTP Server sends a response at $t_3$
	- NTP Client receives a request at $t_4$
	- Round-trip network delay = $\delta = (t_4-t_1) - (t_3-t_2)$
	- **Estimated** single-trip network delay = $\delta / 2$
	- Estimated server time when client receives response, so clock skew is $\theta = (t_3 + \delta / 2) - t_4$
	- If $\theta < 125ms$, slew the clock: speed it up/slow it down by 500ppm until clocks are in sync
	- If $125ms \leq \theta < 1000s$, step the clock: suddenly reset client clock to estimated server timestamp
	- If $\theta \geq 1000s$, panic and do nothing (leave it to the humans!)
### 3.3: Causality + Message ordering
- We say event $a$ happens before event $b$ ($a \rightarrow b$) iff:
	- $a$ and $b$ occurred at the same node, and $a$ occurred before $b$ in that node's local execution order
	- $a$ is the sending of some message $m$ and $b$ is the receipt of that same message $m$ (assuming sent messages are unique)
	- there exists some $c$ such that $a \rightarrow c$ and $c \rightarrow b$
	- Concurrent does *not* mean simultaneous, it means two things did not know about each other when they occurred (a is concurrent with b is written as $a \parallel b$)
- Causality
	- When $a \rightarrow b$ then $a$ might have caused $b$
	- When $a \parallel b$ then $a$ cannot have cause $b$ (and vice versa)
	- $\prec$ is a causal order, it is consistent with causality, a strict total order on events
### 4.1: Logical Time
- Problem is that *even with synced clocks* we can have $t_2 < t_1$ with a message A at $t_1$ with a response B at $t_2$
	- Here, the timestamp order is inconsistent with expected order!
	- Can happen when the clock skew is *less* than the one way network latency
- Logical clock: count number of events occurred
- Lamport Clock (a form of logical clock)
	- Logic
		- On initialization, set `t := 0` for each node
		- On any event on local node, `fn tick() -> t += 1`
		- On sending message $m$, `fn send(m) -> tick(); actually_send(t, m)`
		- On receiving `fn receive(t', m) -> t = max(t, t') + 1; do_something(m)`
	- Properties
		- If $a \rightarrow b$ then $L(a) < L(b)$
		- However, $L(a) < L(b)$ does not imply $a \rightarrow b$
		- Possible that $L(a) = L(b)$ for $a \neq b$
		- However if we include the node $N(e)$ for the node where event $e$ occurred, then $(L(e), N(e))$ **uniquely identifies** event $e$
		- We can then define a total causal order
			- $$(a \prec b) \iff (L(a) < L(b)) \lor (L(a) = L(b) \land N(a) < N(b))$$
		- Limitation, given timestamps $L(a) < L(b)$, we can't tell whether $a \rightarrow b$ or $a \parallel b$
		- We need vector clocks!
- Vector Clocks (another form of logical clock)
	- Instead of having a single counter `t` for all nodes, we keep a vector timestamp $a$ of an event for *each* node so we have $V(a) = \langle t_1, t_2, \ldots, t_n \rangle$ where $t_i$ is the number of events observed by node $N_i$
	- Each node has a current vector timestamp $T$, on an event on node $N_i$, increment vector element $T[i]$
	- Logic
		- On initialization , set `t := [0] * n`
		- On any event on node $N_i$, `fn tick() -> t[i] += 1`
		- On sending message $m$ from node $N_i$, `fn send(m) -> tick(); actually_send(t, m)`
		- On receiving `fn receive(t', m) -> t = zip(t, t').map(max); tick(); do_something(m)`
	- Thus, a vector timestamp of an event $e$ actually represents all of its *causal dependencies*: $\{ e \} \cup \{a | a \rightarrow e \}$
		- E.g. $\langle 2, 2, 0 \rangle$ represents first two events from $N_1$, first two events from $N_2$, and no events from $N_3$
	- Ordering
		- $T= T' \iff T[i] = T'[i] \ \forall i \in \{1, \ldots, n\}$ (T and T' are same if each element has the same value)
		- $T \leq T' \iff T[i] \leq T'[i] \ \forall i \in \{1, \cdots, n\}$ (T happened at the same time or earlier than T' if each element in T is less than or equal to its value in T')
		- $T < T' \iff T \leq T' \land T \neq T'$ (T happened earlier than T' if each element in T is less than its value in T', at least one element in T differs from T')
			- $T \parallel T' \iff T \nleq T' \land T' \nleq T$ (T is incomparable to T')
	- Properties
	- $V(a) \leq V(b) \iff (\{a\} \cup \{e | e \rightarrow a\}) \subseteq (\{b\} \cup \{e | e \rightarrow b\})$
	- $V(a) < V(b) \iff (a \rightarrow b)$
	- $V(a) = V(b) \iff (a = b)$
	- $V(a) \parallel V(b) \iff a \parallel b$
### 4.2 + 4.3: Broadcast
1. Ordering
	1. FIFO Broadcast: messages sent by the **same** node must be delivered in the order they were sent 
	2. Causal Broadcast: obeys happen-before (causal) relationships
	3. Total order broadcast: globally consistent broadcast, agreement from all nodes (hard but can be done with consensus algorithms like [[thoughts/Raft Consensus Algorithm|Raft]]!)
2. Reliability
	1. Nodes can die mid-transmission!
	2. Strategies
		1. Eager reliable broadcast: first time a node receives a message, re-broadcast to each other node (reliable but expensive! $O(n^2)$ messages for $n$ nodes)
		2. Gossip: first time a node receives a message, forward it to $k$ other nodes, chosen randomly (reliable with high probability)
### 5.1: Replication
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
		- Last writer wins (LWW): resolve conflicts using a logical clock that gives total ordering (e.g. Lamport clock) 
		- Multi-value register (give all options to let user/algorithm above resolve it): use a Vector clock, $v_2$ replaces $v_1$ if $t_2 > t_1$; preserver both $\{v_1, v_2\}$ if $t_1 \parallel t_2$
### 5.2: Quorums
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
### 5.3 State machine replication
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
### 6.1: [[thoughts/consensus|Consensus]]
- 