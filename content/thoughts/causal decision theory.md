---
title: "Causal decision theory"
date: 2022-10-28
tags:
  - seed
---

See also: [[thoughts/Decision theory|evidential decision theory]]

Choose the act that is most effective in bringing about the best result. Use [[thoughts/causality|causal]] conditional probabilities instead of evidential probabilities to compute expected utility.

When states are causally independent of the actions (e.g., when they are fixed prior to the choice), use Dominance Reasoning (see [[thoughts/Decisions under ignorance#Rules|DUI]]).

## Subjunctive Conditionals

$X \rightarrow Y$ means that if I were to do X, then Y.

- $P(X \rightarrow Y)$ is the causal conditional probability of Y given that I do X
  - To calculate, fix the causal history of the world up to the moment you do or don't do X
  - Then determine how your choice of X or not X influences the probability of Y
  - Normally, this is equivalent to $P(Y|X)$ but not true for [[thoughts/Newcomb's Problem]]
- $P(Y | X)$ is the evidential conditional probability of Y given X

## Causal Dependence

Three cases

1. Act A causes of influences state S
2. State S causes or influences act A
3. Some common C causes or influences both S and A

Note some properties:

- In all cases, $P(S | A) > P(S | \lnot A)$
- In cases 2 and 3 $P(A \rightarrow S) = P(\lnot A \rightarrow S) = P(S)$ in other words, A has no effect on S
