---
title: "Recommendation System"
date: 2021-12-24
tags:
  - seed
---

## _Captivating algorithms: Recommender systems as traps_

Mason’s definition of a trap: ‘an invention for the purpose of
inducing animals to commit incarceration, self-arrest, or suicide’ (p. 657) -- this is exactly what recommender systems get users to do: trap themselves in a viscous cycle.

Traps operate through 'scripted roles' -- the ability of the hunter to construct a mental model of its prey. It is not taking its [free will](thoughts/freedom.md) to make decisions, but rather manipulating it to its own demise. Recommender systems, Seaver posits, are thought-traps.

Cold Start Problem: when one has no data yet. Without data, data driven recommendations do not work (see: [stone soup metaphor](thoughts/stone%20soup%20metaphor.md))

Temporarily taking off the veil of abstraction and seeing them for what they really are - pieces of human engineering: "Placing algorithmic systems alongside tripwires and trapdoors not only takes the shine off, reminding us that they, too, are products of ordinary human engineering; it also helps us think about how they work, the ways of thinking they depend on, and how they might be critiqued."

"Successful companies like Facebook have become successful, Eyal writes, by becoming ‘first-to-mind’: their users ‘feel a pang of loneliness and before rational thought occurs, they are scrolling through their Facebook feeds’... We can use 'captology' to designate this understanding of people in behaviourism inflected terms, as habitual minds with tendencies and compulsions that make them susceptible to persuasion and targets for capture."

Optimization metrics (see [quantization](thoughts/quantization.md))

1. RMSE (root mean squared error) - how accurate the recommender systems were
   1. RMSE just doesn't work up to a point because user preferences are inherently unstable or 'noisy' signals. These vary significantly with time/setting and posed a serious challenge to predictive accuracy
2. Transitioned to 'captivation metrics' - ability of a system to capture user [attention](thoughts/attention%20economy.md) or 'engagement'
   1. Moving towards interpreting behaviours (ex. skipping a video, clicking away, watch time, etc.) rather than explicit ratings (ex. asking users to give feedback on accuracy)
   2. 'Dwell time': length of individual user sessions

## Approaches

### Content-based Recommendation

1. "more things like this..."
2. Compare the content of an item to user's preferred items
3. A form of [[thoughts/supervised learning]]

### Collaborative filtering

1. "users like you looked for..."
2. Based on identification of similar users and their patterns of activity
3. A form of [[thoughts/unsupervised learning]]

One way of doing this is using a technique called matrix factorization, which is a [[thoughts/latent-factor model]] for entries in matrix $Y$.

Loss function:
$$f(Z,W) = \lVert ZW - Y \rVert_F^2 + \frac{\lambda_1}{2}\lVert Z \rVert_F^2 + \frac{\lambda_2}{2}\lVert W \rVert_F^2$$
