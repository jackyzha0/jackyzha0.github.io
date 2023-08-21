---
title: "Outlier detection"
date: 2022-10-03
tags:
  - seed
  - CPSC340
---

Find observations that are unusually different from the others (aka anomaly detection).

Why? We may want to remove outliers, or be interested in the outliers themselves (security)

**Generally does not work**. It can be hard to decide when to report an outlier. There are always new ways to make outliers!

5 Types of outlier detection

1. Model-based methods
   - See if z-score is past a certain threshold
   - Unfortunately, z-score assumes uni-modal data
2. Graphical approaches
   - Look at a plot, human decides if data is an outlier
   - Unfortunately only in max 2-3 dimensions
3. Cluster-based methods
   - Cluster the data
   - Find points that do not belong to clusters
4. Distance-based methods
   - How many points lie in a radius $\epsilon$?
   - Global outliers
     - For each point, compute the average distance to its KNN
     - Outliers are points that are far from their KNNs
   - Local outliers
     - Outlierness ratio of example $i$ is the average distance of $i$ to its KNN over the average distance of neighbours of $i$ to their KNNs
5. Supervised-learning methods
   - Use [[thoughts/supervised learning]]: $y_i = 1$ if $x_i$ is an outlier, $y_i - 0$ if $x_i$ is a regular point
   - Needs supervision: we need to know what outliers look like

## Local vs global outliers

It’s hard to precisely define “outliers”

![[thoughts/images/outlier example.png]]

- In the first case it was a “global” outlier.
- In this second case it’s a “local” outlier:
  - Within normal data range, but far from other points.
