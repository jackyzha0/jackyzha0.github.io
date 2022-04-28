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

---

My goal is to answer the question: **What would something like this look like if it were possible?** 

In short, *Rhizome* is an attempt to decouple data from applications. Below are properties that Rhizome will optimize for.

### Interoperable
Data on the web today is mostly treated as second-class to applications. In this form, data is contextual -- it only makes sense in the context of what you can do in an application. At its best, developers and companies expose this data in the form of an API, not allowing you to actually access the underlying data but rather only giving you a limited range of actions or verbs that you can perform on it.

This is known as *verb-based interoperability* and it [creates a form of n-to-n problem](https://twitter.com/andy_matuschak/status/1452438198668328960) where every app needs to know what the APIs of another app are to even begin to interoperate. Data exported in this form rarely makes sense on its own outside of the application and often requires a lot of glue code in order to make the data the right format so that you can pass it off to the next application. In fact, companies are *incentivized* to not provide an easily understandable format that users can easily export. Why would they make it easier for people to leave their product?

Users shouldn't have to keep using platforms they don't like just because it's impossible to move all the data they have to another. Instead, users should *want* to use platforms because it fits the needs they have.

This might be possible if we treat data like a **noun**. How do we create sources of truth that are *legible outside of the application*, possibly in ways that the application developer never anticipated? Data-based interoperability can use the shared data directly. Once an app knows how to read a data format, it can read that data regardless of which app produced it.

This enables users to escape the iron-clad grasp of corporations which hold your data hostage in exchange for usage of their application. Users shouldn't have to sign away all rights to their data when they agree to use app -- they should control what applications have access to their data and how.

### Modular
When users choose to use an application, they generally have no choice but to use the whole stack that application uses.

In choosing an application, you are ceding agency to the application to decide how it stores the data, how it transforms that data, and how it displays that data. Don't like the way an application looks and the app doesn't give you an option to customize it? Better find a new app or deal with it.

Can we give agency back to users by create modular layers so users can pick and choose what layers they want? Can we make it so these layers are available to others to reuse and adapt to their own needs?

### Local-first
The cloud gives us collaboration, but old-fashioned apps give us ownership. Can’t we have the best of both worlds?

We should be able to use our applications without needing to be connected to an internet to load a 4MB web page. Many modern 'desktop' applications are simply Electron wrappers around a web application, providing no such thing as 'offline-support'.

Your apps shouldn't break as soon as you reach an area with spotty internet connection or when some company's server goes down. When you work with local-first software, your work should continue to be accessible indefinitely, even after the company that produces the software has died. You shouldn't need to worry about companies selling your data to advertisers or using it to train large language models without your permission because you control exactly who has access and permission to your data.

The internet should be used to synchronize, update, and collaborate, not be a requirement for basic function. Your data should stay on your device unless you say otherwise.

### Collaborative
Of course, local-first doesn't mean local-only.

It was a dream of the early internet to be able to make spaces anyone can inhabit and enjoy, little pockets of [[thoughts/digital commons|digital commons]] that are tended to by many. 

Apps should have the freedom to create new mediums of being digitally present with others. Apps should easily be able to have a digital indication that a space is lived in and occupied.

As of now, most platforms keep a primative chat log or history but thats it. What if there was a way to create digital [gardens](https://twitter.com/samihusseni/status/1329499588982575104) to foster and maintain existing relationships? A commonspace you could both take care of, share, and contribute to. Completely private common spaces often allow users to put whatever and allow people can construct their own digital nooks and cozy spaces. Places where people can consume the firehose of information through a feed or slow and lazily through Socratic dialogue (see: [friction](thoughts/friction.md), [pace layers](thoughts/pace%20layers.md)).

A collaborative application doesn't necessarily need completely open to the public either. It could just be among your family or close friends. It could just be permeable enough to be discovered by those curious enough to add their own drawings and words and details just hidden enough to be carefully unearthed by the intentional visitor. An app can be a [[thoughts/cozy software#An app can be a home-cooked meal|home-cooked meal]].

### Simple Developer Experience
Last but not least, the experience should feel pleasant to both build and use.

There are clearly social problems when it comes to making collaborative apps (e.g. [[thoughts/tragedy of the commons|tragedy of the commons]], [[thoughts/evaporative cooling|evaporative cooling]]), but even *enabling* this collaboration on a technical level to happen in the first place is already really difficult.

The reason why client-server is so much easier to develop is because of ACID properties. Everything is atomic, things are easy to reason about. P2P and distributed technologies generally are much more difficult to reason about with things like eventual consistency making it hard to understand what is *actually* happening in the code. Networking quirks like NAT traversal make direct connections 

People tend to lean towards client-server models because nobody has made it easy to make P2P software. Almost everything today requires users to still setup their own signalling servers, STUN servers, ICE servers, and a bunch of other infrastructure that makes client-server applications seem like child play.

But what if developers didn't have to worry about server hosting *or* complexities of eventual consistency? Can we make the tech really easy to build so even hobbyists can quickly spin up a chat app for their own friends that suits their own needs?

The libraries that enable this form of P2P software should be able to plug and play into existing applications. The experience should be simple enough that your average CS student should be able to write a simple P2P chat app just as easily (if not easier) as if they wrote it as a client-server application.

### Differentiation from existing work
- [Urbit](https://urbit.org/)
	- Claims to be an overlay OS and networking layer
	- A bad case of [NIH](https://en.wikipedia.org/wiki/Not_invented_here), pretty much reinvented everything from scratch in a language that nobody really understands. Very vaporwavy, not much of their tech lives up to their promises. Good summary [here](https://wejn.org/2021/02/urbit-good-bad-insane/) but TLDR; good in principle, didn't work out in practice.
	- No real applications built on top of it.
	- Modular collaborative yes, no on everything else.
	- -Interoperable +Modular +Local +Collaborative -Developer Experience
- [Ceramic](https://blog.ceramic.network/what-is-ceramic/)
	- Provides a universal document graph (Ceramic Documents) which by default are interoperable, scalable, and permissionless.
	- Seems to require a blockchain to anchor storage and provide strict ordering which in turn makes real-time data read/write infeasible (e.g. games, chat).
	- Use of DIDs is incredibly smart, potentially enabling self-sovereign identity (SSI) down the line.
	- Doesn't seem to support multi-writer documents right out of the box, seems to be an ongoing area of work/research.
	- Great principles and solid work already. Seems to have gained some adoption from people in [[thoughts/web3|web3]] already.
	- +Interoperable +Modular -Local -Collaborative +Developer Experience
- Hypercore/Dat Protocol: tbd
- Yjs: tbd

## Timeline / Labour Estimates
Labour estimate is roughly 40 hours/week for 16 weeks working on this research with the primary output goal being Rhizome. Secondary artifacts like open-source implementations of various protocols/consensus mechanisms/algorithms as well as comprehensive and understandable notes for various concepts of p2p systems will also be produced and released.

All bullet points below are releasable artifacts.

### Research / Background Work
- P2P Readings + Notes - Week 1-3
	- DID
	- Merkle-DAG
	- IPLD
	- CID
	- CRDT
	- Yjs
	- Hypercore
	- SSI
- Implementation Practice
	- Implement [Raft Consensus](https://raft.github.io/#implementations) in Rust - Week 2
	- Barebones Hypercore in Rust - Week 3
	- ... tbd
### Rhizome Implementation
- Revise and concretize [[thoughts/Rhizome Specification|Rhizome Specification]]
- ID Layer - Week 4-7
- Transport Layer - Week 7-10
- Logic Layer - Week 10-13
- Application Layer - Week 13-16
	- Potential application: [[thoughts/Lattice Proposal|Lattice -- an experiment on collective sense-making and digital gardening]] [WIP]