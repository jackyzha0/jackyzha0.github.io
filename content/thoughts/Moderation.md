---
title: "Moderation"
date: 2022-03-15
tags:
  - seed
---

What is the role of moderation in [communities](thoughts/communities.md)? What does good/bad moderation look like? (posts/comments/membership)

I think a key part of answering this is trying to define what role a community occupies. Is it just a collection of people gathering around a shared identity? Or is it supposed to be a platform for moderated idea discussion/generation? Or something else in between.

Thinking about this at the [infrastructure](/thoughts/infrastructure) level too, if a community's purpose is to serve as infrastructure so that it enables conversations, should infrastructure be regulated/enforced or something that should just play out naturally?

Broadly defined, I see moderation as having two main categories: moderation of users and moderation of content. Moderation then, is to ensure that the set of values that is being conveyed by the users/content roughly aligns with that of the group/community.

Moderation of users involves regulating the _membership_ of individuals within the community whereas moderation of content regulates what can/can't be said in the community.

Moderation gets problematic when it is used to target and discriminate against individuals because of personal relations or vendettas. I was thinking about also saying it becomes problematic when it discriminates against characteristics but I'm hesitant on this bit. Is it categorically different to exclude people who are misogynistic vs those of a certain race? Probably yes but I don't have a solid argument for it yet.

## Protocols for Moderation

From _[Protocols Not Platforms](https://knightcolumbia.org/content/protocols-not-platforms-a-technological-approach-to-free-speech)_

See also: [[thoughts/Protocol|protocols]]

The key to making this work is that while there would be specific protocols for the various types of platforms we see today, there would then be many competing interface implementations of that protocol.

Much like email, you don’t need to build an entirely new Facebook if you already have access to everyone making use of the “social network protocol” and just provide a different, or better, interface to it.

The problem is leaving it up to platforms to decide what 'abusive' behaviour looks like.

> Nearly everyone recognizes that there is such behavior online and that it can be destructive, but there is no agreement on what it actually includes.

Under such a system, both Type I (“false positive”) and Type II (“false negative”) errors are not only common; they are inevitable. Content that a large body of people believe should be taken down is left up, while content that many people believe should remain up is taken down.

**Rather than relying on a single centralized platform, with all of the internal biases and incentives that that entails, anyone would be able to create their own set of rules—including which content do they not want to see and which content would they like to see promoted.**

In such a world, we can let a million content moderation systems approach the same general corpus of content—each taking an entirely different approach—and see which ones work best. [[thoughts/r-K Selection theory|r-selected]] moderation.

## Trust-based Moderation Systems

[Source](https://cblgh.org/trustnet/)

See also: [[thoughts/trust|trust]]

In the centralized context, removing a malicious participant is the action of a moderator. Usually it is one or two clicks, and the malicious participant has been removed for all other participants.

In a distributed context, there are many possible answers to this problem. The first and naive solution is to delegate the responsibility of removing the malicious participant to each individual participant. Thus everyone participating has to individually hide offenders.

**A subjective system, where parti`cipants can themselves decide who moderates on their behalf, sidesteps the mentioned problems. Additionally, the mechanism of freely allowing multiple people to moderate also spreads out the invisible care-giving labour required to keep a community free from abuse.**

The proposed system is [[thoughts/transitive closure|transitive]], meaning that there will be indirect trust relations by way of those whom you trust directly.
