---
title: "Compilers"
date: 2023-04-17
enableToc: true
tags:
  - seed
---

A **compiler** is a transformation between languages, transforming a source language into a target language.

We design compilers by starting from a fixed abstraction boundary (the existing target language) and building a new layer of abstraction atop it (the new source language).

Starting from the target language, we ask a question: what’s wrong with this language?

Rules of thumb:

- Generally: simplifying something for the many users at the expense of the few compiler writers is usually a good trade-off
- When we create a new language, we want to ensure we understand the meaning of that grammar separate from how it is compiled.
  1.  Optimizations depend on when various programs in a language are equivalent
  2.  We cannot know whether the compiler is correct if we do not know the meaning of programs before they are compiled
  - We can define the meaning of a language by writing an interpreter.
- Eliminating undefined behaviour by adding static or dynamic checks in the source language improves the ability of programmers to predict behaviour of all programs in your language. However, it is not always practical to achieve. See: [[thoughts/program analysis]]

## Runtimes

The run-time system provides all run-time support required by the language but that that is not provided by the underlying [[thoughts/computer architecture|machine]]. Exactly what this run-time support is depends on the language.

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

## Administrative Languages

An intermediate language whose semantics does not differ at all from its parent language, but whose syntax is potentially decorated with additional data that simplifies the next step of the compiler.

In a production compiler, we would probably not represent these administrative languages at all, but instead store the contents of the info field "on the side", as a separate data structure. This would prevent us from deconstructing and reconstructing the syntax tree when modifying or accessing the info field.

## Abstractions

### Abstracting system calls

Normally, we never program the raw CPU—we program the operating system. The CPU together with the operating system implements a different programming language than the CPU by itself.

System calls are x64 primitives provided by the OS. Once we start using system calls, code becomes OS-specific. One of the first things a compiler writer will do is abstract away from system calls.

### Abstracting memory locations

#### Frame Variables

Human memory is much less reliable than computer memory, so we should design languages that make the computer remember more and free the human to remember less. This will prevent the human from causing run-time errors when they inevitably make a mistake and overwrite a register that was still in use.

To address this, we will introduce abstract locations, of which there are an arbitrary number and that the programmer does not need to know what physical location they end up using.

The displacement mode operand is a new operand that can appear in some location positions as the operand of an instruction. This allows accessing memory locations using pointer arithmetic. It is written as `QWORD [reg - int32]` or `QWORD [reg + int32]` in x64, where `reg` is a register holding some memory address and the `int32` is an offset number of bytes from that address to access, as a 32-bit integer. Offsets are always multiples of 8.

This ensures all memory accesses are machine-word aligned, meaning we leave space for all bytes in the word between each access. Note that the offset is negative; we access the stack backwards, following the x64 "stack grows down" convention (we call this _stack discipline_).

#### Abstract Locations

We define an abstract location to be a unique name for some physical location, that is unique for some unit of allocation. Each abstract location must be allocated a physical location somewhere on the machine.

### Value-orientation

We want to move towards a value-oriented language, i.e., a language where operations consume and produce values directly, and away from an imperative language that manipulates some underlying machine state. This would free the programmer from keeping the state of the machine in mind at all times.

### Control Flow

Labels and jumps are a small change to the language syntactically, but have a large effect on the semantics.

We can no longer write the interpreter in one simple loop over the instructions. Instead, we need some way to resolve labels. When running the interpreter, we must be able to jump to any expression at any time—a possibility the language now allows. This process of resolving labels is called linking.

We use a low-level linking implementation that is similar to the operating system’s linker: we first resolve all labels to their address in memory (in our case, their index in the instruction sequence) and then implement jumps by simply setting a program counter to the instruction’s address.

To simplify reasoning about programs with control flow, we can organize code into basic blocks, labeled blocks where control can only enter the beginning of the block and must exit at the end of the block. In particular, we will be able to annotate which registers are undead on entry to and on exit from a block, so our analysis does not have to resolve labels and jumps.

### Procedures/Functions

We introduce a common method of reusing code: procedural abstraction.

The only question is how to pass arguments. The call instruction needs to know in which locations to store the arguments, and the called procedure needs to know from which locations to read its parameters. The problem is deciding how to ensure the locations end up the same. To solve this, we introduce a calling convention.

We could also use the stack to implement the calling convention. This is simpler, as we can keep registers abstract and need to expose memory high in the compiler pipeline anyway, but slower since every procedure call must now access memory.

Instead, we fix a set of physical locations. Both the caller and the callee agree that those locations are the only thing they need to know about.

Our **calling convention** passes the first n arguments as registers, using the set of registers defined in the parameter `current-parameter-registers`. The default value is `'(rdi rsi rdx rcx r8 r9)`, which is defined by the x64 System V ABI to be where the first 6 arguments of any procedure are stored. For the rest, we use fresh frame variables.

To handle procedure calls in effect position, we must use a stack of frames. A frame is a procedure’s set of frame variables needed after a non-tail call. Note that arguments are placed on the _callee_'s frame instead of the caller's frame.

1. We arrange that all values live after a non-tail call are stored in frame variables
2. We push the callers’s frame onto the stack. This is done by decrementing the frame base pointer past the last frame variable
3. The call happens and returns
4. After returning from a call, we pop the caller’s frame from the stack by incrementing the frame base pointer back to its original value

The size of a given non-tail call is the maximum of:

1. the number of locations in the call-undead, or
2. one more than the index of the largest frame location in the call-undead set.

### Data types

A static type system may take care to prevent the user from calling an integer as a procedure, for example. Even dynamically typed languages may need to distinguish different kinds of data at run time.

To enable the language to distinguish different kinds of data, we can steal a few of our 64 bits to represent a data type tag. This limits the range of machine integers, but allows us to us to distinguish data dynamically, enabling safety and abstractions that must differentiate data dynamically.

This approach is called object tagging. Each data type in our language will now be represented by a ptr (pronounced like footer). A ptr is a machine word whose n least-significant bits represent the primary tag, and whose upper `(- (* 8 (current-word-size-bytes)) n)` bits represent the data (this allows us to represent $2^n$ data types).

This lets us implement data-type checking by providing the following primitive operations (which we implement with further, low-level primitives in x64):

1. Tagging, i.e., given some machine integer, tag it to indicate what data type it represents, producing a tagged representation of the underlying data. This tagged representation will happen to correspond to some machine integer, since all sequences of bits do, but maybe not in any meaningful way.
2. Untagging, i.e., given some tagged representation, remove the tag returning the underlying data that can be used with primitive x64 instructions.
3. Tag checking, i.e., given some tagged representation, get the tag or compare the tag to something.

### Heap Allocation

We need three additional operations

1. memory allocation (to implement constructors)
2. dynamically computed memory assignment
3. dynamically computed memory dereference

To implement allocation, we need some strategy for managing memory. Our run-time system or compiler needs to know what memory is in use, how to allocate (mark free memory as in use), and how to deallocate memory (return in-use memory to the pool of free memory and ultimately to the system). There are many strategies for this, such as

1. "let the user deal with it" (managed languages like C)
2. "add a process to the run-time system that dynamically manages memory" (garbage collected languages like JavaScript and Go)
3. "make the type system so complex that the compiler can statically manage memory" (Rust)

### Closures

Every instance of lambda compiles to a procedure. The procedure now has three pieces of information:

1. its arity for dynamic checking;
2. the label to its code, the computation it executes when invoked; and
3. its environment, the values of the free variables used in the definition of the procedure

Our procedure data structure is essentially a vector containing a label to the code and the values of each free variable in its environment.

Closure conversion is not the only way to implement first-class procedures. An alternative that can avoid some of the allocation cost of closures is defunctionalization, but this does not work well with separate compilation.

## Optimizations

Any compiler optimization should be seen as a transformation between programs in the same language, i.e.,, an intra-language transformation.

Optimizations should not change the _correctness_ of a solution, only improving its performance characteristics

### Register Allocation

While memory accesses have improved a lot compared to old computers due to caching, accessing memory are still orders of magnitude slower than accessing a register when our variable is not in the cache (see: [[thoughts/systems design]]). Our compiler will have better performance if we help the machine out by using registers as much as possible

Conceptually, register allocation is a simple idea.

1. Undeadness (liveness) analysis: figure out which abstract locations might still be needed after each instruction.
   - We assume that any variable that gets used, or might get used, might be not dead
   - We consider a variable dead only when we have conclusive proof (e.g. storing a new value in that variable)
   - To calculate this, we loop over the instruction sequence backwards
     - This algorithm requires a default undead-out set for the last instruction in the scope of our analysis (for most, we assume this is the empty set though this is not always the case. e.g., functions assume that the return value location is live at the end of the function).
     - In each iteration, we start by assuming the undead-in set is the same as the undead-out set, then update it depending on what happens in the instruction
       - If a variable is defined, i.e., its value is overwritten in the instruction, it is definitely dead upon entry to this intruction, so we remove it from the undead-in set.
       - If a variable is referenced in the instruction, it ought to be live and is added to the undead-in set.
2. Conflict analysis: figure out which abstract locations cannot be assigned to the same physical location because they both contain values that are needed at the same time.
   - Any variable defined during a non-move instruction is in conflict with every variable (except itself) in the undead-out set associated with the instruction.
   - Any variable defined during a move instruction is in conflict with every variable in the undead-out set associated with the instruction, except itself and the variable referenced in the move.
3. Register allocation: assign each abstract locations to a register that is different from any conflicting abstract locations.
   - Recursive graph-colouring register allocation. This normally uses a [[thoughts/disjoint-set|disjoint-set]]
   1. If the set of abstract locations is empty, return the empty assignment.
   2. Otherwise, choose a low-degree abstract location from the input set of abstract locations, if one exists. Otherwise, pick an arbitrary abstract location from the set. A low-degree abstract location is one with fewer than k conflicts, for some for pre-defined k. We pick k to be the number of registers in the set of assignable registers.
   3. Recurse with the chosen abstract location removed from the input set and the conflict graph. The recursive call should return an assignment for all the remaining abstract locations.
   4. Attempt to select a register for the chosen abstract location. You cannot select registers to which conflicting abstract locations were assigned by the recursive call. This attempt succeeds if a low-degree abstract location was chosen, and might fail otherwise
4. Spilling: if we fail to find a register for an abstract location, put it in a frame variable instead.
   1. If you succeed in selecting a register, then add the assignment for the chosen abstract location to the result of the recursive call.
   2. Otherwise, we cannot assign the chosen abstract location to a register. Instead, we spill it, i.e., we assign it a frame variable. We can assign a fresh variable, but we can reduce memory usage by trying to assign a non-conflicting frame variable.

In general, we will never do a perfect job, due to [[thoughts/Rice's Theorem]].

#### With procedures

When analyzing the program to determine how variables are used, we can either:

1. Intraprocedural: interpret the program as a tree, analyzing and allocating registers to each block separately and essentially ignoring jumps, or
2. Interprocedural: interpret the program as a graph, trying to follow control and data flow to determine the destination of a jump, in order to analyze conflicts and allocate registers across jumps.

## Language Forms

- Monadic form (MF): a syntactic form that allows composing operations that operate on values and have no side-effect (such as changing the value of an abstract location), but requires explicit sequencing any effectful operations
  - Canonical monadic form (CMF): a syntactic form in which equal programs (for some notion of equality) have the same representation. The form is canonical in the sense that there is one right way to represent every program
  - Writing transformations and optimizations over CMF is often easier since we do not have to manually consider two equal programs as they have the same representation.
- A-normal form (ANF): a syntactic form that restricts all operations to trivial values, and forbids nesting in our value position. It is roughly equivalent to other compiler intermediate forms, such as static-single assignment. All ANF programs are in MF but the inverse does not hold

## Racket

### Quasiquoting

- Think about it like JavaScript template literals (`` `some value: ${x}` ``) or Python f-strings (`f"some value: {x}"`) but operating on actual source code
- A single quote `'` indicates the start of a piece of code we can treat as data
- A backtick `` ` `` is the same as a single quote except it allows us to template the code using variables
  - We can use the `unquote` operator `,` to insert the value of the variable
    - If we had a `(define x 42)` and then `` `(module ,x) `` becomes `'(module 42)`
  - We can use the `unquote-splicing` operator `,@` to 'spread' a list
    - If we had a list `(define xs (list 1 2 3))` and then `` `(module ,@xs)`` becomes `'(module 1 2 3)`
