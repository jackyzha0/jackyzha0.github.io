---
title: "Consciousness is not Information"
date: 2022-03-13
tags:
  - fruit
  - PHIL451A
---

> Paper #2 for PHIL 451A
>
> Prompt 1: Is consciousness essentially a kind of information?

When we examine theories of consciousness, we find that we can divide the majority of theories into two major categories: process theories and vehicle theories[^4]. I further borrow terminology from Velmans[^7] to describe these as behaviourist and cognitivist approaches to consciousness respectively, and argue that consciousness under cognitivist approaches runs into quite a few glaring holes.

Let us first begin by defining the two major categories of theories of consciousness.

1. Process theories assume that consciousness depends on the functional or relational properties of representational vehicles[^6], namely on the types of computations the vehicles engage in. Process theories are also referred to as cognitivist theorists -- these theories can, without scientific loss, be translated into talk about _information processing_[^7].
2. Vehicle theories assume that consciousness is determined by intrinsic properties of representational vehicles[^6]. These theories are also referred to as behaviourist theorists -- these theories can, without scientific loss, be translated into talk about _behaviour_[^7].

To ask whether consciousness is essentially a kind of information is to ask whether the cognitivist theories of consciousness should be considered true. I disagree with the cognitive theories of consciousness as they fail to adequately address several critical questions. To concretize my argument in real theories, I look to Chalmer's process theory[^2] and Tononi's Information Integration Theory[^1].

Both of these are deeply rooted in cognitivist theories of consciousness. For example, in IIT, consciousness of the system refers to the information generated above and beyond the information generated from the separate parts of the system[^1]. Chalmer's process theory posits that information states can be realized physically and that these information states themselves are conscious[^2].

Yet, neither theory completely accounts for:

1. Defining information in a manner at odds with how information is regularly defined
2. How a serial [stream of consciousness](thoughts/Stream%20of%20Consciousness.md) can arise from a parallel distributed network
3. Information carrying in obviously non-conscious objects
4. Brute optimization of its mathematical definition

We expand on each of these in turn.

Chalmers' process theory starts by defining information in the world as having two aspects, physicality and phenomenality. Information then, is both a physical thing and has phenomenal intentionality (or what is is like to _be_ information). In doing so, Chalmers defines information as having the property of being conscious. However, this is quite different from colloquially accepted and typical academic definitions of information. Information usually refers to _non-mental_, mind-independent entities that are embedded _in_ the physical (e.g. a book or brain states). Pioneers of information theory like Claude Shannon and even colloquial usage of the term information agree with this definition. An important distinction between these two definitions is that while physical things encode and embed information, they themselves are not information. A book by itself is just an arrangement of paper and ink but it may carry information like the concept of Dante's _Inferno_. Thus, whatever Chalmers claims to be 'information' cannot be the same information everyone else refers to[^4] and so his conclusions on the basis of information cannot be valid.

We then consider the seriality/stream problem in the context of Chalmers' process theory. The 'stream' character of human conscious experience seems to almost be at odds with the parallel distributed model of the mind with its various synapses and neurons that have no central center for keeping order. Process theories of consciousness must therefore account for how seriality arises from the distributed nature of the mind[^5]. Chalmers fails to do address this in his theory all-together. It is important to note that behaviourist theories avoid this all-together as behaviour is a _series_ (or at least, very limited parallelism) of agent-environment interactions. Agents do not perform multiple complex interactions at once (e.g. eating and playing). Even for multi-tasking of simple interactions, most theories propose the concept of a bottle-neck or limiting capacity -- more complex behaviours take more bandwidth and thus require more focus, required the need for serial execution.

Last but not least, we turn to how Chalmers' refutes information carrying in non-conscious objects. From earlier, Chalmers defines the ability to contain information states as the capacity for consciousness[^2]. Yet, there are clearly non-conscious objects, books for example, that clearly carry information but are not widely accepted as being conscious. Chalmers provides two options:

1. Perhaps only some kinds of “physically realized information spaces” are conscious.
2. Perhaps thermostats are conscious.
   Chalmers' chooses the second option and suggests that “the level of organization at which consciousness 'winks out' might be lower than a thermostat but higher than a rock.”[^4] The resolution that Chalmers' chose is quite unsatisfying.

Tononi attempts to improve on Chalmers' theory by proposing IIT[^4]. In this theory, information is defined as information that is specified by a system that is irreducible to that specified by its parts. That is, information is _integrated_ information. In making this distinction, Tononi explicitly rejects Chalmer's choice of distinguishing information-carriers as conscious and instead chooses to define a subset of physically-realized information spaces (_integrated_ information) as conscious. In doing so, IIT avoids the first and third pitfalls of Chalmers' theory.

However, IIT still has a major flaw in that it only claims to _correlate_ integrated information $\Phi$ with consciousness: "To recapitulate, the theory claims that consciousness corresponds to the capacity to integrate information."[^1] Yet, we know that correlation is most definitely neither definition nor causation. Even while this is a glaring hole in what IIT claims to be, we can continue to show that even the definition of $\Phi$ itself is problematic.

Roughly, $\Phi$ is large if the system has a lot interconnection between its components. In more technical terms, it is "minimizing, over all subdivisions of your physical system into two parts A and B, some measure of the mutual information between A’s outputs and B’s inputs and vice versa." [^8] It is worth noting then that _any_ sort of device that has some level of interconnection would be slightly conscious. According to Aaronson, Tononi seemed to accept this [panpsychist](thoughts/Panpsychism.md) implication and agree that thermostats have small but nonzero levels of consciousness. This clearly suffers the same unsatisfying conclusion that Chalmers arrived at earlier.

However, even more problematic, is the fact that as this is a mathematical formula, it is susceptible to optimization (see: [Goodhart's Law](thoughts/Goodhart's%20Law.md)). Aaronson shows that we can construct almost trivial examples where systems that are clearly not conscious exhibit ridiculously large values of integrated information. For example, we can hook together a large number of logic gates together all in ways that are highly interconnected and achieve levels of $\Phi$ that imply that over half of the information in the system is integrated information. As these logic gate systems (Aaronson details these as bipartite expander graphs) can be infinitely scalable, one could theoretically construct such a system with unbounded $\Phi$. Surely there is something problematic going on if we can say that a graph of logic gates is infinitely conscious.

It is clear that information and information-processing based methods are brittle. Of course, there are alternatives to consider like Boris Kotchoubey's behaviourist approaches to consciousness that I believe are more sound, it is outside the scope of this paper to discuss their viability. Earlier, we posited that cognitive theories consciousness rely on consciousness as information or information-processing. In conclusion, I have shown that key cognitivist theories of consciousness like Chalmer's theory and Tononi's IIT have glaring flaws in attempting to measure and define consciousness. Thus, consciousness should not be considered a kind of information.

[^1]: Tononi, Giulio (2004). _An information integration theory of consciousness_
[^2]: Chalmers, D. J. (1996). _The Conscious Mind: in Search of a Fundamental Theory_
[^3]: Shannon, C. E. (1948). _A mathematical theory of communication_
[^4]: Pockett, Susan (2014). _Problems with theories that equate consciousness with information or information processing_
[^5]: Kotchoubey, Boris (2018). _Human Consciousness: Where Is It From and What Is It for_
[^6]: Atkinson, A. P., Thomas, M. S. C., and Cleeremans, A. (2000). _Consciousness: mapping the theoretical landscape_
[^7]: Velmans, M. (1991). _Is human information processing conscious?_
[^8]: Aaronson, Scott (2014). Why I Am Not An Integrated Information Theorist in _[https://scottaaronson.blog/?p=1799](https://scottaaronson.blog/?p=1799)_
