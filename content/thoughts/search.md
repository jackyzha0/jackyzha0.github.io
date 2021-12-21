---
title: "Search + Recommender Systems"
date: 2021-10-12
---

## Search

> Search has co-opted the citation, vis-à-vis the hyperlink

The post-WWII 'information explosion' meant that we have a lot of info and not great means of looking through it to find what we want. This is a form of [information retrieval](thoughts/information-retrieval.md).

More on boutique search engines: [search-or-be-found](thoughts/search-or-be-found.md)

Inefficient search leads to
1. knowledge gaps
2. errors
3. repeating research
4. times spent searching
5. knowledge silos

Finding stuff is hard because
1. theres a lot of things (large haystack, small needle)
2. semantic meaning and intention is hard to extract/understand
3. search systems are not complete
4. individuals have different requirements for what they are looking for (is it possible to create personalized search engines?)

Good way to prototype search system is to analyze the typical dimensions that users search for things along and build those in. There should be support the five interaction strategies
1. browsing
2. known item searching
3. analytical searching on one or more of the facets
4. empirical searching based on user profiles
5. similarity searching

## Recommender Systems
*Captivating algorithms: Recommender systems as traps*

Mason’s definition of a trap: ‘an invention for the purpose of
inducing animals to commit incarceration, self-arrest, or suicide’ (p. 657) -- this is exactly what recommender systems get users to do: trap themselves in a viscous cycle.

Traps operate through 'scripted roles' -- the ability of the hunter to construct a mental model of its prey. It is not taking its [free will](thoughts/freedom.md) to make decisions, but rather manipulating it to its own demise. Recommender systems, Seaver posits, are thought-traps.

Cold Start Problem: when one has no data yet. Without data, data driven recommendations do not work

Temporarily taking off the veil of abstraction and seeing them for what they really are - pieces of human engineering: "Placing algorithmic systems alongside tripwires and trapdoors not only takes the shine off, reminding us that they, too, are products of ordinary human engineering; it also helps us think about how they work, the ways of thinking they depend on, and how they might be critiqued."

"Successful companies like Facebook have become successful, Eyal writes, by becoming ‘first-to-mind’: their users ‘feel a pang of loneliness and before rational thought occurs, they are scrolling through their Facebook feeds’... We can use 'captology' to designate this understanding of people in behaviourism inflected terms, as habitual minds with tendencies and compulsions that make them susceptible to persuasion and targets for capture."

Optimization metrics
1. RMSE (root mean squared error) - how accurate the recommender systems were
	1. RMSE just doesn't work up to a point because user preferences are inherently unstable or 'noisy' signals. These vary significantly with time/setting and posed a serious challenge to predictive accuracy
2. Transitioned to 'captivation metrics' - ability of a system to capture user [attention](thoughts/attention-economy.md) or 'engagement'
	1. Moving towards interpreting behaviours (ex. skipping a video, clicking away, watch time, etc.) rather than explicit ratings (ex. asking users to give feedback on accuracy)
	2. 'Dwell time': length of individual user sessions

### [Infrastructure](thoughts/infrastructure.md) is a trap

> Algorithmic recommendation has settled deep into the infrastructure of online cultural life, where it has become practically unavoidable.

So used to digital extractivism and data mining that it has become hidden to us now.

"An infrastructure is a trap in slow motion. Slowed down and spread out, we can see how traps are not just devices of momentary violence, but agents of ‘environmentalization’"

The boiling frog problem -- we don't notice we're dying until it's too late.