---
title: "Evolutionary game theory"
date: 2022-09-07
tags:
- seed
- PHIL321A
---

Focuses on the dynamics of strategy change by agents over time.

Evolutionary game theory has helped to explain the basis of altruistic behaviours in Darwinian evolution.

Compute the fitness of each group. Watch how each group fares in indefinitely repeated interactions. Fitness of a strategy is $Fitness(S) = \frac{EU(S)}{\textrm{Avg } EU }$

## Evolutionarily Stable Strategy (ESS)
An evolutionarily stable strategy is one that, once fixed in a population, has higher fitness than any other available strategy

In formal terms, $x$ is an ESS iff
1. $EU(x,x) \geq EU(y,y)$ for any strategy $y$
2. $EU(x,x) > EU(y,x)$ or $EU(x,y) > EU(y,y)$ for any $y$

## Ethics
Can game theory give us substantive [[thoughts/ethics|ethical]]/political recommendations?

### Gauthier's Theory
- The Nash bargaining solution provides a solution to the problem of fair division, based entirely on assumptions about rationality.
	- Objection: Hume's Principle, we can't derive what we *ought* to do from what *is* true
- Include a 'bridge-premise' that whatever a [[thoughts/rationality|rational]] group of people agree upon should be implemented (similar to [[thoughts/Social Contract Theory#Rawl's Theory of Justice|Rawl's Theory of Justice]])
	- Objection: Exploitation may be beneficial... but is it moral