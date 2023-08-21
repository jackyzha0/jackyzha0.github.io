---
title: "Gradient descent"
date: 2022-10-12
tags:
  - seed
  - CPSC340
---

When we minimize or maximize a function, we call it optimization.

Gradient descent is essentially an iterative optimization algorithm that takes a guess and refines it using the gradient to make a better guess.

If the objective function is a [[thoughts/convex]] function, then it will converge to a _global optimum_.

Gradient descent finds critical point of differentiable function. Which can be faster than normal equations for large ‘d’ values. It takes $O(nd)$ per iteration so $O(tnd)$ for $t$ iterations.

Formally,

1. We start with an initial guess: $w^0$
2. We repeatedly refine the guess: $w^{t+1} = w^t - \alpha^t \nabla f(w^t)$
   1. $\alpha$ here is the learning rate.
   2. We move in the negative gradient direction as given some parameters $w$ the direction of largest decrease is $- \nabla f(w)$
3. We stop when $\lVert \nabla f(w^t) \rVert \leq \epsilon$

## Stochastic Gradient Descent (SGD)

However, the runtime of each iteration of regular gradient descent is proportional to $n$. This is problematic when we have large training sets!

Instead of computing the gradient over all training examples, we do it for some random training example $i$. Intuition is that _on average_, the algorithm will head in the right direction

We can use it when minimizing averages (so all regression losses except brittle regression)

When we get close enough to a local minima $w^*$, we enter a region of confusion where some $\nabla f_i(w)$ point towards $w^*$ and others don't. This confusion region is captured by the variance of the gradients

- If the variance is 0, every step goes in the right direction (outside region of confusion)
- If the variance is small, most steps go in the right direction (just inside region of confusion)
- If the variance is large, many steps point in the wrong direction (middle of region of confusion)

Basically, for a fixed stepsize, SGD makes progress until the variance is too large.

![[thoughts/images/sgd-loss.png]]

### Decreasing Step Size

If we decrease the step size as we keep training, we can still converge to a stationary point as long as:

$$\frac{\sum_{t=1}^\infty (\alpha^t)^2}{\sum_{t=1}^\infty \alpha^t} = 0$$
A common option is to use $\alpha^t = O(\frac{1}{\sqrt t})$

### Minibatches

We can train on a 'mini-batch' $B^t$ of examples. Radius of region of confusion is inversely proportional to $B^t$

### Early Stopping

Normally, we stop GD when gradient is close to zero. However, we never know this when doing SGD (as we cannot see the full gradient). We just stop early if the validation set error is not improving (this also reduces overfitting)
