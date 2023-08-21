---
title: "Data Structures"
date: 2023-06-16
tags:
  - seed
---

## Rope

This is essentially an immutable `String` except many operations that would be $O(n)$ with normal strings are instead $O(\log n)$ or $O(1)$

`Rope`s will be slower and take more memory than small `String`s but they have an asymptotic advantage when working with large documents.
