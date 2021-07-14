---
title: "Embedded AI"
date: 2021-07-02T15:01:46-04:00
tags: ["cognitive-sciences"]
---

# Dreyfus
## Why Heideggerian AI failed and how fixing it would require making it more Heideggerian
-   the [frame](/thoughts/frame-problem) approach → descriptions of typical situations like going to a birthday party
	-   however, this quickly grows out of hand once again as any AI program using frames to organize millions of meaningless facts so as to retrieve the relevant frames is going to be caught in a cycle of finding frames for recognizing relevant frames for recognizing relvant facts
-   an emergent heideggerian cognitive science → embodied-embedded thinking is under active investigation and development
-   john haugeland → cognition is embedded and embodied
## Three approaches to supposedly Heideggerian AI
-   Rodney Brook's behaviourist approach
	-   it turns out to be very difficult to reproduce in an internal representation for a computer the necessary richness of environment that would give rise to interesting behaviour by a highly adaptive robot
		-   this is avoided by human beings because their model of the world is the world itself
		-   "the best model of the world is the world itself"
	-   build a mobile robot that uses the world itself as its own representation (referring to its sensors rather than to an internal world model)
	-   problems
		-   does not learn
		-   operates in a fixed world, responding only to a small set of possibly relevant features that their receptors can pick up
-   Phil Agre's pragmatist model
	-   use of deictic representations
		-   instead of representing a particular object in the world
		-   represent a role that an object might play in a certain time-extended pattern of interaction between an agent and its environment
	-   objectified both functions and situational relevance for the agent
		-   e.g. when a virtual ice cube defined by its functions is close to the virtual player, a rule dictates a response, e.g. kick it
		-   no learning takes place
			-   as such, finesses rather than solves the frame problem
		-   heidegger's view is that this function should not be fixed
	-   merleau-ponty's work → nonrepresentational account of the way the body and the world are coupled
		-   as an agent learned, skills are not stored as internal representations
		-   rather experiences are presented to the learned as more finely discriminated situations
			-   e.g. as you learn to cook, experiences are presented that are more finely discriminated like having a better cooked egg vs a poorly done one
		-   if the situation does not clearly solicit a single response or if the response does not produce a satisfactory result, the learner is led to further refine the descrimination
## Walter Freeman's neurodynamic model
-   basic Cartesian model
	1.  the brain receives input from the universe by way of its sense organs
	2.  out of this stimulus information, the brain abstracts features, which it uses to construct a representation of the world
-   how are these accomplished in AI systems
	-   applying rules such as frames/scripts of GOFAI → acknowledged as not solving the frame problem
	-   strengthening/weakening weights on connections between neurons in an ANN (connectionist)
		-   significance is added from outside since the net is not seeking anything
-   both approaches treat the computer/brain as a passive receiver of bits of meaningless data, which then have significance added to them
	-   big problem is, how the brain binds the relevant features together
	-   neural version of the frame problem → how can the brain keep track of which facts in its representation of the current world are relevant to which other facts
-   his approach implies the involvement of the whole brain in perception and action
	-   rather than detecting features and processing the features step-by-step towards a unified represetnation
	-   given that the environment is already significant for the animal, how can the animal select a unified significant figure from the noisy background?
	-   transforms binding problem → selection problem
	-   animal's perceptual system is primed by past experience and arousal to seek and be rewarded by relevant experiences
		-   hebbian rule → synapses between neurons that fire together become stronger as long as the synchronous firing is accompanied by a reward
		-   form 'cell assemblies'
		-   "if a male animal has just eaten and is ready to mate, the gain is turned down on the cell assemblies responsive to food smells and tuned up on female smells"
-   concept of energy states
	-   state tends toward minimum "energy"
	-   minimum energy states are called attractors
	-   brain states that tend towards a particular attractor are called that attractor's "basin of attraction"
	-   when learning, the brain forms a new basin of attraction for each new significant class of inputs → significance of past experience is preserved in an attractor landscape
-   each new attractor does not represent a thing, rather, the brain's current state is the result of the sum of the animal's past experience with the thing
	-   constantly updated landscape of attractors is correlated with the agent's experience of the changing significance of things in the world (intentional arc)
-   no fixed representations, when an animal learns to respond to a new odor, there is a shift in all other patterns (even those not directly involved with the learning)
	-   different from GOFAI, memory stores in computers in which each item is positioned by a discrete address or branch of serach tree
-   simulated through computers as states of the model are representations of brain states (possible to represent as global state transitions from one attractor basin to another is discrete), not features of things in the everyday world
-   actually modeled the activity of the brain of the salamander sufficiently to simulate the salamander's foraging and self-preservation capacities
## How heideggerian ai would dissolve rather than avoid or solve the frame problem
-   why do we cope
	-   heidegger → we are constantly solicited to improve our familiarity with the world
	-   in our skilled activity, we are drawn to move so as to achieve a better and better grip on our situation
		-   don't need any mental representation of one's goal nor any problem solving
		-   steady flow of skillful activity in response to the situation
		-   when situation deviates from some optimal position, one's activity takes one closer to the optimum and thereby relives the "tension" of the deviation
		-   one does not need to know that the optimum is in order to move towards it
		-   ones body is simply drawn to lower the tension
-   binding problem → how brains segregate elements in complex patterns of sensory input so that they are allocated to discrete "objects"
-   wheeler thinks that the simplest test of the viability of any proposed AI program is whether it can solve the frame problem
-   heideggerian ai needs a particular way of being embedded and embodied such that what we experience is significant for us in the particular way that it is
-   need to program a model of a body very much like ours with our needs/desires/pleasures/pains/ways of moving/cultural background/etc.