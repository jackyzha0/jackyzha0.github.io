---
title: Abstract Machines
date: 2023-10-14
tags:
  - seed
---


An **abstract machine** is a theoretical model that allows for a detailed and precise analysis of how a computer system functions.

Abstract machines are 
1. "machines" because they allow step-by-step execution of programs; 
2. "abstract" because they ignore many aspects of actual (hardware) machines.

A typical abstract machine consists of a definition in terms of input, output, and the set of allowable operations used to turn the former into the latter.

One such example is the Turing machine.

See also: [[thoughts/Lambda Calculus|Lambda Calculus]]

## Classifications
- Deterministic abstract machines
	- For some given allowable operation and some input, it always produces the same output.
- Non-deterministic abstract machines
	- Non-deterministic algorithms are helpful for obtaining approximate answers when deriving a precise solution using a deterministic approach is difficult or costly.