---
title: "Three Legged Stool"
date: 2023-04-06
tags:
  - seed
---

[Source](https://publicinfrastructure.org/2023/03/29/the-three-legged-stool/)

_A Manifesto for a Smaller, Denser Internet_

> A truly sustainable and resilient digital public sphere consists of [[thoughts/plurality|many different platforms]] with a wide variety of sizes and purposes, that users can navigate with a loyal client that aggregates, [[thoughts/Syndication|cross-posts]], and curates, all supported by cross-cutting services rooted in [[thoughts/interoperability|interoperable]] data

Inspired by an example from ecology: the Miyawaki method. A small movement is underway in ecological restoration to bring biodiversity back to environs either devastated by urban development or monoculture farming

## Loyal Client

This is an old idea which seeks to solve a common problem on the internet: what you want to do as a user, and what a web server may want to do, often come into conflict.

Web browsers block pop-ups and ad trackers because the server wants a user’s attention and data, and the user would rather not hand them over. Email clients block spam, allow you to customize your inbox, and give you new tools like schedulers and auto-complete because users want control over how they interact with email servers.

## Adverserial Interoperability

See: [[thoughts/interoperability#Adverserial Interoperability]]

Regulations that support interoperability are another way to address platforms that refuse to interoperate voluntarily. The EU recently passed a regulation, the Digital Markets Act, that mandates large platforms make their messaging interoperable. Other legislation could similarly require that social media platforms make their content available to third-party clients, or offer protections for adversarial interoperability (similar to right to repair laws).

## Algorithm Store

_Plugin marketplace_

On order for a loyal client or a VSOP to serve an individual’s preferences, they need to be able to select from a wide variety of algorithms that reflect those preferences (perhaps will eventually be taken over by [[thoughts/LLMs]] that can create these on-demand).

Should satisfy 4 properties:

1. Tuneable: you should have meaningful settings that allow you to use the algorithm in different ways.
2. Auditable: you should be able to throw arbitrary content at the algorithm and see how it responds. You should be able to investigate the data underlying the algorithm and the decisions it made.
3. [[thoughts/composable|Combinable]]: you should be able to use more than one algorithm and have them work together. Algorithms should be able to work across different source platforms.
4. [[thoughts/explainability|Understandable]]: you should have a sense of what the algorithm is trying to do and how you can control it.

Similar to geists in [Subconscious](https://subconscious.network/)
