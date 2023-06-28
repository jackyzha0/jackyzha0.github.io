---
title: "Software Principles"
date: 2022-02-20
tags:
- sapling
---

> [[thoughts/A Pattern Language|A Pattern Language]] for developing software

Inspired by [Urbit Precepts](https://urbit.org/docs/development/precepts) and the [Design Principles Behind Smalltalk](https://www.cs.virginia.edu/~evans/cs655/readings/smalltalk.html)

1. [[thoughts/local-first software|Local first]]. Decentralized/[[thoughts/distributed systems|distributed systems]] second. Make self-hosting easy
2. There is a latent cost to new features: [maintenance](thoughts/maintenance.md)
4. Heuristics should only be used where determinism is infeasible
5. Apps should embrace gradual enrichment, [[thoughts/composable|composing]] smaller features to form more complex ones when necessary
6. Dump the parts bucket onto the floor. Make it obvious what tools the user has at their disposal to make the most out of the software ([[thoughts/constructionist]] learning)
7. If a system is to serve the creative spirit, it must be entirely comprehensible to a single individual
8. Any system should provide a uniform means for referring to the things in its universe. In fact, an even stronger statement is that systems should be designed around a powerful metaphor that can be uniformly applied in all areas. Only from this can complex systems [[thoughts/emergent behaviour|emerge]]

See also: [[thoughts/programming models]]

## On programming advice
Jamie Brandon's [Reflections on a Decade of Coding](https://www.scattered-thoughts.net/writing/reflections-on-a-decade-of-coding)

Programming practices are mostly tacit knowledge. Tacit knowledge isn't easy to share. An expert will relate some simple-sounding rule of thumb, but then grilling them on specific cases will quickly uncover a huge collection of exceptions and caveats that vary depending on the specific details of the situation.

It's so easy to think that simple solutions exist. But if you look at the history of ideas that actually worked, they tend to only be simple from a distance. The closer you get, the more you notice that the working idea is surrounding by a huge number of almost identical ideas that don't work. Take bicycles, for example. They seem simple and obvious, but it took [two centuries](https://en.wikipedia.org/wiki/History_of_the_bicycle) to figure out all the details and most people today [can't actually locate the working idea](https://link.springer.com/content/pdf/10.3758/BF03195929.pdf) amongst its neighbours. Even when old niche ideas make a comeback (eg [[thoughts/neural networks|neural networks]]) it's not because they were right all along but because someone recognized the limitations and found a new variation on the idea that overcame them (eg deep learning). Finding the idea that actually works amidst the sea of very similar ideas that don't work requires staying curious long enough to encounter the fine-grained detail of reality and humble enough to recognize and learn from each failure.

Mainstream is mainstream for a reason. The frontier is the place to go mining for new ideas, but it's 1% gold and 99% mud.