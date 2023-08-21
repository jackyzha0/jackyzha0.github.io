---
title: "Network Layer (IP)"
date: 2022-02-26
tags:
  - seed
  - CPSC317
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

1. [IP Address](thoughts/IP%20Address.md): the one they are advertising they can reach
2. Gateway Next Hop: address of the entry point
3. AS Path: Sequence of AS's a packet would need to travel through

## Network Tiers

The structure of the internet is organized into entities called **autonomous systems (ASs)**.

Each AS is

- assigned a range/collection of IP addresses
- responsible for routing to addresses it “owns”
- responsible for routing to addresses that are not its responsibility

- Peering vs Transit

  - Transit: AS pays for the right to transit traffic across another AS
  - Peering: mutual exchange of traffic between networks

- Tier 1 Networks
  - A network that can exchange traffic with other Tier 1 networks without paying any fees (transit-free) for the exchange of traffic in either direction
- Tier 2 Networks
  - A network that peers for free with some networks, but still purchases IP transit or pays for peering to reach at least some portion of the [Internet](thoughts/Internet.md)
- Tier 3 Networks
  - A network that solely purchases transit/peering from other networks to participate in the Internet. Everybody else

## Routing

Both IGP and EGP run at the [[thoughts/Application Layer|application layer]]

### Internal Gateway Protocols (IGP)

- routing within a single AS, under the control of a single administrative entity
- Link State
  - each router tells every other router about all its links
  - this gives other routers complete info about the entire network
  - every so often, each router uses Dijkstra’s to find shortest path to all routers, then it updates its forwarding table
  - OSPF (open-shortest-path-first)
    - most used IGP in the internet
    - uses link-state protocol (each router has complete topological map of the entire AS)
    - supports extensions such as areas (support hierarchy and scaling)
- Distance Vector
  - every so often, each router tells its neighbours about the cost of its best routes to the networks it knows about
  - a receiving router checks if any of the broadcasted routes would shorten their path to destination
  - if so, it updates its routing table to route through the first router

### External Gateway Protocol (EGP)

- routing between different AS, no control over the routing policies of other AS (External Gateway Protocols - EGP)
- BGP
  - the protocol that all ASs use for inter-AS routing
  - packets are not routed to specific destination address, but to CIDRized prefixes, with each prefix representing a subnet or collection of subnets
  - enables each router to
    - obtain prefix information from neighbouring ASs
    - determine “best” routes to the prefixes
