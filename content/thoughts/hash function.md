---
title: "Hash function"
date: 2022-08-08
tags:
  - seed
aliases:
  - hash
---

> A hash function is any function that can be used to map data of arbitrary size to fixed-size values.

## Properties

1. Order should matter, should be very unlikely for two messages two have a hash collision
2. Examples of good hash functions
   1. MD5: compute a 128-bit message digest in a 4-step process
   2. SHA-1: US NIST standard, 160-bit digest
   3. SHA-256 and SHA-512 are more secure

## Homomorphic Hashes

`bromberg_sl2` is hash function that provides a monoid homomorphism

This means there is a cheap operation `*` such that given strings s1 and s2, `H(s1 ++ s2) = H(s1) * H(s2)`
