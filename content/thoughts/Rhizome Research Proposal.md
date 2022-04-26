---
title: "Rhizome"
date: 2022-03-14
tags:
- fruit
- rhizome
---

A short proposal and outline for my summer research in 2022 focussed on building infrastructure for local-first, multi-writer decentralized applications.

## Motivation and Values
### Local-first
Inspired by a lot of [[thoughts/local-first software#Ink and Switch|Ink and Switch's work around local-first software]], I strongly believe that software should be local-first. The cloud gives us collaboration, but old-fashioned apps give us ownership. Can’t we have the best of both worlds?

Network should be optional. Your apps shouldn't break as soon as you go offline. 

### Multi-writer
Collaboration should be easy and make sense. Provide the option to users to switch between 

### Decentralized
Data as a noun instead of a verb

### Simple Developer Experience
Should plug and play into existing software and your average CS student should be able to write a decentralized application easily

Language and platform agnostic

### Differentiation from existing work
I will be spending more time early summer to fully read up on each of these to figure out how they work so forgive any inaccuracies in the meanwhile.

- Urbit
- Ceramic
- Hypercore/Dat Protocol
- Canvas
	- A layer on top of Hypercore/Dat. Quite value aligned but mainly differs from their focus on on-chain and 
- Liveblocks

## Target
Below is a rough dump on what these values could manifest themselves as 

### Rhizome

Application Layer
-   library to listen for events in logic layer
-   addtl library to expose as react hooks?

Logic Layer
-   all message schemas should be public
	-   data lenses for transformations between versions + between applications
-   multiwriter support?
	-   CRDTs over n input message queues????
	-   resolution based off of https://cse.buffalo.edu/tech-reports/2014-04.pdf
-   publish subscribe endpoints? message bus model
	-   TODO: how do we manage scoping?
-   filters (read: scope management) + reducers over message queues to achieve state
-   incremental reducers?
-   state checkpoints?

Transport Layer / Message Queue
-  (this could be Canvas)
-   ID to ID append-only data structure
-   standard structure for atomic messages
-   max msg size, pagination by default

Name Resolution/DNS Layer
-   distributed hash table for network comms (this replaces DNS)
-   ID to IP
-   can be used for hole punching for [p2p](thoughts/peer-to-peer.md)
-   Still good ol' IP + HTTP for base layer of communication

NAT/ID Layer
-   generative art identifier
-   plug and play auth system
	-   TODO: how does this integrate
-   single priv / pub key pair
	-   how do you do [[thoughts/encryption|encryption]] through message queues? priv keys?
-   hash of pub key → id
-   encrypts a data block on computer containing outgoing message queues
-   NAT for local replication
	-   trying to reach local ID is actually all of your devices

Example application: [[thoughts/Lattice Proposal|Lattice -- an experiment on collective sense-making and digital gardening]]

## Timeline / Labour Estimates
### Research / Background Work
-   p2p readings - w1
-   implement raft in rust - w1
-   https://raft.github.io/#implementations
-   p2p readings contd - w2
-   hypercore deepdive in rust - w2/3
-  CRDT deepdive