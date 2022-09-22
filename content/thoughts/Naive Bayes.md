---
title: "Naive Bayes"
date: 2022-09-19
tags:
- seed
- CPSC340
---

An example of a [[thoughts/probability|probabilistic]] classifier. Commonly used in spam filters (classifies as spam if the probability of spam is higher than not spam)

To model this, it uses Bayes rule:

$$P(y_i = \textrm{'spam'} | x_i) = \frac{P(x_i | y_i = \textrm{'spam'})P(y_i = \textrm{'spam'})}{P(x_i)}$$

Where
- $P(y_i = \textrm{'spam'})$ is the marginal probability that an e-mail is spam
- $P(x_i)$ is the marginal probability than an e-mail has the set of words $x_i$
	- Hard to approximate (lots of ways to combine words)
- $P(x_i | y_i = \textrm{'spam'})$ is the conditional probability that a spam e-mail has the words $x_i$

We can actually reframe this to avoid calculating $P(x_i)$ as Naive Bayes just returns spam if $P(y_i = \textrm{'spam'} | x_i) > P(y_i = \textrm{'not spam'} | x_i)$

$$P(x_i | y_i = \textrm{'spam'}) P(y_i = \textrm{'spam'}) > P(x_i | y_i = \textrm{'not spam'}) P(y_i = \textrm{'not spam'})$$

Additionally, we assume that *all* features $x_i$ are conditionally independent given label $y_i$ so we can decompose it.

---
> **Choose joy.**
> 
> Choose it like a child chooses the shoe to put on the right foot, the crayon to paint a sky. Choose it at first consciously, effortfully, pressing against the weight of a world heavy with reasons for sorrow, restless with need for action.

-   cpsc 430
-   cpsc 410

-   milestone 1

-   cpsc 340
-   phil 321a

-   pset 1 → oct 30

---

non-fungibility of things is good actually (?)

-   re: tools for conviviality
-   commodities improve trade. interchangeability improves trade and allows for replaceable parts, standardization, and scale.
-   BUT when finished objects becle commodities they break too, but they are easily replaced
-   when the unique breaks, we might mend. we've lost the art of maintenance because all we do is built what we know how to build what the system requires of us and to conform to what it works with

-   the ability to mass-produce removes the opportunity for the great many to learn to produce at all

thoughts to address:

-   how does this fit in re: interoperability as a desirable characteristic in systems?

-   do interoperability and commodification always coexist in a system? can we have one without the other?
-   perhaps we as complex beings are composed of fungible things in a way that makes us nonfungible

-   (anson) my blood can be ur blood (same with organs, etc.) which is why organ trade exists i guess

-   complexity as giving rise to non-fungibility through obscurity/inscrutibility

---

- optimization bias leads to publication bias

- supposed that 20 researchers perform the exact same experiment

- each test p < 0.05, if 1 group finds its significant, it publishes the paper

- need to publicize failures too

- contributes to reproducibility crisis


