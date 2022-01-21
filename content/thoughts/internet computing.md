---
title: "Internet Computing"
date: 2022-01-17
tags:
- sapling
---

*Notes for CPSC 317*

The internet is a network of networks. The main goals was to integrate a number of separately  
administrated entities into a common entity

## Communication
Necessary conditions
- A communication medium
- Source(s) and destination(s)
- Protocol (language)
- Message

## Circuit Switching
Dedicated path between source and destination. Path taken is determined when connection is established. Single stream of info per path

Works well when  
- Guaranteed service is valuable  
- Demand is steady (unchanging rate)  
- Starting a new conversation is rare

## Packet Switching
Data is divided in packets that are sent individually where each packet is self contained (contains source, destination, and data) and independently routed.

Works well when  
- Statistically good performance is good enough
- Demand is bursty (rapidly changing rate)
- Starting a new conversation is frequent

## Multiplexing
Multiple input streams must share the medium. It must be possible to “demultiplex” at the destination

Types
1. Time division multiplexing: each person gets a certain amount of time on the channel
2. Frequency division multiplexing: each person gets a single frequency band on the channel
3. Code division multiplexing: combines all messages using a specific code that can be decoded if code is known (?)
4. Orthogonal multiplexing: a combination of techniques

## Protocols
Defines:  
- Roles of communicating entities  
- Format of messages  
- Order of messages  
- Actions taken on the transmission, receipt of a message, or other event

A fully-defined protocol must provide a proper action for any event in any state. Most protocols can be modelled in terms of state machines.

### Network Protocol Stack (from most abstract to least)
Each layer takes data from above adds header information to create new data unit passes new data unit to layer below

1. Application/Presentation/Session layer
	1. Application
	2. Unit: Data
	3. Responsibilities: human-computer interaction layer, where applications can access the network services (includes encryption, connection, port, and session management)
3. Transport (TCP, UDP)
	1. OS
	2. Unit: Segment
	3. Responsibilities: Ensures data arrives in order (if required), Recovers lost data (if required), Identifies process on machine, flow control
4. Network (IP) -- this is the 'thinnest' part of the network stack!
	1. OS
	2. Unit: Packet (datagram)
	3. Responsibilities: Routes packet through routers to destination machine (not necessary if two devices are on the same network)
	4. Two main functions
		1. Forwarding: move packets from router’s input to appropriate router output (process of getting through a single interchange)
		2. Routing: determine route taken by packets from source to destination (process of planning trip from source to destination)
5. Link
	1. Hardware
	2. Unit: Frame
	3. Responsibilities: Routes frames to adjacent machines (“direct” connection). Defines the format of data on the network
6. Physical
	1. Hardware
	2. Unit: Bits
	3. Responsibilities: Encodes data appropriately for the physical medium

## Network Layer
### Packet Definition
Contains information about the packet itself (metadata) and the body/content

### BGP Advertisement
1. IP Address: the one they are advertising they can reach
2. Gateway Next Hop: address of the entry point
3. AS Path: Sequence of AS's a packet would need to travel through

IP addresses are 32 bits (4 bytes) split into 4 chunks. Obviously $2^{32}$ is an incredibly large address space so we compress the table using IP prefixes.

### IPv4
Special Addresses
1. First address (generally all 0s): network itself, or not assigned
2. Last address (generally all 1s): broadcast

### CIDR Notation
`IP/#` where # is the number of bits in the network ID

e.g. `18.0.0.0/8` means first 8 bits are network ID, and `18.x.x.x` is the space of all possible addresses ($2^{3*8}=2^{24}$)

By default, routers will take the most specific one (longest network ID).

To prevent loops, we set a TTL (time-to-live) for packets to expire after a certain time.

## Network Tiers
- Tier 1 Networks
	- A network that can exchange traffic with other Tier 1 networks without paying any fees (transit-free) for the exchange of traffic in either direction
- Tier 2 Networks
	- A network that peers for free with some networks, but still purchases IP transit or pays for peering to reach at least some portion of the Internet
- Tier 3 Networks
	- A network that solely purchases transit/peering from other networks to participate in the Internet. Everybody else