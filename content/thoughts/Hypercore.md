---
title: "Hypercore"
date: 2022-08-11
tags:
  - seed
aliases:
  - dat
---

> Streaming based append-only log that aims to be the lego-block of distributed applications.

Hypercore Protocol is a [[thoughts/peer-to-peer|peer-to-peer]] data network built on the Hypercore logs. Hypercores are signed, append-only logs. They're like lightweight blockchains without the [[thoughts/consensus|consensus]] algorithm

Connects peers using the Hyperswarm [[thoughts/DHT|DHT]] which is based off of [[thoughts/Kademlia DHT|Kademlia]]

## Thoughts

- Great developer experience, super simple to understand and use
- Comprehensive library of data structures
- Not amazing availability, no incentive system for people to run nodes (though Dat is working on this using a blockchain-based reward system)
- Not exactly great local first support. Continues working locally without an internet connection but new users cannot connect or get an up-to-date version of your data. If the user wants to send data to someone else, both devices need to be online simultaneously
- [[thoughts/Hypercore|Hypercore]] also does not guarantee long-term write-once storage
- Multi-writer support is still being worked on
  - Hypercore is inherently single-writer due to it's append only log structure, and while they have some work on multiwriter it's very tied to the data model
