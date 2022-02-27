---
title: "NAT"
date: 2022-02-26
tags:
- seed
---

## Network Address Translation
Both network and [transport layer](thoughts/Transport%20Layer.md) (violation of abstraction/layering)

1. More devices than [IP addresses](thoughts/IP%20Addresses.md)! What do we do?
2. Home router gets assigned an IP (public IP) by the ISP
3. Devices connected on the local network are assigned a private IP address (usually starts with subnet mask 196.168.x.x or 10.x.x.x)
4. Changes the private IP address to the public address of the router
	1. Changes source port to some available port
5. Adds the mapping to the NAT forwarding table
	1. Entries correspond to private side (192.168.1.3:42301) to public side (12.13.14.15:24604)
	2. Includes
		1. Source IP
		2. Source Port
		3. Destination IP
		4. Destination Port
		5. [Protocol](thoughts/Protocol.md)
		6. NAT IP (Router public IP address)
		7. NAT Port (Unique)
	3. Actually, Port Forwarding just adds entries to the NAT forwarding table! You can set remote IP and remote port to wildcard entries (i.e. any web requests made to this port go to the specified machine)
		1. Max number of rows is 65535
		2. Any requests that come in then *clone* the wildcard rule and make it specific to that conversation (to avoid collisions to the NAT port)
		3. Entries are removed when a conversation is coming to a close (stream based protocol, detect termination packets)
6. Does the inverse when it receives a packet

## Hole-punching
> Hole punching (or sometimes punch-through) is a technique in computer networking for establishing a direct connection between two parties in which one or both are behind firewalls or behind routers that use network address translation (NAT).

Mostly used in [decentralized](thoughts/decentralization.md) or peer-to-peer communication as the latency incurred by relaying through a central server is prohibitively expensive for real-time activity like voice calling, file syncing, etc.

Hole-punching usually involves the use of third-party hosts that run STUN or ICE to figure out the public address of the NAT.

Note: as [UDP](thoughts/UDP.md) usually expires after very short periods of time, hole-punching sometimes sends keep-alive packets to maintain the connection

### Flow
Let $A$ and B $be$ the two hosts, each in its own private network; $N_A$ and $N_B$ are the two NAT devices with globally reachable IP addresses $EIP_A$ and $EIP_B$ respectively. $S$ is a public server with a well-known, globally reachable IP address.
1. A and B both begin a [UDP](thoughts/UDP.md) conversation with $S$
2. NAT devices $N_A$ and $N_B$ create UDP translations and assign temporary external ports $EP_A$ and $EP_B$
3. S looks at UDP packets to get source ports of $N_A$ and $N_B$ (through $EP_A$ and $EP_B$)
4. S makes pairs of external IP addresses assigned by the NAT along with temporary external ports and exchanges them between $A$ and $B$ (S passes $EIP_A:EP_A$ to $B$ and $EIP_B:EP_B$ to $A$)
5. $A$ and $B$ send packets to each other and their appropriate NAT devices create the entries in their lookup tables
	1. $A$ sends a packet to $EIP_B:EP_B$.
	2. $N_A$ examines $A$'s outgoing packet and adds (Source-IP-$A$, $EP_A$, $EIP_B$, $EP_B$) to its translation table.
	3. $B$ sends a packet to $EIP_A:EP_A$.
	2. $N_B$ examines $B$'s outgoing packet and adds (Source-IP-$B$, $EP_B$, $EIP_A$, $EP_A$) to its translation table.
6. Best case scenario $N_A$ and $N_B$ should have made the entry in the translation. Worst case, both NAT devices have not yet made the entry and drop the first packet sent from $B$ and $
7. At worst, the second packet from both $A$ and $B$ make it to each other. Holes have been "punched" in the NAT and both hosts can directly communicate through $N_A$ and $N_B$ without needing $S$.

### STUN (Session Traversal Utilities for NAT)
Servers like $S$ usually run STUN. Recognized using a `stun` or `stuns` resource record

### ICE (Interactive Connectivity Establishment)
Uses STUN. Provides a structured mechanism to determine the optimal communication path between two peers

### TURN (Traversal Using Relays around NAT)
TURN places a third-party server to relay messages between two clients when direct media traffic between peers is not allowed by a firewall.