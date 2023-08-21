---
title: "UDP"
date: 2022-02-26
tags:
  - seed
  - CPSC317
---

## User Datagram [Protocol](thoughts/Protocol.md) (UDP)

1. Source Port
2. Destination Port
3. Length
4. Checksum
5. Payload

68 is usually client, 67 is usually server

For reliable networks (like local) where out-of-order protections of [TCP](thoughts/TCP.md) are unnecessary, or for time sensitive applications (e.g. streams or calls) where lossy transmission at high speed is better than quality transmission at choppy speed.

Segment Format

- Source Port (16 bits)
- Destination Port (16 bits)
- Length in bytes, including header (16 bits)
- Checksum (16 bits)
- Application Data
