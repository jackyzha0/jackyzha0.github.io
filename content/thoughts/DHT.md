---
title: "DHT"
date: 2022-06-07
tags:
- seed
---

One solution for 'decentralized' registry of peers. 

> The big hash table in the sky

Keys are opaque, 160-bit quantities (e.g. an SHA-1 hash). Peers store data with similar IDs.

Joining a DHT requires knowledge about at least one member of the DHT (the bootstrap node)

### Applications to Torrent Software
Old way was to use a tracker, you announce which file you are going to download to the tracker and the trackers sends back a list of peers. However, these trackers tend to go down easily (get sued)

DHT proves to be a more reliable way of replicating this behaviour.

## Problems
- DHTs can be crawled and mined for profit
	- Perform a [[thoughts/Sybil Attack|Sybil attack]] by simulating 1000+ clients and just wait for values to come in, cheaply capturing 90%-99% of the DHT