---
title: "Gaussian RBFs"
date: 2022-10-21
tags:
  - seed
  - CPSC340
---

Non-parametric basis. Can think about it as a sum of gaussian 'bumps'.

Replace $x_i = (x_{i1}, x_{i2}, \dots, x_{in})$ with

$$z_i = \underbrace{(g(\lVert x_i - x_1 \rVert), g(\lVert x_i - x_2 \rVert), \dots, g(\lVert x_i - x_n \rVert))}_\text{n features}$$

where $g(x) = \exp(-\frac{x^2}{2\sigma^2})$

Gaussian RBFs are universal approximators

- Enough bumps can approximate any continuous function to arbitrary precision.
- Achieve optimal test error as ‘n’ goes to infinity.
