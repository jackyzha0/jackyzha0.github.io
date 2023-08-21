---
title: "Transitive Closure"
date: 2023-01-01
tags:
  - seed
---

![[thoughts/images/transitive closure.png]]

Let:

- $X$ be the set of elements
- $\mathcal R$ be the set of relations
- $\mathcal R^2$ be the set of relations which can be reached from two hops of relations in $\mathcal R$
  - For example, `(a,c)` is reached by going through `(a,b) -> (b,c)`
- $\mathcal R^*$ is the entire transitive closure over $\mathcal R$
