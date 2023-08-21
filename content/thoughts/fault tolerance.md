---
title: "Fault Tolerance"
date: 2021-06-23T15:14:28-04:00
tags:
  - sapling
---

How do we defend against attacks in [[thoughts/distributed systems|distributed systems]] with no central authority? We want the system as a whole to continue working, even when some parts are faulty

- Failure: system as a whole isn't working
- Fault: some part of the system isn't working
  - Probability of all $n$ replicas being faulty: $p^n$
  - Probability of 1 or more replicas being faulty: $1 - (1-p)^n$

Related: [game theory](thoughts/game%20theory.md), [[thoughts/Zooko's Triangle|Zooko's Triangle]], [[thoughts/Sybil Attack|Sybil attack]], [[thoughts/cascading failures|cascading failures]], [[thoughts/Byzantine Faults|Byzantine Faults]]

### Two Generals Problem

This thought experiment meant to illustrate the pitfalls and design challenges of attempting to coordinate an action by communicating over an unreliable link. In the experiment, two generals are only able to communicate with one another by sending a messenger through enemy territory. The experiment asks how they might reach an agreement on the time to launch an attack, while knowing that any messenger they send could be captured. It is required that the two generals have their armies attack the city simultaneously to succeed, lest the lone attacker army die trying.

Because acknowledgement of message receipt can be lost as easily as the original message, a potentially infinite series of messages is required to come to consensus.

This problem is unsolvable.

### Byzantine Generals Problem

This situation can be expressed abstractly in terms of a group of generals of the Byzantine army camped with their troops around an enemy city. Communicating only by messenger, the generals must agree upon a common battle plan. However, one or more of them may be traitors who will try to confuse the others. The problem is to find an algorithm to ensure that the loyal generals will reach agreement.

It is shown that, using only oral messages, this problem is solvable if and only if more than two-thirds of the generals are loyal; so a single traitor can confound two loyal generals. With unforgeable written messages, the problem is solvable for any number of generals and possible traitors.

See: [[thoughts/Byzantine Faults]]

## Designing Robust Networks

See also: [[thoughts/Network Theory|Network theory]], [[thoughts/cascading failures]]

Designing networks that are simultaneously robust to attacks *and* random failures appears to be a conflicting desire

- The hub-and-spoke network is robust to random failures, as only the failure of its central node can break the network into isolated components, but a single targeted attack can fragment the network.
- A completely random network lacks hubs, the impact of an attack is similar to the impact of random node removal -- both are equally bad and can easily fragment a network.

To maximize robustness, we want to maximize the 'breakdown' or critical threshold: $f_c^{tot} = f_c^{rand} + f_c^{targ}$

This is maximized by having a bimodal degree distribution where an $r$ fraction of nodes have degree $k_{max}$ and the remaining $1-r$ fraction have degree $k_{min}$

### Robustness vs Resilience vs Redundancy

- Robustness: able to maintain basic functions in the presence of internal and external errors (static).
- Resilience: able to adapt to internal and external errors by changing its mode of operation to maintain its ability to function (dynamic).
- Redundancy: presence of parallel components and functions that can replace missing components or functions.
