---
title: "Equality Saturation"
date: "2023-09-09"
tags:
  - seed
aliases:
- EqSat
---

In a traditional [[thoughts/compiler|compilers]], optimizations are applied sequentially, with each optimization taking as input the program produced by the previous one. 

One of the drawbacks is that the order in which optimizations are run affects the quality of the generated code, a problem commonly known as the **phase ordering problem**. That is, optimization stages are **not** commutative. The local nature of these optimization heuristics makes it difficult to take into account the effect of future optimizations.

Instead, the set of candidate optimized programs is computed by repeatedly inferring **equivalences** between program fragments, thus allowing us to represent the effect of many possible optimizations at once. Equality analysis effectively looks to instantiate equality axioms or rules that we know are equivalent. For example, simplifying `a * 0` to `0` but they can also get more complicated (e.g. inlining, tail recursion elimination).

Optimizations can work as before, except that when the optimization would have performed a transformation, it now simply records the transformation as an equality. After a program is converted into IR, we repeatedly apply equality analyses to infer new equalities until no more equalities can be inferred, a process known as equality saturation.

## Pseudo-code

```python
def equality_saturation(expr, rewrites):
  egraph = initial_egraph(expr)

  # hot loop
  while not egraph.is_saturated_or_timeout():
    for rw in rewrites:
      # read step -> find substitutions
      # ematch searches for the pattern in the egraph
      # returns a list of pairs of substitutions and the eclass it was found in
      for (subst, eclass) in egraph.ematch(rw.lhs):
        # write step, ensure we restore invariants here
        eclass2 = egraph.add(rw.rhs.substitute(subst))
        # restore congruence!
        egraph.merge(eclass, eclass2)
return egraph.extract_best()
```

Things to note:
1. rewrites are ordered
2. reads and writes are interleaved which means we need to do more invariant maintenance

What `egg` does (deferred invariant maintenance):

```python
def equality_saturation(expr, rewrites):
  egraph = initial_egraph(expr)
  while not egraph.is_saturated_or_timeout():
    # difference here is we partition the reads/writes separately
    matches = []

    # all reads, we can parallelize
    for rw in rewrites:
      for (subst, eclass) in egraph.ematch(rw.lhs):
        matches.append((rw, subst, eclass))

    # all writes
    for (rw, subst, eclass) in matches:
      eclass2 = egraph.add(rw.rhs.substitute(subst))
      egraph.merge(eclass, eclass2)
    
    # restore invariants
    egraph.rebuild()
return egraph.extract_best()
```