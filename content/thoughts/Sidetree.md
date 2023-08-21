---
title: "Sidetree"
date: 2022-07-03
tags:
  - seed
---

[Source Spec](https://identity.foundation/sidetree/spec)

A 'meta'/Layer 2 protocol that can be applied to any target trust layer to create a scalable [[thoughts/DID]] method (batteries _almost_ included)

A bunch of DID methods work fine at lab scales (~100 DIDs) but how do we scale to billions?

- Doesn't require any additional consensus, relies on the consensus of the underlying trust layer
- Strict deterministic ruleset means no conflicting states are allowed
- IDs are _not_ transferable

Batches a bunch of operations as content-addressable storage references (read: [[thoughts/IPFS|IPFS]]) and anchors them to underlying trust layer.

[ION](https://identity.foundation/ion/) takes roughly 20 minutes for commitment finality
