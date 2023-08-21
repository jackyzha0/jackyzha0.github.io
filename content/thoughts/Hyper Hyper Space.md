---
title: "Hyper Hyper Space"
date: 2022-06-24
tags:
  - seed
---

> Make all data local, communicate only through data sync

Summarized from [the site](https://www.hyperhyperspace.org/) and [whitepaper](https://www.hyperhyperspace.org/whitepaper/)

Provides:

- a local data store, both in-browser using IndexedDB and server-side
- a data representation format, based on Merkle-DAGs and [[thoughts/CRDT|CRDTs]]
- a secure data sync protocol over WebRTC and WebSockets

The Hyper Hyper Space project proposes a framework for *universal information access*

## Spaces

Applications organize their information using spaces -- a bit like a file but for the internet age. It's a file that is opened and modified locally on your devices but synchronized automatically over the internet. They can be universally looked up using 3-word codes, like suburb-suburb-awake.

## Finality

To preserve operation commutativity, these untimely capability uses would need to be accepted, hence preventing the application from truly enforcing capability revocation.

Lack of finality is worrying for vast majority of applications. They resolve this in a weird manner by introducing causal relationships (e.g. this action is only valid if this previous one is valid). Even then, this weird form of [[thoughts/causality|causality]] doesn't actually solve finality.

## Connection

WebRTC as underlying transport layer. Uses a signalling server that each peer runs. Not ideal, doesn't run a [[thoughts/DHT]] so requires users to know address of other's signalling server.
