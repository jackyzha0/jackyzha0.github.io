---
title: "Authenticator complexity"
date: 2022-08-10
tags:
  - seed
---

A measure of complexity (lower is better) for distributed [[thoughts/consensus|consensus]] mechanisms in partially synchronous [[thoughts/system model|system model]].

Definition: The sum, over all replicas $i \in [ n ]$, of the number of authenticators received by replica $i$ in the protocol to reach a consensus decision after GST.

An authenticator is either a partial signature or a [[thoughts/digital signatures|signature]].

![[thoughts/images/authenticator-complexity-meme.png]]_Figure 2: Our Network Protocol (from [The Saddest Moment](https://scholar.harvard.edu/files/mickens/files/thesaddestmoment.pdf))_
