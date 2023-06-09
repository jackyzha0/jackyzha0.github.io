---
title: "Conflict-free Replicated Data Type (CRDT)"
date: 2022-05-05
tags:
- sapling
aliases:
- conflict-free replicated data type
- CvRDT
- CmRDT
- commutative replicated data type
- convergent replicated data type
---

Provides [[thoughts/causality|causal consistency]] as well as [[thoughts/consistency#Eventual Consistency|strong eventual consistency]]: over time, all actors converge to same state without data loss *but* there is no guarantee of exact same state across actors at any given moment (not [[thoughts/consistency#ACID Consistency|ACID]]).

> Note: In general, maintaining global invariants (e.g. shapes such as a tree or a DAG), cannot be done by a CRDT. Global invariant cannot be determined locally; maintaining it requires synchronisation.

CRDTs should always strive to preserve user intent.

Two main families of CRDTs are operation-based and state-based CRDTs. They have their trade offs
1. Operation-based
	- generally smaller messages
	- requires [[thoughts/causality#Causal Order|causally-ordered delivery]] for messages
	- can be more complex because it requires reasoning about history
2. State-based
	- can tolerate message loss/duplication 
	- requires [[thoughts/message broadcast#Best-effort|best-effort broadcast]] delivery for messages

See example implementations here: [[thoughts/CRDT Implementations|CRDT Implementations]]

## Causal Consistency
Causality is in each change (delta) as a [[thoughts/clocks#Vector Clocks|vector clock]] which encodes all of that delta's causal dependencies. Each delta is then queued until its vector clock is complete.

## Operation-based
> Sometimes also called commutative replicated data types (CmRDT)

Replication requires one of the following assumptions:
- all concurrent operations to commute given **[[thoughts/causality#Causal Order|causal ordering]]** (most common)
- all operations to commute given no ordering
- all operations to commute and be idempotent if message duplication can occur

History is kept through the notion of a causal history $\mathcal{C}$
- Initially, $\mathcal{C}(x_i) = \varnothing$
- After executing the 2nd (downstream) phase of operation $f$, $\mathcal{C}(f(x_i)) = \mathcal{C}(x_i) \cup \{ f \}$

## State-based
> Sometimes also called convergent replicated data types (CvRDT)

Can broadcast the values of the state using [[thoughts/message broadcast#Best-effort|best-effort broadcast]] and then merging using a defined merge operator $\sqcup$.

The merge operator $\sqcup$ must be:
1. Commutative: $s_1 \sqcup s_2 = s_2 \sqcup s_1$
2. Associative: $(s_1 \sqcup s_2) \sqcup s_3 = s_1 \sqcup (s_2 \sqcup s_3)$
3. Idempotent: $s_1 \sqcup s_1 = s_1$

History is kept through the notion of a causal history $\mathcal{C}$
- Initially, $\mathcal{C}(x_i) = \varnothing$
- After an update operation $f$, $\mathcal{C}(f(x_i)) = \mathcal{C}(x_i) \cup \{ f \}$
- After merging states $x_i$, $x_j$, $\mathcal{C}(merge(x_i, x_j)) = \mathcal{C}(x_i) \cup \mathcal{C}(x_j)$
The happens-before relation $\leq$ is then defined as $f \rightarrow g \iff \mathcal{C}(f) \subset \mathcal{C}(g)$

## Delta-based (hybrid)
Delta-based CRDTs propagate delta-mutators that encode the changes that have been made to a replica since the last communication.

For efficiency, CRDT implementations can 'hold on' to outbound events and compact/compress the log by rewriting operations (e.g. turning two `add(1)` operations into a single `add(2)` operation)

## Strategies for Designing CRDTs
A CRDT can be specified by relying on:
1. the full history of updates executed;
2. the happens-before relation among updates; and
3. an arbitration relation among updates (when necessary)

A query can be specified as a function that uses this information and the value of parameters to compute the result (i.e. goes from the state to a value).

### Secure CRDTs
- What does encryption in CRDTs look like? homomorphic encryption for merge operations for example
- https://martin.kleppmann.com/papers/snapdoc-pets19.pdf
- http://www.complang.tuwien.ac.at/kps2015/proceedings/KPS_2015_submission_25.pdf

### Fault Tolerance
How can we make CRDTs [[thoughts/Byzantine Faults|Byzantine fault-tolerant]]?

[Kleppmann shows](https://martin.kleppmann.com/papers/bft-crdt-papoc22.pdf) that is possible to guarantee the standard CRDT consistency properties even in systems in which *arbitrarily many* nodes are Byzantine.

CRDTs can become BFT by ensuring eventual delivery and convergence even in the presence of Byzantine nodes.

The main construct here is constructing a hash graph (aka a [[thoughts/Merkle-DAG|Merkle-DAG]]): The graph is essentially the Hasse diagram of the partial [[thoughts/Order theory|order]] representing the [[thoughts/causality|causality]] relation among the updates. The ID of an operation is the hash of the update containing that operation. A 'head' is just an operation which is not a dependency of another operation.
1. This hash graph helps to ensure eventual consistency as two nodes $p$ and $q$ can exchange the hashes of their currents heads and if they are identical, they can ensure the set of updates they have observed is also identical.
2. If the heads of $p$ and $q$ are mismatched, the nodes can run a graph traversal algorithm to determine which parts of the graph they have in common, and send each other those parts of the graph that the other node is lacking.

See: [[posts/bft-json-crdt]]

## Performance
### Storage + State Compaction
Practical experience with CRDTs shows that they tend to become inefficient over time,
as tombstones accumulate and internal data structures become unbalanced. The compacted portion of the CRDT must retain enough metadata to allow future operations to reference it on an atomic level and order themselves correctly. From the outside, a compacted CRDT must continue to behave exactly the same as a non-compacted CRDT.

However, GC + rebalancing technically requires achieving [[thoughts/consensus|consensus]] on nodes in order to do this.

> So, as far as I know, we would need a consensus protocol attached to the CRDT in order to get garbage collection / compaction. [(#2)](https://github.com/ipfs-inactive/dynamic-data-and-capabilities/issues/2)

One potential way of overcoming this is to have a small, stable subset of replicas called the core which achieve consensus amongst each other. The other replicas asynchronously reconcile their state with core replicas.

See also: [[thoughts/Antimatter]]

### Exploiting good connectivity for stronger consistency
Upgrading network assumption from asynchronous to partially synchronous enables us to potentially define *weak operations* which only *eventually* need to be linearized.

## Unsolved Problems
- Concurrent move + edit in sequences is unsolved
	- Almost all implementations cause duplication

## Readings
- [A comprehensive study of CRDTs](https://hal.inria.fr/inria-00555588/document) 
- [Conflict-free Replicated Data Types: An Overview](https://arxiv.org/pdf/1806.10254.pdf)

## ProseMirror + CRDTs
[Source](https://marijnhaverbeke.nl/blog/collaborative-editing.html)

`dmonad` (creator of Yjs) on a ProseMirror plugin for Yjs:

> Mapping a CRDT to a ProseMirror document is not always possible, because ProseMirror has a schema that the document needs to comply to. E.g. given a `blockquote` that must have at least one child. If `client1` deletes the first child, and `client2` concurrently deletes the second child, you may end up with a `blockquote` without children (well, that depends on the CRDT). In this case I simply delete the node that does not comply with the schema anymore.

Enforcing that a CRDT complies to a schema might be impossible without an inordinate amount of bookkeeping. But something you could try is to create a _view_ on the data that complies to the schema. For example, if a blockquote does not have any children, ignore it.