---
title: "K-means"
date: 2022-09-28
tags:
  - seed
  - CPSC340
---

Assumption that we know how many clusters there are as a prior ($k$ in K-Means). Designed for vector [[thoughts/quantization|quantization]]: replacing examples with the mean of their cluster (collapsing a bunch of examples of a class down to a single example)

Can also be seen as a really bad [[thoughts/latent-factor model]]

K-means partitions the space into [[thoughts/convex|convex]] regions, _but_ clusters in the data might not be convex

Minimize $\sum_{i \in \textrm{clusters}} \{ \sum_{j \in i^{th} \textrm{cluster}} ||x_j - \mu_i||^2 \}$

1.  Pick some $k$
2.  Assign a cluster to $k$ different points randomly
3.  Iterate
    1.  Center update → calculate average for each cluster (using euclidian distance)
    2.  Label update → re-assign the data to the closest cluster center
    3.  If no labels changed, finish (model has converged)

Warning: the clustering is initialization dependent and converges to a local minimum. Often requires some amount of random runs to approximate a good solution, pick best one.

Limited to compact/spherical clusters in high-dimensions (which is poor for modeling clusters with the same mean but different distributions)

Advantages

- easy to implement and interpret
- simple to understand
- computationally more efficient than other clustering algorithms

Disadvantages

- need to specify K
- dependent on initialization
- sensitive to scale of features (need to normalize/standardize)

Cost

- Dominated by calculating distance from each $x_i$ to each mean $w_c$

K-means, unlike the classification and regression models we studied in previous chapters, can get “stuck” in a bad solution. For example, if we were unlucky and initialized K-means with the following labels. To solve this problem when clustering data using K-means, we should randomly re-initialize the labels a few times, run K-means for each initialization, and pick the clustering that has the lowest final total WSSD.
