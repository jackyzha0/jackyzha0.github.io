---
title: "Building a Byzantine Fault Tolerant CRDT"
date: 2022-07-11
tags:
- seed
draft: true
---

- [[thoughts/State Machine Replication (SMR)|state machine replication]] is hard
	- traditional consensus needs (tbd) rounds of communication, making it infeasible for real-time communication
	- [[thoughts/CRDT]]s allow us to achieve that
- understanding crdts
	- we know that most transport algorithms guarantee ordering, so why do we need CRDTs?
	- well, imagine a list
		- it works for two people communicating directly with each other
		- but as soon as you have 3 people, 
	- why we need them
		- positional updates are not commutative
		- but attaching unique ids enables this to happen!
	- we can encode causal dependencies by tracking causal parent (origin field)
	- another problem: how do you order things with the same origin? we need a sense of time. we need clocks!
		- lamport clocks to the rescue
	- imagine a 'time frontier'
		- fancy terminology: hasse diagram
		- if we receive anything that isn't the very next update we are expecting, we can queue it up for later
		- this is a more complex form of [[thoughts/TCP]]s windowing technique
	- automerge
		- underlying algorithm is RGA
			-   Build the tree, connecting each item to its parent
			-   When an item has multiple children, sort them by sequence number then by their ID.
			-   The resulting list (or text document) can be made by flattening the tree with a depth-first traversal.
		- potential optimizations
			- yjs uses a doubly-linked list for faster insert + a cursor to track last visited position
				- assumes that editing patterns are *not* random (which is true for most applications due)
			- diamond-types (josephg) uses a range tree for even faster insert + find
	- limitations
		- [[thoughts/CALM Theorem]]: can't really circumvent this without synchronization
			- as a result, no garbage collection
		- byzantine fault tolerance ... up until now
- adding byzantine fault tolerance
	- hash graph -> can no longer fake operations
	- ensuring eventual delivery (basically, [[thoughts/message broadcast#Causal Broadcast]])
		- [[thoughts/Byzantine Broadcast]] (we can actually get away with weaker requirements here)
		- Eager reliable broadcast: first time a node receives a message, re-broadcast to each other node (reliable but expensive! $O(n^2)$ messages for $n$ nodes)
		- Assumptions: we assume that in the graph of replicas and network links, the correct replicas form a single connected component
			- If two correct replicas can only communicate via faulty replicas, then no algorithm can guarantee data exchange between those replicas, as the adversary can always block communication (this is known as an eclipse attack)
- so it turns out we can turn this bft list crdt into arbitrary JSON