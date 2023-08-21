---
title: "I-Confluence"
date: 2022-10-20
tags:
  - sapling
---

Martin Kleppmann and Heidi Howard: _[Byzantine Eventual Consistency and the Fundamental Limits of Peer-to-Peer Databases](https://arxiv.org/pdf/2012.00472.pdf)_

$\mathcal I$-confluence is a necessary and sufficient condition for the existence of a [[thoughts/Byzantine Faults|byzantine fault-tolerant]] eventual consistency replication algorithm

They define an invariant is a predicate over replica states, i.e. a function $I(S)$ that takes a replica state $S$ and returns either true or false.

A set of transactions is $\mathcal I$-confluent with regard to an invariant $\mathcal I$ if

1. Each replica can execute a subset of the transaction with $\mathcal I$ preserved on that replica
2. Merging the updates from the transactions still preserves $\mathcal I$

A few examples:

- $\mathcal I$-confluent: consider an invariant $\mathcal I(S)$ that is true if every user in $S$ has a non-negative balance
  - If each transaction only increases a user's account balance, then any combination of transactions will still satisfy $\mathcal I$
  - Note that this example is _no longer_ $\mathcal I$-confluent if transactions can deduct from a user's account balance
    - Say $A$ has a balance of $50
    - If $T_1$ results in deducting \$40 from $A$ and $T_2$ results in deducting \$25 from $A$, each transaction is valid on its own
    - But when combined, it violates the invariant $\mathcal I$
    - As a result, we can't model anything like a cryptocurrency using CRDTs
- Not $\mathcal I$-confluent: consider an invariant $\mathcal I(S)$ that is true if there are no duplicate values in $S$ (i.e. ensure that $S$ is a set)
  - If $T_1$ and $T_2$ are both transactions that create data items with the same value in that attribute, each of transaction preserves the constraint
  - However the combination of the two does not

I conjecture that if a data structure is $\mathcal I$-confluent, then it can be expressed in monotonic [[thoughts/Datalog|Datalog]]. That is, $\mathcal I$-confluence holds if and only if states $S$ can be represented as a join [[thoughts/semilattice|semilattice]].

This shows equivalence with the [[thoughts/CALM Theorem|CALM]] conjecture (proof left as an exercise for the reader).
