---
title: "CORFU"
date: 2026-10-27
tags:
  - seed
---

> CORFU organizes a cluster of flash devices as a single, shared log that can be accessed concurrently by multiple clients over the network. [It] can be viewed as a distributed SSD

[Source](https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final30.pdf)

A shared log over a cluster of flash units that many clients append to and read from at once, with strong consistency ([[thoughts/linearizability|linearizable]]).

Each position in the shared log is mapped to a set of flash pages on different flash units. This map is maintained – consistently and compactly – at the clients.

### Components

1. A mapping function from logical positions in the log to flash pages on the cluster of flash units.
2. A tail-finding mechanism for finding the next available logical position on the log for new data.
3. A [[thoughts/replication|replication]] protocol to write a log entry consistently on multiple flash pages.

To read data at a specific log position, the client-side library uses the mapping function to find the appropriate flash page, and then directly issues a read to the device where the flash page is located.

To append data, a client finds the tail position of the log, maps it to a set of flash pages, and then initiates the replication protocol that issues writes to the appropriate devices

### Flash Unit Requirements

- Reads on pages that have not yet been written should return an error code (`error_unwritten`)
- Writes on pages that have already been written should also return an error code (`error_overwritten`)
- Required to support a trim command, allowing clients to indicate that the flash page is not in use anymore
- Required to support a seal command. Each incoming message to a flash unit is tagged with an epoch number. When a particular epoch number is sealed at a flash unit, it must reject all subsequent messages sent with an epoch equal or lower to the sealed epoch.
- Expected to detect and re-map bad blocks in this address space

## Handling Failures

- A hole is a log position obtained from a sequencer for an append where the client crashes without completing the write to that position
	- This is handled with a fast hole-filling primitive