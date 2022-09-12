---
title: "Decision theory"
date: 2022-09-07
tags:
- seed
- PHIL321A
---

Choices by one agent in which background conditions are independent of what other agents are doing. We usually represent these decisions with a decision matrix or decision table

Relatived view of Decision theory:

> Prescriptions in decision  theory are always relative to the formal problem specifications

e.g. Pascal's Wager

| |God exists|God does not exist|
|--|--|--|
|Believe|Infinite reward|Status quo|
|Don't believe|Infinite loss|Status quo|

Components:
- Rows are possible acts
	- Acts are *functions* that map states to outcomes
- Columns are possible states of the world
	- Probabilities are sometimes included for decisions under risk.
	- Should *not* depend on agent action
	- States should be
		- **Mutually exclusive**
		- **Exhaustive**: no possibility is left out
		- **Relevant partition**: distinctions that actually have impact on probability or utility of outcomes
		- **Independence**: (optional) each state should be [[thoughts/causality|causally]] and probabilistically independent of the *acts*
			- Dominance principle only holds if independent holds
- Cells are outcomes.
	- Can be described using
		- Verbal description
		- Preference ranking on an ordinal scale
			- Defines a [[thoughts/Order theory|partial ordering]] of outcomes
				- $x \succcurlyeq y$ is a weak preference
				- $x \succ y$ is a strong preference
				- $x \sim y$ is indifference between $x$ and $y$
		- Utility (numerical value) using an interval scale
			- Assign to each outcome $x$ a value $v(x)$ such that $v(x) \geq v(y) \iff x \geq y$ and $v(x) = v(y) \iff x \sim y$
			- Transformation is linear
			- Called an ordinal transformation

Decision tables
1. Art: providing a good formalization of a decision into a table
2. providing a justified recommendation based off of the formalization

They can also be represented using [[thoughts/decision tree|decision trees]]

We can transform decision tables between each other using "reasonable transformations"
1. PIR: assign equal probabilities to all states (if we have no knowledge of probabilities, aka [[thoughts/Decisions under ignorance|DUI]])
2. Merger: if two states yield identical columns, then we can merge them into one state and add probabilities if we know them