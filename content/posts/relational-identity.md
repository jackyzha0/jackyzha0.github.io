---
title: "From legibility to identity"
date: 2022-07-16
tags:
- fruit
---

*What is identity? Who defines it? Who controls it? What is its relationship to software?*

Software developers and computer scientists have been tackling identity for almost half a century now, trying to model identity in ways that are understandable to machines. Different models seek to emulate different aspects of the identity.

But for engineers building these digital identities, the primary focus is on *legibility*: the process of simplifying, labelling, and modelling. ISO/IEC 24760-1, the *only* formal international standard for identity, sees identity as a set of attributes to be managed[^1]. 

Legibility on its own is not a bad thing. It’s how Google assembles droves of information on the web so we can search through it easily. It’s how we have transparency into the progress of public projects and initiatives by our governments.

But this process of legibility becomes dangerous when it is forced upon users. When legibility becomes the lens you view the world through, relationships are front-run by a deluge of data rather than formed more organically between individuals[^2]. We emerge in a world that comes straight from Black Mirror's Nosedive episode where everyone’s status is determined by a ‘social media score’. This systemized legibility of the world is an interpretive and transformational force that changes how we perceive others in ways that feel flat and transactional[^3].

In the process of legibility, nuance is excluded. Legibility means that ‘only what matters’ and can be quantified is kept; all else is discarded. This is extremely dangerous when that legibility happens without the choice of the users.

![[thoughts/images/forest death.png]]*Illegible natural forest vs legible "scientific" forest (James C. Scott in Gordon Brander)[^4-1]*

Forced legibility may look like a passing or failing grade in a class without an accompanying note explaining how you missed the final because you needed to grieve for the death of a loved one. Forced legibility may look like a conviction charge without the context behind how the officer was racially motivated. When legibility is forced upon people, it only serves to widen the gulf that already exists in society and disproportionately impacts marginalized groups[^2]. This legibility is beneficial for companies and governments seeking to better model users and data, but it doesn’t serve users who seek to govern their own identities and control who accesses their information.

I want to live in a world where it is possible to have different levels of granularity of information that is made legible for a messaging app versus a government portal versus interacting with my employer. With the way the web is set up currently, these are difficult to separate.

If we want to flip access control back to the users, we need to consider other representations of identity. Clearly, it doesn't make sense to try to make every part of our digital identities legible. **Can we develop alternate systems that provide rich models of identity that allow people to be illegible? Or at least self-selectively legible?**

This essay seeks to explore alternate abstractions for identity to better resolve the identity needs of *all* relevant stakeholders, not just centralized providers. We can categorize digital identity models based on the primary representation of identity along with the locus of control (managed versus self-sovereign).

|Identity as...|Managed|Self-sovereign|
|-|-|-|
|Attributes|Video game character, e-shopping account, TikTok|Verifiable Claims, NFTs|
|Capabilities|IAM (Identity and Access Management)|OAuth Tokens, UCANs|
|Relationships|Messenger, Whatsapp|???|

*Fig 1: Different models of digital identity.*

What are ways we can lean towards self-sovereign models of identity? How do we give users freedom to choose how legible they are online?

To do so, let us explore what managed identity even is first.

## Identity as Attributes

![[thoughts/images/identity-attribute.png]]
Our digital representations consist of:
-   What we bought last time we visited Amazon;
-   All the files you’ve uploaded to Google Drive;
-   Google Analytics data points about what pages we visited and when;
-   What type of videos we watched on TikTok over the past week.

Most data models default to this assumption of identity as objects with attributes. Almost all programming languages model things, including people, this way. Databases are similar, either being documents with attributes or rows in a table. Relations are encoded as references to other documents, not as things in and of themselves.

When we model identity as a collection of attributes, all aspects of identity are, by default, quantifiable and measurable.

Having individuals completely own their identities (e.g. [[thoughts/Self-sovereign Identity (SSI)|Self-sovereign Identity (SSI)]] and [[thoughts/Verifiable Credential|Verifiable Credentials (VCs)]]) gives agency to people to control these representations but the main function of these identities is still to make the bearer legible.

## Identity as Capabilities

![[thoughts/images/identity-capability.png]]

When I think about what identity ultimately feels useful for, it is to gesture at *capabilities* rather than attributes. My identity can also be represented by how I act and what I have permission to do. Gordon Brander suggests similarly: "digital identity should not be about who you are, but what you are authorized to do."[^5] 

> "[A model of identity as capabilities] considers it to be dynamic, multiple, informational, temporary, contextual. Whereas the [model of identity as attributes] attach actions and interactions to actors, the [capability model] recognises that identity is co-emergent with actions and interactions in contexts." (AKASHA and Kernel[^6])

From a software perspective, this isn't a new representation of digital identity either. [[thoughts/UCAN|UCAN]] serves to be a promising way to delegate permissions and actions through a [[thoughts/DID|decentralized identity]]. JWTs have been granting permissions to users for a decade. New forms of token-based access using NFTs are being experimented with.

> Everything that a user is allowed to do is captured directly in a key or token, and can be sent to anyone that knows how to interpret this format. _([ucan.xyz](https://ucan.xyz/))_

There is no ‘identity’ to be managed but rather a set of capabilities to be possessed. Signable messages using public-key cryptography means that we can prove the same person you issued the access token to is now requesting access without revealing who it is. As there is no global registry of who has what permissions, this is by default illegible unless a user wants to manually publish their key to make it known.

This feels promising. A token that grants access isn’t making legible any information that doesn’t need to be, it just grants access to whoever has it. It grants a basic level of illegibility to those who prefer to keep real-world identities and digital ones seperate.

Yet, I think there is still room for improvement here. Identities based off of tokens and keys aren't human-meaningful. In gaining the option for illegibility, we've lost any resemblance of a human identity. I want to know that I'm talking to my friend Kevin and not just a key like `0x8ff6b283368b5f149f1de2005d763243` or a phone number like `323-594-1604`.

## Identity as Relationships

![[thoughts/images/identity-relationship.png]]

> "Unfortunately, due to their peculiar nature, humans are unable to memorize large numbers of keys, and use them as names for a multitude of objects."[^7]

You are already most likely familiar with a system for 'memorizing' these large keys already. All of our phones have a personal address book that we use to map meaningless phone numbers to human-meaningful names. HCI researchers call systems like these [[thoughts/Zooko's Triangle#Petnames|petname systems]].

> For example, if you meet someone named Becky who plays trombone, you could name her “Becky Trombone” and someone else could name her “Becky 101B.” This personal relationship is more recognizable to each individual than a single, self-described user profile named “Becky Smith.” Instead of a single global contact list (like Facebook), we want many personal contact lists (like phonebooks). *([Backchannel](https://www.inkandswitch.com/backchannel/), Ink & Switch)*

In this way, the petname doesn't just represent the person you are referring to, but also the relationship between the two of you. The *real identity* is neither the phone number nor the petname. Rather, their real identity is the *intersection* of all of the relationships they have with others. Just as we have many 'alt accounts' or 'finstas' that exist to approximate the many facets of our being, we should also embrace the natural tendency for different expressions of ourselves through our many relationships.

The key thing in a relational notion of identity is that the relation – the ‘join’ between identities – is a thing in and of itself. It can be described, and it has a history which can be built on top of. This is a relation that is private by default (only between parties involved) and unique (no other relation like this exists).

**The new atom of identity is not a single entity but a group chat. A chat that isn’t just a text messaging history but can embed applications and rich worlds on top of it.**

Identity may be a difficult thing to model, but it is worth thinking about deeply. Our models for identity will impact how many future generations of internet users are categorized, made legible, and modeled and it makes sense to ensure it best serves the people it represents.

As [[thoughts/peer-to-peer|peer-to-peer]] and [[thoughts/local-first software|local-first]] apps slowly make a resurgence, I hope that optional legibility and agency are values at the forefront of new applications and protocols, enabling users to choose which parts of themselves to make legible and foster connections that feel real and human rather than extractive and limiting.

*Thank you to Anson Yu, B Cavello, Cent Hosten, Saffron Huang, Shrey Jain for reading earlier drafts and providing clarifying feedback.*

[^1]: Source: [ISO Standard](https://www.iso.org/standard/77582.html)
[^2]: Source: [Is "acceptably non-dystopian" self-sovereign identity even possible?](https://blog.mollywhite.net/is-acceptably-non-dystopian-self-sovereign-identity-even-possible/), Molly White
[^3]: Source: [To Live in Their Utopia](https://dl.acm.org/doi/fullHtml/10.1145/3411764.3445740), Ali Alkhatib
[^4]: Source: [Soulbinding Like a State](https://subconscious.substack.com/p/soulbinding-like-a-state), Gordon Brander
[^4-1]: "Scott details a pattern of disaster that repeatedly manifests around legibility. His opening example is from the late-18th century discipline of “scientific forestry”. A natural forest is illegible. A tangle of plants. This is inconvenient from the standpoint of harvesting lumber. How do you quantify yield? Can you even make a meaningful map of this mess? Much easier to clear the forest and plant a legible “scientific” forest. Uniform rows of trees that produce good lumber. Now we can count the trees, make a map, track sustainable yield. What’s missing from our map? Everything else. The forest has been _made legible_ to lumber production. In the process, the entire ecological web of trees, shrubs, birds, bugs, moss, soil microbiota are stripped away. They didn’t fit into our map. By the second generation of planting, there is a noticeable decline in forest health. Within one century: _Waldsterben_, forest death, ecological collapse." Quote from [Soulbinding Like a State](https://subconscious.substack.com/p/soulbinding-like-a-state), Gordon Brander
[^5]: Source: [Five Mental Models of Identity](https://github.com/WebOfTrustInfo/rwot7-toronto/blob/master/final-documents/mental-models.pdf), presented in *Rebooting the Web of Trust VII* by Joe Andrieu, Nathan George, Andrew Hughes, Christophe MacIntosh, and Antoine Rondelet
[^6]: Source: [Human identity: the number one challenge in computer science](https://generative-identity.org/human-identity-the-number-one-challenge-in-computer-science/), AKASHA Foundation and Kernel
[^7]: Source: [PetName Markup Language](http://www.erights.org/elib/capability/pnml.html) by Mark S. Miller et. al