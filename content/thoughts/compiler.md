---
title: "Compilers"
date: 2023-04-17
tags:
- seed
---

A **compiler** is a transformation between languages, transforming a source language into a target language.

We design compilers by starting from a fixed abstraction boundary (the existing target language) and building a new layer of abstraction atop it (the new source language).

Starting from the target language, we ask a question: what’s wrong with this language?

Rules of thumb:
- Generally: simplifying something for the many users at the expense of the few compiler writers is usually a good trade-off
- When we create a new language, we want to ensure we understand the meaning of that grammar separate from how it is compiled.
	1. Optimizations depend on when various programs in a language are equivalent
	2. We cannot know whether the compiler is correct if we do not know the meaning of programs before they are compiled
	- We can define the meaning of a language by writing an interpreter.
- Eliminating undefined behaviour by adding static or dynamic checks in the source language improves the ability of programmers to predict behaviour of all programs in your language. However, it is not always practical to achieve. See: [[thoughts/program analysis]]

## Runtimes
The run-time system provides all run-time support required by the language but that that is not provided by the underlying machine. Exactly what this run-time support is depends on the language.

Typically, the language run-time provides memory allocation and deallocation, initialization of the process environment such as the stack, handles returning values to the user, and provides any built-in procedures that all programs in the language can expect to use

## Correctness
A compiler is correct if:
1. the meaning (as defined by the interpreter) of a program `p` is the value `v1`
2. we compile `p` and execute it as a x64 program and get the value `v2`
3. the values `v1` and `v2` are equivalent. 

In general, we have to define equivalence for each pair of source and target languages. 

## Parameterization
Our compilers make decisions based on certain parameters (e.g. the return register, the frame base pointer register, etc.)

Parameterizing the language this way lets us avoid committing to particular register choices, making the language inherently more machine and convention agnostic. This is helpful in designing a compiler with multiple machine backends. If our language definitions were sufficiently parameterized, few if any compiler passes would need to differ between target machines.

## Abstractions
### Abstracting system calls
Normally, we never program the raw CPU—we program the operating system. The CPU together with the operating system implements a different programming language than the CPU by itself.

System calls are x64 primitives provided by the OS. Once we start using system calls, code becomes OS-specific. One of the first things a compiler writer will do is abstract away from system calls.

### Abstracting memory locations
Human memory is much less reliable than computer memory, so we should design languages that make the computer remember more and free the human to remember less. This will prevent the human from causing run-time errors when they inevitably make a mistake and overwrite a register that was still in use.

To address this, we will introduce abstract locations, of which there are an arbitrary number and that the programmer does not need to know what physical location they end up using.

The displacement mode operand is a new operand that can appear in some location positions as the operand of an instruction. This allows accessing memory locations using pointer arithmetic. It is written as `QWORD [reg - int32]` or `QWORD [reg + int32]` in x64, where `reg` is a register holding some memory address and the `int32` is an offset number of bytes from that address to access, as a 32-bit integer. Offsets are always multiples of 8.

This ensures all memory accesses are machine-word aligned, meaning we leave space for all bytes in the word between each access. Note that the offset is negative; we access the stack backwards, following the x64 "stack grows down" convention (we call this *stack discipline*).

## Racket
### Quasiquoting
- Think about it like JavaScript template literals (`` `some value: ${x}` ``) or Python f-strings (`f"some value: {x}"`) but operating on actual source code
- A single quote `'` indicates the start of a piece of code we can treat as data
- A backtick `` ` `` is the same as a single quote except it allows us to template the code using variables
	- We can use the `unquote` operator `,` to insert the value of the variable
		- If we had a `(define x 42)` and then `` `(module ,x) `` becomes `` '(module 42) ``
	- We can use the `unquote-splicing` operator `,@` to 'spread' a list
		- If we had a list `(define xs (list 1 2 3))` and then `` `(module ,@xs)`` becomes `` '(module 1 2 3) ``