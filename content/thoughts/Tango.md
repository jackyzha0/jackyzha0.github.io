---
title: "Tango"
date: "2026-08-05"
tags:
  - seed
---
> *Distributed Data Structures over a Shared Log*

[Source Paper](https://www.cs.cornell.edu/~taozou/sosp13/tangososp.pdf)

A system for building highly available metadata services where the key abstraction is a Tango object, a class of in-memory data structures built over a durable, [[thoughts/fault tolerance|fault-tolerant]] shared log

![[thoughts/images/tango-diagram.png|400]]

- By deriving views from the log, it inherits a few properties for free:
	- Consistency: all writes go through the shared history and synchronize on reads
	- Durability: clients can recover views after crashes by playing back the history in the shared log
	- History: previous state can be accessed by instantiating a new view from a prefix of the history
	- Elasticity: the aggregate throughput of [[thoughts/linearizability|linearizable]] reads can be scaled simply by adding new views
- Tango can be viewed as a synthesis of [[thoughts/State Machine Replication (SMR)|SMR]], log-structured storage, and history-based systems
	- Its design is enabled by the existence of fast, decentralized shared log implementations that can scale to millions of appends and reads per second; our implementation runs over a modified version of [[thoughts/CORFU|CORFU]]
- Playback bottleneck mitigation
	- Any single client in the system can only consume the log – i.e., learn the total ordering – at the speed of its local NIC
	- Tango implements a stream abstraction over the shared log. A stream provides a `readnext` interface over the address space of the shared log, allowing clients to selectively learn or consume the subsequence of updates that concern them while skipping over those that do not.
- Two problems have hampered the adoption of the shared log as a mainstream abstraction
	- Any shared log implementation is subject to a highly random read workload, since the body of the log can be concurrently accessed by many clients over the network
		- This concern has largely vanished with the advent of flash drives that can support thousands of concurrent read and write IOPS
	- Existing implementations typically require appends to the log to be serialized through a primary server, effectively limiting the append throughput of the log to the I/O bandwidth of a single machine
		- This problem is eliminated by the [[thoughts/CORFU|CORFU]] protocol, which scales the append throughput of the log to the speed at which a centralized sequencer can hand out new offsets in the log to clients.