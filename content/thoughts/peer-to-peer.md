---
title: "Peer to peer"
date: 2022-03-30
tags:
- seed
- CPSC317
aliases:
- peer-to-peer
- p2p
---

In contrast to client-server models, peer-to-peer systems are [[thoughts/decentralization|decentralized]] [[thoughts/Network Theory|networks]] with no privileged nodes. Each node performs the same roles as any other.

A philosophically [[thoughts/plurality|pluralistic]] way of computing that recognizes there isn't only one correct primary site (see: [[thoughts/A Certain Tendency Of The Database Community]]).

Examples include [[thoughts/BitTorrent|BitTorrent]], [[thoughts/blockchain|blockchains]], [[thoughts/Rhizome Proposal|Rhizome]]

## Databases
[Source](https://blog.mauve.moe/posts/peer-to-peer-databases)

- Limitations of Operation logs
	- "... scenarios where somebody is following a lot of users with a lot of history in SSB and needing to wait for all the logs to be processed, or when a new database replica is added and needs to fetch all the existing state (whether it's a regular DB or a blockchain full node)."
	- "One way to get around needing to 'catch up' with a writer is to get 'snapshots' of the current state of the data from trusted peers"
		- However, the naive approach does not work in peer-to-peer situations as we can't verify the legitimacy of the whole snapshot
		- Can we utilize ZK proofs here?
	- Overall, unsolved. All of this together leads to either a [[thoughts/inevitability of centralization|centralization]] of power in long-lived nodes that do the replication for you due to preferential attachment
- Actual databases use indices
	- "For example, instead of an application getting a list of every single post in a database and filtering based on the 'tags', they can say `Get me the first 32 posts with the tag #cats` and the database engine will figure out how to do that for them."
	- This can heavily optimize reads for client applications
- Mauve suggests that we can actually solve these using [[thoughts/Prolly Trees]]
