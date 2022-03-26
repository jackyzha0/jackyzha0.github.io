---
title: "TCP"
date: 2022-03-11
tags:
- seed
---

When a host requires assurance that the remote end has actually received the data it sends. But instead of requesting a signature at the remote end, TCP requires an acknowledgement be returned

## Overview
1. Point-to-point: one sender, one receiver
2. Reliable, in-order byte stream: no message boundaries
3. Pipelined: TCP congestion and flow control set window size
4. Send and receive buffers (similar to GBN and SR)
5. Full duplex data: bi-directional data flow in same connection
	1. MSS: maximum segment size
6. Connection-oriented: handshaking initializes both sender and receiver state before data exchange
7. Flow controlled: sender will not overwhelm receiver

## Connection Establishment
- Three-way handshake
- To solve single initial sequence number problem, we randomly choose the initial sequence number
1. Client sends initial SYN message
	1. Sequence number for client to server is specified
2. Server responds with a SYN/ACK (flip both bits) message
	1. Client to server sequence number is confirmed in ACK
	2. Server to client initial sequence number is specified
3. Client sends an ACK message
	1. Server to client sequence number is confirmed in ACK

## Window Management
- Size is selected by the application (if not the default)
- Both sender and receiver have congestion windows
	- Measured with segments of maximum segment size (MSS)
	- Size is determined by the presence of absence of congestion
	- Actual send window is the min of the flow control window (receiver) and the scaled congestion window (computed by sender)
- Retransmission strategy
	- ACKs correspond to first sequence number not yet received (similar to GBN)
	- Receiver stores packets in its own window (like SR)
	- Four or more ACKs with same number triggers a retransmission without a timeout
	- Retransmit just one segment instead of whole window (like SR)

## Congestion Management
- Very conservative, at first sign of congestion, cuts congestion window in half
- When it appears that congestion has eased, it increases slowly (1 segment to congestion window each time)
- TCP uses bandwidth in a fair way
- Slow start: always start with a congestion window of 1 segment
	- Increase by 1 each time a segment is ACKed (this is exponential, equivalent to doubling each time we send a window full of data)
	- Stop doubling when we detect congestion

## Flow Control
Difference between a sender's sequence number and the remote host's acknowledgement number represents any outstanding, unacknowledged data

ACK flag is offset 107

Sequence and acknowledgement number are both 32 bit fields so the range is from $0$ to $2^{32}-1$. After all the $2^{32}$ sequence numbers are used up and more data is to be sent, the sequence numbers can be wrapped around and used again from the starting.

## Sequence Number
Offset 32

Tracks number of bytes sent outward by a host. If a TCP packet contains 1400 bytes of data, then the sequence number will be increased by 1400 after the packet is transmitted.

## Acknowledgement Number
Offset 64

Tracks number of bytes **received**. If 1000 bytes are received by a host, it increases the acknowledgement number by 1000 when it sends out a packet in response.