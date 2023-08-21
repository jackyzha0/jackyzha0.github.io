---
title: "CID"
date: 2022-06-05
tags:
  - seed
---

Summarized from [Github Specification](https://github.com/multiformats/cid)

> Self-describing content-addressed identifiers for distributed systems

Basically a hash with some metadata. CID is a self-describing format for referencing content, it is a form of [[thoughts/content addressed storage|content addressed storage]].

Format: `<cidv1> ::= <multibase-prefix><multicodec-cidv1><multicodec-content-type><multihash-content-address>`

Where

- `<multibase-prefix>` is a multibase code (1 or 2 bytes), to ease encoding CIDs into various bases. NOTE: Binary (not text-based) protocols and formats may omit the multibase prefix when the encoding is unambiguous.
- `<multicodec-cidv1>` is a multicodec representing the version of CID, here for upgradability purposes.
- `<multicodec-content-type>` is a multicodec code representing the content type or format of the data being addressed.
- `<multihash-content-address>` is a multihash value, representing the cryptographic hash of the content being addressed. Multihash enables CIDs to use many different cryptographic hash function, for upgradability and protocol agility purposes.

## IPVM

[Brooklyn Zelenka from Fission Codes on IPVM](https://fission.codes/blog/ipfs-thing-breaking-down-ipvm/)

CID-based computation also means that we can use [memoization](https://en.wikipedia.org/wiki/Memoization) to inform us if an operation has been run before so we can optimize our efforts and copy the CIDs of those outputs into our work, saving time and compute power.

## Acyclicality

Graphs that use CIDs for references are acyclical! Hashing a cycle would mean that you need to know the CID of the contents _without_ actually traversing its contents.

This is impossible! Consider a cycle `A -> B -> C -> A`. To figure out the CID of `A`, we need to know the CID of `B`. To know the CID of `B` you need to know the CID of `C`. `C`'s CID needs to know the CID of `A` and we are back where we started.

Side note: I guess this could be done by brute forcing a [[thoughts/hash function|hash]] collision but this is so statistically improbable we might as we well consider it impossible
