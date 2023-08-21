---
title: "Multi-class Classification"
date: 2022-10-28
tags:
  - seed
  - CPSC340
---

## One vs All

Suppose we only know how to do [[thoughts/probabilistic classifier|probabilistic binary classification]]. But we have $k$ classes we want to distinguish between. We can

- For each class $c$, train binary classifier to predict whether example is a $c$.
  - This creates $k$ binary classifiers
- On prediction, apply the $k$ binary classifiers to get a “score” for each class $c$.
- Predict the $c$ with the highest score (argmax)

This divides the space into convex regions (much like [[thoughts/K-means]])

Notation: $w_{y_i}$ denotes a classifier where $c = y_i$

## Loss

Problem: how can we define a loss that encourages the largest $w_c^Tx_i$ to be $w_{y_i}^Tx_i$?

Basically, for each $x_i$ we want

- $w_{y_i}^Tx_i > w_c^Tx_i$ for all $c$ that is not the correct $y_i$
- We write $w_{y_i}^Tx_i \geq w_c^Tx_i + 1$ to avoid the strict inequality
- This is the constraint we use!

### Sum

Penalizes each $c$ that violates the constraint

$$\sum_{c \neq y_i} \max\{0, 1-w_{y_i}^Tx_i + w_c^Tx_i\}$$

### Max

Penalizes the $c$ that violates the constraint the most

$$\max_{c \neq y_i} \{ \max\{0, 1-w_{y_i}^Tx_i + w_c^Tx_i\} \}$$

Adding L2-[[thoughts/regularization|regularization]] turns both into multi-class [[thoughts/SVM|SVMs]]. Both are convex upper bounds on the 0-1 loss.

## Multi-class Logistic Regression

Similarly, we can smooth out the max with the log-sum-exp trick to get something differentiable and convex:

$$f(w) =\sum_{i=1}^n \left[ -w_{y_i}^Tx_I + \log(\sum_{c=1}^k \exp(w_c^Tx_i))\right] + \frac{\lambda}{2}\sum_{c=1}^k\sum_{j=1}^d w_{cj}^2$$

We can rewrite the last term as $\lVert W \rVert^2_F$ (the Frobenius norm of the matrix $W$).

This is equivalent to binary logistic loss for $k=2$

See also: [[thoughts/probabilistic classifier#Multi-class Probabilities|multi-class probabilities]]
