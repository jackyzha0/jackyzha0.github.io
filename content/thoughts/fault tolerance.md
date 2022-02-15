---
title: "Fault Tolerance"
date: 2021-06-23T15:14:28-04:00
tags:
- sapling
---

How do we defend against attacks in distributed systems with no central authority?

Related: [game theory](thoughts/game%20theory.md)

## Zooko's Triangle
Postulates that names of participants can have at most 2 of these 3 properties
-   Human-meaningful: Meaningful and memorable (low-entropy) names are provided to the users.
-   Secure: The amount of damage a malicious entity can inflict on the system should be as low as possible.
-   Decentralized: Names correctly resolve to their respective entities without the use of a central authority or service.

Maybe another version of [Arrow's Impossibility Theorem](https://en.wikipedia.org/wiki/Arrow%27s_impossibility_theorem)?

## Sybil Attacks
[Source: Sybil attack on *Wikipedia*](https://en.wikipedia.org/wiki/Sybil_attack)

Sybil attacks are also called sock puppetry

Creating a large number of pseudonymous identities and uses them to gain a disproportionately large influence (e.g. control of >50% nodes allows you to 'override' the consensus)

**3E's of Preventing Sybil Attacks**
1. Entry Cost
2. Existence Cost
3. Exit Penalty

## Byzantine Faults
Sources: [Byzantine Faults on *Wikipedia*](https://en.wikipedia.org/wiki/Byzantine_fault) and [Paper on the Byzantine Generals Problem](https://lamport.azurewebsites.net/pubs/byz.pdf)

A **Byzantine fault** is any fault presenting different symptoms to different observers. A **Byzantine failure** is the loss of a system service due to a Byzantine fault in systems that require [consensus](thoughts/consensus.md) between notes.

Byzantine fault tolerance (BFT) is the property of a system that is able to resist the class of failures derived from the Byzantine Generals’ Problem. This means that a BFT system is able to continue operating even if some of the nodes fail or act maliciously.

"Note that the PoW algorithm is not 100% tolerant to the Byzantine faults, but due to the and the underlying cryptographic techniques, PoW has proven to be one of the most secure and reliable implementations for blockchain networks."

### Byzantine Generals Problem
This situation can be expressed abstractly in terms of a group of generals of the Byzantine army camped with their troops around an enemy city. Communicating only by messenger, the generals must agree upon a common battle plan. However, one or more of them may be traitors who will try to confuse the others. The problem is to find an algorithm to ensure that the loyal generals will reach agreement.

It is shown that, using only oral messages, this problem is solvable if and only if more than two-thirds of the generals are loyal; so a single traitor can confound two loyal generals. With unforgeable written messages, the problem is solvable for any number of generals and possible traitors.

