---
title: "Replication"
date: 2022-05-05
tags:
  - seed
---

> A node that has a copy of the data is called a _replica_

Replication is the act of ensuring [[thoughts/consistency|consistency]] of data across replicas. If one replica is faulty, others are ideally still accessible

Of course, if data doesn't change, this is an easy problem: just copy it. Hard problem is when the data changes.

Can take inspiration from hardware systems! RAID (Redundant Array of Independent Disks) which is used to replicate within a single computer fills a similar role but RAID has a single controlled whereas distributed systems have nodes that act independently.

An important concept in replication (and [[thoughts/message broadcast|message broadcast]]) is making sure that we avoid cases where losing an ACK could lead to users doing an action multiple times (e.g. pressing the like button)?

This can be done by ensuring [[thoughts/idempotence|idempotence]] in our actions.

## SMR

[[thoughts/State Machine Replication (SMR)|State machine replication]]cCan be done by FIFO-[[thoughts/message broadcast#Total order broadcast|total order broadcasting]] every update to all replicas. Whenever a replica delivers an update message, it applies it to its own state

This is what underlies a lot of [[thoughts/blockchain|blockchains]], distributed ledgers, smart contracts, etc. ([[thoughts/ethereum|Ethereum]] is just one big state machine)
