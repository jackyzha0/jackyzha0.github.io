---
title: "Search"
date: 2021-10-12
tags:
- sapling
---

> Search has co-opted the citation, vis-à-vis the hyperlink

The post-WWII 'information explosion' meant that we have a lot of info and not great means of looking through it to find what we want. This is a form of [information retrieval](thoughts/information%20retrieval.md) and way of answering [questions](thoughts/questions.md).

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

Search is a form of [recommendation system](thoughts/recommendation%20system.md)

A diary of searches: [Search Diary](thoughts/Search%20Diary.md)

Essay on [Bias in Search](thoughts/Bias%20in%20Search.md)

### Queries on [information](thoughts/information.md)
How do we convert a query into subject words and then locate these words in the catalogue if people describe things differently? How do we resolve synonyms?

Increasing number of words that describe an item will increase recall at the cost of precision.

#### Precision/recall trade-off
The trade-off between recall and precision decides whether a search finds all relevant documents (high recall) or only relevant documents (high precision).

### [Infrastructure](thoughts/infrastructure.md) is a trap

> Algorithmic recommendation has settled deep into the infrastructure of online cultural life, where it has become practically unavoidable.

So used to digital extractivism and data mining that it has become hidden to us now.

"An infrastructure is a trap in slow motion. Slowed down and spread out, we can see how traps are not just devices of momentary violence, but agents of ‘environmentalization’"

The boiling frog problem -- we don't notice we're dying until it's too late.

## Boutique Search Engines
[Source: Re-Organizing the World’s Information: Why we need more Boutique Search Engines by *Sari Azout*](https://sariazout.mirror.xyz/7gSSTJ96SEyvXeljymglO3zN4H6DCgVnrNZq8_2NX1A)

We've returned to the *curated web* with Notion, Airtable, and Readwise collections, yet we haven't found good ways to make them multiplayer.

Still thinking about this in the context of collaborative digital gardens (e.g. [Quartz](http://quartz.jzhao.xyz/))

> What started as a well-intentioned way to organize the world’s information has turned into a business focusing most of its resources on monetizing clicks to support advertisers rather than focusing on the search experience for people.

The big thing here is that horizontal/'universal search' sites like Google use the same interface to search everything, relying on natural language to decipher user intentions. Vertical search players like Yelp/Zillow filled the functionality and relevancy gaps by using more structured search formats appropriate to the medium.

Curation, when thought of in the context of sharing bite-sized, isolated bits in feed-like architectures, is predominantly about entertainment, not utility. **How do we move beyond the search bar in an [attention economy](thoughts/attention%20economy.md)?**

But if we curate, who curates the currators? We then run into a meta-governance problem. Mirror's [Token Race](https://dev.mirror.xyz/dLLIq4Iebg5DLWJbOWa3sU6oQuwbogkmqPnz-ZbzPUg) appears to be a good start to answering this question.

### On Ads
When you monetize via ads, curation takes a backseat to featuring advertisers - there is just less digital real estate available to curate your own recommendations. This creates [trust](thoughts/trust.md) gaps between users and search engines.

The search box versus the feed
intentional browsing vs being served by an algorithm

Is it possible to move away from the ‘feed’-based model of browsing the social internet?

> The “feed”–an archaic form of content consumption that is effectively just a direct visual manifestation of the data structure that powers it – is a medium that is effectively designed to be consumed alone. –Humphrey Obuobi

"I realized that the experience of research is exactly opposite to the way I usually often encounter information online. When you research a subject, you make a series of important decisions, not least what it is you want to research, and you make a commitment to spend time finding information that doesn’t immediately present itself. You seek out different sources that you understand may be biased for various reasons. The very structure of the library… allows for browsing and close attention. Nothing could be more different from the news feed, where these aspects of information—provenance, trustworthiness, or what the hell it’s even about—are neither internally coherent nor subject to my judgment. Instead this information throws itself at me in no particular order, auto-playing videos and grabbing me with headlines. And behind the scenes, it’s me who’s being researched."

## Search Engine to Oracle
[Source: Language models like GPT-3 could herald a new type of search engine in *MIT Technology Review*](https://outline.com/ZhCArb)

transition from aggregator of information to oracle

pagerank -> rank literally whats relevant, asks the user to determine what info they wanna actually use

oracle -> tells you the 'right' answer

"The idea is that instead of searching for information in a vast list of web pages, users would ask questions and have a language model trained on those pages answer them directly. The approach could change not only how search engines work, but what they do—and how we interact with them"

[epistemological](thoughts/epistemology.md) question: Metzler and his colleagues are interested in a search engine that behaves like a human expert. It should produce answers in natural language, synthesized from more than one document, and back up its answers with references to supporting evidence, as Wikipedia articles aim to do.

## Search Engines as Faith
They freely provide, it seems, a sorting of the wheat from the chaff, and answer our most profound and most trivial questions. They have become an object of faith. Many view the results of search as objective.

"Like gods, these mathematical models were opaque, their workings invisible to all but the highest priests in their domain: mathematicians and computer scientists." (Cathy O'Neil)

They are the database of our intentions. We search for things we are hoping to know, hoping to do, and hoping to become

## Internet topology as shaped by search engines
[Source: Critical Atlas of the Internet](https://louisedrulhe.fr/internet-atlas/)

![](thoughts/images/internet-atlas.png)

![](/thoughts/images/search%20engine%20space.png)*The first cone represents the loss of distance. As shown in the picture previous hypothesis, terrestrial space converges at a specific point. On Internet, distance is not relevant. Everything is potentially one click away. The second cone reintroduces the notion of non-physical distances. On the Internet, distance has no relevance, but the notion of space nevertheless remains.*

See also: [internet computing](thoughts/internet%20computing.md), [Internet](thoughts/Internet.md)

Search engines create an embedding space for the world that maps from physical to digital. Page ranking is the function that maps and remaps the 'location' and relatedness of real concepts.

## The Vocabulary Problem
Is this a form of [hermeneutical injustice](thoughts/hermeneutical%20injustice.md)?

1. Lexical Ambiguity: the [meaning](thoughts/meaning.md) of human language is not specific
2. Polysemy: one word has many meanings
3. Synonymy: many words mean approximately the same thing

### Text Processing
Similar to practices in [reflect](posts/reflect.md) NLP processing actually!

- Lexical Analysis: break text into tokens
	- Bag of Words
- Transformations
	- Case folding: convert all to lower case
	- Stopwords: remove words that contribute semantic meaning/indexing value
		- e.g. words that don't reduce information entropy
		- for example, words that appear in *all* documents are not very helpful
		- zipf's law, first ~5% are stop words, next ~45% are meaning content words and the last ~50% are long tail rare words
	- Stemming: grouping of related words (e.g. cats/cattiness -> cat)
	- Term Weighting: assigns weights on basis of importance to document
		- term frequency (TF): occurrences in a
		- document frequenc (DF): # of docs containing the term
		- term weight is usually $\frac{TF}{n}\frac{1}{DF}$ where $n$ is the total word count
- Index: unique id to a single document
- Inverted Index: index which each entry holds list of pointers to all items with a certain property (e.g. title)

## Internet Content
1. Surface Web: 1-5%
2. Deep Web: 95%
3. Dark Web: 1-5%

## Generations
1. Pre-1998: keyword frequency and boolean operators
2. 1998-2010: link structure (page rank), keywords
3. 2010-2015: user data, personalization, NLP
4. 2015-now: AI, deep learning

## Ethics
Major issues:
1. Access to information: value of information and knowledge, democracy, gatekeeping, [censorship](thoughts/censorship.md)
2. Equity, accuracy (truth) and transparency: search-engine bias and the problem of opacity/non-[transparency](thoughts/transparency.md)
3. Privacy and freedom: personal privacy and informed consent; monitoring and surveillance
4. Property rights: how do crawlers/search engines respect property, ownership, free market competition

Search is a form of [data capitalism](thoughts/Data%20Capitalism.md)