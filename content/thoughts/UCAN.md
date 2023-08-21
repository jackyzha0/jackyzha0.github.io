---
title: "UCAN"
date: 2022-06-15
tags:
  - seed
---

At a high level, User Controlled Authorization Networks (UCANs) are a way of doing [[thoughts/authorization|authorization]] ("what you can do") where users are fully in control. There's no all-powerful authorization server, or server of any kind required. Everything that a users is allowed to do is captured directly in a key or token, and can be sent to anyone that knows how to interpret this format.

> UCANs work more like [movie tickets](http://www.erights.org/elib/capability/duals/myths.html#caps-as-keys) or a festival pass between multiple venues. No one needs to check your ID; who you are is irrelevant. For example, if you have a ticket to see Citizen Kane, you are admitted to Theater 3. If you cannot attend an event, you can hand this ticket to a friend who wants to see the film instead, and there is no coordination required with the theater ahead of time.
>
> from the _[UCAN working group spec](https://github.com/ucan-wg/spec/)_

![[thoughts/images/UCAN hierarchy.png]]

> The master keypair requires strong security and should not be duplicated to multiple locations or enter low-security environments such as the browser. This makes it difficult to access every time a new repository commit needs to be produced. Therefore we issue child keypairs from the master keypair in the form of [UCANs](https://fission.codes/blog/auth-without-backend/), a JWT-style token that contains a permission description. UCANs can prove the authority of some key to undertake a given action, *or* produce new UCANs with a subset of their authority. Through this mechanism, a user is actually associated with *many* (likely hundreds) of keys, each belonging to a given context (a device or an application). These keys are granted only the authority they require from the root signing key.
>
> from [[thoughts/Bluesky|Bluesky's ADX]]

Since anything with a private-public keypair can generate a [[thoughts/DID]], UCANs can be an auth layer that **naturally plugs into existing identity primitives and services**

See [source 1](https://fission.codes/blog/auth-without-backend/) and [source 2](https://fission.codes/blog/verifying-ucans/)
