---
title: "Density-based clustering"
date: 2022-09-28
tags:
  - seed
  - CPSC340
aliases:
  - "density based clustering"
---

- Clusters are defined by “dense” regions.
- Examples in non-dense regions don’t get clustered
- Clusters can be non-convex

It is **non-parametric** (there is no fixed number of clusters $k$)

## DBSCAN

Main idea: merge all neighbouring core points to form clusters

Defines

- Epsilon ($\epsilon$): distance we use to decide if another point is a “neighbour”
- MinNeighbours: number of neighbours needed to say a region is “dense”
  - If you have at least minNeighbours “neighbours”, you are called a “core” point

Pseudocode;

- For each example $x_i$ :
  - If $x_i$ is already assigned to a cluster, do nothing.
  - Test whether $x_i$ is a ‘core’ point ($\geq$ minNeighbours examples within $\epsilon$).
    - If $x_i$ is not core point, do nothing (this could be an outlier).
    - If $x_i$ is a core point, make a new cluster and call the “expand cluster” function.
      - Assign to this cluster all $x_j$ within distance $\epsilon$ of core point $x_i$ to this cluster.
      - For each new “core” point found, call “expand cluster” (recursively).

Issues

- Ambiguity of "non-core" boundary points
- Sensitive to the choice of $\epsilon$ and minNeighbours
