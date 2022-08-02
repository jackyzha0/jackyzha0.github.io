---
title: "Network Theory"
date: 2022-08-01
tags:
- seed
---

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

## Distances in Networks
The dependence of the average distance $\langle d \rangle$ on the system size $N$ and the degree exponent $\gamma$ are captured by the formula

$$\langle d \rangle = \begin{cases}
	const & \gamma = 2 \\
	\ln \ln N & 2 < \gamma < 3 \\
	\frac{\ln N}{\ln \ln N} & \gamma = 3 \\
	\ln N & \gamma > 3
\end{cases}$$

1. $\gamma = 2$: Hub and spoke model. $k_{max} \sim N$ so all nodes connect to a single central hub. The average path length is constant.
2. $2 < \gamma < 3$: Ultra-small world model. Hubs radically reduce the path length.
3. $\gamma = 3$: Critical point
4. $\gamma > 3$: Small-world and random networks. Extremely unlikely to have large hubs, traversal time is on the order of $\ln N$

![[thoughts/images/distances in networks.png]]
