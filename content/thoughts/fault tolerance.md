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

Related: [game theory](thoughts/game%20theory.md), [[thoughts/Zooko's Triangle|Zooko's Triangle]], [[thoughts/Sybil Attack|Sybil attack]]
## Byzantine Faults
Sources: [Byzantine Faults on *Wikipedia*](https://en.wikipedia.org/wiki/Byzantine_fault) and [Paper on the Byzantine Generals Problem](https://lamport.azurewebsites.net/pubs/byz.pdf)

A **Byzantine fault** is any fault presenting different symptoms to different observers. A **Byzantine failure** is the loss of a system service due to a Byzantine fault in systems that require [consensus](thoughts/consensus.md) between notes.

Byzantine fault tolerance (BFT) is the property of a system that is able to resist the class of failures derived from the Byzantine Generals’ Problem. This means that a BFT system is able to continue operating even if some of the nodes fail or act maliciously.

"Note that the PoW algorithm is not 100% tolerant to the Byzantine faults, but due to the and the underlying cryptographic techniques, PoW has proven to be one of the most secure and reliable implementations for blockchain networks."

### Two Generals Problem
This thought experiment meant to illustrate the pitfalls and design challenges of attempting to coordinate an action by communicating over an unreliable link. In the experiment, two generals are only able to communicate with one another by sending a messenger through enemy territory. The experiment asks how they might reach an agreement on the time to launch an attack, while knowing that any messenger they send could be captured. It is required that the two generals have their armies attack the city simultaneously to succeed, lest the lone attacker army die trying.

Because acknowledgement of message receipt can be lost as easily as the original message, a potentially infinite series of messages is required to come to consensus.

This problem is unsolvable.

### Byzantine Generals Problem
This situation can be expressed abstractly in terms of a group of generals of the Byzantine army camped with their troops around an enemy city. Communicating only by messenger, the generals must agree upon a common battle plan. However, one or more of them may be traitors who will try to confuse the others. The problem is to find an algorithm to ensure that the loyal generals will reach agreement.

It is shown that, using only oral messages, this problem is solvable if and only if more than two-thirds of the generals are loyal; so a single traitor can confound two loyal generals. With unforgeable written messages, the problem is solvable for any number of generals and possible traitors.

