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

### Lotteries
- We have a set of basic prizes/outcomes
- We can compose lotteries (if $L_1$ and $L_2$ are lotteries, then so is $[pL_1, (1-p)L_2]$)
	- This creates compound lotteries


![[thoughts/images/vNM.png]]

Peterson argues that vNM is ok for descriptive [[thoughts/Decision theory|decision theory]] but not normative decision theory (vNM does not distinguish the meaning of utility from the measurement of utility)

Normative decision theory involves prescribing actions which needs a strong version of EU max: acts are rational because they maximize expected utility. This demands a concept of utility that is independent from the measurement of utility itself (or we get a circular argument)