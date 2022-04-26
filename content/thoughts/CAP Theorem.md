---
title: "CAP Theorem"
date: 2022-04-26
tags:
- seed
---

When designing and deploying applications in distributed environments, you can only optimize for 2 out of the following 3 properties:

1. **C**onsistency: a system operates fully or not at all, all nodes agree
2. **A**vailability: system is always able to answer a request
3. **P**artition Tolerance: if data is distributed and some nodes fail, the whole system and continue to function

ACID vs BASE
- ACID stands for atomicity, consistency, isolation, durability
	- Prioritizes C and A
	- Immediate consistency limits scale-out performance
- BASE stands for basically available, soft state, eventual consistency
	- Prioritizes A and P
	- Scale-out performance is greatly enhanced
	- Fine when nature of the data can tolerate some imprecision in query results