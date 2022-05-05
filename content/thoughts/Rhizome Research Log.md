---
title: "Rhizome Research Log"
date: 2022-05-03
tags:
- evergreen
- rhizome
---

## May
### May 5th
- Finishing up [[thoughts/distributed systems#Martin Kleppmann's Course|Martin Kleppmann's Course on Distributed Systems]]
	- Cleaning up notes into atomic concepts that I can reference
- Continuing implementation of `miniraft`
- What if... Rhizome had built in mechanisms for managing 'branches'
	- Default branches are single stream
	- To make a collaborative doc you can 'fuse' or 'join' branches together temporarily to sync them with each other
		- What if we made something on top of `git` like this that actually functions on a syntax level rather than a character level... one for the [[thoughts/idea list|idea list]]
	- Pace layers for collaboration
		- Real-time (keystroke-by-keystroke)
		- On-click (manually click refresh)
		- Suggest changes (like Google Docs, accept/reject)
- Agreeing on what operations a [[thoughts/CRDT|CRDT]] can perform still seems to be difficult ([see 1hr into this talk](https://youtu.be/Qytg0Ibet2E?t=3665))
	- Possible room for data lensing on public schemas to be useful here

### May 4th
- Skimming [[thoughts/distributed systems#Martin Kleppmann's Course|Martin Kleppmann's Course on Distributed Systems]]
	- Really good foundation to work off of
	- Learned about differences between physical and logical clocks and realizing that `miniraft` should probably use some sort of [[thoughts/clocks|logical clock]] rate

### May 3rd
- Read about more [[thoughts/NAT#Efficacy|NAT traversal and holepunching efficacy]], turns out hole punching is just not as reliable as I thought it was
- Compared more traditional consensus algorithms like [[thoughts/Raft Consensus Algorithm|Raft]] to [[thoughts/Solana|Solana]].
- First formal architecture sketch?
	- Need to read more about DID and IPFS but this seems like a promising start?
	- Each user is essentially a DID that is associated with an IPFS document that references a bunch of other things
		- Each device in the devices array runs a Rhizome Node which is essentially a wrapped IPFS node that pins the user IPFS object and can edit it
		- Right now, this means that if all a user's devices are offline, those files are unreachable. For people who still want their stuff to be replicated online, perhaps can integrate FileCoin to incentivize other nodes to pin their document?
	- The devices array is also used by Raft to coordinate what devices should be included in the cluster
		- Modifications in the devices array leads to a Raft configuration update
		- All devices that are reachable sync via Raft to keep an `appState` object up to date for the user
		- When any `appState` log gets too long, it is snapshotted by the leader and persisted in IPFS.
	- All the questions that are unanswered right now are in red. Lots of unanswered questions :))
		- How does auth work for applications?
		- How will schemas be published? Is there an app store?
		- Who runs the web host? Is it self-hosted?
			- What about non-technical people?
		- How is a user created?

![[thoughts/images/rhizome-may-3.jpeg]]

### May 2nd
- Mostly reading about [[thoughts/Raft Consensus Algorithm|Raft]] consensus algorithm today and understanding how it works
	- Always wondered how these consensus algorithms deal with bad actors -- turn out they don't! That's where [[thoughts/fault tolerance#Byzantine Faults|BFT]] comes in
	- Seems to be promising for replicating between trusted peers (potentially applicable)
- Starting a very minimal stripped down implementation of [[thoughts/Raft Consensus Algorithm|Raft]] in Rust I am nicknaming `miniraft`. Code [here](https://github.com/jackyzha0/miniraft) (but will most likely be private until it is done).

### May 1st
- Settling back into home, general research reading + writing [[thoughts/Rhizome Proposal|the proposal]]
- Read various papers
	- [[thoughts/internet computing#Changing an entrenched internet|Changing an entrenched Internet]]
	- [[thoughts/mechanism design|Mechanism Design]]
	- [[thoughts/Raft Consensus Algorithm|Raft]]
- Learned about the basic premise of [[thoughts/Self-sovereign Identity (SSI)|SSI]]