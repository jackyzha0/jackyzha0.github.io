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
		2. Value-sensitive (symbolic execution)
	2. Dynamic program analysis: analyzes the program while running it
	3. Automatic (Concolic) test-case generation

3 main properties about code
1. How the code is written (fairly simple static meta-property analysis)
2. What the code does (program analysis - cannot be done precisely)
3. What the author intended (impossible for fully automatic analysis, not available from the code)

Rice's Theorem: All program analysis problems that are non-trivial are undecidable. There is no program analysis that achieves all of the following for all input problems:
1. Is fully automatic (no user input/interaction other than the program)
2. Always terminates (the analysis itself, not program being analysed)
3. On termination: always says “yes” when the answer should be “yes”
4. On termination: always says “no” when the answer should be “no”

## Designing a Static Analysis
1. Define the goal: what is the property (of all executions) of a program? What problem is the analysis supposed to help?
2. Abstract states $\sigma$: type of information analysis tracks through program
3. Error/output information $E$: type of information returned by analysis
4. Analysis function: define a function $\textrm{analyze}(\sigma,s)$ for analysis steps where
	1. $\sigma$ is an abstract state
	2. $s$ is a program state
	3. returns a pair $(\sigma',E)$ of resulting abstract state plus any errors 
	4. typically defined per-case of type of (supported) statement s
5. Concretisation function: maps abstract states to sets of program states  or sets of program executions - this defines what abstract states mean. What does the analysis "think" is a possible state at this point?
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