---
title: "Yjs"
date: 2022-08-11
tags:
  - seed
---

> Yjs is a linked-list-based, network-agnostic [[thoughts/CRDT|CRDT]] implementation in Javascript.

From [GitHub Documentation](https://github.com/yjs/yjs/blob/main/INTERNALS.md)

Yjs supports many different transport layers:

1. WebRTC
2. Websockets
3. Libp2p + GossipSub
4. [[thoughts/Hypercore|Dat]]
5. [[thoughts/Matrix|Matrix]]

At its heart, Yjs is a list-based CRDT:

- Arrays are easy - they're lists of arbitrary items
- Text is a list of characters, optionally punctuated by formatting markers and embeds for rich text support
- Maps are lists of entries. The last inserted entry for each key is used, and all other duplicates for each key are flagged as deleted

## Syncing

The client can ask a remote client for missing document updates by sending their state vector (often referred to as *sync step 1*). The remote peer can compute the missing `Item` objects using the `clocks` of the respective clients and compute a minimal update message that reflects all missing updates (sync step 2).

## YATA

The underlying conceptual framework that Yjs builds on top of.

[Original paper](https://www.researchgate.net/publication/310212186_Near_Real-Time_Peer-to-Peer_Shared_Editing_on_Extensible_Data_Types)

> YATA, an approach for peer-to-peer shared editing applications that ensures convergence, preserves user intentions, allows offline editing and can be utilized for arbitrary data types in the Web browser

One frustration is that applications based on complex models must therefore map the underlying data to the data structure that is supported by the used collaboration framework.

YATA works by defining all data structures in terms of a doubly-linked list. Insertions take the form of `insert(id, origin, left, right, isDeleted, content)`. `origin` is set at time of insertion and can't be changed, but `left` and `right` are references that can change.

They use $<_c$ to define a total ordering which depends only on the origin, where

$$o_1 < o_2 \iff o_1 \textrm{ is a predecessor of } o_2$$
This is quite similar to [[thoughts/CRDT Implementations#Replicated Growable Array RGA|RGA]]
