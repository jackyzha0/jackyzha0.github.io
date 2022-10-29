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
- When $a \rightarrow b$ then $a$ might have caused $b$
	- We say event $a$ happens before event $b$ ($a \rightarrow b$) iff:
		- $a$ and $b$ occurred at the same node, and $a$ occurred before $b$ in that node's local execution order
		- $a$ is the sending of some message $m$ and $b$ is the receipt of that same message $m$ (assuming sent messages are unique)
		- there exists some $c$ such that $a \rightarrow c$ and $c \rightarrow b$

## Concurrency
- When $a \parallel b$ then $a$ cannot have cause $b$ (and vice versa)
	- Concurrent does *not* mean simultaneous, it means two things did not know about each other when they occurred (a is concurrent with b is written as $a \parallel b$)
	- Similar notation to [[thoughts/Order theory|Order theory]]

## Causal Order
- $\prec$ is a causal order, it is consistent with causality, a strict total order on events. Usually called the 'happens-before' relation

## Causal Dependence
Three cases
1. Act A causes of influences state S
2. State S causes or influences act A
3. Some common C causes or influences both S and A

Note some properties:
- In all cases, $P(S | A) > P(S | \lnot A)$
- In cases 2 and 3 $P(A \rightarrow S) = P(\lnot A \rightarrow S) = P(S)$ in other words, A has no effect on S