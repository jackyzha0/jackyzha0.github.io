---
title: "Matrix"
date: 2022-06-15
tags:
  - seed
---

> An open network for secure, decentralized communication

[Website](https://matrix.org/)

Mainly for messaging + voice + video but theoretically can handle any type of _real-time_ data.

A decentralized conversation store; when you send a message in Matrix, it is replicated over all the servers whose users are participating in a given conversation. (helps to tackle data availability)

Model of event log delivery and consensus feels very similar to [[thoughts/Raft Consensus Algorithm|Raft]]

Uses HTTPS + JSON by default but also supports other transports like WebSockets or Matrix via CoAP + Noise

[SDK seems well-maintained](https://github.com/matrix-org/matrix-js-sdk)
