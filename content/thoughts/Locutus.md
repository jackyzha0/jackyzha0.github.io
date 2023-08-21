---
title: "Locutus"
date: 2023-04-04
tags:
  - seed
---

Locutus is a [[thoughts/local-first software|local-first]] decentralized key-value database. It uses the same [small world](https://freenetproject.org/assets/papers/lic.pdf) routing algorithm as the original Freenet design, but each key is a cryptographic contract implemented in [[thoughts/WebAssembly|WASM]], and the value associated with each contract is its state.

Locutus is _not_ append-only and has mutable state.

Splits are merged using [[thoughts/CRDT|CRDTs]]
