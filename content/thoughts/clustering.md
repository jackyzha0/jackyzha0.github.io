---
title: "Clustering"
date: 2022-09-26
tags:
- seed
- CPSC340
---

We want to assign examples to "groups"

Most popular clustering method is k-means.

1.  Pick some k
2.  Assign data to k different clusters randomly
3.  Iterate
    1.  center update → calculate average for each cluster (using euclidian distance)
    2.  label update → re-assign the data to the closest cluster center
    3.  if no labels changed, finish (model has converged)

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