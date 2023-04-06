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