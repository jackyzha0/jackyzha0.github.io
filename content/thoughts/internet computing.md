---
title: "Internet Computing"
date: 2022-01-17
tags:
- sapling
---

*Notes for CPSC 317*

The [Internet](thoughts/Internet.md) is a network of networks. The main goals was to integrate a number of separately  
administrated entities into a common entity

## Communication
Necessary conditions
- A communication medium
- Source(s) and destination(s)
- [Protocol](thoughts/Protocol.md) (language)
- Message

### Circuit Switching
Dedicated path between source and destination. Path taken is determined when connection is established. Single stream of info per path

Works well when  
- Guaranteed service is valuable  
- Demand is steady (unchanging rate)  
- Starting a new conversation is rare

### Packet Switching
Data is divided in packets that are sent individually where each packet is self contained (contains source, destination, and data) and independently routed.

Works well when  
- Statistically good performance is good enough
- Demand is bursty (rapidly changing rate)
- Starting a new conversation is frequent

### Multiplexing
Multiple input streams must share the medium. It must be possible to “demultiplex” at the destination

Types
1. Time division multiplexing: each person gets a certain amount of time on the channel
2. Frequency division multiplexing: each person gets a single frequency band on the channel
3. Code division multiplexing: combines all messages using a specific code that can be decoded if code is known (?)
4. Orthogonal multiplexing: a combination of techniques

## Network [Protocol](thoughts/Protocol.md) Stack (from most abstract to least)
Each layer takes data from above adds header information to create new data unit passes new data unit to layer below

1. [Application Layer](thoughts/Application%20Layer.md)
2. [Transport Layer](thoughts/Transport%20Layer.md) (TCP, [UDP](thoughts/UDP.md))
3. [Network Layer](thoughts/Network%20Layer.md) ([IP Addresses](thoughts/IP%20Addresses.md)) -- this is the 'thinnest' part of the network stack!
4. [Link Layer](thoughts/Link%20Layer.md)
5. [Physical Layer](thoughts/Physical%20Layer.md)


## Hubs, Switches, and Routers
1. Hub - broadcasting through cloning bits ([physical layer](thoughts/Physical%20Layer.md))
	1. Simplest and cheapest way to create a network
	2. Lots of unnecessary traffic
	3. Other people can see your traffic
2. Switch - hub but it knows where other hosts are for direct addressing ([link layer](thoughts/Link%20Layer.md))
	1. Keeps a switch table mapping interface number to MAC address
	2. If table is initially empty, will behave like a hub and broadcast
	3. Can start populating switch table based off of sender field from frames
	4. Quicker than a router for internal communication (though some routers have an Ethernet switch built in)
	5. If engineered right, can be full-duplex
3. Router - glue that ties networks together ([network layer](thoughts/Network%20Layer.md))
	1. Does NOT support broadcast
	2. Serves as a bridge between private home network and the network of the internet provider (which can reach the rest of the internet)
	3. Modern routers can also perform
		1. Network address translation ([NAT](thoughts/NAT.md))
		2. Assigning [IP addresses](thoughts/IP%20Addresses.md) to hosts using [DHCP](thoughts/DHCP.md)
		3. Broadcast WiFi signal

## Error Correction
Methods for [fault tolerance](thoughts/fault%20tolerance.md) in data transmission
1. Parity Bit
	1. Even parity is 1 if number of 1s is odd
	2. Can detect odd number of bit flips
3. 2D Parity Bit
	1. Additional parity bits for each row
	2. Additional parity bits for each column
	4. One last additional bit in last row of parity bits
5. Checksum
	1. Assume data is a sequence of 16-bit integers
	2. Addition, 1's complement sum, carry out added back in
	3. Checksum is the 1's complement of the computed value
	4. Compare with the received data (if same, it is ok)
		1. Alternatively, compute the same function over the data and checksum
6. Cyclic Redundancy Check (CRC)
	1. Uses only XOR and shift
	2. Parameterized by constants G and r
	3. r + 1 is the length of G (some power of 2)
	4. G is the generator (arbitrary bit pattern)
	5. Sender wants to send D
		1. Chooses r CRC bits, R such that <D, R> is exactly divisible by G (mod 2)
	6. Receiver knows G, divides <D, R> by G. If the remainder is non-zero an error is detected!
	7. Can detect all burst errors less than $r+1$ bits, and burst errors greater than $r+1$ with probability $1-0.5^r$

## Access Control
1. Half-duplex - both sides can transmit, but only one at a time
	1. Carrier Sense Multiple Access
		1. Listen before sending, only send if no one else is
	2. Collision Detection
		1. While sending, listen to see if what you are sending is garbled
		2. If so, give up
	3. "Try again later" uses binary exponential backoff
		1. Random backoff between 0 and power of 2 (n increases each time)
	4. Turn-based access control
		1. Controlled by centralized party - polls everyone
		2. Controlled in a decentralized manner - passes a token between senders
2. Full-duplex - both sides can transmit at the same time without interference/[NAT](thoughts/NAT.md)

## Network Metrics
- Bandwidth: max rate at which data can be sent over a link, usually in bits per second
	- Measured in base 10, kilobit is $10^3$ bits, megabit is $10^6$ bits
- Sizes: usually in bytes
	- Measured in base 2, kilobyte is $2^{10}$ bytes, megabyte is $2^{20}$ bytes
	- Except for disk managers, who use bits to make sizes look larger
- Latency: how long is it from when something is sent to when it is received
	- Packet and bit/byte latency: measure start of sending packet/bit/byte to receiving it
	- Round trip time: time to send packet and receiving a response
- Jitter: variation in latency -- interpacket variance
- Throughput: amount of data moved from one place to another in a given time
	- Usually measured in bytes not bits
- Goodput: rate at which *useful* data arrives
	- Does not include headers, encoding costs, etc.

Delay
- Processing Delay: figuring out where packet should go
	- Pretty much fixed (almost always variable due to cache hits, network queues, etc. but because of how negligible the times are, we can treat as fixed.)
- Queueing Delay: waiting time to get access to a link
	- Variable
- Transmission Delay: time to write packet to medium
	- Fixed for bits, variable for packets (dependent on size)
- Propagation Delay: time to move each bit over transmission medium
	- Fixed for meter, variable depending on actual length traveled
- End-to-end Delay: sum of all sources of delay

Traffic Intensity
- Determined by
	- Number of packets arriving per second: $a$
	- Average packet size: $L$
	- Transmission rate: rate at which bits are disposed of per second: $R$
- Traffic Intensity: $\frac{La}{R}$
- Delay = $\frac{S}{1-U}$ where $S$ is the average service time when no other requests and $U$ is the server utilization (usually traffic intensity)