---
title: "Data mining"
date: 2022-09-09
tags:
- seed
---

Typical steps of data mining
1. Learn about the application
2. Identify data mining task
3. Collect data
4. Clean and preprocess the data
5. Transform data or select useful subsets
6. Choose data mining algorithm
7. Data mining
8. Evaluate visualize and interpret results
9. Use results for profit or other goals

In a table
- a row is an *example* or *sample*
- a column is a *feature*

Feature types:
- Categorical
	- binary
	- nominal: name-like
- Numerical (counts, ordinal, continuous)
	- Allows us to interpret examples in points in feature space

Ways to approximate other data with numerical features
- Text:
	- Bag of words: word counts
- Images: gray-scale intensity
- Graphs: adjacency matrix

Data can not be clean when data is
- duplicated
- missing
- full of outliers
- noisy

Coupon collector problem: you generally need to see $O(n \log n)$ samples to see all n possible values which have equal probabilities