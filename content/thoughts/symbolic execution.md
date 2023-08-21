---
title: "Symbolic Execution"
date: 2022-12-04
tags:
  - seed
---

Helps with analysis where there are infinitely many initial states / executions. A (terminating) [[thoughts/program analysis]] can’t precisely explore them all!

**All-executions property: are there any executions of the program which violate the desired condition?** Equivalently, is there any way to reach a statement such that its Failure Condition is true?

Questions that value-dependent all-executions correctness analysis tries to answer:

1. `assert x == 42;` Can assert statements in this code ever fail?
2. `x = a[y];` Can execution of this code ever raise exceptions?
3. `throw new RuntimeException(...);` is this ever reached?
4. Will my function always satisfy its intended postcondition? etc.

5. We will input/unknown values as symbolic values; we give names to these unknowns.  
   We track a symbolic state in our analysis, mapping program variables to symbolic expressions.
6. We will additionally track a set of path conditions: constraints representing the conditions which must be true in order to reach the current program point.

We can do something similar for loops by doing bounded unrolling.

## Program Reachability Example

- For loops
  - Find the set of variables assigned to in the loop body
  - Copy symbolic state before the loop, updating each assigned-to variable to map to a fresh symbolic value
    - Do this once for the start of the loop and once for right after the loop
  - Inside the loop, set the path condition to the loop condition
  - Outside the loop, set the path condition to the inverse of the loop condition
  - Continue both analyses
