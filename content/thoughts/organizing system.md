---
title: "Organizing Systems"
date: 2021-09-21T09:28:57-07:00
tags:
  - sapling
---

_Organizing System_: an [intentionally](thoughts/intentional%20arrangement.md) arranged collection of resources and the interactions they support. It has authoritative description and standard classification.

We organize

- physical things (objects/artefacts)
- information about physical things
- digital things
- information about digital things (metadata)

Good organizing systems are

1. Skimmable at different levels. Is there a 5s version? A 60s version? (see: [[thoughts/information scales]])
2. Transformable. Can the user transform the data into different representations without having to explicitly define these ahead of time?
3. [[thoughts/context|Context]]-sensitive. Not one size fits all, can we create unique content for every reader/reading depending on their prior understanding and current needs? (see: [[thoughts/cozy software|personal software]])
4. Interrogable. Can we get clarifications and answers from the text without having the author having to anticipate those questions?

The document as an 'information container', but also a 'thing' which documents a thing. Data can be seen as 'elementary observations about properties of objects, events, and their environments'

A set of resources is then transformed by an organizing system when the resources are described or arranged to enable interactions with them.

### Tradeoffs

> The effectiveness of a system for accessing information is a direct function of the intelligence put into organizing it (Svenonius, 2000)

There are inherent tradeoffs in an organizing system, what is the goal? What are we optimizing for?

Similar to [research debt](thoughts/research%20debt.md) where there is no effort put into the initial organizational process so the mental burden of retrieving information is much higher.

### Goals

1. Storing
2. Retrieving
3. Minimizing effort to find (increased scale means increased difficulty of finding things)

Not all users have the same goals! How do we address this?

### Three Tiers of Organizing Systems

1. User interface or presentation components where users or other applications interact with the data
2. Business logic or functions that use the data
3. Storage of data itself

![Presentation, Logic, and Storage Tiers](https://berkeley.pressbooks.pub/app/uploads/sites/121/2020/04/Figure-1.2.jpg)

### Design Heuristics

Sensemaking: organizing to derive meaning from experience by fitting new events of observations into what they already know

Questions to ask

1. What? What is organized, what type of resource or information object?
2. Why? What are the goals of the system?
3. How Much? How many different organization schemes are used?
4. When? When is the organization of the resource imposed? At the creation of the resource?
5. How, and by whom? Who is doing the organization? Professional indexers? Algorithms?
6. Where? Can be abstract ideas like the cloud or physical like infrastructures and build environments.

Similar to the questions in the HCI [design requirements](thoughts/design%20requirements.md). When designing an organizing system, it is important to consider domain, scope, and scale.

#### What

1.  the scope and scale of the collection
2.  the number and nature of users
3.  the time span or lifetime over which the organizing system will operate
4.  the physical or technological environment in which the organizing system is situated
5.  the relationship of the organizing system to other ones that overlap with it in domain or scope

### General organizing principles

1. We organize [[thoughts/collections|collections]] of resources using the properties that are easiest to perceive, or whose values vary the most among the items in the collection
2. We group together resources that we often use together
3. We put rare or unique resources where we can protect them

Examples of these are 1. alphabetical ordering or 2. chronological ordering

This scoping process is similar to the [double-diamond design](thoughts/design%20requirements.md) in [HCI](thoughts/human%20computer%20interaction.md).

## The Filing Cabinet

[Source](https://placesjournal.org/article/the-filing-cabinet-and-20th-century-information-infrastructure)

The shift from bound volumes (sets of books) to filing systems was extremely significant in the history of classification.

The currently accepted version of the filing cabinet is attributed to the Library Bureau, the Boston-based company founded in 1876 by Melvil Dewey (the guy who invented the Dewey decimal system)

Still reinforced gendered division of labour though -- "female file clerks were expected to handle papers, but not to understand their contents; in contrast, it was male managers and executives who read the files, performing jobs that purportedly required thought"

Mostly made popular by efficiency, exploitation of gendered labour, anxiety over information loss, and granular certainty (wanting to break more and more of life into discrete, [quantized, and labelled](thoughts/quantization.md) parts)

[Information](thoughts/information.md) then, was seen as something that could be standardized atomized, and stripped of context.

Now though, the filing cabinet is "no longer an exemplar of productivity and speed, the file cabinet now embodies the facility of bureaucracies to produce paper, to delay, to leave us waiting" -- it can create an alternative paper-based reality to which officials reflexively defer.

Curiously enough, piles of paper on a desktop can be both symbols of "overwhelmed white collar worker confronted with information processing long coded as clerical" but also "exemplary information management practice". In fact, a well-kept pile of papers can be more efficient than a linear index (very similar to the ethic of grab what you need and rely on internal organization than some explicit organizational system). Does this apply to the [Desktop Metaphor](thoughts/interaction%20design.md)?

Is Google [[thoughts/search]] the 21st century filing cabinet?
