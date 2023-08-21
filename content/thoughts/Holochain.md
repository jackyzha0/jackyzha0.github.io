---
title: "Holochain"
date: 2022-08-04
tags:
  - seed
---

> Holochain is an open-source application development framework and peer-to-peer networking protocol. It allows you to create truly serverless applications with high levels of security, reliability, and performance. Every user runs the application on their own device, creates and stores their own data, and talks directly to other users. The security of the application is supported by both [[thoughts/cryptography|cryptography]] and peer accountability.

Summarized from [Holochain Docs](https://developer.holochain.org/concepts/1_the_basics/)

We start with users, not servers or data, as the primary system component. The application is modeled from the user perspective, which we call **agent-centric computing**.

Holochain has two main value pillars:

1. Intrinsic data validity: Empowered by the Holochain runtime, each user runs their own copy of the back end code, controls their identity, and stores their own private and public data. Half of the problem is already solved—because everyone has the ‘rules of the game’ in their copy of the code, they can verify that their peers are playing the game correctly just by looking at the data they create.
2. Peer witnessing: Each piece of public data is witnessed, validated, and stored by a random selection of devices using a [[thoughts/DHT|DHT]]. Together, all cooperating participants detect modified or invalid data, spread evidence of corrupt actors or validators, and take steps to counteract threats.

## Terminology

- Conductor: Runtime that sandboxes and runs hApp code. Responsible for all network communication and routing things to the right place.
- hApp: Holochain application. Composed of slots for cells which provide an aspect of functionality.
- Cell: occupies slots in an hApp. Alive version of the DNA. Contains state, settings, etc. that is specific to _that user_
- DNA: A bundle of Zomes that makes a unit of functionality in a hApp.
- Zome: (chromosome). Made up of DNA define the core business logic in a DNA, exposing their functions to the conductor.

## DHT

Of course, the DHT is really large. You need to know its address in order to retrieve a piece of data that matters to you.

But because Holochain's DHT is [[thoughts/content addressed storage|content-addressed]], you can only know the address if you can calculate it from the data (in which case you don’t need to retrieve it), or if you discover the address somehow.

Address discovery in Holochain works through anchors and links.

- Anchors: ‘known’ things you can use as starting points
- Links: an [[thoughts/RDF#RDF Triple|RDF triple]]

## Source Chain

Each user in a Holochain network creates and stores their own data in a journal called a **source chain**. Each journal entry is cryptographically signed by its author and is immutable once written.

Identifiers are based off of a public/private key pair. All messages posted to the source chain are signed so they are tamper-proof. Each message refers the previous one in the order so it order can't be tampered with either.

But unfortunately anyone can modify their own source chain, regenerate the hashes and signatures, and create a perfectly valid, but wrong, alternate history for themselves. The [[thoughts/DHT|DHT]] resolves this sharing your source chain actions and public entries with a random selection of your peers, who witness, validate, and hold copies of them.
