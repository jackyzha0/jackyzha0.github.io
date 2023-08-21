---
title: "Decision Tree"
date: 2022-09-12
tags:
  - seed
  - CPSC340
---

A simple program consisting of if-else decisions (decision stumps) based on the features.

- We can create a bunch of decision stumps and define a "score" for each possible rule.
  - An intuitive way of thinking about this is as classification accuracy: "if we use this rule, how many examples do we label correctly?"
  - We can create a tree using _greedy recursive splitting_: using a sequence of stumps to fit a tree
- However, accuracy isn't perfect. Sometimes splitting doesn't immediately improve accuracy. We can get around this by generally selecting feature test that maximizes information gain
  - Entropy of set $S$ of data samples is defined as $H(s) = - \sum_{c \in C}p(c)\log(p(c))$, where $C$ is the set of classes represented in $S$ and $p(c)$ is the empirical distribution of class $c$ in $S$.
  - Generally, select feature test that maximizes information gain: $I = H(S) - \sum_{i \in {children}}\frac{|S^i|}{|S|}H(S^i)$

```julia
Input: Vector y of length n with numbers {1,2,..k}
counts = zeros(k)
for i in 1:n
  counts[y[i]] += 1
entropy = 0
for c in 1:k
  prob = counts[c] / n
  entropy -= prob * log(prob)
return entropy
```

## Tradeoffs

Advantages

- Easy to implement
- Interpretable
- Learning is fast, prediction is very fast
- Can elegantly handle a small number of missing values during training
  Disadvantages
- Had to find optimal set of rules
- Greedy splitting often not accurate, can require very deep trees
- Can only express 'and' relations, not OR

## Pseudocode for choosing decision stumps

```
// time complexity: O(ndk), O(nd) if k=1 (binary classifier)
decision_stump(feature matrix X, and label vector Y):
  compute error: number of times y_i does not equal most common value for feature j
  for each threshold t:
	  set y_yes to most common label of objects i satisfying rule (x_ij > t)
	  set y_no to most common label of objects i satisfying rule (x_ij <= t)
	  set y_pred[i] to be our preditions for each object i based on the rule
		  y_pred[i] = y_yes if satisfied, y_no otherwise
	  compute error e which is the number of objects where y_pred_i != y_i
	  store the rule (j, t, y_yes, y_no) if it has the lowest error so far
  return the best decision stump based on score
```
