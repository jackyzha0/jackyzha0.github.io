---
title: "Incremental view maintenance"
date: 2023-04-06
tags:
  - seed
---

Materialized views speed up query evaluation by storing the results of specified queries. One problem of materialized view is its maintenance. Materialized views have to be brought up to date when the underling base relations are updated.

See also: [[thoughts/Datalog]]

## DRed

Delete/Rederive

1.  Compute difference in facts between two points
2.  Delete all derivations that rely on deleted facts
3.  Rederive all facts with alternative derivations

## Noria

[Source](https://blog.the-pans.com/caching-partially-materialized-views-consistently/)

A materialized view is a cache.

By reasoning about every cache as a partially materialized view (assume it can be explicitly defined), it means if we can cache partially materialized views consistently, we solve the cache invalidation problem.

The [Noria](https://www.usenix.org/conference/osdi18/presentation/gjengset) paper from OSDI'18 introduced a new concept called partially-stateful data-flow to solve the consistency problem for partially materialized views.

Noria will internally compile the materialized view into a DAG of partially-stateful and stateless operators.

If the underlying data store supports ordering primitives such as Hybrid Logical Clock, we can probably apply the techniques described in the OSDI'20 [FlightTracker paper](https://www.usenix.org/conference/osdi20/presentation/shi) to provide Causal Consistency in Noria – a big improvement over Eventual Consistency.
