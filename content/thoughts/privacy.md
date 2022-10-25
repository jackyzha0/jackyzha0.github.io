---
title: "Privacy"
date: 2022-07-10
tags:
- seed
aliases:
- data privacy
---

## Definitions
- Restricting access to information or property to what you wouldn't willingly give away in a particular context
	- Specifically, recognizing that privacy is contextual (Nissembaum)
	- The context of your privacy—what’s being revealed to whom and for what reason—utterly changed and you had no say in it.
- From the point of view of an individual restricting access: privacy is a “zone of inaccessibility” that surrounds a person
- From the perspective of outsiders seeking access: violating someone’s privacy is an affront to that person’s dignity

However, some people take advantage of privacy to plan and carry out illegal or immoral activities

There is also conflicting needs between companies and users
- Companies want to use data to improve their products
- Users want to protect their privacy

Data anonymization isn't enough. Even if some of the data is scrambled and personally identifiable information is stripped, it is susceptable to linkage attacks (correlating rows of the anonymized dataset to other known datasets)

~87% of all Americans can be identified using only 3 pieces of information:
1. zip code
2. birthday
3. gender

## Privacy for independent development
Privacy is the way in which a social group recognizes and communicates to the individual that he is responsible for his development as a unique person, a separate moral agent

It's valuable because it lets us be ourselves. In order to have different kinds of social relationships with different people, we need to have some kind of control over who knows what about us (see: [[posts/context-collapse|context collapse]])

## Differential Privacy
tldr; add randomized noise that maintains distribution of data

When submitting a piece of data:
1. A fair coin is flipped.
2. If heads: the real data is sent
3. If tails: we generate a random number to encode the result as random noise (e.g. true for heads, false for tails)

This way, we can't trust any single record to be accurate (plausible deniability), but the aggregate still remains useful.

As we know noise distribution, this can be accounted for the in final calculation.

Note that this will only work for larger datasets as injecting noise into a small dataset will likely result in inaccurate data

### Usage
- Apple for error reporting
- Google for malware reports and traffic reports in Maps

## Contextual Privacy
From Antonio García Martínez in [*The right to never be forgotten*](https://www.thepullrequest.com/p/the-right-to-never-be-forgotten)

Helene Nissenbaum’s ‘contextual privacy’

An example she draws in her work is imagining your interactions with your physician when dealing with a medical issue. Even in a world where the right to live as a stranger among strangers reigns supreme, we unquestioningly turn over the most intimate medical details to people we barely know. 

Now, let’s imagine you leave your doctor’s office and fire up Instagram to take your mind off the diagnosis he just gave you, which is that you don’t have brain cancer but you simply suffer from chronic migraines and will just have to deal. Scrolling past pictures of friends and celebrities, you see an advertisement for a migraine medication, specifically for the vestibular migraines you suffer from. While two seconds ago you were willing to send images of your brain across the world for medical advice, you now feel horribly violated knowing that everyone from Facebook to a pharma marketing team know about your condition.

**The context of your privacy—what’s being revealed to whom and for what reason—utterly changed and you had no say in it.**

See also: [[thoughts/GDPR|GDPR]]

### Web3
- Web2: considers identity public but data private
- Web3: identity is private, but data public

## Rights to privacy
Differing opinions on the status of privacy as a right. General consensus is that privacy is a prudential right. That is, rational agents would agree to recognize some privacy rights because granting these rights is to the benefit of society

- Warren and Brandeis
	- People in modern society have a right to privacy and that this right ought to be respected
	- "The intensity and complexity of life, attendant upon advancing civilization, have rendered necessary some retreat from the world, and man, under the refining influence of culture, has become more sensitive to publicity, so that solitude and privacy have become more essential to the individual"
	- Warren and Brandeis argue, there are no adequate legal remedies available to the victims. Laws against libel and slander are not sufficient because they do not address the situation where malicious but true stories about someone are circulated (especially in cases where consent was not attained ahead of time, like through cameras)
- Thomson
	- Every “privacy right” violation is a violation of another right
- Reiman
	- Privacy is needed if people are to be autonomous moral agents able to develop healthy personal relationships and act as free citizens in a democratic society
	- Our personal information is private to the extent that we can control who has access to it
	- He does not argue that privacy is a natural right, nor does he suggest that a person has complete control over what is held private.
