---
title: "Hyper-parameter Optimization"
date: 2022-10-21
tags:
  - seed
  - CPSC340
---

How do we efficiently find the “best” hyper-parameters?

More complicated models have even more hyper-parameters. This makes searching all values expensive (increases over-fitting risk)

Simplest approaches:

- Exhaustive search: try all combinations among a fixed set of $\sigma$ and $\lambda$ values.
- Random search: try random values
- Stochastic local search: Generic global optimization methods (simulated annealing, genetic algorithms, and so on)
- Coordinate search: Optimize one hyper-parameter at a time, keeping the others fixed. Repeatedly go through the hyper-parameters
