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
	- "Everything that can apply to B+ Trees and database indexes, can now apply to Prolly Trees with the added ability of it being p2p, sparsely loaded, and mergable. In particular, when merging two datasets, you can easily skip over blocks that are the same on both sides without having to traverse into a tree, you can also insert entire ranges that are new into your tree withut having to fully traverse the individual items within."
	- "If these apps instead used p2p databases, they could drastically improve the initial load times. Instead of waiting for all of the history to sync, a client can focus on getting the set of most recently active users, and query their indexes for just the messages that are needed to render the current view. Detecting notifications like mentions or "new messages" can also be done by comparing your last seen state of somebody's index with the latest one. The app can then pull just the notifications since the last load (or last "marked read") or ignore those indexes entirely if a user has notifications turned off for that channel."
- This enables multi-tenant peer-to-peer [[thoughts/search]]
	- "Another place where p2p search indexes would be useful is for indexing institutional data for text search. Specifically, it could be useful for projects doing archiving of data using [WebRecorder](https://webrecorder.net/) to build up large datasets of crawled data. At the moment, it's possible to index data from these sources using traditional centralized databases like [Elasticsearch](https://www.elastic.co/elasticsearch/), but this requires running centralized infrastructure and doesn't allow for sharing indexes between groups easily."
	- "With p2p databases we can begin to build up search indexes collaboratively with community members, where individuals or smaller groups can participate in generating indexed data, and larger indexes being formed from combining the smaller ones."