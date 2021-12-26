---
title: "Computability"
date: 2021-08-06T19:12:58-04:00
tags:
- seed
---

## The computational metaphor
[Source](https://palladiummag.com/2020/08/04/digital-salon-with-stephen-wolfram-building-a-new-kind-of-science/)

There is a creaking issue in universities where 70% of incoming students want to study computer science but only 5% of faculty is in computer science. What's really going on is we want to study computer science as a proxy for the computational paradigm for everything around us

Is the universe computable? Implies the universe has finite precision.

Is there a computable $x$ for all $x$?

## General Computability
Source text from The Mechanical Mind by Crane

### What is a computer?
- device which processes [representations](/thoughts/representation) in a systematic way
-   algorithm → method for calculating the value of a function
	-   "effective procedures" → procedures which, if applied correctly, are entirely effective in bringing about their results (always work)
	-   computable if the algorithm gives the value of a function for any argument
	-   church's thesis → anything that can be executed by a Turing machine is computable
-   conditions to be considered an algorithm
	-   definite next step
	-   finite number of steps

### Turing machine
- the simplest possible device that could perform any computation no matter how complicated
    -   has long (infinitely long) tape with squares
    -   device that can write/read the symbols on the tape
    -   device can have and change internal states
    -   device can move tap one left or one right
    -   possible operations are dictated by machine's 'machine table'
        -   a set of instructions of the form 'if the machine is in state X and reading symbol S, then do Y and move tape right/left'

### Instantiating vs Computing function
-   instantiating → being an instance of/describable by a function
-   computing → employs representations of input and output
-   even if a person could be modeled by a Turing machine, that would not show that thinkers are computers, rather, it would show that a thinker instantiates a function, not that it computes that function.
-   much too difficult to calculate everything in real-time, employ the use of heuristics to help us make best judgements (e.g. Ten Commandments)
