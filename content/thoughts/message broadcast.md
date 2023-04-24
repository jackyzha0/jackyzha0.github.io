---
title: "Message broadcast"
date: 2022-05-05
tags:
- seed
---

## Ordering
### Total order broadcast or Atomic broadcast
Globally consistent broadcast, agreement from all nodes (hard but can be done with consensus algorithms like [[thoughts/Raft Consensus Algorithm|Raft]]!)

In [[thoughts/State Machine Replication (SMR)|state machine replication]], total order broadcast assumes the state update function is **deterministic**. That is, whenever two replicas are in the same state, giving them the same input, they will transition to the same next state. The main limitation is that total order broadcast cannot update state immediately, have to wait for delivery through broadcast

Examples: [[thoughts/HoneyBadgerBFT|HoneyBadgerBFT]]

### Causal Broadcast
Obeys happens-before ([[thoughts/causality|causal]]) relationships.

In [[thoughts/State Machine Replication (SMR)|state machine replication]], assumed state update function is **deterministic and concurrent updates are commutative**. Replicas can process updates in different orders and still end up in the same state

### FIFO (reliable) Broadcast
Messages sent by the **same** node must be delivered in the order they were sent 

Assumes state update function is **deterministic + all updates are commutative**.

### Best-effort
No ordering guarantees.

Assumes state update function is **deterministic + commutative + idempotent + tolerates message loss**

## Reliability
Nodes can die mid-transmission!

Two strategies for mitigating node-death:
1. Eager reliable broadcast: first time a node receives a message, re-broadcast to each other node (reliable but expensive! $O(n^2)$ messages for $n$ nodes)
2. Gossip: first time a node receives a message, forward it to $k$ other nodes, chosen randomly (reliable with high probability)

## Retry semantics
- At-most-once: send request, don't retry, update may not happen
- At-least-once: retry request until acknowledged, may repeat update
- Exactly-once: retry + [[thoughts/idempotence|idempotence]] / deduplication

## Gossip
When we receive a message from a client, we want all the other servers to know about that message eventually.

The naive solution is to just send the message to all your peers. However, this doesn't scale super well as the number of nodes $n$ goes up.

Normally, each node tracks its topology (or local neighbourhood). This is either calculated dynamically or given on initialization.

Then, we broadcast to only our peers (as defined by the topology). Then, through [[thoughts/transitive closure|transitive closures]], the message will make its way to every node if all nodes form a connected subgraph

Two approaches
- Sync: *immediately* send updates to peers
	- May clog network if updates are frequent
- Async: every now and then send updates to peers (I have these values, what values do you have?)
	- May take a long time for messages to traverse the network if the path between nodes is long and latency is a non-negligible factor
	- Can be done using a Bloom filter