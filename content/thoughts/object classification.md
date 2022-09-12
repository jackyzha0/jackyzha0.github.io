---
title: "Object Classification"
date: 2021-12-24
tags:
- seed
---

## Data to Model
### Random Sample Consensus (RANSAC)
1. randomly choose minimal subset of data points necessary to fit model
2. points within some distance threshold of model are a consensus set, the size of the consensus set is the model's support
3. repeat for N samples, model with biggest support is most robust fit

Choosing number of samples $k$
1. let $\omega$ be the fraction of inliers
2. let $n$ be the number of points needed to define hypothesis (e.g. $n=2$ for a line)
3. suppose $k$ samples of $n$ points are chosen. then
	1. the probability that all $n$ in a sample are correct is $\omega^n$
4. the probability that all $k$ samples fail is $(1-\omega^n)^k$, thus we choose a $k$ large enough to keep this below a targe failure rate

Advantages
- general method
- easy to implement and calculate failure rate
Disadvantages
- only handles a moderate percentage of outliers without cost blowing up
- many real problems have high rate of outliers (e.g. noise)

### Hough Transform
- For each token, vote for all models to which the token could belong
- Return model with most votes

e.g. for each point, vote for all lines that *could* pass through it; true lines will pass through many points and thus receive many votes

Turning image space into parameter space. Rearranging $y = mx + b$ into $y - mx = b$ where $b$ and $m$ are the variables instead of $y$ and $x$.

We can alternative transform it using Book's Convention: $x\sin(\theta) + y\cos(\theta) + r = 0$. Then, $x\sin(\theta) + y\cos(\theta) = \rho$

Advantages
- Can handle high percentage of outliers: each point votes separately
- Can detect multiple instances of a model in a single pass
Disadvantages:
- Complexity of search time increases exponentially with the number of model parameters
- Can be tricky to pick a good bin size

## Classification
Classifier is a procedure that accepts as input a set of features and outputs a prediction for the class label.

### Standard Bag-of-Words pipeline
1. Dictionary Learning: learn visual words using clustering
2. Encode: build Bags-of-words vectors for each image
3. Classify: train and test data using BOW (KNN, naive Bayes, SVM)

### Bayes Rule
Let $c$ be the class label and $x$ be the measurement (evidence)

$$P(c|x) = \frac{P(x|c)p(c)}{P(x)}$$

- $P(c|x)$: the posterior probability is the probability of $c$ given $x$ (after the measurement). 
- $p(c)$: prior probability
- $P(x|c)$: class-conditional probability (likelihood)
- $P(x)$: unconditional probability (a.k.a. marginal likelihood)

Decision boundary, the location where one class becomes more probable than the other (e.g the point where the probability classes are equal). 

The Bayes' risk is the shaded region where one class's probability is still non-zero beyond its decision boundary.

![](/thoughts/images/bayes-risk.png)

See also: [[thoughts/probability|probability]]

### ROC Curve
Trade-off between true positive rate and false positive rate. A random classifier will always have 1:1 true positive and false positive rate

![](/thoughts/images/roc-curve.png)

### Parametric vs Non-parametric
- Parametric classifiers rely on a model
	- fast, compact
	- flexibility and accuracy depend on model assumptions
- Non-parametric classifiers are data driven (rely on comparing to training examples directly)
	- slow
	- highly flexible decision boundaries 

### K-Means
Assumption that we know how many clusters there are as a prior ($k$ in K-Means)

Minimize $\sum_{i \in \textrm{clusters}} \{ \sum_{j \in i^{th} \textrm{cluster}} ||x_j - \mu_i||^2 \}$

1.  pick some k
2.  assign data to k different clusters randomly
3.  iterate
    1.  center update → calculate average for each cluster (using euclidian distance)
    2.  label update → re-assign the data to the closest cluster center
    3.  if no labels changed, finish (model has converged)

Warning: the clustering is initialization dependent and converges to a local minimum. Often requires some amount of random runs to approximate a good solution, pick best one.

Limited to compact/spherical clusters in high-dimensions (which is poor for modeling clusters with the same mean but different distributions)

### Spatial Pyramid
Have multiple scales of the input image to compute histograms across. Train a classifier for each scale along with a combined weight to combine each classifier.

### VLAD (Vector of Locally Aggregated Descriptors)
Instead of incrementing the histogram bin by a single count, we increment it by the residual vector $x - c(x)$ (diff between cluster center and feature vector)

Dimensionality is $Kd$ where $K$ is number of codewords and $d$ is the dimensionality of the local descriptor (128 for SIFT)

## Decision Tree
See notes on [[thoughts/decision tree|decision trees]]

### Classifier Boosting
- Train an ensemble of classifiers sequentially
- Bias subsequent classifiers to correctly predict training examples that previous classifiers got wrong

## CNNs
Standard is DxWxH

### Convolutional Layer
$K$ is the number of filters, $F$ is the spatial extend of filters (kernel size), $S$ is the stride, and $P$ is the padding

- $W_{out} = (W_{input} - F + 2P)/S + 1$
- $H_{out} = (H_{input} - F + 2P)/S + 1$
- $D_{out} = K$

Total number of learnable parameters: $(F \times F \times D_{input}) \times K + K$.

### Pooling Layer
Makes representation smaller, more manageable and spatially invariant. 

- $W_{out} = (W_{input} - F)/S + 1$
- $H_{out} = (H_{input} - F)/S + 1$
- $D_{out} = D_{input}$

Total number of learnable parameters: 0.

### Layer Summary
- Convolutional Layer: applies a set of learnable filters
- Pooling Layer: performs spatial downsampling
- Fully-connected Layer: same as any regular neural network

A CNN then just learns a hierarchy of filters

## Clustering
Set of techniques to find components that belong together.

Note: Grouping is how the human visual system perceives things and clustering is the actual algorithm itself.

1. Agglomerative Clustering -> build up close together things
	1. Each data point stars as a separate cluster, clusters are recursively merged
	2. Algorithm
		1. Make each point a separate cluster
		2. Until the clustering is good
			1. Merge the two clusters with the smallest inter-cluster distance
2. Divisive Clustering ->breaks features into smaller clusters
	1. The entire dataset starts as a single cluster. Clusters are recursively split
	2. Algorithm
		1. Construct a single cluster containing all points
		2. Until the clustering is good
			1. Split the cluster that yields the two components with the largest inter-cluster distance

Cluster distance measures
1. Distance between closest members of $C_1$ and $C_2$. Also called single-link clustering: $\min d(a,b), a \in C_1, b \in C_2$
2. Distance between farthest members of $C_1$ and $C_2$. Also called complete-link clustering: $\max d(a,b), a \in C_1, b \in C_2$
3. Average distance between members of $C_1$ and $C_2$. Also called group average clustering: $\frac{1}{|C_1||C_2|} \sum_{a \in C_1} \sum_{b \in C_2} d(a,b)$

A **dendrogram** describes the hierarchy of clusters generated by the clustering methods.

### Agglomerative Clustering with a Graph
Let the 'internal difference' of a cluster be the largest weight in the minimum spanning tree of the cluster (denote as $M(C)$)

Then, $int(C) = \max_{e \in M(C)} w(e)$

Doesn't work for small clusters so they create a new measure to measure internal difference of two clusters

$$MInt(C_1, C_2) = min(int(C_1) + \tau(C_1), int(C_2) + \tau(C_2))$$

where $\tau = \frac{k}{|C|}$

Algorithm:
1. Make each point a separate cluster
2. Sort edges in order of non-decreasing weight so that $w(e_1) \leq w(e_2) \leq ... \leq w(e_r)$
3. For $i = 1$ to $r$
	1. If both ends of edge $e_i$ lie in the same cluster
		1. Do nothing
	2. Else one end is in cluster $C_l$ and the other is in cluster $C_m$
		1. If $d(C_l, C_m) \leq MInt(C_l, C_m)$
			1. Merge $C_l$ and $C_m$
4. Return remaining clusters