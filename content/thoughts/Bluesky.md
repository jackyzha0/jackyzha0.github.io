---
title: "Bluesky"
date: 2022-06-15
tags:
  - seed
aliases:
  - ATProto
---

## ATProtocol

[Source](https://atproto.com/guides/overview)

### Identity

Users are identified by domain names in AT Protocol. ATProto uses a form of domain verification similar to `_dnslink` which involves adding a `TXT` record through your [[thoughts/DNS]] registrar that looks like

```
_atproto.jzhao.xyz TXT "did=did:plc:2jpflw6cyk27tp34il2tud7o"
```

### Data storage

User data is exchanged in signed data repositories. These are stored in personal data servers (PDS).

A "Data Repository” is a collection of data published by a single user. Repositories are self-authenticating data structures, meaning each update is signed and can be verified by anyone. These repositories are collections of records which include posts, comments, likes, follows, media blobs, etc.

Every node is an IPLD object which is referenced by a [[thoughts/CID]] hash.

Additionally, ATP's goal is to ensure that a user can migrate their account to a new PDS without the server's involvement, providing [[thoughts/credible exit]].

### Federation

ATP syncs the repositories in a federated networking model. Federation was chosen to ensure the network is convenient to use and reliably available. Commands are sent between servers using [[thoughts/HTTP]] + XRPC

### Scaling

ATP distinguishes between "small-world" vs "big-world" networking. Small-world networking encompasses inter-personal activity while big-world networking aggregates activity outside of the user's personal interactions.

- **Small-world**: delivery of events targeted at specific users such as mentions, replies, and DMs, and sync of datasets according to follow graphs.
- **Big-world**: large-scale metrics (likes, reposts, followers), content discovery (algorithms), and [[thoughts/search]]

![[thoughts/images/atproto-networking.png]]

### Moderation

> Decentralizing components of existing social networks is about creating a balance that gives users the right to speech, and services the right to provide or deny reach.

Our model is that *speech* (data, networking) and *reach* (crawling, aggregation, algorithm) should be two separate layers, built to work with each other. The “speech” layer should remain neutral, distributing authority and designed to ensure everyone has a voice. The “reach” layer lives on top, built for flexibility and designed to scale.

There's no one company that can decide what gets published; instead there is a marketplace of companies deciding what to carry to their audiences.

![[thoughts/images/speech and reach layers.png]]

> The base layer of ATP (Personal Data Repositories and Federated Networking) creates a common space for speech where everyone is free to participate, analogous to the Web where anyone can put up a website. The Indexing services then enable reach by aggregating content from the network, analogous to a search engine.

### DID Consortium

Source of truth for [[thoughts/DID|DIDs]] on ADX, operated by multiple different operators (organizations) who share ownership of service. They all operate a shared append-only log. Client send transactions to operators. Auditors can monitor the append-only log to ensure the consortium is operating as it should.

### Key management

We believe users should be given the options to use both custodial and non-custodial solutions. Key management is (at this stage) difficult for average consumers and so a custodial solution should be made available, but for professionals and security-conscious users a non-custodial option should also be supported.

The key manager has the following responsibilities:

- Store root private keys
- Publish updates to the users' [[thoughts/DID|DID]] Documents
- Create delegated keypairs through [[thoughts/UCAN|UCAN]] issuance
- Handle recovery flows in the event of key loss
