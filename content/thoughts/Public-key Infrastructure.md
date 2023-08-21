---
title: "Public-key Infrastructure"
date: 2022-07-01
tags:
  - seed
aliases:
  - PKI
---

Public key infrastructure (PKI) is a catch-all term for everything used to establish and manage [[thoughts/Asymmetric Key Cryptography|public key cryptography]]. Related is the [[thoughts/Key Sharing Problem|key sharing problem]].

For example, it can help ensure that all peers in the network know each other's public keys (i.e. that public keys are... public knowledge)

| Private Key                                                                                           | Public Key                                                             |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Stays secret on your device                                                                           | Shared with all your peers on the network                              |
| Acts like a password -- only you have it, and it's necessary for proving ownership of your public key | Acts like a User ID -- people publicly know about this to identity you |
| Can create signatures -- unforgeable, tamper-evident certifications that _you_ created that data      | Allows others to verify the integrity of your signature                |
| A mailbox key -- allows you to open messages that only you can see                                    | A mail slot -- allows others to send you data only you can see         |

## PGP

Pretty Good Privacy

A sort of web of [[thoughts/trust|trust]] protocol where you determine whether to trust another party based on who else you know has trusted that party.

> As time goes on, you will accumulate keys from other people that you may want to designate as trusted introducers. Everyone else will each choose their own trusted introducers. And everyone will gradually accumulate and distribute with their key a collection of certifying signatures from other people, with the expectation that anyone receiving it will trust at least one or two of the signatures. This will cause the emergence of a decentralized fault-tolerant web of confidence for all public keys.

The web of trust mechanism has advantages over a centrally managed public key infrastructure scheme
