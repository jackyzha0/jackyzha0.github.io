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

## Background Points
1. No information about probabilities
2. A value function on outcomes a&s where a is an act and s is a state
3. Most of the rules respect dominance

## Rules
1. Dominance
	1. Weak Dominance: act $a$ is as good or better than $b$ for each possible state and there is at least one state where it is strictly better
	2. Strong Dominance: act $a$ is strictly better than $b$ for all possible states
	3. Principle: 
		1. Avoid dominated acts and prefer dominant acts
		2. Can only use dominance principle if states are independent of acts
		3. Gold standard, use this whenever possible
2. Maximin/Leximin
	1. Find the minimum value of each act
	2. Choose the act with the least bad worst-case outcome
	3. Note: can violate dominance if there are rows with the same minimum
	4. Leximin can help resolves ties by removing the minimum value in case of ties. Note that this violates dominance!
	5. Leximin* only strikes out a *single* minimum value in case of ties. This does *not* violate dominance
	6. Extremely conservative, avoids the worst-case scenario
3. Optimism/Pessimism and "Best Average"
	1. Maximax (pick the best of the best-case outcomes)
	2. Best Average: take the best of each row and worst of each row and average it, pick the act with best average
	3. Optimism/Pessimism: Uses a weighted average (a linear combination) of the minimum and maximum values ($\alpha = 0$ is pessimistic, $\alpha = 1$ is optimistic): $V_\alpha(A) = \alpha \max(A) + (1-\alpha) \min(A)$
		1. Requires interval scale instead of ordinal scale
4. Minimax regret
5. Principle of Insufficient Reason