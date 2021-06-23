---
title: "error-handling"
date: 2021-06-23T15:14:28-04:00
---

## Fault Tolerance
How do we defend against attacks in distributed systems with no central authority?

https://en.wikipedia.org/wiki/Byzantine_fault
https://lamport.azurewebsites.net/pubs/byz.pdf

### Zooko's Triangle
Postulates that names of participants can have at most 2 of these 3 properties
-   Human-meaningful: Meaningful and memorable (low-entropy) names are provided to the users.
-   Secure: The amount of damage a malicious entity can inflict on the system should be as low as possible.
-   Decentralized: Names correctly resolve to their respective entities without the use of a central authority or service.

### Sybil Attacks
https://en.wikipedia.org/wiki/Sybil_attack

Sybil attacks are also called sock puppetry

Creating a large number of pseudonymous identities and uses them to gain a disproportionately large influence (e.g. control of >50% nodes allows you to 'override' the concensus)

### Byzantine Generals Problem
This situation can be expressed abstractly in terms of a group of generals of the Byzantine army camped with their troops around an enemy city. Communicating only by messenger, the generals must agree upon a common battle plan. However, one or more of them may be traitors who will try to confuse the others. The problem is to find an algorithm to ensure that the loyal generals will reach agreement. It is shown that, using only oral messages, this problem is solvable if and only if more than two-thirds of the generals are loyal; so a single traitor can confound two loyal generals. With unforgeable written messages, the problem is 
solvable for any number of generals and possible traitors.

### Byzantine Faults
A **Byzantine fault** is any fault presenting different symptoms to different observers. A **Byzantine failure** is the loss of a system service due to a Byzantine fault in systems that require concensus between notes.

Byzantine fault tolerance (BFT) is the property of a system that is able to resist the class of failures derived from the Byzantine Generals’ Problem. This means that a BFT system is able to continue operating even if some of the nodes fail or act maliciously.

"Note that the PoW algorithm is not 100% tolerant to the Byzantine faults, but due to the and the underlying cryptographic techniques, PoW has proven to be one of the most secure and reliable implementations for blockchain networks."