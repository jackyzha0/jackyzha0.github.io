---
title: "UCAN"
date: 2022-06-15
tags:
- seed
---

At a high level, User Controlled Authorization Networks (UCANs) are a way of doing [[thoughts/authorization|authorization]] ("what you can do") where users are fully in control. There's no all-powerful authorization server, or server of any kind required. Everything that a users is allowed to do is captured directly in a key or token, and can be sent to anyone that knows how to interpret this format.

![[thoughts/images/UCAN hierarchy.png]]
> The master keypair requires strong security and should not be duplicated to multiple locations or enter low-security environments such as the browser. This makes it difficult to access every time a new repository commit needs to be produced. Therefore we issue child keypairs from the master keypair in the form of [UCANs](https://fission.codes/blog/auth-without-backend/), a JWT-style token that contains a permission description. UCANs can prove the authority of some key to undertake a given action, _or_ produce new UCANs with a subset of their authority. Through this mechanism, a user is actually associated with _many_ (likely hundreds) of keys, each belonging to a given context (a device or an application). These keys are granted only the authority they require from the root signing key.
> 
> from [[thoughts/Bluesky|Bluesky's ADX]]

See [source 1](https://fission.codes/blog/auth-without-backend/) and [source 2](https://fission.codes/blog/verifying-ucans/)
