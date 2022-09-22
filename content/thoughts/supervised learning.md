---
title: "Supervised learning"
date: 2022-09-09
tags:
- seed
- CPSC340
---

- Input: take features of examples and corresponding labels as inputs
- Output: a model that can accurately predict the labels of new examples

Generally, the most successful machine learning technique (with the exception of games)

Examples:
- [[thoughts/decision tree|Decision trees]]
- [[thoughts/Naive Bayes]]

## Notation
- $X$ is the input
- $y$ are the class labels
- $n$ is the number of examples (generally idnex is denoted by subscript)
- $d$ is the number of features (generally index is denoted by superscript)
- $\hat y$ are the predictions

## General Rules
- We care far more about testing error than training error
- Golden Rule: the test data cannot influence training the model in any way
- Independent and Identically Distributed (IID) assumption
- Fundamental trade-off between getting low training error and having training error approximate test error
	- $E_{test} = (E_{test} - E_{train}) + E_{train}$ where $E_{test} - E_{train} = E_{approx}$ is the approximation error or the amount of overfitting
		- As the model gets complicated, $E_{train}$ goes down but $E_{approx}$ goes up
- Optimization bias
	- How biased is an "error" that we optimized over many possibilities?
	- Is large if you compare lots of different models, small if you only compare a few.