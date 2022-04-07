---
title: "Rhizome"
date: 2022-03-14
tags:
- fruit
draft: true
---

Longer-term research project/experiment around building multi-writer decentralized applications specific focus on local-first

## Lattice
- curius + obisidian + gdocs?? example application
	-   collaborative gardening
	-   take notes on website iframes and link to them

## Application Layer
-   library to listen for events in logic layer
-   addtl library to expose as react hooks?

##  Logic Layer
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
## NAT/ID System
-   generative art identifier
-   plug and play auth system
	-   TODO: how does this integrate
-   single priv / pub key pair
	-   how do you do [[thoughts/encryption|encryption]] through message queues? priv keys?
-   hash of pub key → id
-   encrypts a data block on computer containing outgoing message queues
-   NAT for local replication
	-   trying to reach local ID is actually all of your devices

## Transport Layer / Message Queue
-  (this could be Canvas)
-   ID to ID append-only data structure
-   standard structure for atomic messages
-   max msg size, pagination by default

## IP/Name Resolution/DNS Layer
-   distributed hash table for network comms (this replaces DNS)
-   ID to IP
-   can be used for hole punching for [p2p](thoughts/peer-to-peer.md)
-   Still good ol' IP + HTTP for base layer of communication