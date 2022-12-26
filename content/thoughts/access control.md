---
title: "Access control"
date: 2022-08-16
tags:
- seed
---

> Access control systems guarantee that every action performed adheres to a set of rules, which can be dynamically changed at runtime.

In traditional systems, this guarantee can be enforced by relying on a central server. But this becomes a lot more difficult for eventually [[thoughts/consistency|consistent]] systems (e.g. [[thoughts/CRDT|CRDTs]])

There is a  common perception of ACL systems and capability systems as merely alternative perspectives on Lampson’s access matrix

| |Asset 1|Asset 2|File|Device|
|-|-|-|-|-|
|Role 1|read, write, execute, own|execute|read|write|
|Role 2|read|read, write, execute, own|||

### Access Control Lists
An Access Control list is a data structure containing entries that specify an individual user or group’s rights to specific system objects

In the Lampson's access matrix, they are normally seen as the columns.

### Capabilities
The capability list of a user or a process or domain is a list of rights that it has on the various objects.

In the Lampson's access matrix, they are normally seen as the rows.

Capabilities provide much better support for least-privilege operation and for avoiding confused deputy problems

From *[Capability Myths Demolished](https://srl.cs.jhu.edu/pubs/SRL2003-02.pdf)*:
1. Equivalence Myth: access control list systems and capability systems are formally equivalent
2. Confinement Myth: capability systems cannot enforce confinement
3. Irrevocability Myth: capability-based access cannot be revoked