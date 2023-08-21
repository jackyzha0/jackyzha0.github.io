---
title: "A Certain Tendency Of The Database Community"
date: 2022-11-16
tags:
  - sapling
---

[Source](https://arxiv.org/pdf/1510.08473.pdf)

[[thoughts/distributed systems|Distributed Systems]] that provide “single system image” semantics (read: [[thoughts/linearizability]]) is fundamentally flawed and at odds with how systems operate in the physical world

## There is no authoritative copy

A lot of engineers attempt to treat distributed state as **a single system image** where there is a single primary site (main source of truth)

But in reality, the world is eventually [[thoughts/consistency|consistent]] and [[thoughts/plurality|pluriversal]]

> Members of the same system exchange information by “interacting”, or sending messages containing information to each other. These messages between members of the system can be arbitrarily dropped and delayed, just like in traditional, unreliable, asynchronous networks.

The web was able to scale to the scale it did because there is no _authoritative_ copy of the web.

In fact, truly global applications can only achieve some sense of responsiveness through having multiple primary sites. This is because at a global scale, having only one primary site just doesn't work:

- Supporting any non-trivial application at global scale requires a lot of compute which often can't be colocated on the same machine for performance reasons
- Having a single primary site means that every read or write needs to be done through it. As a result, latency for users that are on the other side of the world may have latencies that make the application frustrating or unusable.

Take Facebook for example. It has a single user profile for each user that is active in the system. It would be extremely impractical to have to hear information directly from the primary site every time you needed information. Each of these profiles is replicated across several of their data centers for performance. Distributed databases are optimizations which makes for extremely efficient distribution of information ([[thoughts/Network Theory|scale-free]] rather than random)

## Each node is primary

What is another model of databases or state machine replication we can come up with? What about one which places each node as its own **primary site?**

In this model, each member of the system has some partially-replicated knowledge and some knowledge that they are the primary site for. This information is exchanged between members of the system and merged with each member’s local information: this provides both fault-tolerance, and lower latency in servicing requests for information from peers.

As we continue to increase the number of globally connected devices, we must embrace a design that considers every single member in the system as the primary site for the data that it is generates. It is completely impractical that we can look at a single, or a small number, of globally distributed data centers as the primary site for all global information that we desire to perform computations with.

Can we build abstractions that allow devices to communicate [[thoughts/peer-to-peer]], acknowledging the true primary site for a particular piece of information and scale to the amount of information that exists, not only between all computers in a planetary-scale distributed system, but all entities in the universe?

## Limits of the speed of light

Coordination in the universe is limited by how much you can observe. That means a globally consistent _anything_ will be limited by the speed of light

This is problematic for global (and potentially inter-planetary) communication. The great thing about [[thoughts/local-first software]] is that you don't need to know anything about the other side of the world when doing stuff locally :)

## Harmony

Werner Herzog in _Burden of Dreams_ (1982)

> There is no harmony in the universe. We have to get acquainted to this idea that there is no real harmony as we have conceived it.
