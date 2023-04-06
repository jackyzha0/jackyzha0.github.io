---
title: "IP Address"
date: 2022-02-26
tags:
- seed
- CPSC317
---

IP addresses are 32 bits (4 bytes) split into 4 chunks. Obviously $2^{32}$ is an incredibly large address space so we compress the table using IP prefixes.

### IPv4
Special Addresses
1. First address (generally all 0s): network itself, or not assigned
2. Last address (generally all 1s): broadcast

### CIDR Notation
`IP/#` where # is the number of bits in the network ID

e.g. `18.0.0.0/8` means first 8 bits are network ID, and `18.x.x.x` is the space of all possible addresses ($2^{3*8}=2^{24}$)

By default, routers will take the most specific one (longest network ID).

To prevent loops, we set a TTL (time-to-live) for packets to expire after a certain time.
