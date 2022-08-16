---
title: "On State Replication"
date: 2022-07-11
tags:
- seed
draft: true
---

two reasons computers network with each other
- state transfer: file downloading, loading a website, etc.
- state synchronization: playing games, editing a doc together, sending a message to a group chat

turns out we've spent a lot of time focussing on how to make really good protocols for #1 but most for #2 suck!!
- e.g. HTTP vs WebRTC/WebSockets

- what do people use the internet for? to work with others
- this is the end-to-end principle for the internet
	- everything on it exists to facilitate collaboration with others
- so, why is everything we learn about the web using this weird client-server model?
- to answer this, we need a brief history of computer networking
	- Reality offers a great model—agents in the physical world interact with each other just fine without an absolute, ordered, total view of all events.
- pitfalls of p2p
	- data availability
		- But... data that lives on your machine is also not very available—as soon as you go offline, nobody else can access it. Most users don’t want to run their own servers, so there needs to be a way to make shared data stick around when its author isn’t there.
	- data integrity
		- This is also the point where we run into integrity problems in a peer-to-peer system. When everybody is responsible for creating their own data, they can mess around with it any way they like.

--- 

- replication isn't a new problem
- computer scientists have been trying to figure out how to get many machines to agree on the same value for a while
- differing approaches based on differing assumptions
	- atomic commitment / strong consistency (databases)
	- longest chain consensus / probabilistic (blockchains)
	- eventual consistency (CRDTs)