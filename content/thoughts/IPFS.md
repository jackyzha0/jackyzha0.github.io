---
title: "IPFS"
date: 2022-06-05
tags:
  - seed
---

IPFS is a decentralized storage and delivery network which builds on fundamental principles of [[thoughts/peer-to-peer|p2p]] networking and content-based addressing (see [[thoughts/CID|CID]])

> Can seen as a single BitTorrent swarm, exchanging objects within one big [[thoughts/git|Git]] repository

Much like how we look up sites on the internet using URIs, we can look for specific pieces of content by their [[thoughts/content addressed storage|content-address]].

Under the hood, IPFS uses

- libp2p: network layer, takes care of host addressing, content and peer discovery, and structures like DHTs and pubsub
- IPLD: data layer, standards and formats to build [[thoughts/Merkle-DAG|Merkle-DAG]] structures (quasi-filesystem)
- Multiformats: formatting structures for self-describing values

Publishing content

- Chunk the content and deduplicate chunks
- Obtain CID
- Add the content to the network
  - Not the actual content, just the provider record to the [[thoughts/DHT|DHT]]

Consuming content as a peer

- Get CID (out of band)
- Using [[thoughts/DHT|DHT]], resolve CID to peer
- Contact peer to ask for CID content
- Fetch content and cache a copy
- Serve local copy upon subsequent request

## Encoding/decoding

How does the system decode the hashes that it gets into the component data structures?

Codecs! IPLD codecs are functions that transform IPLD Data Model into serialized bytes so you can send and share data, and transform serialized bytes back into IPLD Data Model so you can work with it. The [[thoughts/CID|CID]] includes an indicator called a multicodec (opens new window)to tell us which codec to use!

Systems can build abstractions on top of this. For example, IPFS encodes the UnixFS using DAG-PB (which is a IPLD codec).

> Because the CID can describe different codecs relating to different systems, all sorts of systems can interoperate using CIDs, and IPLD and process and cross-link data from any of them.

## Block Exchange using BitSwap

BitSwap peers are looking to acquire a set of blocks (`want_list`), and have another set of blocks to offer in exchange (`have_list`). Unlike BitTorrent, BitSwap is not limited to the blocks in one torrent. BitSwap operates as a persistent marketplace where node can acquire the blocks they need, regardless of what files those blocks are part of. The blocks could come from completely unrelated files in the filesystem. Nodes come together to barter in the marketplace.

### Incentivizing rare blocks

Of course, there will not be perfect overlaps between nodes' `have_list` and `want_list`s . Nodes must work for their blocks. In the case that a node has nothing that its peers want (or nothing at all), it seeks the pieces its peers want, with lower priority than what the node wants itself. **This incentivizes nodes to cache and disseminate rare pieces, even if they are not interested in them directly.**

This barter system implies a virtual currency could be created, this would require a global ledger to track ownership and transfer of the currency, which is exactly what [[thoughts/Filecoin|Filecoin]] provides.

### Incentivizing satisfied nodes to seed

The protocol must also incentivize nodes to seed when they do not need anything in particular, as they might have the blocks others want. Thus, BitSwap nodes send blocks to their peers optimistically, expecting the debt to be repaid.

A simple credit-like system solves the problem:

1. Peers track their balance (in bytes verified) with other nodes.
2. Peers send blocks to debtor peers probabilistically, according to a function that falls as debt increases. The probability function, given a debt ratio $r = \frac{\textrm{bytes sent}}{\textrm{bytes received} + 1}$ is $P(send | r) = 1 - \frac{1}{1 + \exp(6-3r)}$. The debt ratio is a measure of trust: lenient to debts between nodes that have previously exchanged lots of data successfully, and merciless to unknown, untrusted nodes. This also strongly disincentivizes Sybil attacks by making it hard for new nodes to request a lot of blocks without the intention of paying them back.

## Pinning

This ensures the objects are kept in the node’s local storage. Pinning can be done recursively, to pin down all linked descendent objects as well. All objects pointed to are then stored locally. This is particularly useful to persist files, including references

## WNFS

Under the Fission project, [see specs](https://guide.fission.codes/developers/webnative/file-system-wnfs)

File system built on top of IPFS. Uses a DAG instead of a hierarchy, meaning that a given child can have more than one parent.

Each user has their own WNFS and consists of a public and private tree.

- The public tree is "live" and publicly accessible on the Internet.
- The private tree is encrypted so that only the owner can see the contents.

Uses [[thoughts/authorization#UCAN|UCAN]] for authorization.
