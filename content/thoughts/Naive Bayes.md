---
title: "Naive Bayes"
date: 2022-09-19
tags:
  - seed
  - CPSC340
---

An example of a [[thoughts/probability|probabilistic]] classifier. Commonly used in spam filters (classifies as spam if the probability of spam is higher than not spam)

To model this, it uses Bayes rule:

$$P(y_i = \textrm{spam} | x_i) = \frac{P(x_i | y_i = \textrm{spam})P(y_i = \textrm{spam})}{P(x_i)}$$

Where

- $P(y_i = \textrm{spam})$ is the marginal probability that an e-mail is spam
- $P(x_i)$ is the marginal probability than an e-mail has the set of words $x_i$
  - Hard to approximate (lots of ways to combine words)
- $P(x_i | y_i = \textrm{spam})$ is the conditional probability that a spam e-mail has the words $x_i$

## Optimizations

### Denominator doesn't matter

We can actually reframe this to avoid calculating $P(x_i)$ as Naive Bayes just returns spam if $P(y_i = \textrm{spam} | x_i) > P(y_i = \textrm{not spam} | x_i)$

Roughly, denominator doesn't matter

$$\propto P(x_i | y_i = \textrm{spam})P(y_i = \textrm{spam})$$

### Conditional Independent Assumptions

Additionally, we assume that _all_ features $x_i$ are conditionally independent given label $y_i$ so we can decompose it.

$$\approx \prod_{j=1}^d P(x_{ij}|y_i)P(y_i)$$

## Laplace Smoothing

If we have no spam messages with lactase, then $P(lactase | spam) = 0$ so spam messages with lactase automatically get through!

Our estimate of $P(lactase | spam) = 0$ is $\frac{\textrm{\# spam messages with lactase}}{\textrm{\# spam messages}} = \frac{0}{\textrm{\# spam messages}}$

We can add $\beta$ to the numerator and $\beta k$ to the denominator, which effectively adds $\beta k$ fake examples: $\beta$ for each $k$ where $k$ is a possible class (2 for a binary classifier)

So for our binary spam classifier (with $\beta = 1$):

$$\frac{\textrm{\# spam messages with lactase} + 1}{\textrm{\# spam messages} + 2}$$
