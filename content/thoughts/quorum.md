---
title: "Quorum"
date: 2022-05-05
tags:
  - seed
---

## Read/Write Quorum

In a system with $n$ replicas, we can ensure [[thoughts/consistency|consistent]]

- writes if a write is acknowledged by $w$ replicas (write quorum)
- reads if we request reads from $r$ replicas (read quorum)
  - e.g. send 3 requests, only 2 have to come back. Choose most up to date based on timestamp

Key thing to note is that $r + w > n$, typically, $r = w = \frac{n+1}{2}$. This means that quorum is generally majority. Thus, reads can tolerate $n-r$ unavailable replicas and writes can tolerate $n - w$ unavailable replicas.

Then the read will see the previously written value (as the read and write quorum share $\geq 1$ replica). Client can then 'repair' the servers by sending its most up to state to servers that are out of date (with original logical timestamp! this is an [[thoughts/idempotence|idempotent]] operation, should be fine) -- this is called **read repair.**
