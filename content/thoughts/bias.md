---
title: "Bias"
date: 2021-10-30
tags:
  - sapling
---

Bias: a slant or preference

> "We use the term bias to refer to computer systems that systematically and unfairly discriminate against certain individuals or groups of individuals in favour of others... A system discriminates unfairly if it denies an opportunity or a good or if it assigns an undesirable outcome to an individual or group of individuals on grounds that are unreasonable or inappropriate" (Friedman and Nissenbaum, 1996)

More detailed post on [Bias in AI](posts/bias-bug.md). Related readings: [Design Justice](thoughts/Design%20Justice.md), [To Live in their Utopia](thoughts/To%20Live%20in%20their%20Utopia.md), [Social Bias in Information Retrieval](thoughts/Social%20Bias%20in%20Information%20Retrieval.md), [Algorithms of Oppression](thoughts/Algorithms%20of%20Oppression.md), [[thoughts/data distributions]]

## Captchas

How do you distinguish between human and non-human without discriminating against certain types of people (e.g. ethnicity, cultural background)? How does one prove their humanity without betraying anything else about them?

> "What is the universal human quality that can be demonstrated to a machine, but that no machine can mimic? What is it to be human?"
>
> "You need something that’s easy for an average human, it shouldn’t be bound to a specific subgroup of people, and it should be hard for computers at the same time. That’s very limiting in what you can actually do. And it has to be something that a human can do fast, and isn’t too annoying."

Possibility of reverse CAPTCHAs where you can only pass if you get it wrong in the 'right' way? (e.g. optical illusions)

## 3 groups of study

from [Design Justice](thoughts/Design%20Justice.md) and Friedman

1. Preexisting Bias: bias that exists in broader society, culture, and/or institutions is reproduced in the computer system, either intentionally or unintentionally, by systems developers. (e.g. notions of quality and authority bias embedded in the web content itself)
2. Technical Bias: some underlying aspect of the technology reproduces bias (e.g. design of crawlers/aggregate/surfacing algorithms for content, ranking features)
3. Emergent Bias: may not have been biased given its original [context](thoughts/context.md) of use or original user base but comes to exhibit bias when the context shifts or when new users arrive (e.g. responses to spam, content moderation, search suggestions)

Cathy O’Neil: algorithms are “opinions embedded in code” -- [artifacts do indeed have politics](thoughts/Do%20Artifacts%20Have%20Politics.md)

Baeza-Yates

1. Activity Bias: who contributes to the data? who is seen by these algorithms?
2. Data Bias: is the underlying data biased/non-representative?
3. Sampling Bias: what data is used by algorithms?
4. Algorithmic Bias: what gets shown to users?
5. Interaction Bias: how do people use the algorithms?
6. Self-selection Bias: who uses these algorithms?
7. Second-order Bias: digital trace data, how do our data-residues

## Forbidden Rates

Coined by Tamar Gendler

We do not live in perfectly egalitarian societies, and race, gender, class and other identities can significantly affect how our lives work out.

> Now suppose you’re at a reception for engineers and their spouses, and you’re introduced to a male–female couple about whom you know next to nothing. Odds are, he’s the engineer. But if you have anti-sexist instincts, you may feel pulled towards keeping an entirely open mind about which of these two strangers is the engineer, rather than allowing your statistical knowledge to incline you towards the man. If you do ‘slip’ into assuming the man to be the engineer, and this turns out to be a mistake, you’re likely to be more embarrassed than you would be had you wrongly assumed the couple to live in the local area, on the grounds that most guests at the reception live locally.
