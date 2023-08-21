---
title: "ActivityPub"
date: 2022-06-15
tags:
  - seed
---

[From W3C Editor's Draft](https://w3c.github.io/activitypub/)

> The ActivityPub protocol is a decentralized social networking protocol.

In ActivityPub, a user is represented by "[actors](https://w3c.github.io/activitypub/#actors)" via the user's accounts on servers. User's accounts on different servers correspond to different actors.

Used to be called _OStatus_ which was the basis for Mastadon

Based on [ActivityStreams](https://www.w3.org/TR/activitystreams-core/), a social data syntax.

Each actor has:

- An `inbox`: How they get messages from the world
- An `outbox`: How they send messages to others

Here's how sending and reading messages work
![[thoughts/images/ActivityPub diagram.png]]

- You can POST to someone's inbox to send them a message (server-to-server / [[thoughts/federation|federation]] only... this *is* [[thoughts/federation|federation]]!)
- You can GET from your inbox to read your latest messages (client-to-server; this is like reading your social network stream)
- You can POST to your outbox to send messages to the world (client-to-server)
- You can GET from someone's outbox to see what messages they've posted (or at least the ones you're authorized to see). (client-to-server and/or server-to-server)

Messages made by clients get posted to their own server's outbox and the server then posts that to the receiver's inbox.
