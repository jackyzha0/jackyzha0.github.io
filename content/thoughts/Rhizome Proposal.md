---
title: "Rhizome Proposal"
date: 2022-03-14
tags:
- fruit
- rhizome
---

A short proposal and outline for my summer research in 2022 focussed on building infrastructure for **collaborative local-first applications**.

> Perhaps the current episteme is best rendered as a rhizome: a subterranean plant stem that can shoot out roots that grow, hydralike, even when snipped in two... a system without beginning or end, “always in the middle, between things, interbeing, intermezzo.” [--Claire Webb in Noema](https://www.noemamag.com/the-ladder-the-sphere-and-the-rhizome/)

## Motivation and Values
Imagine a web where you can bring all of your data from Roam to Obsidian or Google Drive to Dropbox without needing to worry about how to make the file types work or massage the output of one API into another.

Imagine a web where your applications don't just stop working when you lose internet connection or some company intern accidentally takes down production.

Imagine a web where it is *easy* and *normal* to create vast and rich collaborative spaces that allow you co-browse the internet and collectively [[posts/digital-gardening|digital garden]] with friends.

Imagine a web where your digital spaces feel like portable universes and community gardens.

Rhizome is an attempt at infrastructure for a world where these are possible.

Below are properties that Rhizome will optimize for:
- Interoperable: data should be first-class, not applications
- Modular: choose the parts you like, no vendor lock-in
- Local-first: your apps shouldn't break because the internet stopped working
- Collaborative: multiplayer gardens with ease

I've written about these in greater detail regarding [[thoughts/Rhizome Philosophy|Rhizome's Philosophy]].

## So, what is Rhizome?
### Existing problems with peer-to-peer protocols
Main problems with existing p2p

1. Availability
	- For example, in a P2P collaborative editing app competing with Google Docs, once you close your laptop, your collaborators can't get your latest content, unless they were online when you made edits. If the user wants to send data to someone else, both devices need to be online simultaneously.
	- So some master nodes that "seed" the content are always needed in P2P applications (e.g. Hashbase), but these so called super-nodes often re-centralize things and introduce challenges for permissioning, data sovereignty, and data privacy. Availability problem remains unsolved.
2. Durability
	- Hard to achieve in P2P world -- people don't want to run their own servers!!
	- incentivising others to replicate data is largely unsolved
3. Identity
	- most p2p systems dont bother with identity, purely going off of random numbers or codes
	- no way to identify a user across applications
	- sometimes this is useful (!) but not for vast majority of use cases
	- have all the data you own in one place and be able to own and control it 

### Why not Blockchain?
- blockchain actually solves most of these
	- great approaches to solving identity + availability through incentive mechanisms and wallets
- but in a way i find unsatisfactory
- all of these but trades away speed and efficiency -- in the most anti local-first way possible
- can store only the miniscule amounts of data
- web3 apps have some of the highest latency i've come across (not to mention tx + gas fees but i am assuming these will be fixed at some point down the line)
- makes it incredibly unfeasible for real-time applications (e.g. games, collaborative text editing, etc.)
- most applications dont require the level of consistency that blockchains guarantees
	- for most apps, eventual consistency is good enough
	- even a global database does not make sense for most applications
		- only care about communication in the context of your app
		- what interoperability? most message schemas are not public

### A data-persistence and identity layer
- first step is building a solid foundation for distributed apps is tackling the availability, durability, and identity problems
- Rhizome is a data-persistence and identity layer for the distributed web. 

- It is an abstraction on top of IPFS (https://ipld.io/) + filecoin + raft for syncing eventLogs
- personal cloud model
	- people can own multiple identities ([[thoughts/pseudonymity|pseudonymous web]])
	- data is fully replicated on any device you own
	- manage it just like they would any other on-disk directory
- a user has an eventlog for each app they interact with
	- all apps are actually deterministic state transition functions that are used to reduce the eventlog to some application state
	- as all apps have public schemas, interoperability and data lensing is easy
	- eventually working on how to bind these streams together to enable collaboration (CRDTs seem promising here)

distributed + extensible icloud/dropbox
it is the one database that is the source of truth for all your other applications
you control it, nobody can take it down

### Differentiation from existing work
- [Urbit](https://urbit.org/)
	- Claims to be an overlay OS and networking layer
	- A bad case of [NIH](https://en.wikipedia.org/wiki/Not_invented_here), pretty much reinvented everything from scratch in a language that nobody really understands. Very vaporwavy, not much of their tech lives up to their promises. Good summary [here](https://wejn.org/2021/02/urbit-good-bad-insane/) but TLDR; good in principle, didn't work out in practice.
	- No real applications built on top of it.
	- Modular collaborative yes, no on everything else.
- [Ceramic](https://blog.ceramic.network/what-is-ceramic/)
	- Provides a universal document graph (Ceramic Documents) which by default are interoperable, scalable, and permissionless.
	- Seems to require a blockchain to anchor storage and provide strict ordering which in turn makes real-time data read/write infeasible (e.g. games, chat).
	- Use of DIDs is incredibly smart, potentially enabling [[thoughts/Self-sovereign Identity (SSI)|self-sovereign identity]] down the line.
	- Doesn't seem to support multi-writer documents right out of the box, seems to be an ongoing area of work/research.
	- Great principles and solid work already. Seems to have gained some adoption from people in [[thoughts/web3|web3]] already.
- Hypercore/Dat Protocol:
	- Extremely values aligned! Streaming based append-only log that aims to be the lego-block of distributed applications.
	- Great developer experience.
	- Use of DHT means that it doesn't need a signalling server for peer discovery.
	- Not amazing availability, no incentive system for people to run nodes (though Dat is working on this using a blockchain-based reward system).
	- Not exactly great local first support. Continues working locally without an internet connection but new users cannot connect or get an up-to-date version of your data. If the user wants to send data to someone else, both devices need to be online simultaneously.
	- Hypercore also does not guarantee long-term write-once storage.
	- Multi-writer support is still being worked on.

## Timeline / Labour Estimates
Labour estimate is roughly 40 hours/week for 16 weeks working on this research with the primary output goal being Rhizome. 

Secondary artifacts like open-source implementations of various protocols/consensus mechanisms/algorithms as well as comprehensive and understandable notes for various concepts of [[thoughts/peer-to-peer|peer to peer]] systems will also be produced and released.

A rough hierarchy of work follows:
1. Research artifacts (blog posts explaining ...)
2. tk

You can find the ongoing [[thoughts/Rhizome Research Log|research log here]].