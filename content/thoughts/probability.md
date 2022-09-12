---
title: "Probability"
date: 2022-09-11
tags:
- seed
---

- $0 \leq P(A) \leq 1$
- $P(\lnot A) = 1 - P(A)$

## Joint probability
Probability of both A and B happening. Intersection of the areas of the two events.

### Marginalization Rule
For some random variable X

$$P(A) = \sum_{x \in \mathcal{X}}P(A, X = x)$$

For example, to roll some even number,

$$P(\textrm{even}) = \sum_{i=1}^6 P(i, \textrm{even}) = 0 + \frac 1 6 + 0 + \frac 1 6 + 0 + \frac 1 6$$

## Union of Events
