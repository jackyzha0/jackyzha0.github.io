---
title: "Local-first software"
date: 2022-04-25
tags:
- seed
---

> By centralizing data storage on servers, cloud apps also take away ownership and agency from users. If a service shuts down, the software stops functioning, and data created with that software is lost.

## Ink and Switch
[You own your data, in spite of the cloud](https://www.inkandswitch.com/local-first/)

To sum up: the cloud gives us collaboration, but old-fashioned apps give us ownership. Can’t we have the best of both worlds?

- Traditional web app model: "If it's not stored in the server database, it didn't really happen"
- Local-first model: "The client's local storage is what matters -- the server is just for multi-user sync and backup"

Local-first ideals include
1. No spinners: your work at your fingertips
	- All operations can be handled by reading and writing files on the local disk, and data synchronization with other devices happens quietly in the background.
2. Your work is not trapped on one device
3. Network is optional
4. Seamless collaboration
	1. Auto-merging changes using a [[thoughts/CRDT|CRDT]] or OT
	2. Asynchronous changes that need review (e.g. suggestions or pull requests)
5. The long now (optional permanence/digital longetivity)
	- When you do some work with local-first software, your work should continue to be accessible indefinitely, even after the company that produced the software is gone.
6. Security and privacy by default
	- Many professionals cannot use cloud apps due to regulatory compliance and confidentiality obligations.
7. User retains ownership and control
	- You should be able to copy and modify data in any way, write down any thought, and no company should restrict what you are allowed to do.

A potential digital dark age is looming. The documents created in cloud apps are destined to disappear when the creators of those services cease to maintain them. Cloud services defy long-term preservation. No Wayback Machine can restore a sunsetted web application. The Internet Archive cannot preserve your Google Docs.

Servers have a role to play in the local-first world — not as central authorities, but as “cloud peers” that support client applications without being on the critical path. For example, a cloud peer that stores a copy of the document, and forwards it to other peers when they come online, could solve the closed-laptop problem.

The key difference between traditional systems and local-first systems is not an absence of servers, but a change in their responsibilities: they are in a supporting role, not the source of truth.

Active questions:
1. CRDTs accumulate a large change history, which creates performance problems. These pile up, but can’t easily be truncated because it’s impossible to know when someone might reconnect to your shared document after six months away and need to merge changes from that point forward.
2. Network communication remains an unsolved problem. The use of P2P technologies in our prototypes yielded mixed results. On one hand, these technologies are nowhere near production-ready: NAT traversal, in particular, is unreliable depending on the particular router or network topology where the user is currently connected.
3. Visualizing document history is important and difficult. How do we communicate this version history to users? How should users think about versioning, share and accept changes, and understand how their documents came to be a certain way when there is no central source of truth?

## TLFS
From [Cloudpeers](https://cloudpeers.co/)

The Local-First SDK offers a stack to write applications as productively as when using state-of-the-art cloud-based architectures. It enables building serverless apps that traditionally require backend engineers to build, scale and maintain.

Really great SDK but unsure how this differs from existing platforms like Yjs or Hypercore (aside from being non-JS native). Could see this being useful for cross-platform live collaboration.

Actually uses a Cambria-like system for data lensing which is cool.

## Locutus
Locutus is a decentralized key-value database. It uses the same [small world](https://freenetproject.org/assets/papers/lic.pdf) routing algorithm as the original Freenet design, but each key is a cryptographic contract implemented in WASM, and the value associated with each contract is its state.

Locutus is *not* append-only and has mutable state.

Splits are merged using [[thoughts/CRDT|CRDTs]]