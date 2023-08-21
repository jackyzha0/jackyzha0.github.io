---
title: "Rhizome Philosophy"
date: 2022-05-06
tags:
  - seed
  - rhizome
---

See the main [[thoughts/Rhizome Proposal|Rhizome Proposal]]

### Interoperable

Data on the web today is mostly treated as second-class to applications. In this form, data is contextual -- it only makes sense in the context of what you can do in an application. At its best, developers and companies expose this data in the form of an API, not allowing you to actually access the underlying data but rather only giving you a limited range of actions or verbs that you can perform on it.

This is known as _verb-based interoperability_ and it [creates a form of n-to-n problem](https://twitter.com/andy_matuschak/status/1452438198668328960) where every app needs to know what the APIs of another app are to even begin to interoperate. Data exported in this form rarely makes sense on its own outside of the application and often requires a lot of glue code in order to make the data the right format so that you can pass it off to the next application. In fact, companies are _incentivized_ to not provide an easily understandable format that users can easily export. Why would they make it easier for people to leave their product?

Users shouldn't have to keep using platforms they don't like just because it's impossible to move all the data they have to another. Instead, users should _want_ to use platforms because it fits the needs they have.

This might be possible if we treat data like a **noun**. How do we create sources of truth that are _legible outside of the application_, possibly in ways that the application developer never anticipated? Data-based interoperability can use the shared data directly. Once an app knows how to read a data format, it can read that data regardless of which app produced it.

This enables users to escape the iron-clad grasp of corporations which hold your data hostage in exchange for usage of their application. Users shouldn't have to sign away all rights to their data when they agree to use app -- they should control what applications have access to their data and how.

### Modular

When users choose to use an application, they generally have no choice but to use the whole stack that application uses.

In choosing an application, you are ceding agency to the application to decide how it stores the data, how it transforms that data, and how it displays that data. Don't like the way an application looks and the app doesn't give you an option to customize it? Better find a new app or deal with it.

Can we give agency back to users by create modular layers so users can pick and choose what layers they want? Can we make it so these layers are available to others to reuse and adapt to their own needs?

### Local-first

The cloud gives us collaboration, but old-fashioned apps give us ownership. Can’t we have the best of both worlds?

We should be able to use our applications without needing to be connected to an internet to load a 4MB web page. Many modern 'desktop' applications are simply Electron wrappers around a web application, providing no such thing as 'offline-support'.

Your apps shouldn't break as soon as you reach an area with spotty internet connection or when some company's server goes down. When you work with local-first software, your work should continue to be accessible indefinitely, even after the company that produces the software has died. You shouldn't need to worry about companies selling your data to advertisers or using it to train large language models without your permission because you control exactly who has access and permission to your data.

The internet should be used to synchronize, update, and collaborate, not be a requirement for basic function. Your data should stay on your device unless you say otherwise.

### Collaborative

Of course, local-first doesn't mean local-only.

It was a dream of the early internet to be able to make spaces anyone can inhabit and enjoy, little pockets of [[thoughts/digital commons|digital commons]] that are tended to by many.

Apps should have the freedom to create new mediums of being digitally present with others. Apps should easily be able to have a digital indication that a space is lived in and occupied.

As of now, most platforms keep a primative chat log or history but thats it. What if there was a way to create digital [gardens](https://twitter.com/samihusseni/status/1329499588982575104) to foster and maintain existing relationships? A commonspace you could both take care of, share, and contribute to. Completely private common spaces often allow users to put whatever and allow people can construct their own digital nooks and cozy spaces. Places where people can consume the firehose of information through a feed or slowly and lazily through dialogue (see: [friction](thoughts/friction.md), [pace layers](thoughts/pace%20layers.md)).

A collaborative application doesn't necessarily need completely open to the public either. It could just be among your family or close friends. It could just be permeable enough to be discovered by those curious enough to add their own drawings and words and details just hidden enough to be carefully unearthed by the intentional visitor. An app can be a [[thoughts/cozy software#An app can be a home-cooked meal|home-cooked meal]].

### Simple Developer Experience

Last but not least, the experience should feel pleasant to both build and use.

There are clearly social problems when it comes to making collaborative apps (e.g. [[thoughts/tragedy of the commons|tragedy of the commons]], [[thoughts/evaporative cooling|evaporative cooling]]), but even _enabling_ this collaboration on a technical level to happen in the first place is already really difficult.

The reason why client-server is so much easier to develop is because of ACID properties. Everything is atomic, things are easy to reason about. P2P and distributed technologies generally are much more difficult to reason about with things like eventual consistency making it hard to understand what is _actually_ happening in the code. Networking quirks like [[thoughts/NAT|NAT]] traversal make direct connections

People tend to lean towards client-server models because nobody has made it easy to make P2P software. Almost everything today requires users to still setup their own signalling servers, STUN servers, ICE servers, and a bunch of other infrastructure that makes client-server applications seem like child play.

But what if developers didn't have to worry about server hosting _or_ complexities of eventual consistency? Can we make the tech really easy to build so even hobbyists can quickly spin up a chat app for their own friends that suits their own needs?

The libraries that enable this form of P2P software should be able to plug and play into existing applications. The experience should be simple enough that your average CS student should be able to write a simple P2P chat app just as easily (if not easier) as if they wrote it as a client-server application.
