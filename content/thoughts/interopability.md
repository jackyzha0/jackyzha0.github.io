---
title: "Interopability"
date: 2021-12-01
---

> Portability implies switching platforms, but true interoperability is platform-agnostic.

I think interopability in the context of the web means being able to transparently understand and share data, agnostic of platform. Closed platforms disallow this as they curate the information they present to end-users/devs rather than letting users control their own data.

A good standard is if I can hit 'export all data' on a platform and I can completely and freely use that elsewhere -- no vendor lock-in. I think this is esp hard for [social graphs](thoughts/social-graphs.md), there is no common/accepted standard for identity let alone connectedness between individuals

Related: [tools-for-thought](thoughts/tools-for-thought.md) and [tools-for-discourse](thoughts/tools-for-discourse.md)

## Beyond Windows
[Source](https://alexanderobenauer.com/labnotes/002/)

A modern day [HyperCard](https://en.wikipedia.org/wiki/HyperCard)

> A window runs a self-contained program, isolated from other programs that […] run at the same time in other windows. (Wikipedia)

Windows and applications silo data. The only way to 'share' data between them is through the file system. What if applications exposed data by default?

An application then is a specific *view* on types of data rather than a standalone thing. Data can be dragged through different applications. Each data is annotated with a type. There is also a most common interface for data that allows basic-level interop with any application. We can then create an open marketplace for views on data.

Apps in this operating system then declare 'default' apps for certain data types.

Ability to not only source local data but remote data too -> fetching from URLs, feeds, etc. 

UNIX-level composability -- apps should be atomic building blocks. Creating pipeline apps to transform and massage data (possibly using Clay??). 

Auto-grouping of similar data? Set-theory for data?

"[Engelbart-inspired bootstrapping](https://www.dougengelbart.org/content/view/226/269/). A system with which you can, as a user, co-evolve both the tool and your methodologies simultaneously to build up better whole systems (those systems which include the human and the tool)."

### Semantic Data/Markers
Auto-run scripts/data transformations to data.

Markers like 'today' that point to a new date every day. Auto generate a day-summary for the next day. etc.

### Chronological Data Querying
What data was created a few days ago? etc.