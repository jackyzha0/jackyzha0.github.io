---
title: "IPFS"
date: 2022-06-05
tags:
- seed
---

IPFS is a decentralized storage and delivery network which builds on fundamental principles of [[thoughts/peer-to-peer|p2p]] networking and content-based addressing (see [[thoughts/CID|CID]])

Much like how we look up sites on the internet using URIs, we can look for specific pieces of content by their [[thoughts/content addressed storage|content-address]]. 

Under the hood, IPFS uses
- libp2p: network layer, takes care of host addressing, content and peer discovery, and structures like DHTs and pubsub
- IPLD: data layer, standards and formats to build Merkle-DAG structures (quasi-filesystem)
- Multiformats: formatting structures for self-describing values