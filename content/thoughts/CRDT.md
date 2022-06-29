---
title: "Conflict-free Replicated Data Type (CRDT)"
date: 2022-05-05
tags:
- seed
aliases:
- conflict-free replicated data type
---

Provides [[thoughts/causality|causal consistency]] as well as [[thoughts/consistency#Eventual Consistency|strong eventual consistency]]: over time, all actors converge to same state without data loss *but* there is no guarantee of exact same state across actors at any given moment (not [[thoughts/consistency#ACID Consistency|ACID]]).

## Strong Eventual Consistency
Replication as commutative operations (order doesn't matter!)

Can work for *any* JSON using only 4 operations: `set`, `delete`, `increment`, `insert`

`set` is the only operation among them which is *convergent* instead of commutative. Convergent means that all actors will arrive at the same state but values during convergence (i.e. as they receive updates) may differ. Usually last-writer-wins (LWW).

Concept of time is implemented by giving each field (including nested ones!) a UUID. Assigns give a field a new UUID. All other operations specify which field they are operating on by UUID (nested ones need to provide the UUID of each parent required to reach the nested field). It is a sort of versioning that holds the state that CRDTs need to autonomously resolve conflicts *without* consensus.

Arrays are represented as reverse-linked lists with linking based off of Left-Hand-Neighbours (LHN) (`[A, B, C]` is represented as `C -> B -> A` as C's LHN is B and B's LHN is A). Insertion works positionally. Inserts with same LHN are sorted by LWW.

## Causal Consistency
Causality is in each change (delta) as a [[thoughts/clocks#Vector Clocks|vector clock]] which encodes all of that delta's causal dependencies. Each delta is then queued until its vector clock is complete.