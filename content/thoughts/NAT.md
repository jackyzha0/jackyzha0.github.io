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
