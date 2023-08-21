---
title: "Link Layer"
date: 2022-02-26
tags:
  - seed
  - CPSC317
---

Layer 4, the layer below the [Network Layer](thoughts/Network%20Layer.md) and layer above the [[Physical Layer]]

1. Hardware
2. Unit: Frame
3. Responsibilities: Routes frames to adjacent machines (“direct” connection) on a local area network (LAN). Defines the format of data on the network
4. Details
   - Breaks up chunks into frames, contains some metadata
   - Hub model (share the same medium) means that we don't need to run wires between every computer (implicit broadcasting). Downside is we have to now specify who the message is for (usually using 48 bit media access control (MAC) addresses)

## VXLAN

LAN but across local networks... spooky

It encapsulates the [[thoughts/MAC]] frame into a [[thoughts/UDP]] datagram for transport across an IP network. This creates an [[thoughts/Overlay Network|overlay network]]
