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

## Bit-torrent
Suppose some N (could be 1) machines have one file and another M (could be very large) machines want the file.

Could be very slow: limited by the throughput possible by those N machines. Peer to peer could speed this up!

- N hosts are called 'seeds'
- Hosts are called peers
- As soon as one of the M peers has a portion of the file it can share it with other peers

The file is broken into many pieces
- Generally fixed size except for the last one
- Protected by a cryptographic hash (allows reliable detection of corruption)

A summary (torrent file) gives the necessary start up information
- How many pieces there are
- The hash of each piece
- Somewhere to start looking for peers

Basic operation
- Finding other peers
	- Seeds or trackers to start with
	- Peer exchange: each peer 'gossips' about the peers they know about
	- Group of peers for one file is a "swarm"
	- Each peer talks to some subset of the "swarm" at any time
- Finding pieces
	- Each peer shares the identity of the pieces they own with its peers
	- A peer asks a peer who has the file to share it

Generally
- A peer asks for the 'rarest' piece which increases the overall 'health' of the file
- Prioritize ones that are sending the most data to it (preferred peers) -- tit-for-tat
	- Discourages 'selfish' behaviour where peers accept pieces but don't share many pieces
	- Opportunistic unchoking
		- Randomly choose a peer sometimes (prevents problems at the start where there aren't many peers)
- Unpopular/rare files can be hard to find seeds for

It is an open [protocol](thoughts/Protocol.md), most implementations use [TCP](thoughts/TCP.md)

## [Blockchain](thoughts/blockchain.md)

- Purpose: distributed, unmodifiable transaction history
- Uses cryptography to ensure that records added to the history can never be changed or removed
- Can be implemented in a centralized manner (bank ledgers)
	- Primary value of the [decentralized](thoughts/decentralization.md) approach is that it doesn't require a [trusted](thoughts/trust.md) agent
- No central repository of the [truth](thoughts/truth.md), each peer holds the entire history
	- Incredibly hard to forget history as it is heavily replicated
- Dealing with forks
	- Can be some disagreement over whether new blocks are included into the chain
	- Likelihood of a block being removed from the history gets progressively (exponentially) smaller as it gets older
- [Bitcoin](thoughts/bitcoin.md)
	- Anyone can join, initial peers found via DNS
	- Uses [TCP](thoughts/TCP.md)
	- Gossip-based
	- Chain is ~200GB