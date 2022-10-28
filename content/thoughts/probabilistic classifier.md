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
The softmax function allows us to map $k$ real numbers $z_i = w_c^Tx_i$ to probabilities

$$P(y | z_1, z_2, \dots, z_k) = \frac{\exp(z_y)}{\sum_{c=1}^k \exp(z_c))}$$