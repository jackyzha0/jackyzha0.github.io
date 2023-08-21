---
title: "TLS"
date: 2023-06-20
tags:
  - seed
---

TLS evolved from the previous encryption protocol [[thoughts/SSL|SSL]]

## Certificate

The certificate contains important information about who owns the domain, along with the server's [[thoughts/Asymmetric Key Cryptography|public key]], both of which are important for validating the server's identity.

## Handshake

A TLS connection is initiated using a sequence known as the TLS handshake. When a user navigates to a website that uses TLS, the TLS handshake begins between the user's device (also known as the client device) and the web server.

Once data is encrypted and authenticated, it is then signed with a [[thoughts/MAC|MAC]]. The recipient can then verify the MAC to ensure the integrity of the data.
