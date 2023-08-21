---
title: "Prolly Trees"
date: 2022-11-30
tags:
  - seed
---

Everything that can apply to B+ Trees and database indexes, can now apply to Prolly Trees with the added ability of it being [[thoughts/peer-to-peer]], sparsely loaded, and mergeable.

This enables multi-tenant peer-to-peer [[thoughts/search]]. With p2p databases we can begin to build up search indexes collaboratively with community members, where individuals or smaller groups can participate in generating indexed data, and larger indexes being formed from combining the smaller ones.

## Why not just B-Trees?

Data structures with hysteresis have path dependency, in the case of B-trees the actual tree structure depends on the order of inserts and removes.

## Merkle Search Trees

[Source](https://0fps.net/2020/12/19/peer-to-peer-ordered-search-indexes/)

Merkle Search Trees are an incremental method for constructing determinstic B-trees. Their idea is to first hash all content which is inserted into the tree, and then to place items at a level proportional to the number of 0’s in the prefix of their hash written in base B.

Under the assumption that all hashes are uniformly distributed, a Merkle search tree has the following properties:

1. Every internal node has on average B children
2. All leaves are on average the same distance from the root
3. The tree is deterministic

However, these are not Sybil resistant

## Prolly Trees

[Source](https://github.com/attic-labs/noms/blob/master/doc/intro.md#prolly-trees-probabilistic-b-trees)

A Prolly Tree is a search tree where the number of values stored in each node is determined probabilistically, based on the data which is stored in the tree.

Within each hash, we look for a pattern that has a known probability of occuring. If the pattern is found, that position is a boundary. We slide the window forward to the end of the containing item, and write a new chunk containing the bytes between this boundary and the previous, if any. The resulting chunk is stored in a [[thoughts/content addressed storage]] system

In Noms, the pattern we look for is the 12 high bits being 1. Since this has a probability of 1/2^12, the average chunk size in Noms is 4kb.
