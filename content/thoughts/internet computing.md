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
	4. Details
		- Breaks up chunks into frames, contains some metadata
		- Hub model (share the same medium) means that we don't need to run wires between every computer (implicit broadcasting). Downside is we have to now specify who the message is for (usually using 48 bit media access control (MAC) addresses)
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

## User Datagram Protocol (UDP)
1. Source Port
2. Destination Port
3. Length
4. Checksum
5. Payload

68 is usually client, 67 is usually server

For reliable networks (like local) where out-of-order protections of TCP are unnecessary, or for time sensitive applications (e.g. streams or calls) where lossy transmission at high speed is better than quality transmission at choppy speed.

## Address Resolution Protocol (ARP)
- Host broadcasts a query with an IP address: "who has IP address 130.207.160.47?"
- Host with that IP address on the LAN will respond with appropriate MAC address.
- Resolves IP to MAC
- Generates an ARP Table maps IP to MAC
- Useful because frames use MAC addresses for addressing

## Hubs, Switches, and Routers
1. Hub - broadcasting through cloning bits (physical layer)
	1. Simplest and cheapest way to create a network
	2. Lots of unnecessary traffic
	3. Other people can see your traffic
2. Switch - hub but it knows where other hosts are for direct addressing (link layer)
	1. Keeps a switch table mapping interface number to MAC address
	2. If table is initially empty, will behave like a hub and broadcast
	3. Can start populating switch table based off of sender field from frames
	4. Quicker than a router for internal communication (though some routers have an Ethernet switch built in)
3. Router - glue that ties networks together (network layer)
	1. Does NOT support broadcast
	2. Serves as a bridge between private home network and the network of the internet provider (which can reach the rest of the internet)
	3. Modern routers can also perform
		1. Network address translation (NAT)
			1. More devices than IP addresses! What do we do?
			2. Home router gets assigned an IP (public IP) by the ISP
			3. Devices connected on the local network are assigned a private IP address (usually starts with subnet mask 196.168.x.x or 10.x.x.x)
			4. Changes the private IP address to the public address of the router (as well as the port)
			5. Adds the mapping to the NAT forwarding table
				1. Entries correspond to private side (192.168.1.3:42301) to public side (12.13.14.15:24604)
			6. Does the inverse when it receives a packet
		2. Assigning IP addresses to hosts using Dynamic Host Configuration Protocol (DHCP)
			1. Discovery, host looks for a DHCP server
				1. Sender is 0.0.0.0 port 68
				2. Receiver is 255.255.255.255 port 67 (this is the broadcast address!)
			3. Router responds with an offer valid for the next $n$ seconds
				1. This is broadcasted (255.255.255.255) as router does not know where receiver is
			4. Host responds with acceptance
				1. Broadcast which address picked
			5. Router responds OK
				1. ACK message, still broadcast
		3. Broadcast WiFi signal

## Error Correction
1. Parity Bit
	1. Even parity is 1 if number of 1s is odd
	2. Can detect odd number of bit flips
3. 2D Parity Bit
	1. 
4. Checksum
	1. Assume data is a sequence of 16-bit integers
	2. Addition, 1's complement sum, carry out added back in
	3. Checksum is the 1's complement of the computed value
	4. Compare with the received data (if same, it is ok)
		1. Alternatively, compute the same function over the data and checksum
5. Cyclic Redundancy Check (CRC)
	1. Parameterized by constants G and r
	2. r + 1 is the length of G (some power of 2)
	3. G is the generator (arbitrary bit pattern)
	4. Sender wants to send D
		1. Chooses r CRC bits, R such that <D, R> is exactly divisible by G (mod 2)
	5. Receiver knows G, divides <D, R> by G. If the remainder is non-zero an error is detected!
	6. Can detect all burst errors less than r+1 bits, and burst errors greater than r+1 with probability 1-0.5^r

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
		2. Controlled by centralized party - passes a token between senders
2. Full-duplex - both sides can transmit at the same time without interference