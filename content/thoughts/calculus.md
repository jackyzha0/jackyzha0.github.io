---
title: "Calculus"
date: 2022-09-12
tags:
  - seed
---

## Partial Derivatives

### Linear

Functions with more than one variable. e.g. $f(x)$ where $x \in \mathbb{R}^3$ the following multivariate linear

$$
\begin{equation}
\begin{split}
f(x_1, x_2, x_3)& = a_1x_1 + a_2x_2 + a_3x_3 + b \\
 & = \sum_{i=1}^3 a_ix_i + b \\
 & = a^Tx + b
\end{split}
\end{equation}
$$

The gradient is then the partial derivative with respect to each variable

$$\nabla f(x) = \begin{bmatrix}\frac{\partial f}{\partial x_1} \\ \frac{\partial f}{\partial x_2} \\ \frac{\partial f}{\partial x_3}\end{bmatrix} = \begin{bmatrix}a_1 \\ a_2 \\ a_3\end{bmatrix}$$

### Quadratic

e.g. $f(x)$ where $x \in \mathbb{R}^2$ and $A = \begin{bmatrix}2 & -1 \\ -1 & 1\end{bmatrix}$

$$
\begin{equation}
\begin{split}
f(x)& = \frac 1 2 x^TAx + b^Tx + c \\
 & = \sum_{i=1}^2 \sum_{j=1}^2 a_{ij}x_ix_j + \sum_{i=1}^2b_ix_i + c
\end{split}
\end{equation}
$$

If $A$ is symmetric, $\nabla f(x) = Ax+b$. In the non-symmetric case, $\nabla f(x) = \frac 1 2 (A + A^T)x + b$

Generalizations of gradients for $d$ dimensions given (expressed as matrices and vectors):

1. $A = X^TX$
2. $b$ = $X^Ty$
3. $c = \frac 1 2 y^Ty$

So

1. $\nabla \frac 1 2 w^T A w = Aw$ (if A is symmetric)
2. $\nabla w^Tb = b$
3. $\nabla c = 0$
