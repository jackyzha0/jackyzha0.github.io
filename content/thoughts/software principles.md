---
title: "Software Principles"
date: 2022-02-20
tags:
- sapling
---

> A Pattern Language for developing software

Inspired by [Urbit Precepts](https://urbit.org/docs/development/precepts)

1. Local first. Decentralized/distributed systems second. Avoid hosting like the plague. Make self-hosting easy
2. Apps should be treated like queries -- stateless. Local state should be avoided as much as possible, database is the source of truth.
3. There is a latent cost to new features: [maintenance](thoughts/maintenance.md)
4. Design with the goal of making atomic and reusable libraries
5. Heuristics should only be used where determinism is infeasible
6. Code courageously. "It's natural to feel fear of code; however, you must act as though you are able to master and change any part of it. To code courageously is to walk into any abyss, bring light, and make it right."