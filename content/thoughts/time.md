---
title: "Time"
date: 2023-04-15
tags:
- seed
---

The main insight from Einstein's special relativity is that *time is relative*. And as such, points in space-time are not totally ordered but rather partially ordered (see: [[thoughts/Order theory]]).

Two observers of the same event might perceive it to have occurred at different times, depending on their relative motion. Or, in distributed systems land, two nodes may receive the same messages in different ordering, depending on network conditions.

How do your order the events in the Universe? The answer, as Lamport noted, is you order events in terms of messages that could be sent between them.

See also: [[thoughts/A Certain Tendency Of The Database Community]], [[thoughts/causality]]

## Virtual Time
[Virtual Time](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.134.6637&rep=rep1&type=pdf) (Jefferson, 1985)

A [[thoughts/git]] *rebase*-like approach to resolving conflict

- Similar to [[thoughts/Antimatter]] and netcode rollback
	- Programmers can write correct software without paying any attention to late-arriving messages, and even with no knowledge of the possiblity of rollback, just as they can write without any attention to, or knowledge of, the possibility of page faults in a virtual memory system.
	- For every message there exists an antimessage that is exactly like it in format and content except in one field, its sign. Whenever a message and its antimessage occur in the same queue, they immediately annihilate one another.
- Uses a global virtual time (GVT) watermark
	- Similar to GST in [[thoughts/system model#Timing behaviour (e.g. latency)|timing behaviours in system models]]
	- Min of
		1. all virtual times in all virtual clocks at time $r$
		2.  the virtual send times of all messages that have been sent but not yet processed at time $r$
	- Avoids indefinite queue/buffer growth by trimming all messages with virtual times less than GVT
	- However, this algorithm is bounded by the slowest connection, which makes it infeasible for an asynchronous latency model (e.g. local first)