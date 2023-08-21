---
title: "OrbitDB"
date: 2022-08-11
tags:
  - seed
---

OrbitDB is a distributed, [[thoughts/peer-to-peer|peer-to-peer]] database with [[thoughts/IPFS|IPFS]] as its data storage and [IPFS Pubsub](https://github.com/ipfs/go-ipfs/blob/master/core/commands/pubsub.go#L23) to automatically sync databases with peers. Provides eventual consistency with [[thoughts/CRDT|CRDTs]] for conflict-free merges.
