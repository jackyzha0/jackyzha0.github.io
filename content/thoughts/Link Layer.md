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

Parameters
- MTU (maximum transmission unit): the size of the largest protocol data unit (PDU) that can be communicated in a single network layer transaction
	- Larger MTU is associated with reduced overhead.
		- Large packets are also problematic in the presence of communications errors. If no forward error correction is used, corruption of a single bit in a packet requires that the entire packet be retransmitted, which can be costly
	- Smaller MTU values can reduce network delay
		- Smaller packets are problematic because they have lower goodput (ratio of headers and other metadata to actual user data is higher because the packets themselves are smaller)
	- Common MTUs
		- [[thoughts/IP Address|IP]]v4: 68B to 64KiB
		- IPv6: 1280B to 64KiB
		- Ethernet: 1500B
		- IEEE 802.11 (Wi-Fi / WLAN): 2304B (encrypted will add 8-20B to overhead)

## VXLAN

LAN but across local networks... spooky

It encapsulates the [[thoughts/MAC]] frame into a [[thoughts/UDP]] datagram for transport across an IP network. This creates an [[thoughts/Overlay Network|overlay network]]

