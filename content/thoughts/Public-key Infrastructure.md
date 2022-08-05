---
title: "Public-key Infrastructure"
date: 2022-07-01
tags:
- seed
aliases:
- PKI
---

Public key infrastructure (PKI) is a catch-all term for everything used to establish and manage public key [[thoughts/encryption|encryption]]

For example, it can help ensure that all peers in the network know each other's public keys (i.e. that public keys are... public knowledge)

|Private Key|Public Key|
|--|--|
|Stays secret on your device|Shared with all your peers on the network|
|Acts like a password -- only you have it, and it's necessary for proving ownership of your public key|Acts like a User ID -- people publicly know about this to identity you|
|Can create signatures -- unforgeable, tamper-evident certifications that *you* created that data|Allows others to verify the integrity of your signature|
|A mailbox key -- allows you to open messages that only you can see|A mail slot -- allows others to send you data only you can see|