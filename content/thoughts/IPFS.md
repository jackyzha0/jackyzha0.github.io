---
title: "IPFS"
date: 2022-06-05
tags:
- seed
---

IPFS is a decentralized storage and delivery network which builds on fundamental principles of [[thoughts/peer-to-peer|p2p]] networking and content-based addressing (see [[thoughts/CID|CID]])

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

## WNFS
Under the Fission project, [see specs](https://guide.fission.codes/developers/webnative/file-system-wnfs)

File system built on top of IPFS. Uses a DAG instead of a hierarchy, meaning that a given child can have more than one parent.

Each user has their own WNFS and consists of a public and private tree.

- The public tree is "live" and publicly accessible on the Internet.
- The private tree is encrypted so that only the owner can see the contents.

Uses [[thoughts/authorization#UCAN|UCAN]] for authorization.