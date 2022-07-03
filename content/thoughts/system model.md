---
title: "System model"
date: 2022-05-05
tags:
- seed
---

How do we capture assumptions in a system model for [[thoughts/distributed systems|distributed systems?]]

### Network behaviour (e.g. message loss)
- Reliable: message is received if and only if it is sent, messages may be reordered
- Fair-loss: messages may be lost, duplicated, or reordered. A message eventually gets through if you keep retrying (can be upgraded to reliable using retry + packet deduplication)
- Arbitrary: active adversary, may interfere with messages (can be upgraded to fair-loss using TLS)
- Network partition: some links dropping/delaying all messages for an extended period of time

### Node behaviour (e.g. crashes)
- Crash-stop: node is faulty if it crashes. After it crashes, it stops executing forever
- Crash-recovery: node may crash at any moment, losing in-memory state. It may resume executing sometime later (sometimes call omission fault)
- Byzantine: a node is faulty if it deviates from the algorithm. Faulty nodes may do anything, including crashing or malicious behaviour
- Correct: not faulty

### Timing behaviour (e.g. latency)
- Synchronous: message latency no greater than a known upper bound
- Partially synchronous: asynchronous for some finite (but unknown, possibly arbitrarily large) periods of time, synchronous otherwise
- Asynchronous: messages can be delayed arbitrarily, no timing guarantees

### Identity and Messages
- Authenticated: a Byzantine node cannot forge a message or change the contents of a received message before it relays the message to other nodes
- Non-authenticated: nodes have no way of verifying the authenticity of a received message