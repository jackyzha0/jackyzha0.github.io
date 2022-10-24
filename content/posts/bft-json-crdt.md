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
			- not a replacement for traditional consensus, just a specific subset
			- projects like BLOOM try to exploit this
		- byzantine fault tolerance ... up until now
- adding byzantine fault tolerance
	- traditionally up until $f < \frac n 3$ as per [[thoughts/33% Impossibility Result]], most blockchains tout this
	- https://arxiv.org/abs/2012.00472 
		- Citation: Martin Kleppmann and Heidi Howard. 2020. Byzantine Eventual Consistency and the Fundamental Limits of Peer-to-Peer Databases
		- a P2P system cannot rely on nodes always behaving the way that the designers of the system intended
		- In some circumstances, the lack of Byzantine fault tolerance can be justified by restricting CRDT-based collaboration to small, trusted groups of nodes: for example, in a collaborative editor, the set of users who are authorised to edit a document may be limited to immediate colleagues, who may trust each other to run the CRDT algorithm correctly
	- https://arxiv.org/pdf/2109.10554.pdf
		- Citation: Florian Jacob, Saskia Bayreuther, and Hannes Hartenstein. 2021. On Conflict-Free Replicated Data Types and Equivocation in Byzantine Setups
		- We also conjecture that there is only one operation-based CRDT design supporting noncommutative operations that fulfills SEC in Byzantine environments with any number of faults.
		- Operation-based CRDTs that provide inherent identity and inherent ordering of operations are equivocation-tolerant
		- The happened-before relation being a partial order inherently leads to a directed, acyclic graph of all operations.
		- A hash-chained directed acyclic graph as described in [5,4] is the only operation-based CRDT with non-commutative operations that provides SEC for any number of Byzantine faults, i.e., has fault tolerance n > f.
	- hash graph + signed message digests -> can no longer fake operations
	- ensuring eventual delivery (basically, [[thoughts/message broadcast#Causal Broadcast]])
		- [[thoughts/Byzantine Broadcast]] (we can actually get away with weaker requirements here)
			- dont need total order broadcast, just causal broadcast
		- Assumptions: we assume that in the graph of replicas and network links, the correct replicas form a single connected component
			- If two correct replicas can only communicate via faulty replicas, then no algorithm can guarantee data exchange between those replicas, as the adversary can always block communication (this is known as an eclipse attack)
			- To ensure eventual delivery, we assume that replicas periodically attempt to reconnect to each other and reconcile their sets of messages to discover any missing messages
		- Eager reliable broadcast: first time a node receives a message, re-broadcast to each other node
			- Reliable but expensive! $O(n^2)$ messages for $n$ nodes
		- we need to figure out a fast way of reconciling updates between nodes
			- we can do this using a hash graph! very similar to git fetch and git push
- so it turns out we can turn this bft list crdt into arbitrary JSON

## Further Work
