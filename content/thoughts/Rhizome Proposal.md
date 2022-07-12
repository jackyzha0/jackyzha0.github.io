---
title: "Rhizome Proposal"
date: 2022-03-14
tags:
- evergreen
- rhizome
---

> Companies of the future should derive value from the intelligence they provide on top of existing data rather than have the value be just the data.

*DISCLAIMER: To borrow words from [Robin Sloan](https://www.robinsloan.com/lab/specifying-spring-83/): While it is okay to share this link, I want to underscore that I am sending it specifically to you with the hope that you will really think about it! At such a primordial stage, a proposal like this doesn’t need diffuse, drive-by attention. It needs, instead, close consideration and generous imagination.*

The competitive advantage of the vast majority of today's centralized platforms are in their data moats and network effects. Services like Facebook, Twitter, and Reddit conceptually aren't difficult to replicate -- in fact, your average computer science graduate could probably recreate the functionality of these apps without much difficulty. Rather, the major reason why these platforms remain so dominant is because of their data and users: Facebook has all of our childhood friends, Twitter is the go-to place for unhinged humour and political discourse, and Reddit has millions of niche micro-communities found nowhere else on the internet.

These platforms, especially aggregators, are *incentivized* to resist [[thoughts/decentralization|decentralization]] and [[thoughts/interoperability|interoperability]]. After all, 'data is the new oil'. These services almost entirely depend on making sure that only they have access to that valuable data. Interoperability, on the other hand, means you no longer have a data moat, or a privileged hub position in the network.

![[thoughts/images/platforms as old oil rigs.png]]

As a result, apps have become inseparable from data. They are extractive, asking for ever-increasing access to our personal lives. We willingly sign over the ability to control our data, blindly scrolling miles and miles of Terms of Service Agreements because we know that at the end of the day, we have no power to change what they want from us. You can't choose what parts you like; you either use the platform and sign all of your rights to them, or don't use it at all. [[thoughts/privacy|Privacy]] and security in this world mostly means "which company do you trust with your safety?" The answer often is the one with the largest walls and deepest moats.

![[thoughts/images/data moat.png]]

Clearly, this leaves much to be desired. We spend so much time online that it is worthwhile to explore better ways of existing online.

## An Ideal World
Decentralization is not the solution for everything but it has value in empowering people to act decisively within their social contexts[^1]. Decentralizing the Web means that people gain the ability to store their data wherever they want while still getting the services they need. **Decentralization is about agency**: we get choice about where we _store_ our data, who we give _access_ to which parts of that data, which _services_ we want on top of it, and how we _pay_ for those.

In an ideal world, instead of being forced to accept package deals we cannot customize, we get modular interoperable [[thoughts/local-first software|local-first software]][^2] which we can stack to a global scale. Apps and platforms in this model follow the Unix philosophy: expect the output of every program to become the input to another, as yet unknown, program. Like the Lego "dot" that is the universal connector between all Lego pieces, there exists a universal API that freely enables all software of this model to freely interoperate. With a universal API, each composition between each tool increases the total possible compositions and workflows by $n * (n-1)$, all without developers needing to write the transformations between each one.

In an ideal world, there is *data-neutrality*. Much like how the Net [[thoughts/neutrality|Neutrality]] debate strives to maintain the separation of the content and connectivity markets, data neutrality strives to maintain the separation of data and application markets. Our current market is competitive based on data ownership when it could be competitive based on service quality instead. If we conceive a decentralized approach as a way to enable data and platform neutrality, application platforms and data providers can mix and match, much like how you can browse the many websites of the web on any Internet provider.

In an ideal world, we focus on local-first software that works independently of large platforms -- at the end of the day **platforms should be used to support efficiency of collaboration at scale, not to gate users from moving their data for the sake of retention.**

## Peer-to-peer
Peer-to-peer technology has existed for a while and in theory, gets quite close to realizing this ideal world on its own. Federated open source software means anyone can run their own local instances and customize them to their liking. Organizations like the IETF and W3C work on standardizing open data formats to act as universal formats to store and convert between. Yet, most platforms do the minimum they need as required by law to maintain interoperability and data-neutrality. 

So why does it fall short?

### 1. Running your own infrastructure

> Even nerds do not want to run their own servers at this point. Even organizations building software full time do not want to run their own servers at this point. If there’s one thing I hope we’ve learned about the world, it’s that people do not want to run their own servers.
> 
> Moxie in *My first impressions of Web3*[^3]

Running your own infrastructure and servers is hard. Maintenance and upkeep of your software is hard. There is a reason that companies which offered to do that for others were so successful.

If one company figured out a good way to do $x$, it was incentivized to offer doing $x$ as a service (hence the explosion of SAAS startups) instead of making it easy for competitors to do the same. Overtime, companies specialized at getting really good at doing $x$ and thus became known as the go-to people for that thing. This centralization-over-time of this knowledge leads to the monopolies that we see today.

Centralizing this knowledge in open standards and public, forkable code rather than data moats and proprietary technology is a great start but it isn't enough if the general public doesn't know how to use it. Just as you wouldn't expect the average home owner to setup their internet connection, we shouldn't expect the average person to run their own infrastructure.

It should be easy for people to create competing yet interoperable platform providers and it should be easy for people to switch between platform providers as one can switch between internet providers today.

### 2. Data availability and durability
The vast majority of peer-to-peer applications have yet to solve the data availability problem. In short, all connections are ephemeral -- there is no persistent state. Imagine if everybody you shared a Google Doc with had to be online at the same time everytime you wanted to edit it, or if all 3 billion users of Facebook all had to have the app open to even use it. Imagine if you had your Twitter account deleted every time you closed your browser window.

This means that *asynchronous collaboration isn't possible* in most peer-to-peer apps. Platforms usually get around this by storing the state of a user on one of their many servers who make it available on your behalf but peer-to-peer apps do not have this luxury -- most people do not have a device that is “always-on” like a server is.

### 3. Existing network effects
Migrating data off of existing platforms is extremely difficult as this is something large platforms are disincentivized from supporting. Even if there are 'export' tools on platforms, they are the worst they can be while still meeting [GDPR Requirements](https://gdpr-info.eu/art-20-gdpr/). New platforms almost never have 'import' tools because each platform has their own data format and that format changes unpredictably. This [creates a form of n-to-n problem](https://twitter.com/andy_matuschak/status/1452438198668328960) where every app needs to know what the APIs of another app are to even begin to interoperate. 

> "But usually you don't want a dead snapshot; you want to "use this data elsewhere"—which requires repeatedly exporting & reconciling."
> 
> [Andy Matuschak on Twitter](https://twitter.com/andy_matuschak/status/1452438176996347907)

This means that, even if an alternative platform offers a better service, switching is often impossible.

The important question is: can applications on top of decentralized data **behave the same way as centralized apps**? Can we still aggregate information into feeds and present a cohesive user experience even if all of our friends' data is stored in different places?

## Why not use blockchains?
I admit that it is true that [[thoughts/blockchain|blockchain]] actually solves most of these problems. Blockchain approaches have great approaches to solving both identity and availability through a combination of wallet addresses and token [[thoughts/incentives|incentive]] mechanisms. Yet, they solve it in a way that leaves much to be desired.

Blockchain causes a whole new set of problems that makes it quite cumbersome to build on top of it. Some of the core problems that I have personally seen include
- Lack of ability to store large files on-chain in a cost-effective manner
- Massively reduced speed and efficiency (the global Ethereum computer operates at roughly the speed of a Raspberry Pi)
- High latency for transactions and finality (not to mention transaction + gas fees but I am assuming these will be negligible at some point down the line)

All of these make it incredibly unfeasible for data-intensive or real-time applications (e.g. file sharing, games, collaborative text editing) without *aggressive* application of blockchain scaling ideas. Of course, there are certain applications that benefit from the unique properties that blockchains possess (namely strong guarantees about consistency and message ordering among the presence of [[thoughts/fault tolerance#Byzantine Faults|Byzantine]] actors) that make it worthwhile for certain applications like cryptocurrencies, but for most applications these tradeoffs make it hard for end users to adopt.

Blockchain is suitable for a very small subset of use-cases. Is there a more general purpose technology that still addresses these main problems?

## The personal cloud
**Rhizome** aims to be a data-persistence and identity layer for the distributed web. The goal of Rhizome is to enable *data-neutrality* by separating data from applications.

It is made up of two layers
1. Root: a personal data pod that *you* own. Think iCloud or Dropbox but you have agency over how much storage you want, who has access to it, and what you want to do with it.
2. Trunk: a framework for easily developing cohesive peer-to-peer applications on top of data from Root

As a whole, it forms the basis for a new model of the internet where first and foremost, people own their own data. This enables entirely new dimensions of computation and collaboration on the web.

- Single purpose apps backed by general-purpose data[^4]. Apps in this new model are now just views on top of data rather than a tight coupling of data and logic. If two apps are views on the same data, any change to the underlying data will instantly update *both apps*.
- Applications ask for access rather than store their own data. Instead of maintaining a separate log-in for each app, you give apps permission to read or write specific parts of your data.
- Local-first means interaction times are measured in *microseconds* not seconds, resulting in more responsive-feeling applications and no loading spinners.
- Two users can collaborate by simply 'inviting' another to temporarily synchronize a subset of their data. Developers no longer have to worry about building out separate infrastructure for live editing or collaboration.
- As there are separate markets for data and applications, it creates competition based on service quality rather than on data ownership.

With Rhizome, we get the convenience of a single centralized platform without the lack of agency that comes with it.

## Technical Details
Rhizhome is a set of abstractions on top of DIDs, IPFS (specifically [IPLD](https://ipld.io/)), [[thoughts/Filecoin|Filecoin]], and the [[thoughts/Raft Consensus Algorithm|Raft consensus protocol]]. It can be analogized to a generalized implementation of [[thoughts/state channels|state channels]] which don't need to be anchored to a chain.

- Root is a local-first data replication and synchronization service much like iCloud/Dropbox. Root will be implemented as a DID method which uses IPFS as a VDR. The pinned state snapshot is the DID Document.
- All application data is stored in the form of an append-only event log for each app they interact with. This log is compacted and stored as a state snapshot on IPFS that is pinned by an IPFS node running on each device.
	- Data availability is achieved with an always-available *cloud peer*, a companion add-on to the sometimes-available personal devices we have. A cloud peer is not a hosting provider, it is rather a different type of a personal device. It does not have a screen, but it is capable in a different way, it complements our personal devices with its high availability, storage, and compute.
	- A public marketplace where people can buy and sell compute/storage. Reliability of service is ensured using a modified version of [[thoughts/Filecoin|FileCoin]]'s [Proof of Replication](https://filecoin.io/blog/posts/what-sets-us-apart-filecoin-s-proof-system/)and providers can advertise storage/compute specification so purchasers can choose whether to optimize for space or performance.
- Users can then 'bind' streams belonging to the same application together temporarily to collaborate live like in Google Docs
- All apps are deterministic state transition functions (functions that transform the state from $x$ at some time $t$ to state $y$ at some time $t+1$). These state transition functions are run over the event log to arrive at some application state.
- All of this will be exposed in the form a single replicated data structure (similar to Firestore or yjs) so that developers can easily build collaborative apps without needing to relearn everything from scratch

When Root and Trunk are combined, its properties handily solve or avert the three problems listed above:
1. Data replication is considered solved as devices under a single DID sync with each other. Data availability is solved with a cloud peer which can be bought from a distributed and decentralized network of providers.
2. Users no longer need to run their own server infrastructure as compute happens natively on a users device rather than on some remote sever. When a user needs more compute, they can utilize a cloud peer which is like renting compute from a neutral provider.
3. As all apps have a public schema which describe what type of events it adds to the append-only event log, interoperability and data lensing is zero-cost to developers. To interoperate with outside apps, anyone can publish a schema file for the output of a data export of API call for example.

![[thoughts/images/rhizome-may-6.jpeg]]*Rough architecture diagram as of June 1st*

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
	- Use of [[thoughts/DHT|DHT]] means that it doesn't need a signalling server for peer discovery.
	- Not amazing availability, no incentive system for people to run nodes (though Dat is working on this using a blockchain-based reward system).
	- Not exactly great local first support. Continues working locally without an internet connection but new users cannot connect or get an up-to-date version of your data. If the user wants to send data to someone else, both devices need to be online simultaneously.
	- Hypercore also does not guarantee long-term write-once storage.
	- Multi-writer support is still being worked on.

## Output
### Research artifacts
Blog posts explaining distributed systems concepts as I learn and become more familiar with them

- [[thoughts/Raft Consensus Algorithm|Explainer on the Raft Consensus Algorithm]]
- Explainer on CRDTs
- Modelling distributed systems
	- [<1kloc Raft Implementation](https://github.com/jackyzha0/miniraft)
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

You can find the ongoing [[thoughts/Rhizome Research Log|research log here]].

## Acknowledgements
Thank you to Anson, Sebastien, Jamie, Raymond, Morgan, David, Aadil, JZ, Nishant, Anh, Farzaa, Amir, Aaron, Spencer, Rishi, Jasmine, and Pranav for you continued support. This project wouldn't be possible without all of you :))

[^1]: Divya Siddarth, Danielle Allen, E. Glen Weyl, *The Web3 Decentralization Debate is Focused on the Wrong Question* in Wired Magazine ([Source](https://www.wired.com/story/web3-blockchain-decentralization-governance/))
[^2]: Martin Kleppmann, Adam Wiggins, Peter van Hardenberg, Mark McGranaghan, *Local-first software* in Ink & Switch ([Source](https://www.inkandswitch.com/local-first/))
[^3]: Moxie Marlinspike, *My first impression of web3* ([Source](https://moxie.org/2022/01/07/web3-first-impressions.html))
[^4]: Spencer Chang on [Twitter](https://twitter.com/spencerc99/status/1544420768137740288)
