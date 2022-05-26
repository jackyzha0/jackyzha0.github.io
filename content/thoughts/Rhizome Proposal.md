---
title: "Rhizome Proposal"
date: 2022-03-14
tags:
- fruit
- rhizome
---

A proposal on building infrastructure for **collaborative local-first applications**.

> Perhaps the current episteme is best rendered as a rhizome: a subterranean plant stem that can shoot out roots that grow, hydralike, even when snipped in two... a system without beginning or end, “always in the middle, between things, interbeing, intermezzo.” [--Claire Webb in Noema](https://www.noemamag.com/the-ladder-the-sphere-and-the-rhizome/)

---

Privacy and security in this world mostly means “which private company do you trust with your safety?” The answer often coincides with who has the largest walls and deepest moats.

Commercial software, especially aggregators, are incentivized to resist interoperability. To be composable is to be commoditized. Interoperability means you no longer have a data lock-in moat, or a privileged hub position in the network.

When you have a universal API for composition each additional tool increases the number of possible workflow combinations by n * (n - 1).

Unix philosophy: Expect the output of every program to become the input to another, as yet unknown, program.

For example, lego rigorously defines the interface between pieces (“the dot”). If they didn’t, each piece would have to make up its own mind about the kind of connector it should present.

- current landscape
	- the competitive advantage of many of today’s popular centralized platforms is their data silo, and the fact that **their service depends entirely on access to that data**. Conceptually speaking, the _service_ offered by Facebook, Twitter, and LinkedIn is fairly simple and could be replicated easily by others. Yet a major reason why people appreciate the services of these platforms is because of their data: Facebook is engaging because our friends’ data is there, Twitter has all of the world’s tweets and direct messages, and LinkedIn showcases our broad networks.
	- Apps are inseparable from data. Applications built on today's internet are extractive and siloed
		- can't just use parts that you like, you use all of it or don't use it at all
	- we spend so much time online that it is worthwhile exploring better ways of existing online
- what is the ideal world?
	- decentralization’s value is in genuinely empowering people to act decisively within their social contexts
		- Decentralizing the Web means that people gain the ability to store their data wherever they want, while still getting the services they need.
		- **Decentralization is about choice**: we will choose where we _store_ our data, who we give _access_ to which parts of that data, which _services_ we want on top of it, and how we _pay_ for those. Nowadays, we are instead forced to accept _package deals_ we cannot customize
		- However, we want the **convenience of the single stream** without the central control that currently comes with that. We want to continue enjoying **the same types of services** that nowadays are only available on centralized platforms. So the important question is: can applications on top of decentralized data **behave the same way as centralized apps**? For example, can we still generate a friend list and news feed like Facebook does—even if our friends’ data is stored on different servers?
	- focus on local units that work independent of large platforms -- at the end of the day platforms should be used to support efficiency of collaboration at scale, the average person doesnt need this to talk to friends for example
	- local units are composable—modular and interoperable with each other, essentially “stackable” to a more global scale—to enable decentralized systems to efficiently solve problems that may at first blush seem to require centralization for coordination
- how people use p2p + distributed tech to get closer to this
	- p2p tech has existed for a while and in theory does all of this!
	- [tk: explain]
	- not much consumer grade tech other than video calling applications and torrents
	- none of these have seen mass adoption, why is that?
- why does it fall short?
	- people don't want to run their own infra
		- spinning up a server is hard for non-technical folks
		- gates a lot of people from adopting this technology
	- data availability + durability
		- connections are ephemeral -- there is no persistent state
		- imagine having your account deleted every time you close your browser window
		- this means that any sort of asynchronous collaboration isn't possible: couldn't work on the same document unless you were both online, couldn't see another's most recent status update unless they were also on facebook
		- Large companies get around this by storing the state of a user’s documents on one of their many servers who make it available on your behalf but P2P apps do not have this luxury. The problem is that most people do not have a device that is “always-on” like a server is
	- network effects of existing platforms
		- migrating data is hard because this is disincentivized for large platforms to support
		- no 'import' tool for new platforms, even if they offer a better service (services like facebook, instagram, etc. do not offer difficult services to make!)
		- data silos are incredibly powerful
	- on a short term horizon: users are not really using p2p because its inconvenient
	- on a long term horizon: developers don't have the infrastructure to build apps that are 10x improvements over existing ones
		- hard to build p2p apps without solving above problems
		- data silos make it hard for people to move platforms
		- need a strong on-ramp from existing platforms to new ones
- why not crypto
	- Lack of ability to store large files on-chain (builders have resorted to referring to IPFS CIDs on-chain but this leads to the [[thoughts/Degraded Blockchain problem|degraded blockchain problem]])
	- Huge losses in speed and efficiency (the global Ethereum computer operates at roughly the speed of a Raspberry Pi)
	- Incredibly high latency for transactions and finality (not to mention transaction + gas fees but I am assuming these will be negligible at some point down the line)
	- All of these make it incredibly unfeasible for data-intensive or real-time applications (e.g. file sharing, games, collaborative text editing) without *aggressive* application of blockchain scaling ideas. Of course, there are certain applications that benefit from the unique properties that blockchains possess (namely strong guarantees about consistency and message ordering) that make it worthwhile for certain applications like cryptocurrencies where 
- why rhizome is a good alternative
	- providing personal cloud -> a data pod that you personally own
	- why would people want a personal cloud?
		- easy on-ramp for people using centralized services
		- a new model of the internet
			- people own their own data
			- Apps in this new model are now just views on top of data -> Applications ask rather than store
				- Apps are different ways of visualizing and interacting with data
			- Instead of maintaining credentials with each app, you log in through your data pod and **give apps permission** to read or write specific parts of your data
			- **Any change in one view is directly reflected in another** because they share the same storage.
			- Separate markets for data and applications
				- current market is competition based on data ownership
				- Whereas having separate markets that work each other creates competition based on service quality
			- This competition argument is highly similar to the Net Neutrality debate, which strives to maintain the separation of the content and connectivity markets.
			- Indeed, we can regard a fully decentralized approach as a way to realize platform neutrality, where applications and storage solutions become interchangeable, just like websites and Internet providers.
	- technical details
		- generalized non-crypto implementation of state channels
		- 

---

## Motivation and Values
Imagine a web where you can bring all of your data from Roam to Obsidian or Google Drive to Dropbox without needing to worry about how to make the file types work or massage the output of one API into another.

Imagine a web where your applications don't just stop working when you lose internet connection or some company intern accidentally takes down production.

Imagine a web where it is *easy* and *normal* to create vast and rich collaborative spaces that allow you co-browse the internet and collectively [[posts/digital-gardening|digital garden]] with friends.

Imagine a web where your digital spaces feel like portable universes and community gardens.

*Rhizome is an attempt at infrastructure for a world where these are possible.*

> Collaboration at scale while keeping local conditions in mind

Below are properties that Rhizome will optimize for:
- Interoperable: data should be first-class, not applications
- Local-first: your apps should work even when the internet is broken
- Collaborative: multiplayer gardens with ease

I've written about these in greater detail regarding [[thoughts/Rhizome Philosophy|Rhizome's Philosophy]].

## Existing problems with peer-to-peer protocols
Many peer-to-peer protocols already exist today, claiming to give people the ability to own their own data. Yet, none of them have seen large-scale adoption with the exception of a few social media platforms.

Reflecting on this, there seems to be 3 major hurdles that no single protocol/system has been able to overcome:

### Availability + Durability
In most P2P apps nowadays, closing your device or disconnecting it from the internet means the end of a session and whatever resource your peers were also connected to is no longer available.

If you need to send someone a file or message, both devices need to be online at the same point. If you need to download a really obscure file through a torrent, the chances that someone is currently seeding it are extremely slim.

Large companies get around this by storing the state of a user's documents on one of their many servers who make it available on your behalf but P2P apps do not have this luxury. The problem is that most people do not have a device that is "always-on" like a server is.

This poses a large problem for emulating those smooth 'always available' experiences that we've grown accustomed to in modern web apps like Google Docs.

### Connectivity
The current Internet, with its NAT routers, firewalls and VPNs, are hostile to P2P connections. Even the best techniques we have to establish direct peer-to-peer connections with other hosts work only about ~85% of the time (see notes on [[thoughts/NAT#Efficacy|hole-punching efficacy]]). Approaches like DHTs are promising but no one has got it to work consistently in a browser yet.

Peer-to-peer connectivity is hard without an intermediary. 

Of course we can always fallback to a trusted server to act as a proxy but this comes at the same price of decentralization. Lots of protocols provide their own signalling and rendez-vous servers you can run but people don't want to run/host/maintain their own servers either!

### Identity
Most P2P protocols don't have good primitives for identity. Most users are identified by whatever session they are in along with a sequence of random numbers or codes.

Once that session is terminated, that notion of identity dissolves. Often, there is no way to identify a user across applications. Sometimes this is useful but not for vast majority of use cases.

Most apps require some notion of persistent 'identity' in order to function properly.

### Why not Blockchain?
At this point, some critics may be screaming "why not just use blockchain??"

I admit that it is true that [[thoughts/blockchain|blockchain]] actually solves most of these problems. Blockchain approaches have great approaches to solving both identity and availability through a combination of wallet addresses and token [[thoughts/incentives|incentive]] mechanisms. Yet, they solve it in a way that leaves much to be desired.

Blockchain causes a whole new set of problems that makes it quite cumbersome to build on top of it -- partially why I suspect there has yet to be a widely-adopted real-world application of [[thoughts/web3|web3]] yet. Some of the core problems that I have personally seen are:
- Lack of ability to store large files on-chain (builders have resorted to referring to IPFS CIDs on-chain but this leads to the [[thoughts/Degraded Blockchain problem|degraded blockchain problem]])
- Huge losses in speed and efficiency (the global Ethereum computer operates at roughly the speed of a Raspberry Pi)
- Incredibly high latency for transactions and finality (not to mention transaction + gas fees but I am assuming these will be negligible at some point down the line)

All of these make it incredibly unfeasible for data-intensive or real-time applications (e.g. file sharing, games, collaborative text editing) without *aggressive* application of blockchain scaling ideas. Of course, there are certain applications that benefit from the unique properties that blockchains possess (namely strong guarantees about consistency and message ordering) that make it worthwhile for certain applications like cryptocurrencies, but for most applications these tradeoffs make no sense and [[thoughts/consistency#Eventual Consistency|eventual consistency]] in a fair-loss crash recovery [[thoughts/system model|system model]] is more than good enough. 

Blockchain is suitable for a very small subset of use-cases. Is there a more general purpose technology that still addresses these main problems?

## So, what is Rhizome?
**Rhizome** aims to be a data-persistence and identity layer for the distributed web.

It is an abstraction on top of IPFS (specifically [IPLD](https://ipld.io/)), Filecoin, and the [[thoughts/Raft Consensus Algorithm|Raft consensus protocol]].

The goal of Rhizome is to build out the model of the *personal cloud*. Think iCloud or Dropbox but distributed and extensible. It is the one database that is the source of truth for all other applications you use. You control it, nobody can take it down because it runs primarily on devices *you own*.

In this model,
- Users have devices (phones, laptops, desktops) they can link to identities
- Data is fully replicated within devices linked to a single identity
- People can own multiple identities (a [[thoughts/pseudonymity|pseudonymous web]])

At this basic level, Rhizome is a local-first data replication and synchronization service much like iCloud/Dropbox. This on its own is already a promising idea but where it gets interesting is how application data is managed.

- All application data is stored in the form of an append-only event log for each app they interact with.
	- This log is compacted and stored as a state snapshot on IPFS that is pinned by an IPFS node running on each device.
- All apps are deterministic state transition functions (functions that transform the state from $x$ at some time $t$ to state $y$ at some time $t+1$). These state transition functions are run over the event log to arrive at some application state.
	- As a result, no servers are needed because all computation now happens locally on your device.
- All apps have a public schema which describe what type of events it adds to the append-only event log.
	- As a result, interoperability and data lensing is easy! A group of users could, for example, edit the same document in different applications because they can easily translate between their message schemas.
	- Users can then 'bind' streams belonging to the same application together temporarily to collaborate live like in Google Docs (CRDTs seem to be promising here).
- All of this will be exposed in the form a single replicated data structure (similar to Firestore) so that developers can easily build collaborative apps without needing to relearn everything from scratch.

Of course, this then brings up a question about how users are going to be able to provide the necessary compute and storage and uptime? Nobody has a set of devices they keep on all the time.

We can solve this with an always-available *cloud peer*, a companion add-on to the sometimes-available personal devices we have. A cloud peer is not a hosting provider, it is rather a different type of a personal device. It does not have a screen, but it is capable in a different way, it complements our personal devices with its high availability, storage, and compute.

![[thoughts/images/rhizome-may-6.jpeg]]*Rough architecture diagram as of May 6th*

The properties work together to make a solid foundation for peer-to-peer applications to exist and thrive in the future.

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

## Output
### Research artifacts
Blog posts explaining distributed systems concepts as I learn and become more familiar with them

- Explainer on Raft
- Explainer on CRDTs
- Modelling distributed systems
- ...more to come

### Root
The data replication and identity part of Rhizome

- Build a modified version of the Raft consensus algorithm that supports no-downtime cluster membership changes. This will be the 'backbone' that allows devices under an identity to replicate application state amongst each other, even in the case of network partitions and device failure.
- Build in the ability for a Raft cluster to snapshot state to disk and to a more permanent layer like IPFS
- Build an abstraction layer on top of IPFS, Filecoin for the persistence and incentive layer

### Trunk
The application-level event log management and collaboration

- Develop a mechanism to optimize event log snapshot frequency to prevent event log from getting too long
- Prototype and test event log reducers that take in $n \geq 1$ event streams and combine them to arrive at a consistent state
- Build an algorithm to 'bind' event logs at different 'streams' of asynchronicity, supporting completely synchronous collaboration and asynchronous pull-request-style collaboration
- Create client libraries to abstract logic into a single replicated data structure (similar to Firestore) for easy consumption by application developers
	- Target environments: Web, Node.js, Rust

---

The goal is to finish the major research artifacts and Root by end of summer.

You can find the ongoing [[thoughts/Rhizome Research Log|research log here]].