---
title: "DID"
date: 2022-05-28
tags:
  - seed
---

Summarized from [W3C Proposal](https://www.w3.org/TR/did-core)

[Decentralized identifiers](https://www.w3.org/TR/did-core/#dfn-decentralized-identifiers) (DIDs) are a new type of [[thoughts/Self-sovereign Identity (SSI)|self-sovereign identity]] that enables verifiable, decentralized digital identity through the use of [[thoughts/cryptography|cryptography]].

> They are designed to enable individuals and organizations to generate their own identifiers using systems they trust. These new identifiers enable entities to prove control over them by authenticating using cryptographic proofs such as digital signatures.

Identity is important to identify things. The digital economy relies on proper identification to combine information from different sources. Uniqueness is vital here!

Goals:

1. Ease of creation
2. [[thoughts/decentralization|Decentralized]]
3. Persistent
4. Resolvable
5. Cryptographically verifiable

## High level overview

A DID is a unique string that has a specific syntax. It can be resolved to a _DID Document_ (also called a DDO - DID descriptor object) in a global, decentralized, key-value database (Verifiable Data Registry).

Format: `did:xyz:abcde123456`

1. `did`: fixed string, this is a DID
2. `xyz`: method name (e.g. `btcr` which is built on top of [[thoughts/bitcoin|Bitcoin]], acts sort of like a namespace)
3. `abcde123456`: method specific identifier

Can be thought of like a public decentralized keychain. It binds a public/private key pair to an identity, even when those keys are rotated out and replaced!

The VDR can be hosted/based on any platform (e.g. on distributed [[thoughts/blockchain|blockchains]], [[thoughts/DHT|DHTs]], or just hosted files on GitHub)

A DID Document can have arbitrary content. It contains references to "controllers" which are entities that have permission to make changes to a DID Document. It can also contain various cryptographic data delated to the DID subject (e.g. [[thoughts/RSA|RSA]], keys, etc.)

## What it enables

- Login without usernames or passwords
- Digitally sign documents and transactions to prove it's you
- Easily send encrypted messages
- Authorize delegates
- Usage and ownership on _your own terms_ -- without surveillance or middlemen

## Creating DIDs using IPLD

- In IPID, associating the DID document with a DID is accomplished by cryptographically publishing the [[thoughts/CID|CID]] to the IPNS public key associated with the identity owner (DID method specific identifier). Any updates to the DID document are saved to IPLD and the resulting hash is published to IPNS cryptographically associating the new CID with the DID (for IPID this is the multihash of the public key). IPID uses a PubSub model for realtime updates to the DID.
  - This is self-attesting and does not facilitate consensus of the document across peers
  - Sometimes described as the "microledger" approach
  - Even though IPFS could be used for content addressing there would not be a need to connect to a wider IPFS network.
    - Not resolvable without hosting (which might actually be good for relational DIDs)
- More reading in [RWoT 7, 2018](https://github.com/WebOfTrustInfo/rwot7-toronto/blob/master/final-documents/ipld-did.md)

## DID Method Key

The `did:key` format

This DID Method is purely generative, requiring no look ups in a registry. Since did:key values are not stored in any registry, they cannot be updated or deactivated.

## DWN

A Decentralized Web Node (DWN) is a data storage and message relay mechanism entities can use to locate public or private permissioned data related to a given Decentralized Identifier (DID).

Decentralized Web Nodes are a mesh-like datastore construction that enable an entity to operate multiple nodes that sync to the same state across one another, enabling the owning entity to secure, manage, and transact their data with others.

## Methods

### `did:key`

Great for burner DIDs

### Sidetree

See [[thoughts/Sidetree|Sidetree]]
