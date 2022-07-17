---
title: "On State Replication"
date: 2022-07-11
tags:
- seed
draft: true
---

- replication isn't a new problem
- computer scientists have been trying to figure out how to get many machines to agree on the same value for a while
- differing approaches based on differing assumptions
	- atomic commitment / strong consistency (databases)
	- longest chain consensus / probabilistic (blockchains)
	- eventual consistency (CRDTs)