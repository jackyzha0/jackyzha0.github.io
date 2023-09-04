---
title: "Causality"
date: 2022-05-05
tags:
  - seed
aliases:
  - message ordering
  - causal
---

## Causality

When $a \rightarrow b$ then $a$ might have caused $b$

We say event $a$ happens before event $b$ ($a \rightarrow b$) iff:

- $a$ and $b$ occurred at the same node, and $a$ occurred before $b$ in that node's local execution order
- $a$ is the sending of some message $m$ and $b$ is the receipt of that same message $m$ (assuming sent messages are unique)
- there exists some $c$ such that $a \rightarrow c$ and $c \rightarrow b$

## Concurrency

When $a \parallel b$ then $a$ cannot have caused $b$ (and vice versa)

Concurrent does _not_ mean simultaneous, it means two things did not know about each other when they occurred (a is concurrent with b is written as $a \parallel b$)

## Causal Order

$\prec$ is a causal order, it is consistent with causality, a strict total order on events. Usually called the 'happens-before' relation

See also: [[thoughts/Order theory]]

## Time

In Einstein's theory of general and special relativity

Causality means that an effect can not occur from a cause that is not in the back (past) light cone of that event. Similarly, a cause can not have an effect outside its front (future) light cone.

![[thoughts/images/lightcone.png]]

This causes us to be trapped in _causal islands_. Because data can only travel at the speed of light, we can't keep up with each other all the time.

The normal solution is to work in parts (Spanner does this) where the light cones of the different sites intersect. However, only working in this case called causal subjectiity.

See: [[thoughts/time]]