---
title: "Systems Design"
date: 2022-12-10
tags:
  - seed
---

## Software Systems

System design in this context means defining the architecture, product design, modules, interfaces, and data for a system according to given requirements. The purpose of system design is to architect a system that can effectively support the functionality of a product or service.

See also: [[thoughts/system model]]

- Requirements
  - Functional: what does the system need to do?
  - Non-functional: what properties does it need?
- 4 things to ask clarifications on
  1.  Users: who will use the system? how will they use it?
  2.  Scale: how will our system will handle a growing amount of data?
  3.  Performance: how fast must our system be?
  4.  Cost: what are our budget constraints?

## Latency Numbers

```
Latency Comparison Numbers
--------------------------
Register reference                           0.1 ns
L1 cache reference                           0.5 ns
Branch mispredict                            5   ns
L2 cache reference                           7   ns                      14x L1 cache
Mutex lock/unlock                           25   ns
Main memory reference                      100   ns                      20x L2 cache, 200x L1 cache
Compress 1K bytes with Zippy            10,000   ns       10 us
Send 1 KB bytes over 1 Gbps network     10,000   ns       10 us
Read 4 KB randomly from SSD*           150,000   ns      150 us          ~1GB/sec SSD
Read 1 MB sequentially from memory     250,000   ns      250 us
Round trip within same datacenter      500,000   ns      500 us
Read 1 MB sequentially from SSD*     1,000,000   ns    1,000 us    1 ms  ~1GB/sec SSD, 4X memory
HDD seek                            10,000,000   ns   10,000 us   10 ms  20x datacenter roundtrip
Read 1 MB sequentially from 1 Gbps  10,000,000   ns   10,000 us   10 ms  40x memory, 10X SSD
Read 1 MB sequentially from HDD     30,000,000   ns   30,000 us   30 ms 120x memory, 30X SSD
Send packet CA->Netherlands->CA    150,000,000   ns  150,000 us  150 ms

Notes
-----
1 ns = 10^-9 seconds
1 us = 10^-6 seconds = 1,000 ns
1 ms = 10^-3 seconds = 1,000 us = 1,000,000 ns
```

Based off of the above:

- Read sequentially from HDD at 30 MB/s
- Read sequentially from 1 Gbps Ethernet at 100 MB/s
- Read sequentially from SSD at 1 GB/s
- Read sequentially from main memory at 4 GB/s
- 6-7 world-wide round trips per second
- 2,000 round trips per second within a data center

## Real-time

- WebRTC
  - Fast message propagation (no relaying)
  - Encryption and authorization over untrusted signaling servers
  - No setup required, public signaling servers are available
  - Not suitable for a large number of peers (quadratic explosion of complexity)
    - Browser have a max on connectivity: ~100 diff connections but varies per browser
- WebSockets
  - Clients connect to a single endpoint over Websocket. The server distributes document updates and awareness information among clients.
  - Solid choice if you want a central source that handles authentication and authorization
  - Also send header information and cookies, so you can use existing authentication mechanisms with this server
- Hypercore/Dat
  - Uses a [[thoughts/DHT]] + [[thoughts/NAT]] traversal utilities
  - Low latency
  - Medium reliability

## 4+1 Architectural Model

1. Logical view: The logical view is concerned with the functionality that the system provides to end-users (usually uses UML)
2. Process view: The process view deals with the dynamic aspects of the system, explains the system processes and how they communicate, and focuses on the run time behaviour of the system (usually sequence diagram, communication diagram, activity diagram)
3. Development/Implementation view: The development view illustrates a system from a programmer's perspective and is concerned with software management. (usually package/component diagram)
4. Physical/Deployment view: The physical view depicts the system from a system engineer's point of view. It is concerned with the topology of software components on the physical layer as well as the physical connections between these components
5. (+1) Scenarios: The description of an architecture is illustrated using a small set of use cases, or scenarios. They also serve as a starting point for tests of an architecture prototype
