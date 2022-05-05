---
title: "Collaborative software"
date: 2022-05-05
tags:
- seed
---

- Each user device has a local replica of the data and this local replica can be updated anytime (ideally even while offline), and re-sync with others when network is available
- Challenge: how do we reconcile concurrent updates?
- Two main families
	- Conflict-free Replicated Data Types ([[thoughts/CRDT|CRDTs]])
	- Operational Transformation