---
title: "Safety"
date: 2022-07-03
tags:
  - seed
---

> A promise in [[thoughts/distributed systems|distributed systems]] that claims that "something bad" will never happen

This is obviously broad, but can have multiple flavours including never returning null fields, dead-locks should never happen, etc.

Interestingly, all properties can be expressed as the intersection of safety and [[thoughts/liveness|liveness]] properties
