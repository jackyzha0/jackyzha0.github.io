---
title: "Rendezvous hashing"
date: 2026-10-12
tags:
  - seed
aliases:
  - highest random weight
  - HRW
---

Assign each key to the node with the highest score, where the score is a hash of the key and the node. Anyone with the node list computes the same owner, so no shared state is needed.

```python
def owner(key, nodes):
    return max(nodes, key=lambda n: hash((key, n)))
```

- When a node leaves, only the keys it owned move, each to its runner-up. When a node joins, a key moves only if the new node's score beats its current owner's, which is about $1/(N+1)$ of the keys.
- Scores are independent and uniform, so load is even without virtual nodes, and weights work by scaling the score. The top $r$ scores give a replica set.
- It costs $O(N)$ hashes per lookup, where a consistent hashing ring costs $O(\log N)$ for a sorted lookup.

See also: [[thoughts/DHT]], [[thoughts/hash function]]
