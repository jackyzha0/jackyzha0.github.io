---
title: "Coral: Sloppy Hashing DHT"
date: 2023-01-29
tags:
  - seed
aliases:
  - DSHT
---

[Source](https://www.cs.princeton.edu/~mfreed/docs/coral-iptps03.pdf)

Main problems with [[thoughts/Kademlia DHT]] is that it has poor locality. A peer could make requests that hop all the way around the globe when the information they are looking for is in their local network!

> Though some DHTs make an effort to route requests through nodes with low network latency, the last few hops in any lookup request are essentially random. Thus, a node might need to send a query half way around the world to learn that its neighbor is caching a particular web page.

Choral achieves locality through clustering! It creates self-organizing clusters of nodes that fetch information from each other to avoid communicating with more distant or heavily-loaded servers.

Notes

- 'Sloppiness' comes from the fact that a `set(key, nodeaddr)` operation doesn't just store the pointer `nodeaddr` on one node
  - It stores pointers along the lookup path for popular keys (this is called "spilling-over")
  - Helps to balance load while inserting pointers, retrieving pointers, and downloading data
- Generally set a TTL for records to expire quickly enough to keep the fraction of stale pointers below 50%

## Network Layers

In order to restrict queries to nearby machines, each Coral node is a member of several DSHTs, which we call clusters, of increasing network diameter.

The diameter of a cluster is the maximum desired round-trip time between any two nodes it contains.

For example, a node can be a part of 3 clusters, and L0, L1, and L2.

- L0 is the 'lowest' level and widest network diameter, having a maximum desired round-trip of $\infty$ so the network spans every node in the DHST
- L2 is 'highest' level and narrowest network diameter, having a small maximum desired round-trip time to restrict it to local nodes

Similar concept to isochrone maps

![[thoughts/images/isochrone.png|500]]

## Downsides

- The privacy sucks sucks: nodes publish not only their [[thoughts/IP Address]] but the path to get there too!
- Requires network size estimation which is hard to do if the number of nodes are small (i.e. requires a large deployment to be effective)
  - Can be done using [[thoughts/Network Theory]] as lookups are on average $O(\log n)$ hops
- Not [[thoughts/Byzantine Faults|BFT]]: a malicious actor could pollute the DHT and cause really poor routing
