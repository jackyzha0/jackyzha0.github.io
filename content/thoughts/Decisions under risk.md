---
title: "Decisions under risk (DUR)"
date: 2022-09-23
tags:
  - seed
  - PHIL321A
aliases:
  - DUR
---

Decision rules when the probability of each outcome is known.

Requires an [[thoughts/interval scale|interval scale]]

When evaluating, we often need to quantify what outcomes are more [[thoughts/value|valuable]] than others

1. Expected Value (EV)
2. Expected Monetary Value (EMV)
3. Expected [[thoughts/utility|Utility]] (EU)

Typically, we use EU. Sometimes we use EMV under the assumption that it is equivalent to EU in a free market ([[thoughts/utility|utility]] is a positive linear transformation of monetary value)

Two arguments for why EU Max:

1. In the long run, no strategy can be expected to do better than maximizing expected [[thoughts/utility|utility]].
   - Objections
     - There is no long run for humans
     - Gambler's Ruin: a gambler with finite wealth, playing a fair game, eventually goes broke with probability 1
     - How is the long-run argument relevant to unique decisions that can't be repeated?
2. Axiomatic Approach. You should maximize expected utility, because you are also maximizing utility.
   - This conclusion does not depend on the long run argument, so it applies even to the single case.

## Maximizing Expected Utility

[[thoughts/utility|Utility]] is a numerical representation of the agent’s preference ranking

Generally, we prefer using EU over EMV.

See also: [[thoughts/Utilitarianism|utilitarianism]]

[[thoughts/utility|Utility]] theory allows for outcomes without monetary value, or whose value can’t be measured solely in terms of monetary payoff.

### Utility of Money

Note that generally, there is a diminishing marginal [[thoughts/utility|utility]] of money

For example, in a lottery where you

- A) win $1M for sure or
- B) 50% chance to win $3M and 50% chance to get nothing

Most people would choose A. The change in [[thoughts/utility|utility]] from \$1M to \$3M is not enough to offset the drop in probability from certainty to 50%.

## Paradoxes and Puzzles

### Allais Paradox

1. Situation A: Choose between
   1. $1 million for sure
   2. A lottery:
      1. 10% for $5 million
      2. 89% for $1 million,
      3. 1% for nothing.
2. Situation B: Choose between
   1. 10% for $5 million
   2. 11% for $1million

Paradox arrises if you choose a) over b) in situation A and d) over c) in situation B. But, we can show that these two situations are equivalent.

Solutions:

1. Savage: fix irrational preferences of people!
2. Revise the table: utilities of the same amount of money is not the same in the two situations (not very plausible)
3. Priority heuristics (Gigerenzer): people have a hierarchy of goals and avoiding uncertainty is high on the list (hard to defend as a normative principle)

### Ellsberg Paradox

Same idea as Allais Paradox but shifts probabilities instead of values

Urn with 90 balls

- 30 red balls (R), 60 black (B) or yellow balls (Y)
- Let $p * 60$ be the number of black and $(1-p)*60$ is the number of yellow balls
- A ball will be draw and you make a bet on its colour

1. Situation A: Bet R or B. Receive \$100 if right, \$0 if wrong
2. Situation B: Bet (R or Y) or (B or Y). Receive \$100 if right, \$0 if wrong

Many people bet R in Situation A but bet (B or Y) in situation B. People like to avoid uncertainty! However, this is inconsistent with EU Max

### St. Petersburg Paradox
A fair coin is tossed until it comes up Heads. If Heads appears for the first time on toss $n$, you are paid $n$ dollars

What is the EMV of this game? Technically, the St. Petersburg game involves infinitely many states

$$EMV = (1/2) \$2 + (1/2)^2 \$2 + \dots = 1 + 1 + \dots = \infty$$

You should be willing to pay any price to play!

Solutions

1. Bernoulli: diminishing marginal [[thoughts/utility|utility]] of money
	1. Refutation: change payout to $2^n$
2. Buffon: *de minimis condition*
	1. Ignore tiny probabilities

### Two-Envelope Paradox

A trustworthy informant tells you that one of the envelopes contains exactly twice as much as the other, but the informant does not tell you which is which. Since this is all you know, you decide to pick an envelope at random. Let us say you pick envelope A. Just before you open envelope A you are offered to swap and take envelope B instead.

Given what you know, both possibilities are equally likely. Hence, the expected monetary value of swapping to B is $\frac 1 2 2x + \frac 1 2 \frac x 2 = \frac 5 4 x$. Since $\frac 5 4 x > x$, it is rational to take B instead of A. But you can apply the same argument to arrive at a contradictory claim that you should take A instead of B.

Limit Counterargument

- The present formulation of the paradox presupposes that there is no upper limit to how much money there is in the world
- Suppose that there indeed is some upper limit L to how much money there is in the world.
  - It then follows that no envelope can contain more than $(2/3)L$
  - The other envelope would be certain to contain $(1/3)L$
