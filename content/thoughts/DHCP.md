---
title: "DHCP"
date: 2022-02-26
tags:
  - seed
  - CPSC317
---

Dynamic Host Configuration [Protocol](thoughts/Protocol.md) so they can join a network. Assigns [IP addresses](thoughts/IP%20Address.md) to hosts. Main reason was when people started moving devices across networks

Basic Messages

1. Discovery, host looks for a DHCP server
   1. Sender is 0.0.0.0 port 68
   2. Receiver is 255.255.255.255 port 67 (this is the broadcast address!)
2. Router responds with an offer valid for the next $n$ seconds
   1. This is broadcasted (255.255.255.255) as router does not know where receiver is
3. Host responds with acceptance
   1. Broadcast which address picked
4. Router responds OK
   1. ACK message, still broadcast
   2. Includes
      1. Unique IP Address for Client
      2. Netmask for local network
      3. Lease time
      4. Routing information
      5. Host name, domain name (optional)
      6. Name (DNS) Server

Fields (all [UDP](thoughts/UDP.md))

- `src`: source IP address (usually 0.0.0.0 for no meaningful IP)
- `dest`: destination IP address
- `yiaddr`: your IP address
- `transaction ID`: for matching request with response
