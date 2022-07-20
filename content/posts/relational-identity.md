---
title: "From legibility to identity"
date: 2022-07-16
tags:
- fruit
---

*What is identity? Who defines it? Who controls it? What is its relationship to software?*

Defined roughly, identity is something that is contextual, situationally adaptive, subjective, and constantly changing.

It is made up of qualities, beliefs, personality quirks, traits, and relationships that make you *you*. Yet when we gesture towards digital identity, it seems to point towards not this subjective and contextual set of relationships, but something else entirely.

## Identity as Object
Software developers and computer scientists have been tackling this for almost half a century now, trying to model identity in ways that are understandable to machines, but in doing so, forget the very nature of identity we live out in the real world.

Our digital representations consist of
- What we bought last time we visited Amazon.
- All of our Facebook, Instagram, and Twitter posts.
- Google Analytic's data points about what pages we visited and when.
- The hundreds, maybe thousands, of online accounts you have scattered around the internet, made hastily so you can access an article, use a service, or leave a review.

Notice that in this form, all aspects of identity are quantifiable. Identity, in this model, is a thing to be managed, sold, or searched for. Links and relations in this model are secondary, expressed as joins between tables in databases or identifying users through 'unique' identifiers like email addresses, cookies, IP addresses and advertising identifiers: all things that are machine legible but unusable for anyone 

Big companies make identities legible so that they may measure, manage, and control our attention to optimize their ad revenue and sell our data.

**What’s measured gets managed. What’s legible gets controlled.**

Legibility on its own is not a bad thing. Many aspects of our lives benefit from legibility. It the complex systems of weather understandable to the average layperson, allows us to have transparency into the progress of public projects and initiatives by our governments, and enables people to easily find information they are looking for.

But this process of legibility becomes dangerous when the simplifications are taken to be the real thing and the map is mistaken for the territory.

### Maps and Territories
Through this process of legibility, what James C. Scott calls a process of simplifying, restructuring, and labeling, nuance is excluded. Legibility means that 'only what matters' and can be quantified is kept; all else is discarded.

![[thoughts/images/forest death.png]]*Illegible natural forest vs legible "scientific" forest (James C. Scott in Gordon Brander)[^6]*

[^6]: "Scott details a pattern of disaster that repeatedly manifests around legibility. His opening example is from the late-18th century discipline of “scientific forestry”. A natural forest is illegible. A tangle of plants. This is inconvenient from the standpoint of harvesting lumber. How do you quantify yield? Can you even make a meaningful map of this mess? Much easier to clear the forest and plant a legible “scientific” forest. Uniform rows of trees that produce good lumber. Now we can count the trees, make a map, track sustainable yield. What’s missing from our map? Everything else. The forest has been _made legible_ to lumber production. In the process, the entire ecological web of trees, shrubs, birds, bugs, moss, soil microbiota are stripped away. They didn’t fit into our map. By the second generation of planting, there is a noticeable decline in forest health. Within one century: _Waldsterben_, forest death, ecological collapse." Quote from [Soulbinding Like a State](https://subconscious.substack.com/p/soulbinding-like-a-state), Gordon Brander

But who are these god-like entities to tell us what is important and what isn't? Legibility doesn't capture the context behind how you failed out of your diploma because you needed to grieve for the death of a loved one. Legibility doesn't capture the context behind the conviction for a felony that was given because the officer was racially motivated. This simplification will only serve to widen the gulf that already exists in society and disproportionately impacts marginalized groups[^1].

Processes of legibility become more actively dangerous when they go from "making sense of the world" to "making the world make sense".

When this is the *only* lens you view the world through, relationships are front-run by a deluge of data rather than formed more organically between individuals[^1]. We emerge in a world that comes straight from Black Mirror's Nosedive episode where everyone's status is determined by a 'social media score'. This systemized legibility of the world is an interpretive and transformational force. In other words, **legibility changes the world we live in**[^2].

[^1]: Source: [Is "acceptably non-dystopian" self-sovereign identity even possible?](https://blog.mollywhite.net/is-acceptably-non-dystopian-self-sovereign-identity-even-possible/), Molly White
[^2]: Source: [To Live in Their Utopia](https://dl.acm.org/doi/fullHtml/10.1145/3411764.3445740), Ali Alkhatib

Having individuals completely own their identities (e.g. [[thoughts/Self-sovereign Identity (SSI)|SSI]] and [[thoughts/Verifiable Credential|VCs]]) doesn't solve this either. It might give agency to people to control these representations but the main function of these identities is still *to make the bearer legible*.

If we want to flip access control switches back to the users, we need to consider other representations of identity.

>  Can we build networked software that allows people to be illegible? Or at least self-selectively legible?

[^3]: Source: [Soulbinding Like a State](https://subconscious.substack.com/p/soulbinding-like-a-state), Gordon Brander

## Identity as Action-space
When I think about what identity ultimately feels useful for, it is to gesture at actions and verbs rather than attributes. My identity perhaps represents how I act, what I have permission to do, how I relate to the world through my actions. Gordon Brander suggests similarly: "digital identity should not be about who you are, but what you are authorized to do."[^3] 

> "[Verb-like conceptualizations of identity] consider it to be dynamic, multiple, informational, temporary, contextual. Whereas the noun-like conceptualizations attach actions and interactions to actors, the verb-like recognise that identity is co-emergent with actions and interactions in contexts."

[^4]: Source: [Human identity: the number one challenge in computer science](https://generative-identity.org/human-identity-the-number-one-challenge-in-computer-science/), AKASHA Foundation and Kernel
[^5]: Source: *Mind and nature: a necessary unity*, Gregory Bateson.

From a software perspective, this isn't a new representation of digital identity either. [[thoughts/UCAN|UCAN]] serves to be a promising way to delegate permissions and actions through a [[thoughts/DID|decentralized identity]]. JWTs have been granting permissions to users for a decade. New forms of token-based access using NFTs are being experimented with.

> Everything that a user is allowed to do is captured directly in a key or token, and can be sent to anyone that knows how to interpret this format. _([ucan.xyz](https://ucan.xyz/))_

This entirely displaces the previous notion of identity as an object. There is no 'identity' to be managed. Public-key cryptography means that there isn't any sort of global registry of identities[^6]. There is no easy way to figure out everything related to one person.

[^6]: For those familiar with [[thoughts/Zooko's Triangle|Zooko's Triangle]], this is a secure + decentralized ID.

This feels promising. A token that grants access isn't making legible any information that doesn't need to be, it just grants access to whoever has it. It grants a basic level of illegibility to those who prefer not to link real-world identities to digital ones.

Yet, I think there is still room for improvement here. Identities based off of tokens and keys aren't human-meaningful. In gaining the option for illegibility, we've lost any resemblance of a human identity. I want to know that I'm talking to my friend Kevin and not just a key like `0x8ff6b283368b5f149f1de2005d763243` or a phone number like `323-594-1604`[^7].

[^7]: Systems like ENS get most of the way there (achieving all three properties of Zooko's Triangle until [[thoughts/fault tolerance#Byzantine Faults|Byzantine fault tolerance]]), providing human-meaningful names on top of secure + decentralized identifiers.

## Identity as the Intersection of Relationships
In fact, we do this with phone numbers already. All of our phones have a personal address book we use to map human-meaningful names to sometimes multiple meaningless phone numbers. There is no global database mapping people to phone numbers. Our contact books are great tools for identity keeping because they are local, private, and memorable. 

> For example, if you meet someone named Becky who plays trombone, you could name her “Becky Trombone” and someone else could name her “Becky 101B.” This personal relationship is more recognizable to each individual than a single, self-described user profile named “Becky Smith.” Instead of a single global contact list (like Facebook), we want many personal contact lists (like phonebooks). *([Backchannel](https://www.inkandswitch.com/backchannel/), Ink & Switch)*

In this way, the name doesn't just represent the person you are referring to also the relationship between the two of you. The *real identity* is neither the phone number nor the name. Rather, the real identity is the *intersection* of all of the relationships they have with others (including themselves)! 

Just as we have many 'alt accounts' or 'finstas' that try to approximate the many facets of our being, we should also embrace the natural tendency for different expressions of ourselves through our many relationships. We can use this metaphor to build on top of key-based identity. In this model, keys play the role of a phone number. It is a lookup method to connect two people.

The key thing in a relational notion of identity is that the relation -- the 'join' between identities -- is a thing in and of itself. It can be described, and it has a history which can be built on top of. 