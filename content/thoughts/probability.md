---
title: "Probability"
date: 2022-09-11
tags:
- seed
---

- $0 \leq P(A) \leq 1$
- $P(\lnot A) = 1 - P(A)$

## Joint probability
Probability of both A and B happening. Intersection of the areas of the two events.

### Marginalization Rule
For some random variable X

$$P(A) = \sum_{x \in \mathcal{X}}P(A \cap X = x)$$

For example, to roll some even number,

$$P(\textrm{even}) = \sum_{i=1}^6 P(i \cap \textrm{even}) = 0 + \frac 1 6 + 0 + \frac 1 6 + 0 + \frac 1 6$$

## Union of Events
Given an event A and B, the probability of both occurring is

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

## Conditional Probability
The probability of A given B has occurred is

$$P(A|B) = \frac{P(A \cap B)}{P(B)} = \frac{P(B|A)P(A)}{P(B)}$$

Deriving from this, we get,
1. $P(A \cap B) = P(A|B) P(B)$
2. $P(A \cap B) = P(B|A) P(A)$

## Independence
$$P(A \cap B) = P(A)P(B)$$

or 

$$P(A|B) = P(A)$$

## Expected Values
If we have a random variable $X$ that can takes values $x \in \mathcal{X}$, we define the expectation of X:

$$\mathbb{E}[X] = \sum_{x \in \mathcal{X}} P(X=x)x$$

Additionally, 
1. For functions that depend on a random variable: $\mathbb{E}[f(X)] = \sum_{x \in \mathcal{X}} P(X=x)f(X)$
2. $\mathbb{E}[\alpha f(X) + \beta g(X)] = \alpha \mathbb{E}[f(X)] + \beta \mathbb{E}[g(X)]$
3. $\mathbb{E}[f(X)g(X)] \neq \mathbb{E}[f(X)] \mathbb{E}[g(X)]$
4. $\mathbb{E}[X|Y=y] = \sum_{x \in \mathcal{X}} P(X=x|Y=y)f(X)$
5. $\mathbb{E}[\mathbb{E}[X =x | Y=y]] = \mathbb{E}[X]$ (tower property, law of total expectation, iterated expectation rule)