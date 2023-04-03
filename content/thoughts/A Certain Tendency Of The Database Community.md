---
title: "A Certain Tendency Of The Database Community"
date: 2022-11-16
tags:
- sapling
---

[Source](https://arxiv.org/pdf/1510.08473.pdf)

[[thoughts/distributed systems|Distributed Systems]] that provide “single system image” semantics (read: [[thoughts/consistency|linearizability]]) is fundamentally flawed and at odds with how systems operate in the physical world

## There is no authoritative copy
- Weaker consistency models that offer fewer guarantees about when the effect of an update might be observed by other members in the system, can offer higher availability, allowing the system to continue to operate while components of the system are offline, where stronger models might prohibit updates when nodes can not communicate
- A lot of software systems attempt to treat distributed state as **a single system image**
- But in reality, the world is eventually [[thoughts/consistency|consistent]]
	- Members of the same system exchange information by “interacting”, or sending messages containing information to each other. These messages between members of the system can be arbitrarily dropped and delayed, just like in traditional, unreliable, asynchronous networks.
- Similarly, the web was able to scale to the scale it did because there is no *authoritative* copy of the web
- Primary site: main source of truth
- Designs such as this are very familiar in practice. For instance, Facebook, a large social-network application on the web, has a single user profile for each user that is active in the system. Each of these profiles is replicated across several of their data centers for performance; however, only one data center is deemed the primary site where all updates are performed.
- However, it would be extremely impractical to have to hear information directly from the primary site every time you needed information. This is why we partially [[thoughts/replication|replicate]] data across databases. Databases are optimizations which makes for extremely efficient distribution of information (scale-free rather than random)

## Each node is primary
- What is another model of databases or state machine replication we can come up with? What about one which places each node as its own **primary site?**
- In this model, each member of the system has some partially-replicated knowledge and some knowledge that they are the primary site for. This information is exchanged between members of the system and merged with each member’s local information: this provides both fault-tolerance, and lower latency in servicing requests for information from peers.
- As we continue to increase the number of globally connected devices, we must embrace a design that considers every single member in the system as the primary site for the data that it is generates. It is completely impractical that we can look at a single, or a small number, of globally distributed data centers as the primary site for all global information that we desire to perform computations with.
- Can we build abstractions that allow devices to communicate [[thoughts/peer-to-peer]], acknowledging the true primary site for a particular piece of information and scale to the amount of information that exists, not only between all computers in a planetary-scale distributed system, but all entities in the universe?

## Limits of the speed of light
- Coordination in the universe is limited by how much you can observe. That means a globally consistent *anything* will be limited by the speed of light
- Problematic for global (and potentially inter-planetary) communication
- Great thing about local-first is that you don't need to know anything about the other side of the world when doing stuff locally