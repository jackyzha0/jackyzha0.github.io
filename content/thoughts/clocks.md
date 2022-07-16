---
title: "Clocks"
date: 2022-05-05
tags:
- seed
aliases:
- physical clock
- logical clock
---

Measuring time in the context of computer systems

## Physical Time
Two types of clock
1. Physical clock: number of seconds elapsed
2. Logical clock: count events, e.g. messages sent

Time is hard! So many different ways of measuring time
- Greenwich Mean Time (GMT): the normal human time format, based on Earth rotation
- International Atomic Time (TAI): some multiple of Caesium-133 resonant frequency
- Compromise, UTC is TAI with corrections to account for Earth rotation
- Unix Time: number of seconds since the epoch (Jan 1, 1970) not counting leap seconds
- ISO8601: year, month, day, hour, minute, second, and timezone offset relative to UTC

Periodically adjust local clock with a server with a more accurate time source using Network Time Protocol (NTP) or Precision Time Protocol (PTP)

How do we estimate time over a network?
- NTP Client sends out a request at $t_1$
- NTP Server receives request at $t_2$
- NTP Server sends a response at $t_3$
- NTP Client receives a request at $t_4$
- Round-trip network delay = $\delta = (t_4-t_1) - (t_3-t_2)$
- **Estimated** single-trip network delay = $\delta / 2$
- Estimated server time when client receives response, so clock skew is $\theta = (t_3 + \delta / 2) - t_4$
- If $\theta < 125ms$, slew the clock: speed it up/slow it down by 500ppm until clocks are in sync
- If $125ms \leq \theta < 1000s$, step the clock: suddenly reset client clock to estimated server timestamp
- If $\theta \geq 1000s$, panic and do nothing (leave it to the humans!)

## Logical Time
Problem is that *even with synced clocks* we can have $t_2 < t_1$ with a message A at $t_1$ with a response B at $t_2$. Here, the timestamp [[thoughts/Order theory|order]] is inconsistent with expected order! This can happen when the clock skew is *less* than the one way network latency.

So we use logical clocks to work based off of *the number of events that have occurred rather than actual time passed.*

### Lamport Clocks
Provides a **partial order** on events

Logic
- On initialization, set `t := 0` for each node
- On any event on local node, `fn tick() -> t += 1`
- On sending message $m$, `fn send(m) -> tick(); actually_send(t, m)`
- On receiving `fn receive(t', m) -> t = max(t, t') + 1; do_something(m)`

Properties
- If $a \rightarrow b$ then $L(a) < L(b)$
- However, $L(a) < L(b)$ does not imply $a \rightarrow b$
- Possible that $L(a) = L(b)$ for $a \neq b$

This means that two identical Lamport timestamps might not correspond to the same unique event. However if we include the node $N(e)$ for the node where event $e$ occurred, then $(L(e), N(e))$ **uniquely identifies** event $e$.

We attempt to define a total [[thoughts/causality|causal]] order

$$(a \prec b) \iff (L(a) < L(b)) \lor (L(a) = L(b) \land N(a) < N(b))$$

However even now, given timestamps $L(a) < L(b)$, we can't tell whether $a \rightarrow b$ or $a \parallel b$

To separate [[thoughts/causality|causality]] from concurrent events, we need vector clocks!

### Vector Clocks
Provides a **causal order** on events

Instead of having a single counter `t` for all nodes, we keep a vector timestamp $a$ of an event for *each* node so we have $V(a) = \langle t_1, t_2, \ldots, t_n \rangle$ where $t_i$ is the number of events observed by node $N_i$

Each node has a current vector timestamp $T$, on an event on node $N_i$, increment vector element $T[i]$

Logic
- On initialization , set `t := [0] * n`
- On any event on node $N_i$, `fn tick() -> t[i] += 1`
- On sending message $m$ from node $N_i$, `fn send(m) -> tick(); actually_send(t, m)`
- On receiving `fn receive(t', m) -> t = zip(t, t').map(max); tick(); do_something(m)`

Thus, a vector timestamp of an event $e$ actually represents all of its *[[thoughts/causality|causal]] dependencies*: $\{ e \} \cup \{a | a \rightarrow e \}$

E.g. $\langle 2, 2, 0 \rangle$ represents first two events from $N_1$, first two events from $N_2$, and no events from $N_3$

Ordering
- $T= T' \iff T[i] = T'[i] \ \forall i \in \{1, \ldots, n\}$ (T and T' are same if each element has the same value)
- $T \leq T' \iff T[i] \leq T'[i] \ \forall i \in \{1, \cdots, n\}$ (T happened at the same time or earlier than T' if each element in T is less than or equal to its value in T')
- $T < T' \iff T \leq T' \land T \neq T'$ (T happened earlier than T' if each element in T is less than its value in T', at least one element in T differs from T')
	- $T \parallel T' \iff T \nleq T' \land T' \nleq T$ (T is incomparable to T')

Properties (based on [[thoughts/Order theory|Order theory]])
- $V(a) \leq V(b) \iff (\{a\} \cup \{e | e \rightarrow a\}) \subseteq (\{b\} \cup \{e | e \rightarrow b\})$
- $V(a) < V(b) \iff (a \rightarrow b)$
- $V(a) = V(b) \iff (a = b)$
- $V(a) \parallel V(b) \iff a \parallel b$

You can tell that versions are in conflict when neither vector clock “descends” from the other. In order for vector clock B to be considered a descendant of vector clock A, each marker in vector clock A must have a corresponding marker in B that has a revision number greater than or equal to the marker in vector clock A. Markers not contained in a vector clock can be considered to have revision number zero.

Vector Clock Example
![[thoughts/images/vector clock example.png]]

## Hybrid Logical Clocks
Physical and logical clocks both have non-ideal properties.
- Logical clocks don't actually store any sort of date-time when events happen. Clients usually have a notion of time through actual wall time
- BUT wall time isn't perfect either as clock drift is non-trivial and users can manually turn time backwards on their local machines

*Note that this is not a substitute for Vector Clocks as they only provide partial order instead of causal order*

Can we combine them to achieve better properties? 

Hybrid Logical Clocks (HLCs) achieve
- partial ordering
- constant space
- bounded different from physical time

We can store a tuple containing:
- `pt`: physical time (wall time)
- `l`: logical time (holds maximum `pt` so far)
- `c`: capturing causality when `l` is equal

This tuple can be used directly as a replacement for a physical clock timestamp (and in fact works as a superposition on top of the NTP protocol without any interference)

### Pseudocode
- Initial state
	- `l := 0`
	- `c := 0`
- Send / local event
	- `l' := l`
	- `l := max(l', pt)` update `l` to `pt` if applicable
	- if `pt` is the same (`l == l'`):
		- `c += 1` increment causality as logical time is the same
	- if `pt` is updated:
		- `c := 0` reset `c`
	- timestamp message with `(l, c)`
- Receive of message `m`
	- `l' := l`
	- `l := max(l', m.l, pt)`
	- if all logical clocks are the same `l == l' == m.l`:
		- `c := max(c, m.c) + 1` set to max causality known
	- if our logic clocks are the same but message logical clock is behind `l == l'`:
		- `c += 1` (ignore as message clock is behind)
	- if our logic clock was behind the message logical clock and just got updated `l == m.l`
		- `c := m.c + 1`
	- otherwise `pt` was just updated
		- `c := 0` reset `c`
	- timestamp message with `(l, c)`