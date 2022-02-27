---
title: "ARP"
date: 2022-02-26
tags:
- seed
---

## Address Resolution [Protocol](thoughts/Protocol.md) (ARP)
Purpose: links the [Network Layer](thoughts/Network%20Layer.md) (IP address) with the [link layer](thoughts/Link%20Layer.md) (MAC address)

Case: A wants tot send a datagram to B, but A doesn't know B's MAC address

- A broadcasts an ARP query packet with an IP address: "who has IP address 130.207.160.47?"
- B receives ARP request with that IP address on the LAN will respond with appropriate MAC address.
- Generates an ARP Table maps IP to MAC
	- This is soft state, information that goes away unless refreshed. Each entry has a time limit

General Notes
- Useful because frames use MAC addresses for addressing
- ARP is stateless, doesn't remember whether it sent a request (always reads response)
- Not authenticated, anyone can ARP
- Easily spoofed