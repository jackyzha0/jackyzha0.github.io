---
title: "Interval scale"
date: 2022-10-03
tags:
  - seed
  - PHIL321A
---

Any interval scale can be linearly transformed (ordinal transformation) between each other and not be affected

Assign to each outcome $x$ a value $v(x)$ such that $v(x) \geq v(y) \iff x \geq y$ and $v(x) = v(y) \iff x \sim y$

## von Neumann-Morgenstern Theorem (vNM)

We need interval scales for most of the rules for [[thoughts/Decisions under ignorance|DUI]], and we need them for [[thoughts/Decisions under risk|DUR]]. vNM tells us how to construct an interval utility scale.

We find your utility for $x$ by measuring the risks that you are willing to take to get $x$. vNM shows that your utility for a lottery is equal to its expected utility.

> If your preferences have enough structure (i.e., if they satisfy the vNM conditions), then they can be represented by a utility function u (unique up to positive linear transformation) which has the expected utility property.

### Lotteries

- We have a set of basic prizes/outcomes
- We can compose lotteries (if $L_1$ and $L_2$ are lotteries, then so is $[pL_1, (1-p)L_2]$)
  - This creates compound lotteries

![[thoughts/images/vNM.png]]

Peterson argues that vNM is ok for descriptive [[thoughts/Decision theory|decision theory]] but not normative decision theory (vNM does not distinguish the meaning of utility from the measurement of utility)

Normative decision theory involves prescribing actions which needs a strong version of EU max: acts are rational because they maximize expected utility. This demands a concept of utility that is independent from the measurement of utility itself (or we get a circular argument)

### Axioms

1. vNM 1, Completeness: $A \succ B$ or $A \sim B$ or $B \succ A$
2. vNM 2, Transitivity: if $A \succ B$ and $B \succ C$ then $A \succ C$
3. vNM 3, Independence: $A \succ B$ if and only if $ApC \succ BpC$
4. vNM 4, Continuity: if $A \succ B \succ C$ there $\exists p, q$ such that $ApC \succ B \succ AqC$
5. vNM 5, Probability: it does not matter if you are awarded prize A if you first roll a die and then roll it again, or make a double roll, provided that you only get the prize if you get two sixes
   1. If $pq + (1-p)r = s$ then $(AqB)p(ArB) \sim AsB$
