---
title: "DHT"
date: 2022-06-07
tags:
  - seed
---

> The big hash table in the sky

One solution for 'decentralized' registry of peers. Each node holds a small shard of the DHT, so the burden of participation isn’t painful for any one agent. The DHT stores multiple redundant copies of each entry so that the information is available even when the author and a portion of the authorities are offline.

Any good implementation tries to answer 2 questions:

1. Which nodes take which part of the hash map
2. If a key is not on a node, how does it go and get it?

Keys are opaque, 160-bit quantities (e.g. an SHA-1 hash). Peers store data with similar IDs.

Joining a DHT requires knowledge about at least one member of the DHT (the bootstrap node)

Implementations include

- [[thoughts/Kademlia DHT|Kademlia DHT]]
- Chord DHT
- [[thoughts/Sloppy Hashing DHT]]
- [[thoughts/Theseus DHT|Theseus DHT]]

### Applications to Torrent Software

Old way was to use a tracker, you announce which file you are going to download to the tracker and the trackers sends back a list of peers. However, these trackers tend to go down easily (get sued)

DHT proves to be a more reliable way of replicating this behaviour.

See also: [[thoughts/BitTorrent]]

## Problems

- DHTs can be crawled and mined for profit
  - Perform a [[thoughts/Sybil Attack|Sybil attack]] by simulating 1000+ clients and just wait for values to come in, cheaply capturing 90%-99% of the DHT
- How do we make DHTs work where member count is low?
