---
title: "Universal Scaling Law"
date: 2023-04-03
tags:
  - seed
---

[Original paper](http://www.perfdynamics.com/Manifesto/USLscalability.html)

When we can avoid or reduce the need for coordination things tend to get simpler and faster.

Where $C(N)$ is relative capacity

$$C(N) = \frac {N} {1 + \alpha(N- 1) + \beta N(N-1)}$$

- $N$ is the number of users/load generators
- Contention ($\propto \alpha$): effect of waiting or queueing for shared resources. When $\alpha=0$, we get linear scalability behaviour (e.g. lock-free computing)
- Coherency ($\propto \beta$): cost of getting agreement on what the right thing to do is (see also: [[thoughts/authenticator complexity]])

## In effective leadership

[Source](https://blog.acolyer.org/2015/04/29/applying-the-universal-scalability-law-to-organisations/)

USL, couched in terms of ‘advice to leaders of fast-growing organisations.’

> As a leader of a fast-growing company, in a fast-growing sector, you probably care about how much work your company can get done in a given unit of time (aka throughput), and also how long any one piece of work takes to get through the system (aka latency, or lead time).

- I always fall back to software engineering principles – particularly those around modularity – when it comes to thinking about organisation structure
  - You want strong cohesion within a group, and weak coupling between groups, you want to keep a handle on fan-out etc..
- The more operational decisions you need to be involved in, and the deeper you get involved, the more tasks you handle yourself, the higher your $\alpha$ coefficient and the more you limit the overall scalability of your organisation. *So the first lesson is that it’s really important you learn to delegate effectively and to choose carefully the things that you do get involved in.*
