---
title: "Message broadcast"
date: 2022-05-05
tags:
- seed
---

## Ordering
1. FIFO Broadcast: messages sent by the **same** node must be delivered in the order they were sent 
2. Causal Broadcast: obeys happen-before (causal) relationships
3. Total order broadcast: globally consistent broadcast, agreement from all nodes (hard but can be done with consensus algorithms like [[thoughts/Raft Consensus Algorithm|Raft]]!)

## Reliability
1. Nodes can die mid-transmission!
2. Strategies
	1. Eager reliable broadcast: first time a node receives a message, re-broadcast to each other node (reliable but expensive! $O(n^2)$ messages for $n$ nodes)
	2. Gossip: first time a node receives a message, forward it to $k$ other nodes, chosen randomly (reliable with high probability)