---
title: "Bluesky"
date: 2022-06-15
tags:
- seed
---

## ADX
From [ARCHITECTURE.md](https://github.com/bluesky-social/adx/blob/main/architecture.md)

Bluesky is building a protocol for large-scale distributed social applications, and in doing so released ADX (Authenticated Data eXperiment)

In ADX, user social data will live in Personal Data Repositories (PDR) owned by the user.

While these components are common to peer-to-peer networks, ADX uses a federated networking model. [[thoughts/federation|Federation]] was chosen to ensure the network is convenient to use and reliably available.

ADX then creates a larger, more interconnected view of the network by crawling the PDRs with indexers.

> Google collects, ranks, and filters that content into a service that it surfaces for users when they search. Our "Crawling Indexers" are much the same, except they collect the content for social applications.


### Moderation
> Decentralizing components of existing social networks is about creating a balance that gives users the right to speech, and services the right to provide or deny reach.

Our model is that _speech_ (data, networking) and _reach_ (crawling, aggregation, algorithm) should be two separate layers, built to work with each other. The “speech” layer should remain neutral, distributing authority and designed to ensure everyone has a voice. The “reach” layer lives on top, built for flexibility and designed to scale.

There's no one company that can decide what gets published; instead there is a marketplace of companies deciding what to carry to their audiences.

![[thoughts/images/speech and reach layers.png]]