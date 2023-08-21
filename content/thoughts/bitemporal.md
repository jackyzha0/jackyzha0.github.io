---
title: "Bitemporal"
date: 2023-04-06
tags:
  - seed
---

**Bitemporality** is a technique for modeling [[thoughts/time|time]] in databases and data structures such that...

- The state at any point in history can be recovered
- Alternative timelines can be forked

It's basically time travel! Some [[thoughts/Merkle-DAG|Merkle-DAGs]], if structured properly, can have this property

## Datalog

We can make Datalog fact stores [[thoughts/bitemporal]] if we represent Datalog facts as 4-tuples: `(entity, attribute, value, causality)`

Time travel and conflict resolution mean recomputing views from arbitrary points. How do we avoid starting from the beginning? This is where [[thoughts/incremental view maintenance]] comes in
