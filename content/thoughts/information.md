---
title: "Information"
date: 2021-09-21T09:30:22-07:00
tags:
  - seed
---

> Information is a thing that conveys meaning about stuff, transmitted from one place to another.

[Source: What is Library & Information Science? by _Stacks & Facts on YouTube_](https://www.youtube.com/watch?v=pfP7AjwIZI8)

We store, access, and organize information through [information systems](thoughts/information%20system.md).

Characteristics

- Truthfulness: information is correct
- Aboutness: tells us about something else
- Thingness: information is a thing, although perhaps intangible

The study of information in and of itself is a research area too, through and the [Information Professions](thoughts/information%20professions.md)

## Hierarchy

In informatics, there exists the concept of an Information Hierarchy, Knowledge Pyramid, or DIKW Hierarchy.

Data is transformed into Information, which is transformed into Knowledge, which is then transformed into Wisdom.

> Data is not god-like; it is not absolute truth. It is empathetic. It is imperfect. It is human.

1. Data: raw or elementary observations about properties of objects, events, and their environment
2. Information: data after aggregation, processing, analyzing, formatting, and organization to add meaning and context

## Information is political

[Source: Foundations of Information by _Amy J. Ko_](https://faculty.washington.edu/ajko/books/foundations-of-information/#/power)

As information becomes more abundant and saturated in our world, has information been any more of less important/necessary? We may have access to more of it, but it’s not obvious that this is better—just different.

> While technology has changed the volume, pace, and sources of information in our daily lives, it has not changed its essential power to shape our knowledge and our behavior in the world.

Information fuels discovery. It enables us to build off of each others work, and accomplish more than what a [single person could](posts/collaborative-thinking.md).

Information organizes us. The models of thinking and computation (e.g. numbering system) affect how we think about the world writ large and forms the basis for the computational systems which we interact with daily.

Information regulates us. The law, in its codified and written forms, encodes great injustices and inequities through dictating what rights are and who gets them.

Information identifies us. Each of us leave informational foot prints as we live our lives through documents, interactions, and conversations.

Contrary to Marshall McLuhan’s famous phrase, "the medium is the message", it seems as if the vast majority of the power from information is derived from its meaning and [context](thoughts/context.md) rather than its medium or method of transmission.

> Of what value is its microprocessor, its memory, and its applications if there is no content to consume and no people to connect with?

Aaron Swartz in the _“Guerrilla Open Access Manifesto”_

> Information is power. But like all power, there are those who want to keep it for themselves. The world’s entire scientific and cultural heritage, published over centuries in books and journals, is increasingly being digitized and locked up by a handful of private corporations. . . . Providing scientific articles to those at elite universities in the First World, but not to children in the Global South? It’s outrageous and unacceptable. . . . We can fight back. Those with access to these resources—students, librarians, scientists—you have been given a privilege. You get to feed at this banquet of knowledge while the rest of the world is locked out. But you need not—indeed, morally, you cannot—keep this privilege for yourselves. You have a duty to share it with the world.

## Information [Representation](thoughts/representation.md)

How do we represent documents and information in our databases and [[thoughts/collections|collections]]?

See also: [[thoughts/visualization|visualization]]

### Indexing

Index features

- index term (textual description)
- number of words (numerical, length description)
- etc

When indexing, we want

1. features that make a document easy to find given some similarity measure between query and document (if a term is too broad, it would apply to too many documents)
2. high discriminatory power so different documents are sufficiently distinct

Specificity: degree to which a term is broad or narrow

#### Automatic Indexing

Automatic indexing uses a set of algorithms to convert a document into a set of index terms.

1. Tokenization (how do we turn text into tokens?). However, we need to be wary of edge cases like hyphenation, punctutation, abbreviations, numbers, etc.
2. Stopword removal (removing words that occur very frequently but don't contribute very much to overall meaning of sentence). However, we need to be wary of creating new phrases that never existed and removal of entire phrases (e.g. 'to be or not to be')
3. Conflation and stemming (recall enhancing technique that takes different forms of words and replaces them by a single form). Example stemmers include Porter and Krovetz stemmers (difference is that Krovetz is more conservative, only stems to words in a dictionary). However, this can reduce precision when stemming results in incorrect words.
4. Term weights (which terms are the most important? One common approach is to use term frequency between documents -- sometimes called Document Frequency or DF. The larger the DF, the less useful it is to discriminate between two documents. Measure of importance then is the inverse document frequency. The most common measure is term frequency multiplied by inverse document frequency $TF \times IDF$)

### Catalog

Catalogs allow for retrieval by simple matching whereby the user has an index term in mind and can then find all items that are indexed by that term.

By its nature, the catalog is divided, and the subject catalog is on its own. The classification scheme typically mirrors the scheme used to organize the physical items in the library.
