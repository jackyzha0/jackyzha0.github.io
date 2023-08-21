---
title: "XGBoost"
date: 2022-11-23
tags:
  - seed
  - CPSC340
---

Uses [[thoughts/regularization|regularized]] regression trees. These are like [[thoughts/decision tree|decision trees]] where each split is

- based on a single feature
- each leaf gives a real-valued prediction

## Fitting a regression tree

- Train: set each weight $w_L$ at leaf $L$ by minimizing squared error $\sum_{i=1}^n (w_{L_i}-y_i)^2$
  - We use using greedy recursive splitting for growing the tree
- Prediction: At each leaf, the prediction $\hat y_i$ is the mean of all $y_i$ that fall under that leaf node

## Ensemble and Boosting

We create a series of trees that are trained on the residual of the previous tree. That is, the first tree is trained on the actual dataset. The second tree is trained on the residuals of the prediction of the first tree, and so on.

- `tree[0] = fit(X,y)`
- `y_hat = tree[0].predict(X)`
- `tree[1] = fit(X,y - y_hat)`
- `y_hat = y_hat + tree[1].predict(X)
- `tree[2] = fit(X,y - yhat)`
- `y_hat = y_hat + tree[2].predict(X)
- ...

## Regularization

As long as not all $w_L = 0$, each tree decreases training error. However, it may overfit if trees are too deep or you have too many trees

We can apply L0-regularization (stop splitting if $w_L = 0$) and L2-regularization to discourage this.
