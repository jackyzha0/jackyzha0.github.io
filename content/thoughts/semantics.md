---
title: "Semantics"
date: 2021-07-02T13:49:27-04:00
tags:
  - seed
---

> What do words or sentences mean

Meanings are public property: the same meaning be grasped by more than one person and by people at different times. Heavily related to [representation](thoughts/representation.md)

## Implications

If this argument is correct, then the content of our thoughts partly depends on what is in the world we live in: content determines object

Concept of meaning rests on two unchallenged assumptions

- Understanding a word (knowing its intension) was just a matter of being in a certain psychological state
- Meaning of a term determines its extension (actual physical manifestation / what it is)

The [Twin Earth Argument](thoughts/Twin%20Earth%20Argument.md) proves these two assumptions to be false: the extension of the term is not a function of the psychological state of the speaker by itself

## Sociolinguistic hypothesis

Division of linguistic labour

- Some people wear gold rings
- Some people tell the difference between gold and non-gold
- Not everyone needs to tell the difference between gold and non-gold, rely on the judgement of experts

Formally: "every linguistic community exemplifies the sort of division of linguistic labour just described; that is, it possesses at least some terms whose associated "criteria" a re known only to a subset of the speakers who acquire the terms, and whose use by the other speakers depends upon a structured cooperation between them and the speakers in the relevant subsets"

## Lexical Development

Mental lexicon: mental dictionary of word knowledge (how it sounds, grammar, definition, etc.)

- Word: symbol that refers to something
- Symbol: stands for something without being a part of that something
- Context-bound word: things tied to particular contexts (word use is more specific than actual meaning)
- Nominals: names for things

Natural partitions hypothesis: the physical world makes obvious the things that take nouns as labels, whereas the meanings that verbs encode have to be figured out from hearing the verb in use

Relational relativity hypothesis: possibility that verb meanings will vary from language to language (linguistic work showing that noun meanings are more similar across languages than are verb meanings)

Word extension: to what extent is a word valid?

- Underextensions: using words in a more restricted fashion
- Overextensions: using words in a more broad fashion (for related study, see Naigles & Gelman 1995 study, results showed that overextensions are mistakes, they don’t indicate incorrect understanding of the words)
- Protowords (also known as phonetically consistent forms -- PCFs)
  - Phonetically consistent: the child uses the same word every time.
- Things that help with accurate word extension:
  - Taxonomic extension: words to things are actually taxonomies (they are of the same category)
- Types of language use, two ends of a continuum
  - Referential language style: more object labels
  - Expressive language style: relatively fewer object object labels and more personal/social words
- Mapping problem: how do we know what the new word refers to?
  - Fast mapping: initial hypothesis about word meaning
  - Lexical principles/lexical constraints: guides that limit possible interpretations of new words
    - Whole-object assumption: words refer to whole objects
    - Assumption of mutual exclusivity: different words refer to different kinds of things. No category overlap
  - Lexical gaps: Sometimes things are not a one-to-one match – your language may not have a lexical item for something
- Word spurt: see Choi & Gopnik (1995)
  - Age at which children learn early words (first 50-100) can vary a lot due to
  - Environmental Factors
    - Language experience and input
    - Socioeconomic status (SES)
    - Birth order
  - Individual Factors
    - Processing speed
    - Phonological memory
    - Personality and temperament

## Deep Learning Semantics

### Images

Semantics in [[thoughts/convolutional neural networks]]

Hidden units often correlate semantically-meaningful concepts.

Inceptionism: what about, instead of weights, use backpropagation to take gradient with respect to $x_i$. i.e., show me what you think a banana looks like

Style Transfer: loss function matches deep latent representation of content image $C$:

- Difference between $z_i^{(m)}$ for deepest $m$ between $x_i$ and $C$
- Intuition, deep layers $z_i^{(m)}$ capture the semantics/concepts in an image, invariant to actual style

Adversarial Examples: imperceptible noise that changes label/prediction. This is dangerous! We could repaint a stop sign and fool self-driving cars

Using semantics means it can learn bad correlations (e.g. correlating grass with cows so when it sees a cow by a beach it has no idea what it is)

See also: [[thoughts/data distributions]]
