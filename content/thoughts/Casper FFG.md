---
title: "Casper FFG"
date: 2022-08-09
tags:
  - seed
---

> Partial [[thoughts/consensus|consensus]] mechanism as an overlay on top of proposal mechanisms to finalize blocks (selecting a unique chain that represents the canonical history of the chain)

It enables:

1. an accountability mechanism so that Byzantine validators can be penalized.
2. support for a dynamic set of validator nodes
3. additional defences against long range revision attacks

From a foundational/technical perspective, Casper is essentially chained [[thoughts/Tendermint|Tendermint]]

[Source Paper](https://arxiv.org/pdf/1710.09437.pdf)
