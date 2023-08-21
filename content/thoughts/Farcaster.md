---
title: "Farcaster"
date: 2022-06-15
tags:
  - seed
---

> Farcaster is a sufficiently decentralized social network.

Two main components:

1. On-chain registry for identity registration (like [[thoughts/DID#High level overview|DID VDRs]]). Table of `username`, `address`, and `host_url`
2. Off-chain hosts where users store social data

## Distributed Host Architecture

Farcaster allows users to host their content on any web server as long as they sign everything with their private key.

There are two options for hosting: self-hosting and using a managed host (like Gmail does for email and Github does for [[thoughts/git|Git]]).
