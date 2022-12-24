---
title: "Access control"
date: 2022-08-16
tags:
- seed
---

> Access control systems guarantee that every action performed adheres to a set of rules, which can be dynamically changed at runtime.

In traditional systems, this guarantee can be enforced by relying on a central server. But this becomes a lot more difficult for eventually [[thoughts/consistency|consistent]] systems (e.g. [[thoughts/CRDT|CRDTs]])

### Access Control Lists
An Access Control list is a data structure containing entries that specify an individual user or group’s rights to specific system objects

### Capabilities
The capability list of a user or a process or domain is a list of rights that it has on the various objects