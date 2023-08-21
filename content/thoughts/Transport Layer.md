---
title: "Transport Layer"
date: 2022-02-26
tags:
  - seed
  - CPSC317
---

Layer 2, the layer below the [Application Layer](thoughts/Application%20Layer.md) and layer above the [Network Layer](thoughts/Network%20Layer.md)

1. Unit: Segment
2. Responsibilities: Ensures data arrives in order (if required), Recovers lost data (if required), Identifies process on machine, flow control
3. Adds an additional addressing space at the port level (historically a 16 bit uint from 0 to 65535)
4. Can be either be either packet or stream based
   1. Packet - best effort, no established connection, no transport level delay/waiting (e.g. video, games, etc.)
   2. Stream - pipe model, established connection, flow/congestion control, possible delays (e.g. HTTP, email, etc.)
