---
title: "Conflict-free Replicated Data Type (CRDT)"
date: 2022-05-05
tags:
- seed
aliases:
- conflict-free replicated data type
- CvRDT
- CmRDT
- commutative replicated data type
- convergent replicated data type
---

Provides [[thoughts/causality|causal consistency]] as well as [[thoughts/consistency#Eventual Consistency|strong eventual consistency]]: over time, all actors converge to same state without data loss *but* there is no guarantee of exact same state across actors at any given moment (not [[thoughts/consistency#ACID Consistency|ACID]]).

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

To fully specify a state-based CRDT, implementer must define
1. Payload: the initial value of the data type (on each replicate)
2. Queries: a function that computes a view of the payload and has no side effects
3. Update: a function that when evaluated, has side-effects on the payload (evaluated locally at source)
4. Compare: a function that compares two states in the semilattice (see: [[thoughts/Order theory|order theory]])
5. Merge: a function that performs a least-upper-bound merge on two states

History is kept through the notion of a causal history $\mathcal{C}$
- Initially, $\mathcal{C}(x_i) = \varnothing$
- After an update operation $f$, $\mathcal{C}(f(x_i)) = \mathcal{C}(x_i) \cup \{ f \}$
- After merging states $x_i$, $x_j$, $\mathcal{C}(merge(x_i, x_j)) = \mathcal{C}(x_i) \cup \mathcal{C}(x_j)$
The happens-before relation $\leq$ is then defined as $f \rightarrow g \iff \mathcal{C}(f) \subset \mathcal{C}(g)$

## Delta-based (hybrid)
Delta-based CRDTs propagate delta-mutators that encode the changes that have been made to a replica since the last communication.

For efficiency, CRDT implementations can 'hold on' to outbound events and compact/compress the log by rewriting operations (e.g. turning two `add(1)` operations into a single `add(2)` operation)

[tk: Big delta state CRDTs]
[tk: Join-decompositions]

## Strategies for Designing CRDTs
A CRDT can be specified by relying on:
1. the full history of updates executed;
2. the happens-before relation among updates; and
3. an arbitration relation among updates (when necessary)

A query can be specified as a function that uses this information and the value of parameters to compute the result (i.e. goes from the state to a value).

### Conflict Resolution
- Add-wins
- Remove-wins
- Last-writer-wins

### Undo
[tk, look at Logoot-Undo]
- does this conflict with potential storage optimizations like state compaction?

### Secure CRDTs
[tk what does encryption in CRDTs look like? homomorphic encryption for merge operations for example]

## Performance
### Storage + State Compaction
Technically requires achieving [[thoughts/consensus|consensus]] on nodes in order to do this.

> So, as far as I know, we would need a consensus protocol attached to the CRDT in order to get garbage collection / compaction. [(#2)](https://github.com/ipfs-inactive/dynamic-data-and-capabilities/issues/2)

## Readings
- [A comprehensive study of CRDTs](https://hal.inria.fr/inria-00555588/document) 
- [Conflict-free Replicated Data Types: An Overview](https://arxiv.org/pdf/1806.10254.pdf)