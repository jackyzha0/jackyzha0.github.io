---
title: "Gradient descent"
date: 2022-10-12
tags:
- seed
- CPSC340
---

When we minimize or maximize a function, we call it optimization.

Gradient descent is essentially an iterative optimization algorithm that takes a guess and refines it using the gradient to make a better guess.

If the objective function is a convex function, then it will converge to a *global optimum*.

Gradient descent finds critical point of differentiable function. Which can be faster than normal equations for large ‘d’ values. It takes $O(nd)$ per iteration so $O(tnd)$ for $t$ iterations.

Formally,
1. We start with an initial guess: $w^0$
2. We repeatedly refine the guess: $w^{t+1} = w^t - \alpha^t \nabla f(w^t)$
	1. $\alpha$ here is the learning rate.
	2. We move in the negative gradient direction as given some parameters $w$ the direction of largest decrease is $- \nabla f(w)$
3. We stop when $\lVert \nabla f(w^t) \rVert \leq \epsilon$

