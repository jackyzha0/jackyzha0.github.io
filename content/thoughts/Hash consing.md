---
title: "Hash consing"
date: "2023-09-10"
tags:
  - seed
---

A technique used to memoize values that are structurally equal.

When a value is constructed, the technique checks if such a value has been constructed before, and if so reuses the previous value and points to it, avoiding a new memory allocation.

Then, two structures can be tested for equality in constant time via pointer equality.