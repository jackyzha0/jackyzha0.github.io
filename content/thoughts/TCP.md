---
title: "TCP"
date: 2022-03-11
tags:
  - seed
  - CPSC317
---

[[thoughts/Transport Layer|Transport layer protocol]]

TCP provides a **reliable**, in-order, port to port, byte-stream service to applications. The application byte-stream is conveyed over the network via TCP segments, with each TCP segment sent as an Internet Protocol (IP) datagram.
## Overview

1. Point-to-point: one sender, one receiver
2. Reliable, in-order byte stream: no message boundaries
3. Pipelined: TCP congestion and flow control set window size
4. Send and receive buffers (similar to GBN and SR)
5. Full duplex data: bi-directional data flow in same connection
   1. MSS: maximum segment size
6. Connection-oriented: handshaking initializes both sender and receiver state before data exchange
7. Flow controlled: sender will not overwhelm receiver

## Flags

Header format:

```
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |       |C|E|U|A|P|R|S|F|                               |
| Offset| Rsrvd |W|C|R|C|S|S|Y|I|            Window             |
|       |       |R|E|G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           [Options]                           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               :
:                             Data                              :
:                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

The control bits are also known as "flags"

- SYN (sychronize): packets used to initiate a connection
- ACK (acknowledgement): packets that are used to confirm that the data packets have been received, also used to confirm the initiation request and tear down requests
- RST (reset): signify the connection is down or maybe the service is not accepting the requests
- FIN (finish): indicate that the connection is being torn down. Both sender and receiver send the FIN packets to gracefully terminate the connection

## Connection Establishment

Three-way handshake. We must prevent segments from one incarnation of a connection from being used while the same sequence numbers may still be present in the network from an earlier incarnation. To solve single initial sequence number problem, we randomly choose the initial sequence number

```
1) A --> B  SYN my sequence number is X
2) A <-- B  ACK your sequence number is X
3) A <-- B  SYN my sequence number is Y
4) A --> B  ACK your sequence number is Y
```

(we can combine 2 and 3 into a single message)

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

The flag is set **if the acknowledgement number field contains a valid acknowledgement number**.
