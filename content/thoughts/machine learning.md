---
title: "Machine Learning"
date: 2021-07-02T14:03:17-04:00
---

## GOFAI (good old-fashioned AI)
-   this view believes that the mind is a computer with certain special characteristics — namely the fact that its internal states and processes can be regarded as thinking or reasoning
-   finding meaning in a body of symbols, like finding rationality in a body of behaviour, is finding a certain kind of consistent, reliable pattern
-   problem solvers often use canny, methodical exploration
	-   neither algorithmic nor random
	-   a familiar sort of articulate reasoning or thinking a problem out
		-   "if only i could get that, then I could nail this down; but in order to get that, I would need such and such"
-   GOFAI is very narrow-minded and vulnerable to unexpected variations and oddities in the problems and information they were given
-   grounded in the possibility of translation — semantic interpretation
## NFAI (new-fangled AI)
-   falls under connectionism and [connectionist networks](thoughts/connectionist%20networks.md)
	- relies on computers the same way a weather service does, to simulate digitally systems that are not in themselves digital
-   adept at finding various sort of similarities among patterns, at recognizing repeated (or almost repeated) patterns and filling in missing parts of incomplete patterns
-   NFAI learns from examples (but not in the same way humans do)
-   inspired by the structure of the brain, but more deeply, by the importance and ubiquity of non-formal pattern reasoning
-   very grab-bag term → anything that isn't GOFAI
-   argument that a lot of human intelligence is not embodied in anyone, its a part of the world: [Extended mind Hypothesis](thoughts/Extended%20mind%20Hypothesis.md)
-   e.g. through the design of tools like hammers, our architecture, etc.
-   definition of understanding → appropriates and takes charge of its own conceptual resources and grasps the point of them for itself

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
-   regularization
    -   input preturbations
        -   rotations/scaling/transformations
        -   noise
    -   dropout
    -   L1 regularization → favours simpler/sparser solutions by causing weights to fall to 0 if a large gradient is not maintained

## So why are they so effective?
-   hierarchical feature composition
-   vector space separation
	-   input can be realized as a feature space
	-   output can be realized as manifolds or regions in the feature space
	-   training is just then learning the manifolds/regions that create desired categories
-   most commentators agree that current deep learning methods fall short of implementing general intelligence, and it remains an open question as to whether some modification of current deep learning methods will be able to do so -> question of [intelligence](/thoughts/intelligence)
-   self-learning algorithms like AlphaZero (which learns from self-play) seem to disprove/vindicate the empiricist approach (need real world experience to learn)
    -   counterargument is that systems like AlphaGo have built in knowledge about the rules of Go and mechanisms to explore possible outcomes one at a time (e.g. Monte Carlo Tree Search for the solution space)

## Cognition and [Intelligence](/thoughts/intelligence)
[Potemkin village](thoughts/potemkin%20village.md) analogy for approximating intelligence.

## Brain-like networks
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
-   neural networks have decently high fault tolerance (some redundant neurons)
	-   may help to explain functional persistence of brains in the face of minor damage
	-   in a large network, a loss of a few neurons will not make a huge impact, but the quality of its computations will progressively degrade
## Differences
-   real neural networks arent fully connected like ANNs
-   real neural networks have horizontal cell-to-cell connections within a given layer which are not present in ANNs
-   real brains don't use backprop via generalized delta rule
	-   back prop requires
	1.  computing partial derivates to minimize error
	2.  propagating deltas through the network back to relevant connections
	-   little empirical evidence for this in biological brains
-   real brains show a progressive reduct in reaction time as one learns
	-   not seen in ANNs where error decreases but prediction time remains constant
-   anns require a 'global truth' or teacher
	-   these 'perfect' signals are not present in the real world
-   hebbian learning
	-   those who 'vote with winners, become winners'
	-   can be used to produce learning in ANNs but not nearly as effective as backprop