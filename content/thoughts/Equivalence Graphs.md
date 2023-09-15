---
title: "Equivalence Graphs"
date: "2023-09-09"
tags:
  - seed
aliases:
- e-graph
---

[Source](https://arxiv.org/pdf/2304.04332.pdf)

An e-graph compactly represents many equivalent programs. Commonly used in [[thoughts/Equality Saturation|Equality Saturation]] and modern theorem-provers.

It's a data-structure that represents equivalence relations over terms.

It is made up of equivalence classes (or e-classes) which are sets of equivalence nodes (e-nodes). e-nodes are n-ary operators from whatever domain you are operating in (e.g. `/` or `*` for math).

Instead of destructive rewrites over the tree of nodes, we can _grow the e-graph_ by representing the transformed program as new equivalences. The following is an example of rewriting $(2*a)/2$ to be $(a \ll2)/2$.

Originally, the e-class containing `*` just has one item which points to `a` and `2`. We extend the e-class by adding `<<` which points to `a` and `1`, semantically saying that `a * 2` is equivalent to `a << 1`. Note the [[thoughts/Hash consing|Hash consing]] on the nodes to prevent duplication.

![[thoughts/images/e-graph.png]]

Finally, we can pick one 'best' e-node in each e-class. This is called 'extracting' the optimized term.