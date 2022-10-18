---
title: "Probability"
date: 2022-09-11
tags:
- seed
---

## Kolmogorov Axioms
1. The probability of an event is a non-negative real number
2. The probability that at least one of the possible events happen is 1
3. Given a set of mutually exclusive events, the probability of all of them happening is the probability of each event happening summed up

### Consequences
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

## Bayes' Theorem
See also: [[thoughts/Naive Bayes|Naive Bayes]]

Let $c$ be the class label and $x$ be the measurement (evidence)

$$P(c|x) = \frac{P(x|c)p(c)}{P(x)}$$

- $P(c|x)$: the posterior probability is the probability of $c$ given $x$ (after the measurement). 
- $p(c)$: prior probability
- $P(x|c)$: class-conditional probability (likelihood of $c$ on $x$)
- $P(x)$: unconditional probability (a.k.a. marginal likelihood or expectedness of evidence)

Alternate formulations:

### Expanded
$$P(c | x) = \frac{P(x|c)P(c)}{P(x|c)P(c)+P(x|\lnot c)P(\lnot c)}$$
### Multiple Hypotheses
Suppose $c_1, \dots, c_n$ is an exhaustive and mutually exclusive set of possibilities

$$P(c_i | x) = \frac{P(x|c_i)P(c_i)}{P(x|c_1)P(c_1)+\dots+P(x|c_n)P(c_n)}$$

## Interpretations of Probability
A = draws from a normal deck, B = draws of a face card.
$P(B | A) = \frac 3 {13}$ means:

Objective interpretations: Probability values are determined by factors independent of our beliefs.

Subjective interpretations: Probability values reflect individual degrees of belief, and vary from person to person.

We can evaluate these interpretations as follows (Wesley Salmon)
1. Admissible. Probability values must satisfy the axioms of the probability calculus (the Kolmogorov axioms). This is also called coherence.
2. Ascertainable. Probability values must be values that we can determine (or else they are useless).
3. Applicable. Probability values must be reliable as a “guide to life”. They must be values that we can justifiably use to make decisions.

1. Classical: number of B over number of A is 3/13.
2. Finite frequency: The proportion of B in a long series of draws is exactly 3/13.
3. Limiting frequency: The limiting frequency in an infinite series of draws would be 3/13.
4. Long-run propensity: The set-up A has a disposition to produce long sequences in which B happens with frequency 3/13.
5. Logical: B partially entails A, with degree of entailment 3/13.
6. Epistemic: The evidence that A happened provides objective support of degree 3/13 that B happened.
7. Subjective (actual degree of belief):  Somebody believes with degree 3/13 that A will produce B.
8. Subjective (idealized credence): An idealized version of someone – with coherent probabilities – believes with degree 3/13 that A will produce B.

