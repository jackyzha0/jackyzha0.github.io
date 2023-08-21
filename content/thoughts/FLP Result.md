---
title: "FLP Result"
date: 2022-07-01
tags:
  - seed
---

Consensus in distributed systems **cannot be asynchronous** due to the FLP Result: there is no deterministic consensus algorithm that is guaranteed to terminate in an asynchronous crash-stop [[thoughts/system model|system model]]

This holds even if $f = 1$

Similar to tradeoffs made in the [[thoughts/CAP Theorem|CAP Theorem]], when under attack, we need to choose between

- [[thoughts/safety|safety]]
- [[thoughts/consistency]]
- [[thoughts/liveness|liveness]]/availability

This can somewhat be abated by randomized protocols (see: [[thoughts/HoneyBadgerBFT|HoneyBadgerBFT]], [[thoughts/longest-chain consensus|Nakamoto consensus]])
