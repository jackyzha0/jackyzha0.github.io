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