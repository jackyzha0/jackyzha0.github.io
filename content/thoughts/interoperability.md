---
title: "Interoperability"
date: 2021-12-01
tags:
  - sapling
  - pattern
---

> Portability implies switching platforms, but true interoperability is platform-agnostic.

I think interoperability in the context of the web means being able to transparently understand and share data, agnostic of platform. Closed platforms disallow this as they curate the information they present to end-users/devs rather than letting users control their own data.

A good standard is if I can hit 'export all data' on a platform and I can completely and freely use that elsewhere -- no vendor lock-in. I think this is esp hard for [social graphs](thoughts/social%20graphs.md), there is no common/accepted standard for identity let alone connectedness between individuals

Related: [tools for thought](thoughts/tools%20for%20thought.md), [[thoughts/credible exit|credible exit]]

## Noun-based Interoperability

Source: [Riffle: Building data-centric apps with a reactive relational database](https://riffle.systems/essays/prelude/)

> Since the introduction of object-oriented programming, most interoperability has been “verb-based”: that is, based on having programs call into each other using APIs. Indeed, new programmers are often taught to hide data behind APIs as much as possible in order to encapsulate state. Unfortunately, [verb-based APIs create an unfortunate n-to-n problem](https://twitter.com/andy_matuschak/status/1452438198668328960): every app needs to know how to call the APIs of every other app. In contrast, data-based interoperability can use the shared data directly: once an app knows how to read a data format, it can read that data regardless of which app produced it.

How do we create sources of truth that are _legible outside of the application_, possibly in ways that the application developer never anticipated?

(see: data lensing in [idea list](thoughts/idea%20list.md))

## Beyond Windows

[Source: Universal data portability by _Alexander Obenauer_](https://alexanderobenauer.com/labnotes/002/)

A modern day [HyperCard](https://en.wikipedia.org/wiki/HyperCard). What other types of [interaction design](thoughts/interaction%20design.md) can we facilitate?

> A window runs a self-contained program, isolated from other programs that […] run at the same time in other windows. (Wikipedia)

Windows and applications silo data. The only way to 'share' data between them is through the file system. What if applications exposed data by default?

An application then is a specific _view_ on types of data rather than a standalone thing. Data can be dragged through different applications. Each data is annotated with a type. There is also a most common interface for data that allows basic-level interop with any application. We can then create an open marketplace for views on data.

Apps in this operating system then declare 'default' apps for certain data types.

Ability to not only source local data but remote data too -> fetching from URLs, feeds, etc.

[[thoughts/Unix|UNIX]]-level [[thoughts/composable|composability]] -- apps should be atomic building blocks. Creating pipeline apps to transform and massage data (possibly using Clay??).

Auto-grouping of similar data? Set-theory for data?

"[Engelbart-inspired bootstrapping](https://www.dougengelbart.org/content/view/226/269/). A system with which you can, as a user, co-evolve both the tool and your methodologies simultaneously to build up better whole systems (those systems which include the human and the tool)."

### Semantic Data/Markers

Auto-run scripts/data transformations to data.

Markers like 'today' that point to a new date every day. Auto generate a day-summary for the next day. etc.

### Chronological Data Querying

What data was created a few days ago? etc.

## Adverserial Interoperability

[Source: Adversarial Interoperability by _Cory Doctorow_](https://www.eff.org/deeplinks/2019/10/adversarial-interoperability)

> When you create a new product or service that plugs into the existing ones _without the permission_ of the companies that make them. Think of third-party printer ink, alternative app stores, or independent repair shops that use compatible parts from rival manufacturers to fix your car or your phone or your tractor.

If a platform chooses to not make a well documented API available, for example, a loyal client could still interoperate with them, taking more adversarial approaches such as reverse engineering their API or downloading content and storing it locally.

## Data Lenses

Source: [Ink and Switch on Cambria](https://www.inkandswitch.com/cambria/)

An organization must balance their desire to change their API against their customers' reluctance to change something that works for them. The result is strong pressure to preserve backward compatibility over time, often across many versions.

Developers rely on tribal knowledge to inform them which operations are safe—for example, they intuit that they can respond with additional data, trusting existing clients to ignore it, but not require additional data in requests, because existing clients won’t know to send it. Developers also often resort to shotgun parsing: scattering data checks and fallback values in various places throughout the system’s main logic. This can often lead not just to bugs, but also security vulnerabilities.

However, in practice, most interoperability requires a tradeoff between

- Consistency: both sides see a meaningfully equivalent view of the world
- Conservation: neither side operates on data they can’t observe
- Predictability: the local intent of every operation is preserved

### Cambria

Over time, a project using Cambria will accumulate many lenses, each describing the relationship between two versions. Migrations between distant versions are created by [[thoughts/composable|composing]] lenses into a graph where each node is a schema, and each edge is a lens. To translate data between two schemas, Cambria sends it through the shortest available path in the lens graph. These lenses must be kept in a place where even old versions of the program can retrieve them, such as in a database, at a well-known URL, or else as part of the document itself.

![](https://www.inkandswitch.com/cambria/static/lens-graph.svg)
Caveats:

- Imagine a lens that combines a firstName and lastName fields into a single fullName. This lens works reliably in one direction. All names already stored in the system could be combined into a single field, but there are many names which could not be reliably converted back to “first” and “last” names. The result is a so-called lens that can only run reliably in one direction.
