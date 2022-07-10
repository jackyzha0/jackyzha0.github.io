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