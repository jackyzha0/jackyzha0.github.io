---
title: "Evolutionary game theory"
date: 2022-09-07
tags:
  - seed
  - PHIL321A
---

Focuses on the dynamics of strategy change by agents over time.

Evolutionary game theory has helped to explain the basis of altruistic behaviours in Darwinian evolution. It is salient to note that the evolutionary pressures on what we consider moral behaviour arise _only in [[thoughts/positive sum|positive sum]] interactions._ In a dynamic, growing society, people can interact cooperatively and both come out ahead. 

In a static, [[thoughts/zero sum|zero sum]] society, people can pressures toward morality and cooperation vanish: You can only improve your situation by taking from someone else.

## Evolutionarily Stable Strategy (ESS)

Compute the fitness of each group. Watch how each group fares in indefinitely repeated interactions. Fitness of a strategy is $Fitness(S) = \frac{EU(S)}{\textrm{Avg } EU }$

An evolutionarily stable strategy is one that, once fixed in a population, has higher fitness than any other available strategy

In formal terms, $x$ is an ESS iff

1. $EU(x,x) \geq EU(y,y)$ for any strategy $y$
2. $EU(x,x) > EU(y,x)$ or $EU(x,y) > EU(y,y)$ for any $y$

### Cake Division Problem

Whereas [[thoughts/game theory|rational choice theory]] has multiple pure equilibrium strategies here, there is only one evolutionarily stable pure strategy: share equally

### Polymorphic state

Different strategies are played by different proportions of the population; however, these equilibria are not commonly found

### Sequential Rationality and Trembling Hand

A plan involving a sequence of choices exhibits sequential rationality if it specifies a rational (i.e., utility-maximizing) choice at each point, relative to the choice situation at that point.

Trembling Hand: sequential rationality is necessary and sufficient for optimality if we allow a small probability of error by other players. In picking a strategy, we should take “mistakes” into account — errors that occasionally lead an opponent to choose a dominated strategy

Evolutionary analogue: mutation and recombination are analogues of the trembling hand. Both allow for new strategies to emerge

### Replicator Dynamics

1. Compute expected payoff (fitness) for each strategy. A weighted average of payoff against each other strategy in play: $U(A) = u(A \textrm{ vs } A_1)p(A_1) + \dots + u(A \textrm{ vs } A_n)p(A_n)$
2. Compute the average fitness of the whole population, $U$. This is the weighted average of the individual fitnesses: $U = u(A_1)p(A_1) + \dots + u(A_n)p(A_n)$
3. Compute the relative fitness of each strategy. Relative fitness of A is just $U(A) / U$
4. Compute the new proportion of the population using each strategy (for the next round). $p'(A) = p(A) \cdot [U(A) / U]$

## Ethics

Can game theory give us substantive [[thoughts/ethics|ethical]]/political recommendations?

### Gauthier's Theory

- The Nash bargaining solution provides a solution to the problem of fair division, based entirely on assumptions about rationality.
  - Objection: Hume's Principle, we can't derive what we _ought_ to do from what _is_ true
- Include a 'bridge-premise' that whatever a [[thoughts/rationality|rational]] group of people agree upon should be implemented (similar to [[thoughts/Social Contract Theory#Rawl's Theory of Justice|Rawl's Theory of Justice]])
  - Objection: Exploitation may be beneficial... but is it moral
