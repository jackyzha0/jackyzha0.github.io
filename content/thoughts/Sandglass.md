---
title: "Sandglass"
date: 2022-08-10
tags:
  - seed
---

A _permissionless_ [[thoughts/consensus|consensus]] algorithm that guarantees deterministic agreement and termination under a crash-stop [[thoughts/system model|system model]].

[Source Writeup](https://decentralizedthoughts.github.io/2022-06-21-sandglass/)

Sandglass proceeds in virtual rounds.
Every round, nodes propose a value $v$ by broadcasting it. Values come with an associated priority.

1. In the first round, each node proposes its initial value $v_0$ with priority initialized to 0.
2. In subsequent rounds, nodes propose a value $v_i$ chosen among those received in the previous round.
   1. The priority of $v_i$ depends on the number of consecutive rounds during which $v$ was the only value received by the node proposing $v_i$.
   2. Whenever a node receives a value other than *v*, it resets $v$’s priority back to 0. When proposing a value in a given round, node $p$ selects the highest priority value received in the previous round; if multiple values have the same priority, then it selects randomly among them.
3. A node can safely decide a value $v$ after $v$'s priority is sufficiently high. Termination follows from the non-zero probability that the necessary sequence of unanimous, consecutive rounds will actually eventually occur.
