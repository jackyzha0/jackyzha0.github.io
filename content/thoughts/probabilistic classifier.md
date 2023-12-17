---
title: "Probabilistic Classifier"
date: 2022-10-28
tags:
  - seed
  - CPSC340
---

We want a model of $P(y_i = \textrm{important} | x_i )$ for use in [[thoughts/Decision theory|decision theory]].

- Predictions generally map $w^Tx_i$ to labels for classes (for binary prediction, we used $\textrm{sign}(x)$)
- Probabilities we want to map $w^Tx_i$ to the range $[0,1]$

The most common choice is to use the sigmoid function:

$$h(z_i) = \frac{1}{1+\exp(-z_i)}$$

## Multi-class Probabilities

See also: [[thoughts/multi-class classification]]

The softmax function allows us to map $k$ real numbers $z_i = w_c^Tx_i$ to probabilities.

$$P(y | z_1, z_2, \dots, z_k) = \frac{\exp(z_y)}{\sum_{c=1}^k \exp(z_c))}$$

The alternative 'harder' version to softmax is the argmax function which simply finds the maximum value, sets it to 1.0, and assigns 0.0 to all other values.

In contrast, the softmax operation serves as a "softer" version of that. Due to the exponentiation involved in softmax, the largest value is emphasized and pushed towards 1.0, while still maintaining a probability distribution over all input values. This allows for a more nuanced representation that captures not only the most likely option but also the relative likelihood of other options.