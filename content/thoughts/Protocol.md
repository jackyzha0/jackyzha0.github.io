---
title: "Protocols"
date: 2022-02-26
tags:
  - seed
  - CPSC317
---

Defines:

- Roles of communicating entities
- Format of messages
- Order of messages
- Actions taken on the transmission, receipt of a message, or other event

## Protocols as State Machines

A fully-defined protocol must provide a proper action for any event in any state. Most protocols can be modelled in terms of state machines.

Each interaction can have its own state machine.

## Open vs Closed Protocols

- Open Protocols
  - Examples: [[thoughts/HTTP]], SMTP, SSH
  - Usually defined in RFC documents (normally via some sort of working group or task force)
  - Different implementations
  - Allows a community, generally good!
- Proprietary Protocols
  - Examples: Skype, iCloud, Zoom
  - Only one implementation

## Building a Reliable Protocol

- Generally includes a few states
  - Idle - waiting for something to be initiated
  - Waiting - waiting for a response
- Edges are actions (e.g. receives a response of a certain type) or timeouts
- Edge cases
  - Timeout too soon! (may result in getting two ACKs)
- Timeout formulas
  - Assuming measured round trip time (RTT) of $t$
  - Estimated RTT
    - $ERTT_i = (1-\alpha) ERTT_{i-1} + \alpha t$
  - Deviation of RTT (captures jitter):
    - $\Delta RTT_i = (1 - \beta)\Delta RTT_{i-1} + \beta |t - ERTT_{i-1}|$
  - Timeout:
    - $ERTT_i + 4 \Delta RTT_{i}$
  - Suggested: $\alpha = 0.125$, $\beta = 0.25$
