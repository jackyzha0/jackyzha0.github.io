---
title: "Zooko's Triangle"
date: 2022-05-19
tags:
- seed
---

Postulates that names of participants can have at most 2 of these 3 properties
-  Human-meaningful: Meaningful and memorable (low-entropy) names are provided to the users.
-  Unique: statistically impossible collisions
-  Global: names are globally scoped, correspondence between name and the entity behind the name does not depend on context

## Petnames
[Petnames](http://www.erights.org/elib/capability/pnml.html) are potentially a method of achieving all 3 properties by having "names with each of the three pairs of properties, and [building] a naming system involving several of these kinds of names, in order to make use of all three properties."

We are already familiar with this concept actually: the contact list on your phone! Each contact in your phone doesn't actually represent that person, but rather your *relationship* with that person. `John (neighbour)` could be `Dad` in someone else's phone, even though they refer to the same physical person.

Supposes that we have three names:
1. Keys (global and unique): no one has the same key as you
2. Petnames (unique and memorable): specific to a *relationship* between two entities
3. Nicknames (global and memorable): self-proclaimed

Then, keys and petnames are interchangeable with each other. Nicknames are suggestions by users for petnames that others can set for them.

Maybe another version of [Arrow's Impossibility Theorem](https://en.wikipedia.org/wiki/Arrow%27s_impossibility_theorem)?