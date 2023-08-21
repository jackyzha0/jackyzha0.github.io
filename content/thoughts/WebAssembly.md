---
title: "WebAssembly"
date: 2023-04-29
tags:
  - seed
aliases:
  - WASM
---

> A binary instruction format for a stack-based virtual machine

## Distributed Invocation

[Source](https://youtu.be/YKf5ItBPQ50?t=5030) and talk on [Homestar](https://www.youtube.com/watch?v=BFAMy5-VHak)

We can imagine WASM modules as functions that execute some behaviour. If we [[thoughts/content addressed storage|content address]] it, we now have a consistent way of referring to the same computation. We can imagine a particular WASM module call with a set of parameters as a suspended closure that is deterministic[^1].

Then, if we know we've ran that module with a specific set of parameters and have a receipt that it produced a certain result, we can be sure that we can just use the result instead of doing the computation again. Memoization at global scale!

Once we have a way for compute to be orchestrated at a global scale (e.g. IPVM through Homestar), this means we pretty much have a global mapping from source code + arguments to result.

This actually gives us superlinear results as we increase concurrency (opposite of what the [[thoughts/Universal Scaling Law]] says! [[thoughts/BitTorrent]] does this too)

[^1]: See point on nondeterminism

## Nondeterminism

Nondeterministic execution can only occur in a small number of well-defined cases (described below) and, in those cases, the implementation may select from a limited set of possible behaviors.

[See a list of nondeterministic behaviours in WASM](https://github.com/WebAssembly/design/blob/main/Nondeterminism.md)
