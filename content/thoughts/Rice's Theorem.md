---
title: "Rice's Theorem"
date: 2023-04-17
tags:
  - seed
---

We cannot decide anything "interesting" about any Turing-complete program. "Interesting" is defined as any property that is not either true for every program, or false for every program. "Decide" means write a program that returns either true or false on all programs. The halting program is an instance of Rice’s Theorem.

## Formally

All program analysis problems that are non-trivial are undecidable. There is no program analysis that achieves all of the following for all input problems:

1. Is fully automatic (no user input/interaction other than the program)
2. Always terminates (the analysis itself, not program being analysed)
3. On termination: always says “yes” when the answer should be “yes”
4. On termination: always says “no” when the answer should be “no”
