---
title: "Conflict-free Replicated Data Type (CRDT)"
date: 2022-05-05
tags:
- seed
aliases:
- conflict-free replicated data type
---

Provides [[thoughts/consistency#Eventual Consistency|strong eventual consistency]]: over time, all actors converge to same state without data loss *but* there is no guarantee of exact same state across actors at any given moment (not [[thoughts/consistency#ACID Consistency|ACID]]).

Replication as commutative operations (order doesn't matter!)

Can work for *any* JSON using only 4 operations: `set`, `delete`, `increment`, `insert`

`set` is the only operation among them which is *convergent* instead of commutative. Convergent means that all actors will arrive at the same state but values during convergence (i.e. as they receive updates) may differ. Usually last-writer-wins.

Concept of time is implemented by giving each field (including nested ones!) a UUID. Assigns give a field a new UUID. All other operations specify which field they are operating on by UUID (nested ones need to provide the UUID of each parent required to reach the nested field). It is a sort of versioning that holds the state that CRDTs need to autonomously resolve conflicts *without* consensus.

