---
title: "Decisions under ignorance (DUI)"
date: 2022-09-12
tags:
  - seed
  - PHIL321A
aliases:
  - DUI
---

Decision rules when the agent is ignorant of all probabilities

## Rules

### Dominance

- Weak Dominance: act $a$ is as good or better than $b$ for each possible state and there is at least one state where it is strictly better
- Strong Dominance: act $a$ is strictly better than $b$ for all possible states

Principle: 1. Avoid dominated acts and prefer dominant acts 2. Can only use dominance principle if states are independent of acts 3. Gold standard, use this whenever possible

### Maximin/Leximin

1. Find the minimum value of each act
2. Choose the act with the least bad worst-case outcome

Note: can violate dominance if there are rows with the same minimum

- Leximin can help resolves ties by removing the minimum value in case of ties. Note that this violates dominance!
- Leximin* only strikes out a *single* minimum value in case of ties. This does *not\* violate dominance

This rule is extremely conservative, avoids the worst-case scenario

### Optimism/Pessimism and "Best Average"

- Maximax (pick the best of the best-case outcomes)
- Best Average: take the best of each row and worst of each row and average it, pick the act with best average
- Optimism/Pessimism: Uses a weighted average (a linear combination) of the minimum and maximum values ($\alpha = 0$ is pessimistic, $\alpha = 1$ is optimistic): $V_\alpha(A) = \alpha \max(A) + (1-\alpha) \min(A)$

Objections:

1. Requires [[thoughts/interval scale|interval scale]] instead of ordinal scale

### Minimax regret

Basis: it is irrational to reject an act with a chance of a great gain, where the cost is slight.

- Regret value for each outcome = value of the outcome - maximum value in that column
- Max regret for each act is the most negative regret for each row A
- Choose the act with the minimum max regret

Objections

1. Requires [[thoughts/interval scale|interval scale]] instead of ordinal scale
2. Adding irrelevant alternative acts potentially affects recommended acts

### Principle of Insufficient Reason (PIR)

If there are n possible states and you have no reason to believe any of them more likely than any other, then it is rational to assign each state equal probability (namely, $1/n$)

- Assign each of the $n$ states probability $1/n$ and maximize the expected value
- For an act $A$, calculate $\sum_{i=1}^n \frac{1}{n} \textrm{value}(A, S_i)$

This turns the problem into a [[thoughts/Decisions under risk|DUR]]

Objections

1. Requires [[thoughts/interval scale|interval scale]] instead of ordinal scale
2. Arbitrary partitions of states (can result in incoherence)
3. Doesn't apply outside games of chance (e.g. [[thoughts/Pascal's Wager|Pascal's Wager]])

## Rationality Constraints

Find criteria that any rational decision rule should satisfy. Use these to rule out one or more decision principles

Milnor proposes a few axioms for rules under DUI:

1. Mixture condition (randomization)
   1. If a rational agent is indifferent between A1 and A2, then the agent must be indifferent between A1, A2 and the mixed strategy $[\frac 1 2 A1, \frac 1 2 A2]$
      1. Presupposition that the agent has a neutral attitude to risk
   2. Eliminates Maximin (as above)
   3. Eliminates Minimax Regret (as above)
   4. Eliminates Optimism-pessimism rule with $\alpha \neq \frac 1 2$
   5. Eliminates Best Avg if we allow other mixtures
   6. Only PIR survives
2. Independence of Irrelevant Alternatives
   1. A rational agent’s choice will be invariant under an irrelevant expansion B: if $A1 \geq A2$ before adding option B, then $A1 \geq A2$ after adding B.
   2. Eliminates Minimax Regret

Perhaps we should use different rules for DUI in different situations. Can we be systematic?

![[thoughts/images/dui-situtations.png|500]]

For decisions under partial ignorance, see: [[thoughts/Precautionary Principle|Precautionary Principle]]
