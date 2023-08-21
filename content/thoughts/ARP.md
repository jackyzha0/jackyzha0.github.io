---
title: "Address Resolution Protocol (ARP)"
date: 2022-02-26
tags:
  - seed
  - CPSC317
---

Purpose: links the [Network Layer](thoughts/Network%20Layer.md) (IP address) with the [link layer](thoughts/Link%20Layer.md) (MAC address)

Case: A wants to send a datagram to B, but A doesn't know B's MAC address

- A broadcasts an ARP query packet with an [[thoughts/IP Address|IP Address]]: "who has IP address 130.207.160.47?"
- B receives ARP request with that IP address on the LAN will respond with appropriate MAC address.
- Generates an ARP Table maps IP to [[thoughts/MAC]]
  - This is soft state, information that goes away unless refreshed. Each entry has a time limit

General Notes

- Useful because frames use MAC addresses for addressing
- ARP is stateless, doesn't remember whether it sent a request (always reads response)
- Not authenticated, anyone can ARP
- Easily spoofed
