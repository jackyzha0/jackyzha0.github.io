---
title: "Latent-Factor Models"
date: 2022-11-23
tags:
  - seed
  - CPSC340
aliases:
  - PCA
  - embeddings
---

Like [[thoughts/change of basis]] but instead of hand-picking the features, we learn them from data.

_Part weights_ are a change of basis from $x_i$ to some $z_i$. The canonical example is Principal Component Analysis (PCA)

## PCA

PCA is parametric and does _not_ provide unique global optimum.

Takes in a matrix $X$ and an input $k$ and outputs two matrices such that $X \approx ZW$:

- $Z$ is a (n,k) matrix. Each row $z_i$ is a set of features/part weights
- W is a (k,d) matrix. Each row $w_c$ is a part/factor/principle component
  - We can think of $W$ as _rotating_ data so that the slope is zero
- Approximation of one $\hat x_{ij}$ is $(w^{j^T}z_i) = \langle w^j, z_i \rangle$
  - Each $x_i$ can be thought of as a linear combination of all the factors

Assumptions:

- Assumes $X$ is centered (each column of $X$ has a mean of zero)

Use cases:

- Dimension reductionality: Effectively allows us to reduce the dimensionality of X if $k < d$
  - Actually, it only ever makes sense if $k \leq d$
- [[thoughts/outlier detection|Outlier detection]]: if PCA gives a poor approximation, $x_i$ could be an outlier
- [[thoughts/visualization|Data visualization]]: $k=2$ to visualize high-dimensional objects

We minimize

$$
\begin{aligned}
f(W,Z)&= \sum_{i=1}^n \sum_{j=1}^d (\langle w^j, z_i \rangle - x_{ij})^2 & \textrm{Approximating } x_{ij} \textrm{ by } \langle w^j, z_i \rangle \\
&= \sum_{i=1}^n \lVert W^Tz_i - x_i \rVert^2 & \textrm{Approximating } x_i \textrm{ by } W^Tz_i\\
&= \lVert ZW - X \rVert_F^2 & \textrm{Approximating } X \textrm{ by } ZW
\end{aligned}
$$

If we do alternating minimization,

1. Fix Z and optimize W: $\nabla_wf(W,Z)=Z^TZW-Z^TX$
2. Fix W and optimize Z: $\nabla_wf(W,Z)=ZWW^T-XW^T$

We converge to a local optimum which will be a global optimum if W and Z are randomly initialized (if you don't pick a saddle point)

For large X, we can also just use [[thoughts/gradient descent#Stochastic Gradient Descent (SGD)|SGD]] and cost per iteration is only $O(k)$

### Choose $k$ by variance explained

How much of the variance can be explained by the choice of factors?

For a given $k$, we compute the variance of the errors over the variable of each given $x_{ij}$

$$\frac{\lVert ZW-X \rVert_F^2}{\lVert X \rVert_F^2}$$

### Uniqueness

Optimal $W$ is non-unique:

1. Scaling problem: Can multiply any $w_c$ by any non-zero $\alpha$
2. Rotation problem: Can rotate any $w_c$ within the span
3. Label switching problem: Can switch any $w_c$ with any other $w_c$

To help with uniqueness,

1. Normalization: We ensure $\lVert w_c \rVert = 1$
2. Orthogonality: We enforce $w_c^Tw_{c'}=0$ for all $c \neq c'$
3. Sequential fitting, we fit each $w_i$ in sequence

## Multi-Dimensional Scaling

Gradient descent on points on a scatter point; try to make scatterplot distances match high-dimensional distances

$$f(Z) = \sum_{i=1}^n\sum_{j=i+1}^n (\lVert z_i - z_j \rVert - \lVert x_i - x_j \rVert)^2$$

No $W$ matrix needed! However, cannot be done using singular value decomposition (a matrix factoring technique). We need [[thoughts/gradient descent]].

- Non convex
- Sensitive to initialization
- Unfortunately, MDS often does not work well in practice; MDS tends to “crowd/squash” all the data points together like PCA.

## t-SNE

> t-Distributed Stochastic Neighbour Embedding

However, using Euclidean (L2-norm) may not be a great representation of data that lives on low-dimensional manifolds. In these cases, Euclidean distances make sense “locally” but Euclidean distances may not make sense “globally”.

![[thoughts/images/manifold distance example.png]]

t-SNE is actually a special case of [[#Multi-Dimensional Scaling]]. The key idea is to focus on distance to “neighbours”, allowing gaps between distances to grow

## Word2Vec

Each word $i$ is represented by a vector of real numbers $z_i$

Trained using a masking technique.

- Takes sentence fragments and hides/masks a middle word
- Train so that $z_i$ of hidden word is similar to $z_i$ of surrounding words

$$
p(z_i) = \prod_{j \in \textrm{surrounding}} \frac{\exp(z_i^Tz_j)}{\sum_{c=1}^\textrm{\# words} \exp(z_c^Tz_j)}
$$

Gradient descent on for $-\log(p(z_i))$
