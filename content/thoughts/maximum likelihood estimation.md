---
title: "Maximum Likelihood Estimation (MLE)"
date: 2022-11-23
tags:
  - seed
  - CPSC340
aliases:
  - MLE
---

Maximizes $\hat w \in \arg \max_w \{ P(D|w) \}$

Suppose we have a dataset $D$ with parameters $w$. For example,

1. We flip a coin three times and get $D = \{ \textrm{H}, \textrm{H}, \textrm{T} \}$
2. The parameter $w$ is the probability that this coin lands heads

The likelihood as a probability mass function $P(D|w)$. MLE is choosing a $\hat w$ that maximizes the likelihood ($\hat w \in \arg \max_w \{ P(D|w) \}$)

![[thoughts/images/mle-example.png]]

In the case above, $\hat w$ is $\frac 2 3$

## Notation

argmin and argmax return the set of parameter values achieving the minimum and maximum values respectively. For example:

$$\arg \min_{w} \{ (w-1)^2 \} \equiv \{ 1 \}$$

$$\arg \min_{w} \{ cos(w) \} \equiv \{ \dots, -2\pi, 0, 2\pi, \dots \}$$

We can also show that maximizing the MLE is equivalent to minimizing the negative log-likelihood. That is,

$$\hat w \in \arg\max_w \{ \prod_{i=1}^n P(D_i|w) \} \equiv \arg\min_w \{ - \sum_{i=1}^n \log(P(D_i|w)) \}$$

This is true because logarithm is strictly monotonic so the location of the maximum doesn't change if we take the logarithm. Changing the sign flips the max to the min.

This is typically easier to compute as it turns a product of probability into a sum.

## Generative vs Discriminative

- Discriminative maximizes $P(y|X,w)$
  - Least squares, robust [[thoughts/linear regression]], logistic regression fall under this category
  - We don't model X so we can use complicated features
- Generative maximizes $P(y,X | w)$
  - [[thoughts/Naive Bayes]]
  - Needs to model X

## Relation between loss functions

### Least squares (squared L2-loss of residuals)

If we let the likelihood function of the labels be Gaussian:

$$P(y_i|x_iw) = \frac{1}{\sqrt{2\pi}}\exp\left(-\frac{(w^Tx_i-y_i)^2}{2}\right)$$

Then the MLE of $w$ is the minimum of $f(w) = \frac{1}{2} \lVert Xw-y \rVert^2$

### Absolute error (L1-loss of residuals)

If we let the likelihood function of the labels be Laplacian:

$$P(y_i|x_iw) = \frac 1 2 \exp(-\vert x^Tx_i-y_i \vert)$$

Then the MLE of $w$ is the minimum of $f(w) = \lVert Xw-y \rVert_1$

### Logistic loss

$h$ is the sigmoid function $\frac{1}{1+\exp(-x)}$. If we let the likelihood function of the labels be

$$P(y_i|w,x_i) = h(y_iw^Tx_i) = \frac{1}{1+\exp(-y_iw^Tx_i)}$$

Then the MLE of $w$ is the NLL, which we can show to be equivalent to the logistic loss

$$NLL(w) = \sum_{i=1}^n\log \left( \frac{1}{1+\exp(-y_iw^Tx_i)} \right) = \sum_{i=1}^n \log(1 + \exp(-y_iw^Tx_i))$$

Last part is true because of log rules ($-\log(\frac{1}{x}) = \log(x)$).

## Overfitting

Conceptually, MLE is saying that we should find the $w$ that makes $D$ have the highest probability given $w$. From [[thoughts/No Free Lunch Theorem]], we know that there is always a model that performs well for some unlikely $w$. This is overfitting!

We actually want to find the $w$ that has the highest probability given the data $D$. For this, we need [[thoughts/maximum a posteriori estimation|MAP]]
