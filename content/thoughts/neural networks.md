---
title: "Neural networks"
date: 2022-12-03
tags:
- seed
- CPSC430
---

See also: [[thoughts/convolutional neural networks]]

## Motivation and Theory
Many domains require non-linear transforms of the features (see: [[thoughts/change of basis]]). Usually not obvious which transform to use.

**Neural network models try to learn good transformations**. Whereas [[thoughts/latent-factor model]]s train the embedding and model separately, neural networks learn both features and the model at the same time.

Let $k$ be the number of hidden units. Generally, $\hat y_i = v^Th(Wx_i)$ (or, with bias, $\hat y_i = \sum_{c=1}^k v_ch(w_c^Tx_i + \beta_c) + \beta$)

![[thoughts/images/single-layer-ann-diagram.jpg|500]]

Artificial neural network:
- $x_i$ is measurement of the world
- $z_i$ is internal representation of world
	- Each $h(z_i)$ can be viewed as binary feature: do we care about it or not?
	- Use sigmoid as a smooth approximation
- $y_i$ is output of neuron for classification/regression

Parameters: the (k,d) matrix $W$, and (k) vector $v$. To turn this into [[thoughts/multi-class classification]], we modify $v$ into a (k', k) matrix (where k' is the number of classes) and convert to probabilities by computing the softmax of the $\hat y_c$ values

Losses:
- [[thoughts/binary classification|Binary Classification]]: $f(W,v) = \sum_{i=1}^n \log(1+\exp(-y_iv^Th(Wx_i)))$
- [[thoughts/linear regression|Regression]]: $f(W,v) = \frac{1}{2} \sum_{i=1}^n (v^Th(Wx_i)-y_i)^2$

### Training
Generally non-convex as W and v are both variables. As such, finding the global optimum is NP-Hard. We can use [[thoughts/gradient descent#Stochastic Gradient Descent (SGD)]] but this is not guaranteed to reach a global optimum due to non-convexity.

### Implicit Regularization


## Deep Learning: a philosophical introduction
-   no universally accepted explanation as to why they work so well, just really a form of [classification](thoughts/object%20classification.md)
-   "golden age network"
    -   3 properties
        1.  shallow → no more than three or four layers between input and output
        2.  uniform → only one type of node deploying a sigmoidal activation
        3.  fully connected → each node from a lower layer connected to each other in the next layer
-   depth
    -   analogy of assembly line mass production of automobiles
        -   one person is skeptical of the significance of assembly lines → "any thing that can be made by the assembly line could, in theory, be made by a team of skilled machinists"
        -   other person believes that the assembly line is more efficient, specialized, and reusable
            -   each unit can grow increasingly specialized and better at a small range of simpler tasks reliably and efficiently
            -   standardization of units across automobiles
    -   sum-product network example
        -   simple device for computing polynomial functions
        -   shallow networks → must compute the expanded expressions of that function (skilled but inefficient machinists)
        -   deep networks → can compute the factorized expression of the polynomial function
            -   show that they can compose simple operations
-   heterogeneity
    -   different types of operations composed together
    -   dccns → conv layer followed by relu followed by max pooling
        -   good at detecting features in a variety of different locations/poses
    -   combining all three operations means we can product a simplified, transformed representation of the source image
        -   can get more complex/abstract as you move deeper through the layers
-   sparse connectivity
    -   heuristic → only local pixels matter
    -   dramatically reduces number of learned parameters
-   [[thoughts/regularization]]
    -   input preturbations
        -   rotations/scaling/transformations
        -   noise
    -   dropout
    -   L1 regularization → favours simpler/sparser solutions by causing weights to fall to 0 if a large gradient is not maintained

### So why are they so effective?
-   hierarchical feature composition
-   vector space separation
	-   input can be realized as a feature space
	-   output can be realized as manifolds or regions in the feature space
	-   training is just then learning the manifolds/regions that create desired categories
-   most commentators agree that current deep learning methods fall short of implementing general intelligence, and it remains an open question as to whether some modification of current deep learning methods will be able to do so -> question of [intelligence](/thoughts/intelligence)
-   self-learning algorithms like AlphaZero (which learns from self-play) seem to disprove/vindicate the empiricist approach (need real world experience to learn)
    -   counterargument is that systems like AlphaGo have built in knowledge about the rules of Go and mechanisms to explore possible outcomes one at a time (e.g. Monte Carlo Tree Search for the solution space)

### Cognition and [Intelligence](/thoughts/intelligence)
[Potemkin village](thoughts/potemkin%20village.md) analogy for approximating intelligence.

### Brain-like networks
-   biological similarities
	-   CNNs have high sensitivity to spots, edges, and bars in specific orientations
	-   echoes the work of hubel and wiesle (1962) which found similar patterns in the feline visual cortex
-   can record a single neuron but very difficult to record patterns
-   functional vector → vector that corresponds to one of the output classes
-   speech example, network managed to recover phonetic hierarchical information
-   both systems have created a system of internal representations that corresponds to important distinctions and structures in the outside world
-   theories → representations that allow networks to "make sense" of their corpus and respond in a fashion that reduces error
-   how do we explain 'conceptual change'?
	-   knowing a creature's vector-space partitions may suffice for short-term prediction of behaviour but inadequate to predict or explain the evolution of those partitions over the course of time
	-   just knowing output space partitions is not enough, but connection weights seems to provide a level that meets all of these conditions
-   neural networks have decently high [[thoughts/fault tolerance|fault tolerance]] (some redundant neurons)
	-   may help to explain functional persistence of brains in the face of minor damage
	-   in a large network, a loss of a few neurons will not make a huge impact, but the quality of its computations will progressively degrade

### Differences
-   real neural networks arent fully connected like ANNs
-   real neural networks have horizontal cell-to-cell connections within a given layer which are not present in ANNs
-   real brains don't use backprop via generalized delta rule
	-   back prop requires
		1.  computing partial derivates to minimize error
		2.  propagating deltas through the network back to relevant connections
	-   little empirical evidence for this in biological brains
-   real brains show a progressive reduct in reaction time as one learns
	-   not seen in ANNs where error decreases but prediction time remains constant
-   ANNs require a 'global truth' or teacher
	-   these 'perfect' signals are not present in the real world
-   Hebbian learning
	-   those who 'vote with winners, become winners'
	-   can be used to produce learning in ANNs but not nearly as effective as backprop