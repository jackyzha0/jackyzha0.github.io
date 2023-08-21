---
title: "State Machine Replication (SMR)"
date: 2022-08-05
tags:
  - seed
aliases:
  - SMR
  - state machine replication
---

A subset of the algorithmic [[thoughts/consensus|consensus]] problem about agreeing on the same state

1. [[thoughts/consistency|Consistency]]: all notes agree on the same history
2. [[thoughts/liveness|Liveness]]: every transaction submitted eventually added to all node's histories

SMR can be reduced to [[thoughts/Byzantine Broadcast|Byzantine Broadcast]]
