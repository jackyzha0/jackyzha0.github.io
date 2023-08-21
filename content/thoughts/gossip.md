---
title: "Gossip"
date: 2023-04-24
tags:
  - seed
---

> Use random selection of nodes to pass on information to ensure it reaches all the nodes in the cluster without flooding the network

See also: [[thoughts/message broadcast]]

When we receive a message from a client, we want all the other servers to know about that message eventually.

The naive solution is to just send the message to all your peers. However, this doesn't scale super well as the number of nodes $n$ goes up.

Checkout Hashicorp's [convergence simulator](https://www.serf.io/docs/internals/simulator.html)

## Topology

Normally, each node tracks its topology (or local neighbourhood). This is either calculated dynamically or given on initialization.

Then, we broadcast to only our peers (as defined by the topology). Then, through [[thoughts/transitive closure|transitive closures]], the message will make its way to every node if all nodes form a connected subgraph

Two approaches

- Sync: _immediately_ send updates to peers
  - May clog network if updates are frequent
- Async: every now and then send updates to peers (I have these values, what values do you have?)
  - May take a long time for messages to traverse the network if the path between nodes is long and latency is a non-negligible factor
  - Can be done using a Bloom filter

## Stochastic

[Source](https://martinfowler.com/articles/patterns-of-distributed-systems/gossip-dissemination.html)

Gossip Dissemination is based on the mathematical models from epidemiology (see: [[thoughts/Network Theory]])

Each node selects a random node to pass the information it has. This is done at a regular interval, say every 1 second. Each time, a random node is selected to pass on the information.

## Optimizing state transfer

We tag each value with a version (sequence number).

- When transferring state
  - It diffs the values in the message and the values we have locally
  - If entries are in both, we keep the one with the higher version (more recent)
  - Whatever entries are in the message that we don't have, we add
  - Whatever entries that we have that weren't in the message, we return as a response
- Cassandra uses a [three-way handshake](https://cassandra.apache.org/_/index.html)
- [CockroachDB](https://www.cockroachlabs.com/docs/stable/) maintains state for each connected node. For each connection, it maintains the last version sent to that node, and the version received from that node. This is so that it can send 'state since the last sent version' and ask for 'state from the last received version'
- Can also use Bloom filters
- Gossip messages can also act as heartbeats to detect whether something is down
