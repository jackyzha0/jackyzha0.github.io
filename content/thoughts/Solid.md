---
title: "Solid"
date: 2022-06-07
tags:
  - seed
---

> **Solid** is a [specification](https://solidproject.org/TR/protocol) that lets people store their data securely in decentralized data stores called **Pods**. Pods are like secure personal web servers for data. When data is stored in someone's Pod, they control which people and applications can access it.

Pushing for universalization at the data level: just as any website can be viewed on any browser and any internet provider, any data should be accessible by any application under people's control.

[[thoughts/GDPR|GDPR]] technically does all of this, Solid is just technology that ensure it actually happens.

Solid is essentially a glue between [[thoughts/HTTP]], [[thoughts/LDP|LDP]], and LDN

## Pods

- Pods are like secure personal web servers for your data. You can think of it like a website with data.
- You can get a Pod from a Pod Provider, or you may choose to self-host your Pod.
- Users can own multiple pods
- Linked Data means that different applications can work with the same data

![[thoughts/images/Solid pod Linked Data.png]]

## Details

_Summarized from specs_

- Exchanges data between clients using [[thoughts/HTTP|HTTP]] + TLS
- A storage (`pim:Storage`) is a space of URIs in which data can be accessed; it is the root container for all of its contained resources
- Seems to just be a fancy HTTP file server (operated on [[thoughts/RDF|RDF]] Documents)
  - Applications can 'patch' pods with new data, given that they have the correct access to it
- Real-time collaborative communication between pod and application uses WebSockets
- [[thoughts/CORS|CORS]] by default prevents apps that run on one origin from accessing data on other origins
  - Get around this by having servers waive the cross-origin protection as Solid handles this [[thoughts/access control|access control]] themselves
- Identity is done through [[thoughts/WebID|WebID]]
- Servers are strongly discouraged from exposing information beyond the minimum amount necessary to enable a feature.

## Opinions

- Feels completely unopinionated, see this as a negative. Should shepherd and guide the average user down the happy path but still make it easy to customize for those who wish to.
- Still seems to try to emulate client-server interactions heavily
- Providers are not distributed
- DX seems pretty poor, comment section on [this video](https://www.youtube.com/watch?v=-C-hSqcU4k8) which has a lot of laypeople seem to dislike
