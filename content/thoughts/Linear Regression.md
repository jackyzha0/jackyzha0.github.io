---
title: "Linear Regression"
date: 2022-10-05
tags:
- seed
---

Linear regression makes predictions $\hat y_i$ using a linear function of $x_i$: $\hat y_i = wx_i$

We set $w$ to minimize the sum of squared errors: $f(w) = \sum_{i=1}^n (wx_i - y_i)^2$

1. Take the derivative of $f$ and set it equal to 0 $f'(w) = 0$ gives us $w = \frac{\sum_{i=1}^n x_iy_i}{\sum_{i=1}^n x_i^2}$
2. Check to second derivative to make sure we have a minimizer (if double derivative is positive). $f''(w) = \sum_{i=1}^n x_i^2$. As $x_i^2$ by definition must always be positive, this is a minimizer.

In d-dimensions, we minimize

$$f(w) = \frac 1 2 \sum_{i=1}^n (w^Tx_i - y_i)^2$$

The generalized version of “set the derivative to 0 and solve” in d-dimensions is to find where the gradient is zero (see [[thoughts/calculus|calculus]]). We get

$$\nabla f(w) = \begin{bmatrix}
\frac{\partial f}{\partial w_1} \\
\frac{\partial f}{\partial w_2} \\
\vdots\\\
\frac{\partial f}{\partial w_d}
\end{bmatrix} = 

\begin{bmatrix}
\sum_{i=1}^n (w^Tx_i - yi)x_{i,1}  \\
\sum_{i=1}^n (w^Tx_i - yi)x_{i,2}  \\
\vdots\\\
\sum_{i=1}^n (w^Tx_i - yi)x_{i,d}  \\
\end{bmatrix}
$$