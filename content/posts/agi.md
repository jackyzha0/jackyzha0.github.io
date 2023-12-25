---
title: Humanistic AGI
date: 2020-11-02T16:17:37-08:00
enableToc: true
tags:
  - fruit
aliases:
  - AGI
  - artificial general intelligence
---

This blog post is adapted from a term paper I wrote for PHIL250: Minds and Machines at UBC.

---

## Introduction

Historically, development of AI has taken a very specific approach -- systems that represent the world through symbols and manipulate those tokens in a systematic way to arrive at a result. This type of AI was coined Good Old-Fashioned AI ([[thoughts/GOFAI]]) by John Haugeland[^1].

This worked well up until around 1984 when the field entered an 'AI Winter', a long plateau in progress that was most likely due cynicism in the AI research community that trickled to media and [funding](thoughts/funding.md) bodies, halting research and development[^2].

However, with the rise of Moore's Law and the insane amount of compute and data available, a new approach to the development of AI arose -- one that focused on statistical methods and connectionist networks like artificial [[thoughts/neural networks|neural networks]][^2]. Haugeland[^1] dubbed this approach to AI design New Fangled AI ([[thoughts/NFAI]]).

This paper will examine factors that differentiate GOFAI and NFAI systems, such as their ability to adapt to changes in input, and the explainability of their outputs and internal representations. It will also examine current work in integrating the two approaches to Artificial Intelligence to create an artificial general intelligence.

### GOFAI Systems

Since the inception of the term GOFAI, the basic idea has remained unchanged: thinking as internal symbol manipulation. Within these GOFAI systems, symbols are representative of aspects of our world. These symbols are manipulated in a systematic and logical matter, performing a series of deterministic steps that results in another sequence of symbols[^1].

A very common example of GOFAI systems are expert systems, which are computer systems that emulate the decision making ability of a human expert[^3]. They solve problems via decision-tree reasoning, figuring out whether to perform certain actions based off of if-then rules.

However, just being able to solve a problem shouldn't be sufficient for intelligence. So what qualifies it? At its core, GOFAI can be considered 'artificially intelligent' because of semantic interpretation. If the symbols represent aspects of our world, the result, which is also a symbol sequence, can be _translated_ back into aspects of our world. This is called semantic interpretation, which "seeks to construe a body of symbols so that what they mean ('say') turns out to be consistently reasonable and sensible, given the situation"[^1].

### NFAI Systems

NFAI, on the other hand, is a diverse and still rapidly evolving set of systems and algorithms. It is more of a grab-bag term, roughly meaning any sort of scientific mind design that is not GOFAI[^1]. Under this umbrella are connectionist networks, which are networks composed of lots of simple units that are interconnected with various strengths. This paper will mostly focus on connectionism as a synecdoche for the greater umbrella of NFAI.

Some classic examples of connectionist networks include convolutional [[thoughts/neural networks|neural networks]] (CNNs), which are a form of image classifiers[^4]. These networks operate by applying filters or kernels to an input between layers of the network. Each of those filters have their own set of strengths that will learn and evolve over time to identify certain 'features' from the input. Similar to cell assemblies in animal perceptual systems, these filters assemble more complex patterns using smaller and simpler patterns[^5].

These connectionist networks are very inspired by the structure of the brain, with its hierarchical patterns and compositional nature[^6], rather than the rational manipulation of symbols that is observed in GOFAI.

## The Potemkin Village Analogy

While it is obvious that GOFAI and NFAI are very different approaches to constructing AI systems, how do they differ in their resilience to failure? An analogy that may be useful in visualizing this is a [potemkin village](thoughts/potemkin%20village.md): a fake village that is built to resemble and deceive others into thinking it is real. AI systems attempt to build a sort of 'potemkin village' that "works well on naturally occurring data, but is exposed as fake when one visits points in space that do not have high probability"[^7].

GOFAI systems are excellent at "processing syntactical patterns like those characteristic of logical formulae, ordinary sentences, and many inferences"[^1], but are also very narrow-minded and vulnerable when it comes to unexpected variations or oddities in the input given. The potemkin village that a GOFAI system may construct will hold up if only seen from the intended angles, but any slight deviation from an intended or expected input would shatter the illusion immediately.

NFAI systems, on the other hand, are "adept at finding various sort of similarities among patterns, at recognizing repeated (or almost repeated) patterns and filling in missing parts of incomplete patterns"[^1]. These also happen to be the exact things that GOFAI systems struggle with. The potemkin village that a NFAI system may construct will hold up much more robustly to unexpected patterns or noisy input, but will, at heart, still be a fake village.

## Rationality and explainability

In GOFAI systems, [intentionality](thoughts/intentionality.md) -- the meaning and semantics behind the tokens -- is injected through explicit programming by those who create it. These GOFAI systems are able to process these tokens and make conclusions based off of logic and reason rather than just trial-and-error. Case in point, expert systems. These if-then statements can easily explain decisions by showing which parts evaluated as true or false in its decision making process[^3].

[Connectionist networks](thoughts/connectionist%20networks.md), for the most part, are very hard to explain and are often dubbed black-box models due to the hidden nature of its internal workings. Unlike GOFAI systems, its internal representation model is defined by the state of the entire network rather than that of any single unit -- this is commonly referred to as a distributed model of connectionist representation[^8] and is often claimed to be one of the distinctive features of connectionism.

## Models of [representation](thoughts/representation.md)

To put it in sound terminology, note while in the GOFAI system, the _tokens_ are the objects of formal processing, so the system which manipulates the tokens is the actual vehicle of computation. The tokens themselves are also _representations_ of aspects of the world, so they are also vehicles of mental content. In GOFAI systems, tokens are both the vehicle of computation and the vehicle of mental content.

This is in contrast with connectionist systems, where computation is performed at the level of simple units (unit activations, backpropagation), meaning the units are the vehicles of computation. However, as these systems use a distributed model of representation, it is not a single unit that represents something, but rather the "network state as a whole thats interpreted as representing"[^8]. Thus, in connectionist systems, the vehicles of computation (units) need to be the vehicles of representation (network state).

## Integrating GOFAI and NFAI

Given that GOFAI and NFAI systems seem so vastly different in their approaches to AI, how might one go about reconciling them?

One approach is to combine both into one system. This is used when there’s a rational, known, and algorithmic way to process a subproblem. Systems like AlphaZero, a connectionist based Go playing system, use mixed systems to achieve the level of performance they report. Although at heart, AlphaZero uses a deep neural network to assess new positions, it also uses a Monte Carlo Tree Search (a GOFAI algorithm) to determine its next move based of the assessment of the neural net[^9].

Another, less researched method, are interpretable connectionist systems. As traditional connectionist networks rely on the network state being the vehicle of representation, the complexity, depth, and scale of modern connectionist models means that it is becoming increasingly difficult for humans to interpret the output. The field of [explainable](thoughts/explainability.md) AI (XAI) focuses on incentivizing connectionist networks to develop localist representations (i.e. moving away from having the vehicle of representation be at the network level, but at the unit level). Zhang, Wu, and Zhu of UCLA recently showed that it is possible to train a CNN to use 'interpretable filters', which encourage networks to group feature detectors into single filters, showing the possibility of moving from distributed representations to more local representations[^5].

### What is AGI?

While intelligence can be understood in many ways, this paper will focus on examining the prospects of emulating or achieving the capacity to understand or learn anything a human can -- the hallmark of an artificial general intelligence (AGI).

Most commentators would agree that current AI systems fall short of implementing general intelligence[^4]. These are narrow AI systems, which are used to accomplish or solve specific tasks like the game of Go or language translation, rather than to attempt to create a system capable of AGI. So, what's stopping us from making the transition from domain-specific algorithms to domain-general algorithms?

One problem that stumped earlier attempts at AGI was the _common-sense problem_: how do we represent common-sense information that is obvious to most humans in a way that is accessible to AI systems that use natural language? Unsurprisingly, the problem of storing all of this information was solved by the massive explosion in compute and data in the past few decades[^2]. However, the difficult part of this problem, choosing what subset of that huge information bank is relevant in any situation, remains a huge unsolved problem. How do we update our database of knowledge when relationships between symbols change? This is referred to as the [frame problem](thoughts/frame%20problem.md).

### Dissolving the frame problem

Dreyfus[^10] posits that any AI systems which attempt to tackle the frame problem through storing relevant frames are bound to failure. He argues that, "human beings do not simply store common-sense information," rather they "directly perceive and act upon significance in their environment". In his view, a more [[thoughts/Heidegger|Heideggerian]] approach to AI will dissolve this problem.

Heideggerian AI, in its most basic sense, is concerned with the Heideggerian concept of Dasein, which literally means 'Being-there'[^11]. Through the use of this expression, [[thoughts/Heidegger|Heidegger]] calls to attention the fact that a human cannot exist or be taken into account without existing in [context](thoughts/context.md) of a world with other things -- "to be human is to be fixed, embedded, and immersed in the physical, literal, tangible day to day world"[^12].

Dreyfus believed that, for any AI system to achieve any sort of general intelligence, it must also exhibit Dasein. Thus, "a successful Heideggerian AI would need a perfect model of the human body – and by implication, that Dasein must be expressed as a human being, organically as well as existentially"[^10].

### A non-humanistic approach

However, Steed refutes Dreyfus' overly humanistic interpretation of Heideggerian AI, believing that a AI model only needs to be "embedded and embodied such that what AI experiences is significant for AI in the particular way that AI is," and thus intelligence would be possible by Heideggerian standards[^13].

The refutation against a purely anthropocentric view of AI brings to light an important concept: the [multiple realization](thoughts/multiple%20realization.md) argument. Emulating or copying human intelligence isn't the only way to achieve intelligence that rivals that of humans.

Contemporary AI systems are almost always used as a problem solving tool, a means to tackle uniquely human problems and to convey results that are semantically useful to us. As a result, these approaches are doomed to be constrained by human problems. This is the essence of the [bitter lesson of AI](thoughts/multiple%20realization.md). However, if we look outside the anthropocentric view of intelligence, AI systems may not share these human problems with us and "perhaps an authentic, free AI system does not converge to a solution that is interpretable from a human standpoint at all"[^13].

AI is already capable of learning, adaptation, and basic Being-in-the-world. Thus, to achieve general intelligence, we should allow AI to contemplate its own problems and existence.

[^1]: Huageland, John. (1996). _What Is Mind Design?_ Mind Design II, doi:10.7551/mitpress/4626.003.0001.
[^2]: Hendler, J. (2008). _Avoiding another AI winter._ IEEE Intelligent Systems, (2), pp. 2-4.
[^3]: Jackson, Peter (1998). _Introduction To Expert Systems_ (3 ed.). Addison Wesley. p. 2. ISBN 978-0-201-87686-4.
[^4]: Buckner, C. (2019). _Deep learning: A philosophical introduction._ Philosophy Compass, 14(10), e12625.
[^5]: Zhang, Q., Nian Wu, Y., & Zhu, S. C. (2018). _Interpretable convolutional [[thoughts/neural networks|neural networks]]._ In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (pp. 8827-8836).
[^6]: Churchland, P. (1990). _Thinking: An invitation to cognitive science._ Vol. 3., pp. 199-228.
[^7]: Goodfellow, I., Shlens, J., & Szegedy, C. (2014) _Explaining and harnessing adversarial examples._ ArXiv Preprint ArXiv: 1412.6572.
[^8]: Crane, Tim. (2003). _The Mechanical Mind._ doi:10.4324/9780203426319.
[^9]: Silver, D., Hubert, T., Schrittwieser, J., Antonoglou, I., Lai, M., Guez, A., ... & Lillicrap, T. (2017). _Mastering chess and shogi by self-play with a general reinforcement learning algorithm._ arXiv preprint arXiv:1712.01815.
[^10]: Dreyfus, Hubert L. (2008) _Why Heideggerian AI Failed and How Fixing It Would Require Making It More Heideggerian._ The Mechanical Mind in History, pp. 331–362., doi:10.7551/mitpress/9780262083775.003.0014.
[^11]: Solomon, R. (1972), _From Rationalism to Existentialism: The Existentialists and Their Nineteenth Century Backgrounds_, Harper & Row, New York.
[^12]: Steiner, G. (1978), _Heidegger_, The Harvester Press Limited, Sussex
[^13]: Steed, R. (2019). _AI is Heideggerian Enough, But Can It Be Authentic?_ Unpublished manuscript, Carnegie Mellon.
