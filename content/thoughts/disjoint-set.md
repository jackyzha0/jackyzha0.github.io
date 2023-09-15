---
title: "Disjoint-set"
date: "2023-09-10"
tags:
  - seed
aliases:
- union-find
- merge-find set
---

A data structure that stores a collection of disjoint (non-overlapping) sets.

It provides operations for:
1. adding new sets,
2. merging sets (replacing them by their union), and 
3. finding a representative member of a set.

Importantly, Kruskal's algorithm uses the disjoint-set data structure to efficiently determine whether two vertices are part of the same tree.