---
title: "Linear Regression"
date: 2022-10-05
tags:
  - seed
  - CPSC340
---

Vector dimensions:

- $w$ is $(d, 1)$ (weights)
- $y$ is $(n,1)$ (targets)
- $x_i$ is $(d, 1)$ (features)
- $X$ is $(n,d)$ each row is $x_i^T$

Linear regression makes predictions $\hat y_i$ using a linear function of $x_i$: $\hat y_i = w^Tx_i$

We set $w$ to minimize the sum of squared errors: $f(w) = \sum_{i=1}^n (w^Tx_i - y_i)^2$

1. Take the derivative of $f$ and set it equal to 0 $f'(w) = 0$ gives us $w = \frac{\sum_{i=1}^n x_iy_i}{\sum_{i=1}^n x_i^2}$
2. Check to second derivative to make sure we have a minimizer (if double derivative is positive). $f''(w) = \sum_{i=1}^n x_i^2$. As $x_i^2$ by definition must always be positive, this is a minimizer.

In d-dimensions, we minimize

$$
\begin{equation}
\begin{split}
f(w) &= \frac 1 2 \sum_{i=1}^n (w^Tx_i - y_i)^2 \\
 & = \frac 1 2 \lVert Xw - y \rVert^2 \\
 & = \frac 1 2 w^TX^TXw - w^TX^Ty + \frac 1 2 y^T y \\
 & = \frac 1 2 w^TAw - w^Tb + c
\end{split}
\end{equation}
$$

where $A$ is a matrix, $b$ is a vector, and $c$ is a scalar

The generalized version of “set the derivative to 0 and solve” in d-dimensions is to find where the gradient is zero (see [[thoughts/calculus|calculus]]). We get

$$
\begin{equation}
\begin{split}
\nabla f(w) &= \begin{bmatrix}
\frac{\partial f}{\partial w_1} \\
\frac{\partial f}{\partial w_2} \\
\vdots\\\
\frac{\partial f}{\partial w_d}
\end{bmatrix}  \\ \\

&=

\begin{bmatrix}
\sum_{i=1}^n (w^Tx_i - yi)x_{i,1}  \\
\sum_{i=1}^n (w^Tx_i - yi)x_{i,2}  \\
\vdots\\\
\sum_{i=1}^n (w^Tx_i - yi)x_{i,d}  \\
\end{bmatrix} \\ \\

&=

Aw - b \\

&= X^TXw - X^Ty
\end{split}
\end{equation}
$$

We can fit to polynomial equations using a [[thoughts/change of basis]]

## Cost

Of solving equations in the form $Aw = b$

1. $O(nd)$ to form vector $b$
2. $O(nd^2)$ to form matrix A
3. Solving a $(d,d)$ system of equations is $O(d^3)$

Overall cost is $O(nd^2+d^3)$

## Robust Regression

We minimize the L1-norm of residuals instead of L2-norm

$$f(w) = \lVert Xw - y \rVert_1$$

However, as the L1-norm uses the absolute function, it is non-differentiable at 0. We can use a smooth approximation of the L1-norm instead, like Huber loss:

$$
h(r_i) =
\begin{cases}
      \frac 1 2 r_i^2 & |r_i| \leq \epsilon \\
      \epsilon (|r_i| - \frac 1 2 \epsilon) & \textrm{otherwise}
   \end{cases}
$$

Absolute error is more robust and non-convex errors are the most robust.

- Generally not influenced by outlier groups
- But it is non-convex so finding global minimum is hard

## Brittle Regression

You want to minimize size of worst error across examples. For example, if in worst case the plane can crash or you perform badly on a group.

We can instead minimize the $L_\infty$ norm which is convex but non-smooth. This effectively minimizes the highest error (effectively Minimax regret in [[thoughts/Decisions under ignorance|DUI]]).

The smooth approximation to the max function is the log-sum-exp function:

$$\max_i \{ z_i \} \approx \log( \sum_i \exp(z_i))$$

## Penalizing Model Complexity

Optimize $score(p) = \frac 1 2 \lVert Z_p v - y \rVert^2 + p$ where $p$ is the degree of the polynomial.

Other ones also exist which replace the $p$ term with $\lambda k$ where $k$ is the estimated degrees of freedom (for polynomials, $k = p + 1$). $\lambda$ controls how strongly we penalize complexity.

$\lambda = 1$ is called the Akaike information criterion (AIC)

See also: [[thoughts/regularization]]
