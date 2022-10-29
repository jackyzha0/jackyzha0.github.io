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