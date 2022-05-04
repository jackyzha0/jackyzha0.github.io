---
title: "Rhizome Specification"
date: 2022-04-28
tags:
- sapling
- rhizome
---

> See also: [[thoughts/Rhizome Research Log|Research Log]]

## Misc notes
- should provide key components
	- logical pipes -> connectivity between nodes
	- host bootstrapping -> akin to DHCP, set of protocols supported, basic info and about where to connect for discovery
- petnames rather than global connection table?
	- "One obvious point about trust is that if communication is to be mediated based on trust, then as a preliminary step, parties must be able to know to whom they are talking. Otherwise, one has little basis for judging how much to trust others. One could take this as a call for the imposition of a global namespace of Internet users, with attached trust assessments. We believe this is a bad idea. It is hard to imagine a global system that is really trustworthy."
	- https://dl.acm.org/doi/pdf/10.1145/633025.633059
	- optionally verify identity?

## Application Layer
-   library to listen for events in logic layer
-   addtl library to expose as react hooks?

## Logic Layer
- all message schemas should be public
	- data lenses for transformations between versions + between applications
- multiwriter support?
	- CRDTs over n input message queues????
	- resolution based off of https://cse.buffalo.edu/tech-reports/2014-04.pdf
- publish subscribe endpoints? message bus model
	- TODO: how do we manage scoping?
- filters (read: scope management) + reducers over message queues to achieve state
- incremental reducers?
- state checkpoints?

## Transport Layer / Message Queue
- ID to ID append-only data structure
- standard structure for atomic messages
- max msg size, pagination by default

## Name Resolution/DNS Layer
- distributed hash table for network comms (this replaces DNS)
- ID to IP
- can be used for hole punching for [p2p](thoughts/peer-to-peer.md)
- Still good ol' IP + HTTP for base layer of communication

## NAT/ID Layer
- generative art identifier
- plug and play auth system
	- TODO: how does this integrate
- single priv / pub key pair
	- how do you do [[thoughts/encryption|encryption]] through message queues? priv keys?
- hash of pub key → id
- encrypts a data block on computer containing outgoing message queues
- NAT for local replication
	- trying to reach local ID is actually all of your devices
