---
title: "Machine Learning"
date: 2021-07-02T14:03:17-04:00
tags:
- sapling
- CPSC340
---

## Theory
Course notes on CPSC340 with Andreas Lehrmann and Mark Schmidt

We produce a lot of data (see: [[thoughts/Data Capitalism|data capitalism]])

- [[thoughts/data mining|Data mining]]: automatically extract useful knowledge from large datasets
- Machine learning: automatically detect patterns in data and use these to make predictions or decisions
	- Typically, AI $\subset$ ML $\subset$ Deep Learning
- Typically, data mining is more human-in-the-loop and more application specific whereas machine learning is more hands-off and general
- Both similar to statistics but more emphasis on larger datasets, predictions instead of descriptions, and more general models

Healthy skepticism is good though:

> "The combination of some data and an aching desire for an answer does not ensure that reasonable answer can be extracted from a given body of data"
> 
> - John Tukey

Main topics:
- [[thoughts/exploratory data analysis|EDA]]
- [[thoughts/supervised learning|Supervised learning]]
- [[thoughts/No Free Lunch Theorem]]
- [[thoughts/unsupervised learning|Unsupervised Learning]]
- [[thoughts/gradient descent|Gradient Descent]]
- [[thoughts/regularization|Regularization]]
- Regression
	- [[thoughts/linear regression|Linear Regression]]
	- [[thoughts/multi-class classification|Multi-class classification]]
- [[thoughts/binary classification|Binary classification]]
- [[thoughts/maximum likelihood estimation|MLE]]
- [[thoughts/latent-factor model|Latent-factor models]]
- [[thoughts/recommendation system|Recommender System]]
- [[thoughts/neural networks|Neural Networks]]

Related background:
- [[thoughts/linear algebra|Linear Algebra]]
- [[thoughts/probability|Probability]]
- [[thoughts/calculus|Calculus]]
	- [[thoughts/automatic differentiation|Automatic Differentiation]]

## Philosophy
### GOFAI (good old-fashioned AI)
-   this view believes that the mind is a computer with certain special characteristics — namely the fact that its internal states and processes can be regarded as thinking or reasoning
-   finding meaning in a body of symbols, like finding rationality in a body of behaviour, is finding a certain kind of consistent, reliable pattern
-   problem solvers often use canny, methodical exploration
	-   neither algorithmic nor random
	-   a familiar sort of articulate reasoning or thinking a problem out
		-   "if only i could get that, then I could nail this down; but in order to get that, I would need such and such"
-   GOFAI is very narrow-minded and vulnerable to unexpected variations and oddities in the problems and information they were given
-   grounded in the possibility of translation — semantic interpretation

### NFAI (new-fangled AI)
- see also: [[thoughts/neural networks]]
-   falls under connectionism and [connectionist networks](thoughts/connectionist%20networks.md)
	- relies on computers the same way a weather service does, to simulate digitally systems that are not in themselves digital
-   adept at finding various sort of similarities among patterns, at recognizing repeated (or almost repeated) patterns and filling in missing parts of incomplete patterns
-   NFAI learns from examples (but not in the same way humans do)
-   inspired by the structure of the brain, but more deeply, by the importance and ubiquity of non-formal pattern reasoning
-   very grab-bag term → anything that isn't GOFAI
-   argument that a lot of human intelligence is not embodied in anyone, its a part of the world: [Extended Mind Hypothesis](thoughts/Extended%20Mind%20Hypothesis.md)
-   e.g. through the design of tools like hammers, our architecture, etc.
-   definition of understanding → appropriates and takes charge of its own conceptual resources and grasps the point of them for itself

