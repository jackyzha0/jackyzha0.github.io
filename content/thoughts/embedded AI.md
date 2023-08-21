---
title: "Embedded AI"
date: 2021-07-02T15:01:46-04:00
tags:
  - seed
---

More in [post on AI systems](posts/agi.md)

## Dreyfus

Dreyfus believed that, for any AI system to achieve any sort of general intelligence, it must also exhibit Dasein (being in the world). Thus, "a successful [[thoughts/Heidegger|Heideggerian]] AI would need a perfect model of the human body – and by implication, that Dasein must be expressed as a human being, organically as well as existentially".

Dreyfus's critique of the [frame](thoughts/frame%20problem.md) approach involves look at descriptions of typical situations like going to a birthday party. This quickly grows out of hand once again as any AI program using frames to organize millions of meaningless facts so as to retrieve the relevant frames is going to be caught in a cycle of finding frames for recognizing relevant frames for recognizing relevant facts, forever in a vicious regress

## Approaches to embedded AI

### Rodney Brook's behaviourist approach

It turns out to be very difficult to reproduce in an internal representation for a computer the necessary richness of environment that would give rise to interesting behaviour by a highly adaptive robot

This is generally avoided by human beings because their model of the world is the world itself

Solution is to build a mobile robot that uses the world itself as its own representation (referring to its sensors rather than to an internal world model)

However, the problem is that a robot operates in a fixed world, responding only to a small set of possibly relevant features that their receptors can pick up

### Phil Agre's pragmatist model

Use of deictic representations: instead of representing a particular object in the world, we represent a role that an object might play in a certain time-extended pattern of interaction between an agent and its environment

e.g. when a virtual ice cube defined by its functions is close to the virtual player, a rule dictates a response (for example, kick it)

Problems: no learning takes place. As such, finesses rather than solves the frame problem

### Merleau-Ponty's discriminatory model

As an agent learns, skills are not stored as internal representations. Rather experiences are presented to the learned as more finely discriminated situations

e.g. as you learn to cook, experiences are presented that are more finely discriminated like having a better cooked egg vs a poorly done one. If the situation does not clearly solicit a single response or if the response does not produce a satisfactory result, the learner is led to further refine the discrimination

See also: [[thoughts/taste]]

### Walter Freeman's neurodynamic model

Basic Cartesian model

1.  the brain receives input from the universe by way of its sense organs
2.  out of this stimulus information, the brain abstracts features, which it uses to construct a representation of the world

Treat the computer/brain as a passive receiver of bits of meaningless data, which then have significance added to them. The big problem is how the brain binds the relevant features together (see: [[thoughts/Chinese room argument]])

Freeman solves this using the concept of energy states. States tends toward minimum "energy" which are called attractors.

Brain states that tend towards a particular attractor are called that attractor's "basin of attraction". When learning, the brain forms a new basin of attraction for each new significant class of inputs and thus the significance of past experience is preserved in an attractor landscape.

Each new attractor does not represent a thing, rather, the brain's current state is the result of the sum of the animal's past experience with the thing.

The constantly updated landscape of attractors is correlated with the agent's experience of the changing significance of things in the world.

Thus, there are no fixed [[thoughts/representation|representations]], when an animal learns to respond to a new odor, there is a shift in all other patterns (even those not directly involved with the learning)

This is a notably different approach from [[thoughts/GOFAI|GOFAI]] where each item is positioned by a discrete address or branch of search tree
