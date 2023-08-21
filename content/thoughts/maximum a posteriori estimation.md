---
title: "Maximum a Posteriori (MAP) Estimation"
date: 2022-11-23
tags:
  - seed
  - CPSC340
aliases:
  - MAP
---

Maximizes $\hat w \in \arg\max_w \{ P(w|D) \}$

Given our data, what is the model $w$ is the best model?

This is connected to [[thoughts/maximum likelihood estimation|MLE]] through [[thoughts/probability#Bayes' Theorem|Bayes' Rule]]:

$$P(w|D) = \frac{P(D|w)P(w)}{P(D)} \propto P(D|w)P(w)$$

Intuitively, $P(w)$ is accounting for how 'likely' this model is. We can also treat this as a regularizer.

$$
\begin{aligned}
\hat w \in \arg\max_w \{ P(w|D) \} &\equiv \arg\max_w \{ \prod_{i=1}^n P(D_i|w)P(w)\} \\ &\equiv \arg\min_w \{ -\sum_{i=1}^n\log(P(D_i|w)) - \log(P(w)) \}
\end{aligned}
$$

Where $-\log(P(w))$ acts like the regularizing term. In fact, many regularizers are equivalent to negative log-priors.

## Relation between regularized loss functions

### L2-Regularized Least Squares

If we assume a Gaussian likelihood and a Gaussian prior, then MAP estimation is equivalent to minimizing $f(w) = \frac{1}{2} \lVert Xw-y \rVert^2 + \frac{\lambda}{2} \lVert w \rVert^2$

### L2-Regularized Robust Regression

If we assume a Laplace likelihood and a Gaussian prior, then MAP estimation is equivalent to minimizing $f(w) = \lVert Xw-y \rVert_1 + \frac{\lambda}{2} \lVert w \rVert^2$
