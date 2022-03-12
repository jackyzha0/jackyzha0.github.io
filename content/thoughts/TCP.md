---
title: "TCP"
date: 2022-03-11
tags:
- seed
---

When a host requires assurance that the remote end has actually received the data it sends. But instead of requesting a signature at the remote end, TCP requires an acknowledgement be returned

Difference between a sender's sequence number and the remote host's acknowledgement number represents any outstanding, unacknowledged data

ACK flag is offset 107

Sequence and acknowledgement number are both 32 bit fields so the range is from $0$ to $2^{32}-1$. After all the $2^{32}$ sequence numbers are used up and more data is to be sent, the sequence numbers can be wrapped around and used again from the starting.

## Sequence Number
Offset 32

Tracks number of bytes sent outward by a host. If a TCP packet contains 1400 bytes of data, then the sequence number will be increased by 1400 after the packet is transmitted.

## Acknowledgement Number
Offset 64

Tracks number of bytes received. If 1000 bytes are received by a host, it increases the acknowledgement number by 1000 when it sends out a packet in response.