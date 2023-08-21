---
title: "PSL-FLM Impossibility Result"
date: 2022-07-01
tags:
  - seed
---

[[thoughts/Byzantine Broadcast|Byzantine Broadcast]] is impossible in the synchronous [[thoughts/system model|system model]] if you have too many byzantine nodes (for $f \geq \frac n 3$).

Vague intuition for the result, imagine 3 nodes A (Byzantine), B (honest), and C (Byzantine)

1. Node A is the sender
2. A could tell B + C conflicting things
3. B + C can compare histories but C can try to frame A
4. B can't distinguish which of A or C are responsible for conflict

This result **breaks down** in the presence of [[thoughts/Public-key Infrastructure|PKI]] (you can't forge signatures from other nodes!!)

- Thus, with PKI we get [[thoughts/Byzantine Broadcast|BB]] for all $f$
- Without PKI, we get [[thoughts/Byzantine Broadcast|BB]] only if $f < \frac n 3$
