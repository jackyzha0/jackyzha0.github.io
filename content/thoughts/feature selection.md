---
title: "Feature Selection"
date: 2022-10-18
tags:
  - seed
  - CPSC340
---

Better features usually help more than a better model. Good features would ideally:

- Allow learning with few examples, hard to overfit with many examples
- Capture most important aspects of problem
- Reflects invariances (generalize to new scenarios)

Find the features (columns) of $X$ that are important for predicting $y$

- What are the relevant factors?
- Which basis functions should I use among these choices?
- What types of new data should I collect?
- How can I speed up computation?

This can help us to remove features. Feature complexity is also correlated with the [[thoughts/fundamental tradeoff|fundamental tradeoff]]. Increased complexity leads to increased overfitting risk. Models (like linear regression) can overfit with large $d$ so reducing $d$ to only useful factors may improve results.

Generally, there are no right answers but there are wrong answers.

## Association

For each feature $j$, compute correlation between feature values $x_j$ and $y$.

Usually gives unsatisfactory results as it ignores variable interactions (e.g. if tacos make you sick, and you often eat tacos on Tuesdays, it will say “Tuesday” is relevant.)

## Regression Weight

Fit [[thoughts/linear regression|linear regression]] weights $w$ based on all features.

Take all features $j$ where weight $|w_j|$ is greater than a threshold

Has major problems with collinearity

$\hat y_i = w_1 \textrm{taco} + w_2 \textrm{tuesday} = 0\textrm{taco} + (w_1 + w_2) \textrm{tuesday}$

## Search and Score

1. Define score function $f(S)$ that measures quality of a set of features $S$
2. Search for the variables $S$ with the best score

We create the set of features $S$ by creating every possible combination of $2^d$ features.

However, as we have a large number of sets of variables we are prone to optimization bias

$O(2^d)$ runtime

### Forward Selection

1. Start with an empty set of features $S = []$
2. For each possible feature $j$, compute scores of features in $S$ combined with feature $j$
3. Find the $j$ that has the best score when added to $S$
4. Check if $\{S \cup j\}$ improves on the best score found so far
5. Add $j$ to S and go back to step 2
   1. We can stop when no $j$ improves the score

$O(d^2)$ runtime

## Number of Features Penalties

We can again use complexity penalties and penalize the number of features used. This can also be called the $L_0$-norm which is the number of non-zero values.

$$\lVert w \rVert_0 = size(S)$$

## Text Features

1. Bag of Words: represents sentences/documents by word counts:
2. Bigram: an ordered set of two words
3. Trigram: an ordered set of three words

## Global vs Local

Global vs. local features allow for “personalized” predictions.

We add a feature for each 'person' in the system.

![[thoughts/images/global-vs-local-features.png]]
