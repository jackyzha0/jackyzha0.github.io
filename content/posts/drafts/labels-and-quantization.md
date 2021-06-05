---
title: "Labels and Quantization"
date: 2021-05-04T22:22:23-04:00
draft: true
---

"Accuracy is more useful in entry-level jobs and for novices, because as skill increases, quantification of skill becomes harder."

"This is because feedback loops which are too short for the overall system makes people focus on inappropriate intermediate goals."
* dangers of intermediate proxies?
* what about in machine learning? using certain quantities for metrics which are just *proxies* for more difficult to measure qualitative end goals

"Focusing on tight feedback also leads to getting stuck in local maxima. The short turnaround time leads to the pursuit of incremental improvements. Accurate feedback reduces error, but this means reaching and staying at the local maximum. The more accurate and more rapid the loop, the more quickly you’ll arrive at the top of the hill – and the less chance you have of leaving it to climb the mountains of mastery."
* exploit explore algorithm

"When quantifying things, people naturally focus on things that can easily be measured. Measuring the final result doesn’t provide enough quantitative data, so it’s tempting to include the data from intermediate steps. This is an attempt to shorten the feedback loop, and trying to shorten feedback loops is very dangerous in complex systems."

https://brianlui.dog/2020/05/10/beware-of-tight-feedback-loops/

Are labels helpful in 

In a data-driven world, can we and should we try to quantize everything? What about inherently human qualities like emotions or personality?

some metrics that are inherently v difficult to quantize (e.g. quality of engagement) and others that are more easy to quantize and thus optimize for (like engagement)

https://outline.com/5H8EEy
No matter how much data we collect, two people who look the same to the algorithm can always end up making different choices.

We gave you two definitions of fairness: keep the error rates comparable between groups, and treat people with the same risk scores in the same way. Both of these definitions are totally defensible! But satisfying both at the same time is impossible.

https://www.youtube.com/watch?v=ClGIosevT0Y
https://ali-alkhatib.com/papers/chi/utopia/utopia.pdf
These systems become more actively dangerous when they go from "making sense of the world" to "making the world make sense"

The rules machine learning systems infer from the data have no underlying meaning or reason behind them.
They're just patterns, without any insight into *why* Black people are in prison at much higher rates than white people (for instance).

There's no dataset in the world that adequately conveys white supremacy, or slavery, or colonialism.
So at best these systems generate a facsimile of a world with the shadows of history cast on the ground
skewed, flattened, and always lacking depth that only living these experiences can bring.

Why monopolies (over data and power) are bad
Bureaucracies with no power self-correct (or be corrected) -> they have no place in a world where people can freely walk away or reject the bureaucracy's nonsense

But when the institution *does* wield power and people can't just leave anymore, these institutions can (and do) get more and more detached from the lives and needs of people
Those bureaucracies construct their own worlds where everything gets "rationalized" in simplified, reductive language.

For those of us who can just *not* deal with race, or gender, or sexuality, we get to pass through these systems relatively unscathed. But for those of us who can't ignore those dimensions of who we are, those aspects of ourselves make us stick out.

people talk about "debiasing" data and reviewing code before a model is trained and deployed.
What I'm saying is that even if you've done everything right, if you don't pay attention to the power dynamics as they unfold and play out, the system out in the world is going to drift further and further away from reality.
