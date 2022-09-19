---
title: "Privacy"
date: 2022-07-10
tags:
- seed
aliases:
- data privacy
---

Conflicting need between companies and users
- Companies want to use data to improve their products
- Users want to protect their privacy

Data anonymization isn't enough. Even if some of the data is scrambled and personally identifiable information is stripped, it is susceptable to linkage attacks (correlating rows of the anonymized dataset to other known datasets)

~87% of all Americans can be identified using only 3 pieces of information:
1. zip code
2. birthday
3. gender

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
- Web2**: considers identity public but data private
- Web3: identity is private, but data public