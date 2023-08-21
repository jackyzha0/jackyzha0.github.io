---
title: "Automatic Differentiation (AD)"
date: 2022-12-03
tags:
  - seed
  - CPSC340
---

- Input: code computing a function
- Output: code to compute one or more derivatives of the function.

AD writes functions as a sequence of simple compositions
$$f_5(f_4(f_3(f_2(f_1(x)))))$$

And writes derivatives using the chain rule:

$$f'(x) = f_5'(f_4(f_3(f_2(f_1(x)))))*f_4'(f_3(f_2(f_1(x))))*f_3'(f_2(f1 (x)))*f_2'(f_1(x))*f_1'(x)$$

We decompose code using the chain rule to make derivative code. This can lead to a lot of redundant computations. We can use dynamic programming to avoid redundant calculations.

## Multi-variable AD

We define a computation graph as a DAG

- Root nodes are the parameters (and inputs).
- Branch nodes are computed values (𝛼 values).
- Leaf node is the function value.

Two stages (example of a function that takes $x$ and $y$ and calculates a $z$):

1. Forward AD pass is called forward propagation:
   - Computes $z$ from $x$ and $y$ and passes it to its outputs
   - Storing intermediate calculations $\frac{\partial z}{\partial x}$ and $\frac{\partial z}{\partial y}$
2. Backward AD pass is called backpropagation:
   - Starts from the end with $\partial \mathcal L / \partial \mathcal L$ which is just 1
   - Computes $\frac{\partial \mathcal L}{\partial x}$ and $\frac{\partial \mathcal L}{\partial y}$ from $\frac{\partial \mathcal L}{\partial z}$
     - Using intermediate calculations stored during forward pass
     - $\frac{\partial \mathcal L}{\partial x} = \frac{\partial \mathcal L}{\partial z} \frac{\partial z}{\partial x}$
     - $\frac{\partial \mathcal L}{\partial y} = \frac{\partial \mathcal L}{\partial z} \frac{\partial z}{\partial y}$
