---
title: "Program Analysis"
date: 2022-10-25
tags:
  - seed
aliases:
  - static analysis
---

1. Concerns what a program does: analysis aim is to check statically/dynamically something about execution behaviours
2. Is flow-sensitive: what the analysis does with a statement is dependent on control flow of the program

Software analysis falls into many categories

1. Metaproperty analysis: anything else except for what the code actually does (e.g. style checkers)
2. Program analysis: analysing what a (part of a) program will do / does / can do
   1. Static program analysis: without running the program. This requires considering all executions of the code of interest which requires context about the execution up to this point
      1. Value-agnostic
      2. Value-sensitive ([[thoughts/symbolic execution]])
   2. Dynamic program analysis: analyzes the program while running it
   3. Automatic (Concolic) test-case generation

3 main properties about code

1. How the code is written (fairly simple static meta-property analysis)
2. What the code does (program analysis - cannot be done precisely)
3. What the author intended (impossible for fully automatic analysis, not available from the code)

See: [[thoughts/Rice's Theorem]]

## Designing a Static Analysis

1. Define the goal: what is the property (of all executions) of a program? What problem is the analysis supposed to help?
2. Abstract states $\sigma$: type of information analysis tracks through program
3. Error/output information $E$: type of information returned by analysis
4. Analysis function: define a function $\textrm{analyze}(\sigma,s)$ for analysis steps where
   1. $\sigma$ is an abstract state
   2. $s$ is a program state
   3. returns a pair $(\sigma',E)$ of resulting abstract state plus any errors
   4. typically defined per-case of type of (supported) statement s
5. Concretisation function: maps abstract states to sets of program states or sets of program executions - this defines what abstract states mean. What does the analysis "think" is a possible state at this point?
   1. (D, A) maps to set of all states in which at least D are declared and A are initialized
   2. (D, A) maps to set of all states in which at most D are declared and A are initialized
   3. (D, A) maps to set of all states in which exactly D are declared and A are initialized
6. (Optionally) termination strategy: for recursive control flow (e.g. loops)

We can do this by instrumenting (changing) the program. We have two places where this can happen

1. Instrumenting source code (e.g. grab AST and modify it)
2. Instrumenting executable (e.g. grab bytecode and modify it)
3. Instrumenting runtime (e.g. modify JVM)

There's also a choice to be made about how/when to perform the analysis

1. Online dynamic analysis: run the analysis as part of / alongside the program
2. Offline dynamic analysis: make the program produce a log; analyse it separately

## Program Slicing Example

NB: We never delete variable declarations, just their initializations. Similarly, we keep flow constructs if they have at least one line inside of them.

### Static

1. Define abstract state $\sigma$ as $(M, L)$ where
   1. $M$ is a map from variable names to what line numbers may have affect that variable at that point
   2. $L$ is a list of control flow dependencies at that point
2. For assignment of `x=e` at line $n$ where `e` is an expression that can contain multiple variables
   1. `M[x]` becomes the union of
      1. The line number `n`
      2. `M[y]` for every `y` in the expression `e`
      3. Unions of all sets in `L`
   2. `L` remains unchanged
3. For if-then-else statements
   1. Push to `L`: the union of `M[y]` for every `y` in the if-condition check
   2. Copy the map `M` to start of the then and else blocks
   3. Continue normally...
   4. At the end of each block, union the `M`s at the end of each block
   5. Pop from `L`
4. For loops
   1. Add loop variable to `M`
   2. Push to `L`: the union of `M[y]` for every y in the loop condition
   3. Continue normally...
   4. When we hit end of loop body, we go back to start of the loop and rewrite. Stop when neither `M` nor `L` update
      1. Each variable in `M` to be union of its old value and the value at the end of the loop
      2. Head of `L` is the union of itself and `M[y]` for every y in the loop condition
   5. Pop from `L`

### Dynamic

1. We add two extra objects to the program state, `m` and `l` which are functionally equivalent to $M$ and $L$ from previously
2. For assignment of `x=e` at line $n$, we update `m` to store
   1. $n$
   2. `m[y]` for each `y` in `e`
   3. `l` flattened
3. For if-then-else statements
   1. Before the statement, we calculate `s` by taking union of all the dependencies in the condition and push this to `l`
   2. We pop `l` after the statement
4. Loops are the same as if-then-else statements but we do steps 1. and 2. inside the loop instead of outside the statement
