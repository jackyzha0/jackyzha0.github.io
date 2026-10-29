---
title: "Wait-free synchronization"
date: 2026-10-29
tags:
  - seed
---

[Source](https://cs.brown.edu/people/mph/Herlihy91/p124-herlihy.pdf)

A wait-free implementation of a shared object lets every process finish any operation in a bounded number of its own steps, no matter how slow or crashed the other processes are.

## Progress guarantees

- Blocking: locks. A stalled lock holder stops everyone else
- Lock-free: some process always makes progress, but an unlucky one can retry forever (a CAS retry loop)
- Wait-free: every process makes progress

## Consensus

- Consensus: n processes all run the same program. Only their initial state and proposed value can differ, and they must all decide the same one of the proposed values
- An object's consensus number is the largest group of processes that can reach consensus wait-free using that object plus ordinary read/write registers

## The hierarchy

- 1: read/write registers
- 2: test-and-set, swap, fetch-and-add, queues, stacks
- ∞: compare-and-swap, load-linked/store-conditional
- The levels are strict. The technique for showing that Y can't implement X for Y < X:
	- X can solve consensus for some number of processes.
	- If Y could implement X, Y could solve consensus for that many processes too.
	- So if Y's consensus number is smaller, the implementation can't exist

## Why registers can't break a tie

- Claim: two processes can't solve consensus wait-free using only read/write registers. Suppose a protocol exists, with P proposing 0 and Q proposing 1
	- It terminates, P and Q decide the same value, and it is one of the proposed values
- The start is bivalent, since P alone must decide 0 and Q alone must decide 1. A state is 0-valent or 1-valent once only one outcome is left, so to decide the protocol has to get from bivalent to univalent
- From a bivalent state, some step always leads to another bivalent state. Suppose not, so every next step settles the outcome
	- Both steps can't settle the same value, or the state wouldn't be bivalent.
	- So whoever steps first decides the outcome. Q has to decide correctly either way, so it must be able to tell who went first
- But in every case, we can construct a schedule of P and Q's steps such that Q can't tell who went first (and so can't tell what the right decision is)

| P's step      | Q's step      | 0-valent world (P first) | 1-valent world (Q first) | Why Q can't tell       |
| ------------- | ------------- | ------------------------ | ------------------------ | ---------------------- |
| Read `x`      | Write `x = 1` | P, then Q                | Q, P never moved         | The read left no trace |
| Write `x = 1` | Write `y = 1` | P, then Q                | Q, then P                | Same state             |
| Write `x = 1` | Write `x = 2` | P, then Q                | Q, P never moved         | Q's write erased P's   |

- Q takes the same steps from both worlds and decides the same value, which is wrong in one
	- Rows 1 and 3: Q running alone from the 1-valent world must decide 1, so it decides 1 in the 0-valent world too. P never moving is allowed because Q can't wait for P
	- Row 2: the two worlds are the same state, so it would have to be both 0-valent and 1-valent
- Those are all the cases, so the supposition fails. The protocol can stay bivalent forever and never decide, which contradicts termination, so no such protocol exists
- Test-and-set *can* break the tie because the value it returns shows who went first
	- It does not work for n > 2, since at that point a peer can't tell which of the other peers won

## Universality

- An object with consensus number n can implement any object wait-free for n processes
- Any object is a state plus deterministic operations, so if every process sees the same operations in the same order, each can replay them and compute the same states and return values. Building a shared object reduces to agreeing on one order, which is what consensus does
- The construction is a shared list of operations
	- To run an operation, a process announces it and then uses consensus to decide which operation is the next entry in the list
	- To get its result, it replays the list up to its own entry
	- Each position needs one consensus decision among the n processes, which an object with consensus number n provides. The announcements and list pointers only need registers
- Helping makes it wait-free. If every process proposed its own operation at each position, one could lose forever, which is lock-free but not wait-free. Instead, at position k each process proposes the pending operation of process k mod n, so within n positions an announced operation is guaranteed to be chosen, and others finish it for a slow process
- It is exactly n because only n processes ever use each consensus object
- This is a shared log plus state machine replication, which [[thoughts/State Machine Replication (SMR)|SMR]], [[thoughts/Tango]] and [[thoughts/CORFU|CORFU]] build on
