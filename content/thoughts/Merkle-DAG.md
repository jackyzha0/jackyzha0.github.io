---
title: "Merkle-DAG"
date: 2022-07-14
tags:
- seed
---

A directed acyclic graph where nodes correspond to versions of the content and arcs correspond to changes (diffs).

Each node has an identifier which is the result of hashing the node's content.

Merkle DAG nodes are _immutable_. Any change in a node would alter its identifier and thus affect all the ascendants in the DAG, essentially creating a different DAG

Examples of DAGs include:
- `[[thoughts/git|git]]`
- [[thoughts/IPFS|IPFS]]
- [[posts/docker|Docker]] images