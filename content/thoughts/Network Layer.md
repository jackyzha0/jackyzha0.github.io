---
title: "Network Layer (IP)"
date: 2022-02-26
tags:
- seed
---

Layer 3, the layer below the [Transport Layer](thoughts/Transport%20Layer.md) and layer above the [Link Layer](thoughts/Link%20Layer.md)
1. Unit: Packet (datagram)
2. Responsibilities: Routes packet through routers to destination machine (not necessary if two devices are on the same network)
3. Two main functions
	1. Forwarding: move packets from router’s input to appropriate router output (process of getting through a single interchange)
	2. Routing: determine route taken by packets from source to destination (process of planning trip from source to destination)

### Packet Definition
Contains information about the packet itself (metadata) and the body/content

### BGP Advertisement
1. [IP Addresses](thoughts/IP%20Addresses.md): the one they are advertising they can reach
2. Gateway Next Hop: address of the entry point
3. AS Path: Sequence of AS's a packet would need to travel through

## Network Tiers
- Tier 1 Networks
	- A network that can exchange traffic with other Tier 1 networks without paying any fees (transit-free) for the exchange of traffic in either direction
- Tier 2 Networks
	- A network that peers for free with some networks, but still purchases IP transit or pays for peering to reach at least some portion of the Internet
- Tier 3 Networks
	- A network that solely purchases transit/peering from other networks to participate in the Internet. Everybody else
