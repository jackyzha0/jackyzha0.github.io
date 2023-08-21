---
title: "Probability"
date: 2022-09-11
tags:
  - seed
---

## Interpreting small probabilities

I suspect that there is a human limit to the size of a probability we find meaningful. Just like how the size of certain numbers are incomprehensible to humans, some probabilities are so unlikely that they are nearly meaningless. Similarly, Bernoulli conjectured that people neglect small probability events.

> Nicholas Bernoulli who can be held liable as the creator of the Petersburg gamble suggested that more than five tosses of heads are morally impossible. This proposition is experimentally tested through the elicitation of subjects‘ willingness-to-pay for various truncated versions of the Petersburg gamble that differ in the maximum payoff. In fact, the experimental data show that all versions of the Petersburg gamble which allow for more than six repeated tosses of tails elicit the same willingness-to-pay. From this evidence it is concluded that subjects neglect those outcomes in the Petersburg gamble which occur with a probability smaller than or equal to one in sixty-four, because, given this level, the alternative explanations seem implausible. (Neugebauer 2010, p. 3)

## Kolmogorov Axioms

1. The probability of an event is a non-negative real number
2. The probability that at least one of the possible events happen is 1
3. Given a set of mutually exclusive events, the probability of all of them happening is the probability of each event happening summed up

As a result, we get:

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

4. Classical: number of B over number of A is $3/13$
   1. Problem: assumes cases of A are equipossible (equal probability)
   2. This seems circular
   3. Fails ascertainability, admissibility, and applicability
5. Finite frequency: The proportion of B in a long series of draws is exactly $3/13$.
   1. Is admissible and ascertainable
   2. Not applicable: how does this work for single case probabilities?
6. Limiting frequency: The limiting frequency in an infinite series of draws would be $3/13$.
   1. Is admissible and applicable
   2. Not ascertainable: there may be no limiting frequency
   3. Again, does not work for single case probabilities
7. Long-run propensity: The set-up A has a disposition to produce long sequences in which B happens with frequency $3/13$.
   1. Assumes that long-run frequencies have an underlying cause through an experimental arrangement/set-up
   2. Not ascertainable: no improvement on the limiting frequency interpretation
   3. Not explanatory: the tendency or disposition adds nothing to our udnerstanding
   4. Not all probabilities can be interpreted as propensities. (no causal relation)
8. Logical: B partially entails A, with degree of entailment $3/13$.
   1. P(B/A) measures the “proportion” of A that overlaps with B
9. Epistemic: The evidence that A happened provides objective support of degree $3/13$ that B happened.
   1. Logical and epistemic probabilities might only exist in some cases
   2. Very unlikely that we know some of the priors/likelihoods can be computed a priori (from pure logic)
10. Subjective (actual degree of belief): Somebody believes with degree $3/13$ that A will produce B.
    1. Credences can be measured (or even defined) by studying your actions, especially your betting behaviour
    2. Problem: actual degree of belief is not admissable, people commit probabilistic fallacies all the time
    3. This can lead to bad betting combinations (see [[thoughts/Dutch Book|Dutch Book]] examples) in which you are guaranteed to lose money
    4. Key assumption: EU and EMV are equivalent for small but non-trivial amounts of money
11. Subjective (idealized credence): An idealized version of someone – with coherent probabilities – believes with degree $3/13$ that A will produce B.
    1. Fixes admissibility as we require it
    2. Not applicable: how can we justify using personal probabilities to make decisions if there are no constraints on one’s prior probabilities?
    3. Another problem
       1. The meaning or concept of probability does not essentially involve desires or preferences
       2. For example, an enlightened Zen Buddhist monk can have probabilities but no desires
       3. Thus, by Peterson, any theory that creates a necessary (definitional) link between probability and preference/desire must be wrong.
