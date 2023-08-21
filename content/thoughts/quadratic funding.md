---
title: "Quadratic Funding"
date: 2021-08-06T23:18:49-04:00
tags:
  - seed
---

Sources: [RadicalxChange](https://www.radicalxchange.org/concepts/quadratic-funding/) and [Vitalik](https://vitalik.ca/general/2019/12/07/quadratic.html)

> Quadratic Funding (QF) is a more democratic and scalable form of matching funding for public goods, i.e. any projects valuable to large groups of people and accessible to the general public.

Matching funding is where governments or other institutions match individual contributions to a project.

In the QF model, the total funding is the square root of each contribution summed and then squared. This empowers smaller individual contribution and make sure that a broad public benefits. This supposedly solves the [tragedy of the commons](thoughts/tragedy%20of%20the%20commons.md) problem.

> _Your $N$-th unit of influence costs you $N$_

How do we get around anonymous identities (or rapid creation of new identities) that abuse the system? Similar with collusion or vote-buying? How do we get around collusion (if we don't, QF just collapses into one-dollar-one-vote)? "Quadratic payments do not solve every problem. They solve the problem of governing resources that affect large numbers of people, but they do not solve many other kinds of problems."

## Pairwise QF

[Pairwise-bounded QF](https://ethresear.ch/t/pairwise-coordination-subsidies-a-new-quadratic-funding-design/5553) is a partial solution to collusion.

Pairwise-bounded QF computes the total subsidy to a project by looking through all pairs of contributors, and imposes a maximum bound on the total subsidy that any given pair of participants can trigger (combined across all projects). This also means that projects that otherwise would have gotten less money in QF could gain more because of the diversity of supporters garnered.

Pairwise-bounded QF generally penalizes projects that are dominated by large contributors.

## Traditional Models

### One-dollar-one-vote

![Influence vs Value](https://vitalik.ca/images/qv-files/Market8.png)

Traditional funding model with platforms like [Ghost knowledge](https://www.ghostknowledge.com/) really only fund articles that would be published because some individual would pay for it for themselves (essentially just patronage).

> Phrased less mathematically, either you value the article enough (and/or are rich enough) to pay, and if that's the case it's in your interest to keep paying (and influencing) quite a lot, or you don't value the article enough and you contribute nothing. [Source](https://vitalik.ca/general/2019/12/07/quadratic.html)

But the problem in this case is that smaller contributors have too little influence and the larger contributors have too much

### One-person-one-vote

![Influence vs Value](https://vitalik.ca/images/qv-files/Market9.png)

Each person gets a singular vote on whether a good gets produced. There is no 'incentive' or 'room' to contribute beyond that.

The problem here is that smaller contributors or people who have very _little_ stake in the good have an outsized influence relative to those who have _large_ stakes.
