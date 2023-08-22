---
title: "Binary Classification"
date: 2022-10-28
tags:
  - seed
  - CPSC340
---

- Set $y_i = +1$ for one class (“important”)
- Set $y_i = -1$ for the other class (“not important”)
- To predict, we look at whether $w^Tx_i$ is closer to +1 or -1
  - $\hat y_i = \textrm{sign} (w^Tx_i)$

Least squares error may overpenalize. Only thing we care about is the sign, not how far away it is from the decision boundary.

Could we instead minimize number of classification errors? This is called the 0-1 loss function: you either get the classification wrong (1) or right (0).

$$
\mathcal L(i,j) = \begin{cases} 
  0 & i = j \\
  1 & i \neq j
\end{cases}
$$

![[thoughts/images/0-1-loss.png|500]]

Illustration above is if $y_i = 1$. Flip for $y_i = -1$

Unfortunately, 0-1 Loss is non-convex. We can, once again, use a convex approximation which is called the Hinge loss:

$$\mathcal L(i,j) = \max(0, 1 - y_iw^Tx_i)$$

See also: [[thoughts/SVM]]

This is an upper bound on the 0-1 loss (as illustrated by the picture). For example, if the hinge loss is 18.3, then the number of training errors is at most 18.

Similarly, we can use the log-sum-exp trick to get the logistic loss which is convex _and_ differentiable.

$$\mathcal L(i,j) \approx \log(1 + \exp(-y_iw^Tx_i))$$

### Perceptron

Only works for _linearly-separable_ data

- Searches for a $w$ such that $\textrm{sign}(w^Tx_i ) = y_i, \forall i$
- Intuition is that you search for the ledge
- Start with $w^0 = 0$
- Classify each example until we reach a mistake
  - Then, update $w$ to $w^{t+1} = w^t + y_ix_i$
- If a perfect classifier exists, this algorithm finds one in finite number of steps
