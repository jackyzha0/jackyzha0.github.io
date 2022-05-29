---
title: "DID"
date: 2022-05-28
tags:
- seed
---

Summarized from [W3C Proposal](https://www.w3.org/TR/did-core)

[Decentralized identifiers](https://www.w3.org/TR/did-core/#dfn-decentralized-identifiers) (DIDs) are a new type of [[thoughts/Self-sovereign Identity (SSI)|self-sovereign identity]] that enables verifiable, decentralized digital identity through the use of cryptography.

> They are designed to enable individuals and organizations to generate their own identifiers using systems they trust. These new identifiers enable entities to prove control over them by authenticating using cryptographic proofs such as digital signatures.

Identity is important to identify things. The digital economy relies on proper identification to combine information from different sources. Uniqueness is vital here!

Goals:
1. Ease of creation
2. [[thoughts/decentralization|Decentralized]]
3. Persistent
4. Resolvable
5. Cryptographically verifiable

## High level overview
A DID is a unique string that has a specific syntax. It can be resolved to a *DID Document* in a global, decentralized, key-value database (Verifiable Data Registry).

It can be on any and multiple personal device that you own!

Format: `did:xyz:abcde123456`
1. `did`: fixed string, this is a DID
2. `xyz`: method name (e.g. `btcr` which is built on top of [[thoughts/bitcoin|Bitcoin]], acts sort of like a namespace)
3. `abcde123456`: method specific identifier

Can be thought of like a public decentralized keychain. It binds a public/private key pair to an identity, even when those keys are rotated out and replaced!

The VDR can be hosted/based on any platform (e.g. on distributed [[thoughts/blockchain|blockchains]] or just hosted files on GitHub)

A DID Document can have arbitrary content. It contains references to "controllers" which are entities that have permission to make changes to a DID Document. It can also contain various cryptographic data delated to the DID subject (e.g. RSA, keys, etc.)

## What it enables
- Login without usernames or passwords
- Digitally sign documents and transactions to prove it's you
- Easily send encrypted messages
- Authorize delegates
- Usage and ownership on *your own terms* -- without surveillance or middlemen
- 