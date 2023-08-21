---
title: "CouchDB"
date: 2022-06-24
tags:
  - seed
---

NoSQL database with great replication capabilities.

Multi-master replication (you can write to any server, even if it cannot see any other servers). Of course, as per [[thoughts/CAP Theorem|CAP Theorem]] this means trading off consistency for availability and partition tolerancy.

## Replication

Replication can be

- unidirectional or bidirectional
- one-time or continuous
- periodic or on-demand

During replication, CouchDB will compare the source and the destination database to determine which documents differ between the source and the destination database. It does so by following the Changes Feeds on the source and comparing the documents to the destination.

A replication task will finish once it reaches the end of the changes feed. If its `continuous` property is set to true, it will wait for new changes to appear until the task is canceled. Replication tasks also create checkpoint documents on the destination to ensure that a restarted task can continue from where it stopped, for example after it has crashed.

## Changes Feeds

`results` is the list of changes in sequential order. New and changed documents only differ in the value of the rev; deleted documents include the `"deleted": true` attribute.
