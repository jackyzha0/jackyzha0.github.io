---
title: "Supervised learning"
date: 2022-09-09
tags:
  - seed
  - CPSC340
---

- Input: take features of examples and corresponding labels as inputs
- Output: a model that can accurately predict the labels of new examples

Generally, the most successful machine learning technique (with the exception of games)

Examples:

- [[thoughts/decision tree|Decision trees]]
- [[thoughts/Naive Bayes]]
- [[thoughts/KNN|KNN]] (to fit an appropriate $k$)
- [[thoughts/Ensemble method|Ensemble Methods]]
- [[thoughts/linear regression]]

Tradeoffs:
| |Decision trees|Naive Bayes|
|-|-|-|
|# Features used|Sequences of rules based on 1 feature|All features|
|Training|$O(dn)$, one pass per depth|$O(n)$, just counting|
|New data|May need to recompute tree|Just update counts|
|Accuracy|Good if simple rules based on individual features work|Good if features almost independent given label|
|Interpretability|easy to see how decisions are made|easy to see how each feature influences decision|

## Notation

- $X$ is the input
- $y$ are the class labels
- $n$ is the number of examples (generally idnex is denoted by subscript)
- $d$ is the number of features (generally index is denoted by superscript)
- $\hat y$ are the predictions

## Parametric vs Non-parametric

- Parametric models: have fixed number of parameters w.r.t. $n$
- Non-parametric models: number of parameters grows with $n$

## General Rules

- We care far more about testing error than training error
- Golden Rule: the test data cannot influence training the model in any way
- Independent and Identically Distributed (IID) assumption
- [[thoughts/fundamental tradeoff|Fundamental trade-off]] between getting low training error and having training error approximate test error
  - We can mitigate this by penalizing model complexity (e.g. for [[thoughts/linear regression#Penalizing Model Complexity]])
  - See also: [[thoughts/regularization]]
- Optimization bias
  - How biased is an "error" that we optimized over many possibilities?
  - Is large if you compare lots of different models, small if you only compare a few.

## Decision Theory

Are we equally concerned about each potential outcome? Usually not! Sometimes, false negatives or false positives have outsized impact -- the cost of mistakes might be different

- Letting a spam message through (false negative) is not a big deal.
- Filtering a not spam (false positive) message will make users mad

We can look to [[thoughts/Decision theory|decision theory]] to help us here. Denote $cost(\hat y_i, \tilde y_i)$ as the cost of predicting $\hat y_i$ instead of the actual label $\tilde y_i$.

Then, instead of predicting the most probable label, compute all possible actions and take the action with the lowest expected cost: $\mathbb E [cost(\hat y_i, \tilde y_i)]$

- We assign the probability of each state to be the confidence of the predicted class (e.g. predicting 'spam' with 0.6 likelihood means we set the probability of true 'spam' to 0.6)
