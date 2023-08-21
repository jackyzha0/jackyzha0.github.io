---
title: "Idempotence"
date: 2022-05-05
tags:
  - seed
---

> How do we avoid cases where losing an ACK could lead to users doing an action multiple times (e.g. pressing the like button)? Idempotence!

$f$ is idempotent if $f(x) = f(f(x))$

For example

- Not idempotent: $f(likeCount) = likeCount + 1$
- Idempotent: $f(likeSet) = likeSet \cup \{userID\}$

Idempotent requests can be retried **without deduplication**.

However, this isn't perfect when there are other actors/actions that intermix. For example, $f(f(x))= f(x)$ but $f(g(f(x))) \neq g(x)$ (e.g. liking, unliking, then liking is not the same as unliking!)

To somewhat fix this, use tombstones and record logical timestamp for when events happen

- Then, we can reconcile replicas by propagating the record with the latest timestamp and discard the records with earlier timestamps
- Then, to fix concurrent writes by different clients
  - Last writer wins (LWW): resolve conflicts using a [[thoughts/clocks|logical clock]] that gives total ordering (e.g. [[thoughts/clocks#Lamport Clocks|Lamport clock]])
  - Multi-value register (give all options to let user/algorithm above resolve it): use a [[thoughts/clocks#Vector Clocks|Vector clock]], $v_2$ replaces $v_1$ if $t_2 > t_1$; preserve both $\{v_1, v_2\}$ if $t_1 \parallel t_2$
