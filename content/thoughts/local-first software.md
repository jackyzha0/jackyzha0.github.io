---
title: "Local-first software"
date: 2022-04-25
tags:
  - seed
  - pattern
---

> By centralizing data storage on servers, cloud apps also take away ownership and agency from users. If a service shuts down, the software stops functioning, and data created with that software is lost.

Why local first?

- 1-5yr time scale: access benefits, computing literacy
  - [http://viznut.fi/texts-en/permacomputing.html](http://viznut.fi/texts-en/permacomputing.html)
  - Any community that uses computers would have the ability to create its own software. A local software would address local needs better than the generic "one size fits all" solutions would.
- 50yr time scale: change in how we view computing (interop, intersubjective, etc)
- 5000yr time scale: enable interplanetary collaboration

![[thoughts/images/localfirst-jazz.png|600]]
_from Anselm Eickhoff's presentation of [[thoughts/jazz.tools|jazz.tools]] [at Local-first Meetup Berlin](https://www.youtube.com/watch?v=pBvGeU7bL5A)_

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
   1. Auto-merging changes using a [[thoughts/CRDT|CRDT]] or [[thoughts/Operational Transform|OT]]
   2. Asynchronous changes that need review (e.g. suggestions or pull requests)
5. The long now (optional permanence/digital longetivity)
   - When you do some work with local-first software, your work should continue to be accessible indefinitely, even after the company that produced the software is gone.
6. Security and [[thoughts/privacy|privacy]] by default
   - Many professionals cannot use cloud apps due to regulatory compliance and confidentiality obligations.
7. User retains ownership and control
   - You should be able to copy and modify data in any way, write down any thought, and no company should restrict what you are allowed to do.

A potential digital dark age is looming. The documents created in cloud apps are destined to disappear when the creators of those services cease to maintain them. Cloud services defy long-term preservation. No Wayback Machine can restore a sunsetted web application. The Internet Archive cannot preserve your Google Docs.

Servers have a role to play in the local-first world — not as central authorities, but as “cloud peers” that support client applications without being on the critical path. For example, a cloud peer that stores a copy of the document, and forwards it to other peers when they come online, could solve the closed-laptop problem.

The key difference between traditional systems and local-first systems is not an absence of servers, but a change in their responsibilities: they are in a supporting role, not the source of truth.

Active questions:

1. CRDTs accumulate a large change history, which creates performance problems. These pile up, but can’t easily be truncated because it’s impossible to know when someone might reconnect to your shared document after six months away and need to merge changes from that point forward.
2. Network communication remains an unsolved problem. The use of P2P technologies in our prototypes yielded mixed results. On one hand, these technologies are nowhere near production-ready: [[thoughts/NAT|NAT]] traversal, in particular, is unreliable depending on the particular router or network topology where the user is currently connected.
3. Visualizing document history is important and difficult. How do we communicate this version history to users? How should users think about versioning, share and accept changes, and understand how their documents came to be a certain way when there is no central source of truth?
