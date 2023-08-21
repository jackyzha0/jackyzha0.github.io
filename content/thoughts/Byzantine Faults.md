---
title: "Byzantine Faults"
date: 2022-08-08
tags:
  - seed
aliases:
  - BFT
  - byzantine fault tolerance
  - byzantine fault-tolerant
  - byzantine actors
---

Sources: [Byzantine Faults on _Wikipedia_](https://en.wikipedia.org/wiki/Byzantine_fault) and [Paper on the Byzantine Generals Problem](https://lamport.azurewebsites.net/pubs/byz.pdf)

A **Byzantine fault** is any fault presenting different symptoms to different observers.

A **Byzantine failure** is the loss of a system service due to a Byzantine fault in systems that require [consensus](thoughts/consensus.md) between nodes.

Byzantine fault tolerance (BFT) is the property of a system that is able to resist the class of failures derived from the [[thoughts/fault tolerance#Byzantine Generals Problem|Byzantine Generals’ Problem]]. This means that a BFT system is able to continue operating even if some of the nodes fail or act maliciously.

See also: [[thoughts/Byzantine Broadcast|Byzantine Broadcast]], [[thoughts/PBFT|PBFT]]
