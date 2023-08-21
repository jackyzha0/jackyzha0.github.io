---
title: "Computability"
date: 2021-08-06T19:12:58-04:00
tags:
  - seed
---

## General Computability

Source text from The Mechanical Mind by Crane

A computer is a device which processes [representations](/thoughts/representation) in a systematic way

An algorithm is a method for calculating the value of a function

- "effective procedures" → procedures which, if applied correctly, are entirely effective in bringing about their results (always work)
- Computable if the algorithm gives the value of a function for any argument
- Church's thesis → anything that can be executed by a Turing machine is computable
- Conditions to be considered an algorithm
  - definite next step
  - finite number of steps

### Turing Machine

The simplest possible device that could perform any computation no matter how complicated

Components:

- Memory:
  - A long (infinitely long) tape with squares
  - A device that can write/read the symbols on the tape
  - Device can move tap one left or one right
- Instructions:
  - Possible operations are dictated by machine's 'machine table'
  - A set of instructions of the form 'if the machine is in state X and reading symbol S, then do Y and move tape right/left'

### Instantiating vs Computing function

- Instantiating → being an instance of/describable by a function
- Computing → employs [[thoughts/representation|representation]] of input and output

Even if a person could be modeled by a Turing machine, that would not show that thinkers are computers, rather, it would show that a thinker instantiates a function, not that it computes that function.

## The computational metaphor

[Source: Digital Salon with Stephen Wolfram: Building a New Kind of Science, _Palladium Mag_](https://palladiummag.com/2020/08/04/digital-salon-with-stephen-wolfram-building-a-new-kind-of-science/)

- There is a creaking issue in universities where 70% of incoming students want to study computer science but only 5% of faculty is in computer science. What's really going on is we want to study computer science as a proxy for the computational paradigm for everything around us
- Is there a computable $x$ for all $x$?
  - Is there a computational simulation of a mind is sufficient for the actual presence of a mind?
