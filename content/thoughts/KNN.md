---
title: "k-Nearest Neighbours (KNN)"
date: 2022-09-23
tags:
  - seed
  - CPSC340
aliases:
  - KNN
---

To classify an example, we find the $k$ examples closest to the example and take the mode of the $k$ examples.

Works based off of the assumption that similar features are likely to have similar labels

Effects on [[thoughts/fundamental tradeoff]]:

- As $k$ grows, training error increases and approximation error decreases.
- As $n$ grows, model complexity increases

We measure distance using the "norm" between feature vectors. The most common norm is the L2-Norm or [[thoughts/linear algebra#Vector Norm|Euclidean Norm]]

## Performance

- $O(1)$ training (just relies on training data)
- $O(nd)$ predictions ($O(d)$ distance calculations for all $n$ examples)
- $O(nd)$ space to store each training example in memory
  - This is non-parametric

KNN can suck in high dimensions (see: [[thoughts/Curse of Dimensionality|curse of dimensionality]])
