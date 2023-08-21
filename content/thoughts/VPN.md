---
title: "VPN"
date: 2022-02-26
tags:
  - seed
  - CPSC317
---

Virtual Private Networks

Motivation:

1. Company with multiple locations wants everything to appear as one big network
2. Workers want access to resources restricted to company internal network
3. Users want to bypass regional blocks

![](thoughts/images/VPN.jpeg)

VPN Encapsulation

- Virtual end points establish software association between them (e.g. [TCP](thoughts/TCP.md) connection) usually referred to as a tunnel
- Routing rules on local machine send traffic to virtual interface
- Virtual card encapsulates IP message and sends it through tunnel
- Receiver receives message and sends it through its own network
