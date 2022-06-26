---
title: "CouchDB"
date: 2022-06-24
tags:
- seed
---

NoSQL database with great replication capabilities.

Multi-master replication (you can write to any server, even if it cannot see any other servers). Of course, as per [[thoughts/CAP Theorem|CAP Theorem]] this means trading off consistency for availability and partition tolerancy.

Replication can be
- unidirectional or bidirectional
- one-time or continuous
- periodic or on-demand