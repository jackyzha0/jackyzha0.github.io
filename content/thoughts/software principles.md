
---
title: "Software Principles"
date: 2022-02-20
tags:
- sapling
---

> A Pattern Language for developing software

Inspired by [Urbit Precepts](https://urbit.org/docs/development/precepts)

1. [[thoughts/local-first software|Local first]]. Decentralized/[[thoughts/distributed systems|distributed systems]] second. Avoid hosting like the plague. Make self-hosting easy
2. Apps should be treated like queries -- stateless. Local state should be avoided as much as possible, database is the source of truth.
3. There is a latent cost to new features: [maintenance](thoughts/maintenance.md)
4. Design with the goal of making atomic and reusable libraries
5. Heuristics should only be used where determinism is infeasible
6. Code courageously. "It's natural to feel fear of code; however, you must act as though you are able to master and change any part of it. To code courageously is to walk into any abyss, bring light, and make it right."

## On programming advice
Jamie Brandon's [Reflections on a Decade of Coding](https://www.scattered-thoughts.net/writing/reflections-on-a-decade-of-coding)

Programming practices are mostly tacit knowledge. Tacit knowledge isn't easy to share. An expert will relate some simple-sounding rule of thumb, but then grilling them on specific cases will quickly uncover a huge collection of exceptions and caveats that vary depending on the specific details of the situation.

It's so easy to think that simple solutions exist. But if you look at the history of ideas that actually worked, they tend to only be simple from a distance. The closer you get, the more you notice that the working idea is surrounding by a huge number of almost identical ideas that don't work. Take bicycles, for example. They seem simple and obvious, but it took [two centuries](https://en.wikipedia.org/wiki/History_of_the_bicycle) to figure out all the details and most people today [can't actually locate the working idea](https://link.springer.com/content/pdf/10.3758/BF03195929.pdf) amongst its neighbours. Even when old niche ideas make a comeback (eg neural networks) it's not because they were right all along but because someone recognized the limitations and found a new variation on the idea that overcame them (eg deep learning). Finding the idea that actually works amidst the sea of very similar ideas that don't work requires staying curious long enough to encounter the fine-grained detail of reality and humble enough to recognize and learn from each failure.

Mainstream is mainstream for a reason. The frontier is the place to go mining for new ideas, but it's 1% gold and 99% mud.