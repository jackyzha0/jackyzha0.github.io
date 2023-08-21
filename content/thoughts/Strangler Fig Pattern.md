---
title: "Strangler Fig Pattern"
date: 2023-06-07
tags:
  - seed
---

Incrementally migrate a legacy system by gradually replacing specific pieces of functionality with new applications and services. As features from the legacy system are replaced, the new system eventually replaces all of the old system's features, strangling the old system and allowing you to decommission it.

In this pattern, a "legacy system" (the current implementation) and a new system that have the same interface but different implementations. They are called behind an abstraction layer that calls both systems in parallel and throws one response away

Named after the strangler fig which suck up the nutrients from its victims, causing them to die eventually. An original support tree can sometimes die, so that the strangler fig becomes a "columnar tree" with a hollow central core.

![[thoughts/images/strangler fig.png|250]]
