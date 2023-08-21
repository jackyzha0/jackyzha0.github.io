---
title: "Order theory"
date: 2022-07-08
tags:
  - seed
---

From [An Abstract Plane: CRDT Primer 1](http://jtfmumm.com/blog/2015/11/17/crdt-primer-1-defanging-order-theory/)

An **order** is a binary relation $\leq$ on a set $S$, written $<S,\leq>$.

- If two things $a$ and $b$ are incomparable, we write it $a \parallel b$
- Total order:  for all a and b in the set, either $a \leq b$ or $b \leq a$
- Partial order: at least one pair a and b in the set, where $a \leq b$ or $b \leq a$

See also: [[thoughts/causality|message ordering]], [[thoughts/clocks#Vector Clocks|Vector clocks]]

## Joins

An upper bound is an element of the set that is $\geq$ every other element in the set in terms of that relation

When we take the join of $a$ and $b$ (written $a \lor b$), we’re looking for some element $x$ for which $a \leq x$ and $b \leq x$ where $x$ is the smallest element that satisfies that condition

Join has

1. Commutativity: $a \lor b = b \lor a$
2. Associativity: $(a \lor b) \lor c = a \lor (b \lor c)$
3. Idempotence: $a \lor a = a$

When it comes to [[thoughts/CRDT|CRDTs]], what we’re looking for is the ability to apply an operation in any order and as many times as we want without corrupting the result. The laws obeyed by joins give us exactly this.

A join [[thoughts/A City is not a Tree#Semilattices|semi-lattice]] then essentially does a topological sort or [[thoughts/causality#Causal Order|causal ordering]] of its elements except all of the elements can be joined (i.e. have a single shared ancestor)

We can illustrate the [[thoughts/semilattice|semi-lattice]] using a Hasse Diagram

![[thoughts/images/hasse diagram.png|300]]
