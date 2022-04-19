---
title: "317 Note Sheet"
date: 2022-04-18
tags:
- seed
---

## Definitions
- Communication requires
	- A communication medium
	-  Source(s) and destination(s)
	-  Protocol (shared language)
	-  Message
- A Protocol defines
	- Roles of communicating entities  
	- Format of messages  
	- Order of messages  
	- Actions taken on the transmission, receipt of a message, or other event

## Packet Routing
- Circuit Switching
	- Dedicated path between source and destination.
	- Path taken is determined when connection is established.
	- Single stream of info per path
	- Works well when
		-   Guaranteed service is valuable
		-   Demand is steady (unchanging rate)
		-   Starting a new conversation is rare
- Packet Switching
	- Data is divided in packets that are sent individually where each packet is self contained (with source, destination, and data) and independently routed.
	- Works well when
		-   Statistically good performance is good enough
		-   Demand is bursty (rapidly changing rate)
		-   Starting a new connection happens often

## Network Protocol Stack
Each layer takes data from above adds header information to create new data unit passes new data unit to layer below

1. Application Layer (HTTP)
	1. Unit: Data
	2. Responsibilities: human-computer interaction layer, where applications can access the network services (includes encryption, connection, port, and session management)
2. Transport Layer (TCP, UDP)
	1. Unit: Segment
	2. Responsibilities: Ensures data arrives in order (if required), Recovers lost data (if required), identifies process on machine is responsible for message, flow control
	3. Adds an additional addressing space at the port level (historically a 16 bit uint from 0 to 65535)
	4. Can be either be either packet or stream based
	    1. Packet - best effort, no established connection, no transport level delay/waiting (e.g. video, games, etc.)
	    2. Stream - pipe model, established connection, flow/congestion control, possible delays (e.g. HTTP, email, etc.)
3. Network Layer (IP Addresses) -- this is the ’thinnest’ part of the network stack!
	1. Unit: Packet (datagram) -- contains information about the packet itself (metadata) and the body/content
	2. Responsibilities: Routes packet through routers to destination machine (not necessary if two devices are on the same network)
	3. Two main functions
	    1. Forwarding: move packets from router’s input to appropriate router output (process of getting through a single interchange)
	    2. Routing: determine route taken by packets from source to destination (process of planning trip from source to destination)
4. Link Layer
	1. Unit: Frame
	2. Responsibilities: Routes frames to adjacent machines (“direct” connection). Defines the format of data on the network
	3.  Details
	    - Breaks up chunks into frames, contains some metadata
	    - Hub model (share the same medium) means that we don’t need to run wires between every computer (implicit broadcasting). Downside is we have to now specify who the message is for (usually using 48 bit media access control (MAC) addresses)
5. Physical Layer
	1. Unit: Bits
	2. Responsibilities: Encodes data appropriately for the physical medium

## IP Addresses
- Number of hosts in a network is $2^{32 - \textrm{length of network mask}} - 2$ (as first and last addresses in a network are reserved)

## Error Correction
1. Parity Bit
	1. Even parity is 1 if number of 1s is odd
	2. Can detect odd number of bit flips
3. 2D Parity Bit
	1. Additional n + m + 1 parity bits (one for each addtl row, column, and extra corner bit)
	2. Calculate last corner bit by looking at existing parity bits top to bottom left to right

## CIDR Questions
- For range aggregation, only three cases
	- Masks are same size: can only aggregate if last bit one is 0 and another is 1
	- Mask sizes are off by one: can only aggregate if one range completely contains another
	- Masks sizes are off by more than one: cannot aggregate

## VPN vs NAT
- Insert diagram here
- VPN: completely encapsulates the IP packet
	- Within 