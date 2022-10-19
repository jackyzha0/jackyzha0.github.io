---
title: "Dutch Book"
date: 2022-10-19
tags:
- seed
- PHIL321A
---

A Dutch Book is a set of bets that you consider individually fair, but which collectively guarantee a loss

This usually happens when people commit probabilistic fallacies (e.g. the conjunction fallacy, believing $P(A \land B | E) > P(A | E)$ when this can never be the case). Another common mistake is *double counting* probabilities

For example, if J believes that $P(heads) = P(tails) = \frac 2 3$, we can propose two bets
1. Pay $2; win $3 if heads, $0 if tails
2. Pay $2; win $3 if tails, $0 if heads

Both bets make sense for J. However, if J takes *both* bets, then he faces a guaranteed loss of $1

## Dutch Book Theorem
Based on the Kolmogorov [[thoughts/probability|probability]] axioms,

1. If any axiom is violated, a Dutch Book can be made.
2. If no axiom is violated, then no Dutch Book can be made.