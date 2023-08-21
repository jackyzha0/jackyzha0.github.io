---
title: "Filecoin"
date: 2022-06-23
tags:
  - seed
---

> A decentralized storage network

Summarized from [Filecoin Specs](https://spec.filecoin.io/)

Essentially a [[thoughts/decentralized marketplace|decentralized marketplace]] (see: [storage market](https://spec.filecoin.io/systems/filecoin_markets/storage_market/)) with storage providers and storage users. Providers advertise space and cost and client selects winning storage provider (creating competition). Provider stores the content and is paid with Filecoin on an ongoing basis as long as they can prove they are storing the data properly.

## Filecoin Blockchain + VM

The majority of Filecoin’s user facing functionality (payments, storage market, power table, etc) is managed through the Filecoin Virtual Machine (Filecoin VM). The network generates a series of blocks, and agrees which ‘chain’ of blocks is the correct one. Each block contains a series of state transitions called `messages`, and a checkpoint of the current `global state` after the application of those `messages`.

## Node Types

Any node participating in the Filecoin network should provide the *chain verification* service as a minimum. Depending on which extra services a node provides on top of chain verification, it gets the corresponding functionality and Node Type “label”.

## Networking

Mostly reuses existing libp2p library bits

- Graphsync: used for syncing metadata and blockchain data
- Gossipsub: propagating block headers + messages
- [[thoughts/Kademlia DHT|Kademlia DHT]]: peer discovery + peer routing
- Bootstrap list: list of nodes to connect to upon joining the network, bootstrap nodes and their addresses are defined by the users (i.e. applications)

## Clocks and Time

See also: [[thoughts/clocks|clocks]]

Uses the concept of epochs where $epoch = \lfloor \frac{(current \ time - genesis \ time)}{epoch \ time} \rfloor$

Clocks used as part of the Filecoin protocol should be kept in sync, with offset less than 1 second so as to enable appropriate validation. Nodes SHOULD run an [[thoughts/Network Time Protocol|NTP]] daemon (e.g. timesyncd, ntpd, chronyd) to keep their clocks synchronized to one or more reliable external references.

Nodes have strong incentive to prevent their clock skewing ahead more than one epoch to keep their block submissions from being rejected. Similarly have a strong incentive to prevent their clocks skewing behind more than one epoch to avoid partitioning themselves off from the synchronized nodes in the network.

## Algorithms

### Proof of Storage

The proof that a storage miner indeed keeps a copy of the data they have promised to store is achieved through “challenges”, that is, by providing answers to specific questions posed by the system.

Challenge properties:

1. target a random part of the data and
2. be requested at a time interval such that it is not possible, profitable, or rational for the miner to discard the copy of data and refetch it when challenged.

Two components

1. Proof of replication (PoRep): extends the basic concept of proof-of-retrievability by proving that multiple copies of the data are stored
2. Proof of spacetime (PoSt): extends PoRep by proving that replicas are stored for a given period of time. It involves a series of PoReps
   1. WinningPoSt: The answer to the *WinningPoSt* challenge has to be submitted within a short deadline, making it impossible for the miner to seal and find the answer to the challenge on demand. This guarantees that at the time of the challenge the miner maintains a copy of the data.
   2. WindowPoSt: This involves submitting proofs regularly (see details below) and makes it irrational for a miner to *not* keep a sealed copy of the data as it is more expensive to seal a copy of the data every time they are asked to submit a WindowPoSt challenge.

The sectors a miner has pledged to store, the more the partitions of sectors that the miner will need to prove per deadline. This requires ready access to sealed copies of each of the challenged sectors and makes it irrational for the miner to seal data every time they need to provide a WindowPoSt proof. If this proof is not completed in time, the storage miner supplying that sector in the proof has their collateral slashed and storage power reduced.

### GossipPub

GossipSub is a [[thoughts/gossip|gossip]]-based pubsub protocol that is utilising two types of links to propagate messages:

1. *mesh links* that carry full messages in an *eager-push* (i.e., proactive send) manner and
2. *gossip-links* that carry message identifiers only and realise a *lazy-pull* (i.e., reactive request) propagation model.

   In gossip propagation, only message headers are sent to inform them of messages that they might not have received before. Nodes then ask for the full message, hence, realizing a reactive request, or “lazy pull” model.
