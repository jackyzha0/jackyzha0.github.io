---
title: "Secure Scuttlebutt (SSB)"
date: 2022-08-11
tags:
  - seed
aliases:
  - SSB
---

## SSB

Secure Scuttlebutt is a database protocol for unforgeable (read: [[thoughts/digital signatures|digitally signed]]) append-only message feeds.

## Scuttlebot

Scuttlebot forms a global cryptographic social network with its peers. Each user is identified by a public key, and publishes a log of signed messages, which other users follow socially.

### Identity

Web-of-Trust style (see: [[thoughts/Public-key Infrastructure#PGP|PGP]]). There is no global registry of usernames. Instead, users name themselves, and share [[thoughts/petname|petnames]] for each other.

Identities are Ed25519 key pairs.

### Pub Servers

To get over the data availability problem and because Scuttlebot has no [[thoughts/DHT]] or NAT-traversal utilities, users must "join" a Pub to distribute their messages on the WAN.

Pubs are bots that follow users and rehost the messages to other peers, ensuring good uptime and no firewall blockage.

## Secret Handshake

An encrypted channel protocol based on a mutually authenticating key agreement handshake, with forward secure identity metadata. It's used by Scuttlebot to authenticate and encrypt peer connections.
