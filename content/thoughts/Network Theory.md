---
title: "Network Theory"
date: 2022-08-01
tags:
  - seed
aliases:
  - scale-free networks
---

> Whenever nature seeks robustness, it resorts to networks.

The [[thoughts/Internet|internet]] played a huge role in developing network theory with over a trillion documents $N \approx 10^{12}$

## Power Laws and Scale-Free Networks

From the [Network Science Book](http://networksciencebook.com/chapter/4#hubs)

**A random network** is a network where the degrees of connections of the nodes follow a Poisson distribution.

**A scale-free network** is a network where the degrees of connections of the nodes follows a power law (modelled by the Power Law $p_k \sim k^{-\gamma}$, this is also where the concept of the 80/20 rule comes from). For example, roughly 80% of the web point to only 15% of the web pages.

Main difference is that power-law distributions (scale-free networks) have long tails (i.e. some nodes have lots of connections -- these are called hubs).

- Largest hubs in scale-free networks have degree in the order of $k_{max} \sim N^{\frac 1 {\gamma - 1}}$
- Largest hubs in random networks have degree in the order of $k_{max} \sim \ln N$
- Largest hubs in a complete graph have degree exactly $N - 1$

Once hubs are present, they change the way we navigate the network. In random networks, we usually need to make many hops. On scale-free networks, however, we can reach most destinations via a single hub. Scale-free networks mean that even as the sizes may differ widely between networks, navigation time across the networks is very slow to grow (ultra-small world network).

![[thoughts/images/random vs scale-free.png|500]]

![[thoughts/images/hub sizes in networks.png|500]]

An almost universal property of most real-world networks. For example:

1.  Internet at the router level
2.  Protein-protein interaction network
3.  Email network
4.  Citation network

However, the scale free property is absent in systems that limit the number of links a node can have, effectively restricting the maximum size of the hubs.

See also: _[On the Power of (even a little) Centralization in Distributed Processing](https://storage.googleapis.com/zt-web-large-files/2011__A_Little_Centralization__Tsitsiklis_Xu.pdf)_

## Distances in Networks

The dependence of the average distance $\langle d \rangle$ on the system size $N$ and the degree exponent $\gamma$ are captured by the formula

$$
\langle d \rangle = \begin{cases}
	const & \gamma = 2 \\
	\ln \ln N & 2 < \gamma < 3 \\
	\frac{\ln N}{\ln \ln N} & \gamma = 3 \\
	\ln N & \gamma > 3
\end{cases}
$$

1. $\gamma = 2$: Hub and spoke model. $k_{max} \sim N$ so all nodes connect to a single central hub. The average path length is constant.
2. $2 < \gamma < 3$: Ultra-small world model. Hubs radically reduce the path length.
3. $\gamma = 3$: Critical point
4. $\gamma > 3$: Small-world and random networks. Extremely unlikely to have large hubs, traversal time is on the order of $\ln N$

![[thoughts/images/distances in networks.png]]

## Network Robustness

See also: [[thoughts/cascading failures]]

### Percolation Theory

How many nodes do we have to delete to fragment a network into isolated components, assuming deletion is random?

We can model network breakdown as inverse percolation.

Thinking about this using the metaphor of forest fires helps to imagine what these variables mean. If we randomly ignite a tree, what fraction of the forest burns down? How long it takes the fire to burn out?

As a forest is roughly similar to a random network, the answer depends on the tree density, controlled by the parameter $p$. For small $p$ the forest consists of many small islands of trees ($p = 0.55$), hence igniting any tree will at most burn down one of these small islands. Consequently, the fire will die out quickly. For large $p$ most trees belong to a single large cluster, hence the fire rapidly sweeps through the dense forest ($p = 0.62$). But there also exists a critical $p_c$ at which it takes extremely long time for the fire to end.

However, this breaks down once we consider scale-free networks. Scale-free networks observe unusual robustness to failure: we must remove all of its nodes to have likely destroyed its giant component.

![[thoughts/images/robustness of scale-free networks.png]]

### Under Attack

The removal of a small fraction of the hubs is sufficient to break a scale-free network into tiny clusters. See more on [[thoughts/cascading failures|cascading failures]] in networks

![[thoughts/images/scale-free under attack.png]]_The probability that a node belongs to the largest connected component in a scale-free network under attack (purple) and under random failures (green)._

Knocking out even a few hubs quickly breaks down the network. Y-axis is the ratio $\frac{P_\infty(f)}{P_\infty(0)}$ provides the relative size of the largest connected subgraph
