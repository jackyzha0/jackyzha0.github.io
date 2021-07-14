---
title: "Machine Learning"
date: 2021-07-02T14:03:17-04:00
tags: ["cognitive-sciences"]
---

# Haugeland
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
-   falls under connectionism and connectionist networks
-   can retain memory
	-   short term → spiking neural networks, information within the system changes slowly
	-   long term → within connections themselves (weights and biases)
-   adept at finding various sort of similarities among patterns, at recognizing repeated (or almost repeated) patterns and filling in missing parts of incomplete patterns
-   NFAI learns from examples (but not in the same way humans do)
-   connectionist mind design → relies on computers the same way a weather service does, to simulate digitally systems that are not in themselves digital
-   inspired by the structure of the brain, but more deeply, by the importance and ubiquity of non-formal pattern reasoning
-   very grab-bag term → anything that isn't GOFAI
-   argument that a lot of human intelligence is not embodied in anyone, its a part of the world
-   e.g. through the design of tools like hammers, our architecture, etc.
-   definition of understanding → appropriates and takes charge of its own conceptual resources and grasps the point of them for itself
-   does not merely make discriminations or produce outputs that, when best interpreted by us, come out as true

# Buckner
## Deep Learning: a philosophical introduction
-   no universally accepted explanation as to why they work so well
-   argues why deep learning differs so much from shallow networks and multilayer perceptrons
-   dcnns → deep cnns
    -   supervised learning method
    -   works by backpropagating error signals and gradually adjusting link weights, network performance can converge on the solutions to a wide range of problems
    -   3 properties
        1.  deep → 5+ layers
        2.  heterogeneous → containing different types of nodes (CNN kernels, ReLUs, max pools, etc.)
        3.  sparsely connected → only taking input from some of the outputs from the previous layer rather than all of it
-   "golden age network"
    -   3 properties
        1.  shallow → no more than three or four layers between input and output
        2.  uniform → only one type of node deploying a sigmoidal activation
        3.  fully connected → each node from a lower layer connected to each other in the next layer
-   depth
    -   analogy of assembly line mass production of automobiles
        -   one person is skeptical of the significance of assembly lines → "any thing that can be made by the assembly line could, in theory, be made by a team of skilled machinists"
            -   nothing profound here
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
-   most commentators agree that current deep learning methods fall short of implementing general intelligence, and it remains an open question as to whether some modification of current deep learning methods will be able to do so
-   self-learning algorithms like AlphaZero (which learns from self-play) seem to disprove/vindicate the empiricist approach (need real world experience to learn)
    -   counterargument is that systems like AlphaGo have built in knowledge about the rules of Go and mechanisms to explore possible outcomes one at a time (e.g. Monte Carlo Tree Search for the solution space)
## Cognition and Intelligence
-   thinking of cognition as ranging over 4 variables
    -   a → algorithms
    -   r → representational formats
    -   k → innate knowledge
    -   e → experience
    -   true empiricist systems should begin with 0r, 0k, minimal a, and deriving all else from e
-   domain-specific vs domain-general algorithms
-   do dcnns learn the same way humans do
    -   arguments against
        -   DCNNs require far more labelled data than humans do to learn the same information
        -   adversarial examples
    -   zero-shot/few-shot learning in ML systems
        -   synonymous to how we, as humans, use previous experience even in novel experiences
        -   questioning if humans also receive minimal training exemplars
            -   many different vantage points of the same object could provide additional training exemplars for cortical learning
            -   offline memory consolidation during sleep and daydreaming can replay the same training session many thousands of times in nonconscious repetitions
    -   the "potemkin village that works well on naturally occurring data, but is exposed as fake when one visits points in space that do not have high probability"
        -   "A "Potemkin village" signifies any deceptive or false construct, conjured often by cruel regimes, to deceive both those within the land and those peering in from outside."
        -   movie village thing

# Churchland
-   [multiple realization](/thoughts/multiple-realization) argument → cognitive activity could most surely be realized in a considerable variety of quite different physical systems
-   physical details of any such system cannot be essential to understanding the general phenomenon that could be displayed by all cognitive systems
    -   must be sought at a more abstract level than the level of neurons and their interactions
-   this was used to justified long-standing disinterest in the neurosciences (AI and cognitive psychology)
    -   churchland thinks that this connection should be restored
## Brain-like networks
-   functional atoms of the brain are cells called neurons
-   make a large number synaptic connections with either the central cell body or the dendrites (receiver) of other neurons
-   sigmoidal axonal output function
-   input vector → set of activation levels of all of the input units
-   hidden layer → completely determined by
	1.  input vector
	2.  various values of the connection weights
-   output layer → completely determined by
	1.  activation vector of the hidden layer
	2.  various values of the connection weights
-   training the network through incremental improvement after seeing examples
-   knowledge generalizes decently
-   rock vs mine detection example is intriguing
	-   "knowledge" has been acquired
	-   exists a learning algorithm that can adjusts the weights as a function of the error displayed in the output vector that will eventually produce the required set of weights given sufficient examples on which to train the network
-   contains no explicit representation of any rules
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
## Accuracy
-   description captures a lot of biological features in brains
	-   structure of cerebral cortex (which has at least 6 distinct layers of neurons)
	-   character of cerebellum (connected to motor control) acts like a large matrix multiplier which is shown to be equivalent to the same function performed by ANNs
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

# Crane
## Are connectionist machines computers?
-   yes → basic notion of a computer: something that transforms an input representation into an output representation in a disciplined way
	-   crane agrees
-   no → must be symbol manipulation which connectionist machines dont do
-   computer works by breaking down the tasks it performs into simpler and simpler tasks
-   mentalese sentences are
    -   processed 'formally' by the machine → vehicle of computation
    -   are representations themselves → vehicle of mental content
-   computation is performed at the level of simple units (activation of units, backprop of unit connections) but there need not be representation at this level
    -   but if distributed representation is involved (as with most connectionist networks), its the network state as a whole thats interpreted as representing rather than the individual units
    -   thus, the vehicles of computation (units) need to be the vehicles of representation (network state)
    -   e.g. light array example YOUR vs your is the same message but underlying 'units' are different