---
title: "Link Layer"
date: 2022-02-26
tags:
- seed
---

Layer 4, the layer below the [Network Layer](thoughts/Network%20Layer.md) and layer above the [[Physical Layer]]
1. Hardware
2. Unit: Frame
3. Responsibilities: Routes frames to adjacent machines (“direct” connection). Defines the format of data on the network
4. Details
	- Breaks up chunks into frames, contains some metadata
	- Hub model (share the same medium) means that we don't need to run wires between every computer (implicit broadcasting). Downside is we have to now specify who the message is for (usually using 48 bit media access control (MAC) addresses)