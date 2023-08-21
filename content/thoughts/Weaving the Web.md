---
title: "Weaving the Web"
date: 2022-08-09
tags:
  - sapling
  - book
---

> The original design and ultimate destiny of the world wide web.

Book, written by Tim Berners-Lee

## A Brief History of the Web

[[thoughts/hypertext|Hypertext]] was invented by Ted Nelson in 1965. The [[thoughts/Internet|Internet]], as worked on by Donald Davis, Paul Barran, Vint Cerf, and Bob Kahn, were already becoming pervasive by the 1970s. Tim Berners-Lee came at the right time to marry them together into the Web.

The Web was a slow process -- there was no "Eureka!" moment. He described the process like getting a bobsled down the hill -- something you needed to put a lot of upfront effort into getting moving, but once you did, you needed to get in and steer.

He first wrote a proposal for the Web at CERN in March of 1989 and began work on it with Robert Cailliau. On Christmas Day 1990, the first _WorldWideWeb_ browser/editor was working, communicating with the info.cern.ch server, a full 20 years after the existence of both hypertext and the Internet. Not only was it able to view web pages, it could edit them collaboratively with others.

Even still, people at CERN "didn't seem to see how it would be useful." This created a lot of tension between Robert and Tim about how to deploy their resources effectively.

> Should we develop it further on the NeXT? Should we reprogram it for the Mac or the PC or Unix, because even though the NeXT was an efficient machine, few other people had them? After all, what good was a "worldwide" web if there were only a few users? Should we tailor the Web to the high-energy physics community, so they'd have a tool that was theirs and would support it, since CERN was paying our salaries? Or should we generalize the Web and really address the global community, at the risk of being personally disenfranchised by CERN? ... My gut told me I had to pursue my larger vision of creating a global system.

At the same time, several other Internet-based information systems were surfacing too, namely WAIS and Gopher. Both systems took off much more quickly and he was concerned that they would suffocate the Web. Nonetheless, they put their heads down and kept working at it.

As browsers started to spread, no one working on them really focused on writing or editing functions for the web. Browsers were just that -- things to browse the web. This was one of the first major divergences between the vision that Tim had for the web and what actually happened. He wanted the web to be collaborative, citing that "without a hypertext editor, people would not have the tools to really use [it] as an intimate collaborative medium. Browsers would let them find and share information, but they could not work together intuitively." This was a concern that would come back to continuously haunt him.

But by the summer of 1992, the bobsled had started to move. The logs showed a dramatic exponential curve over the past twelve months, doubling every three to four. After a single year, the load had grown by a factor of ten.

Now, companies and individuals were starting to eye the Web as a way to make profit. With the rise of Mosaic (which would later become Netscape), they tried to make the web 'theirs'. It wasn't "on the Web", it was "on Mosaic." The media started to portray Mosaic as if it were equivalent to the Web.

As technologists and entrepreneurs were launching or merging companies to exploit the Web, they seemed fixated on one question: "How can I make the Web mine?" Tim was asking, "How can I make the Web yours?" Gopher, one of two most popular Internet information systems at the time, decided to charge an annual fee for access and just as quickly as people flocked to it, they dropped it like a hot potato. Many asked if the Web would suffer the same fate. His response? On April 30th, 1993, Tim and Robert signed a declaration saying that the Web protocol and code was free to use and anyone could create a server or a browser to give away or sell without royalty or other constraint.

More than ever, this experience convinced Tim that it was time to stop pushing the bobsled and instead to jump in and steer it. With yet another factor of 10 growth since the previous year, he decided to start the World Wide Web Consortium, the W3C. It wasn't a standards body, but rather an international organization to help developers of servers and browsers alike reach consensus on how the Web should operate. With everyone trying to pick up the Web and run with it in different directions, Tim thought the W3C would help unify their pursuits in creating a single, universal, accessible, hypertext medium for sharing information. It would develop open technical specifications and have a small full-time staff[^1] to design and develop the code wherever necessary. With members open to any organization, regardless of commercial, educational or governmental, for-profit or non-profit, W3C would represent the power and authority of millions of developers, researchers, and users.

[^1]: This full time staff team was paid through the membership fee for the W3C, which was $50k for full-membership and 1/10 the price for non-profit or governmental entities. Members had to commit to a three-year term of membership, after which they could renew annually. Members were free to attend any meeting, and sit on any working group. They would also get exclusive access to in-depth information on all activities under way, much like how the Xerox Parc membership worked.

Of course, the W3C was not meant to be a point of control. Tim made it clear that he had designed the Web so there should be no centralized place where someone would have to "register" a new server, or get approval of its contents. Anyone could build a server and put anything on it. Philosophically, if the Web was the be a universal resource, it had to be able to grow in an unlimited way.

The international telephone system offers a great analogy. It defines what it has to (i.e. the voltages and signals), but then leaves how it is used up to the devices. That's what we needed for computers on the web. Universality.

Quietly, under the noise of all the companies trying to make a fortune off the web, the W3C has been steering the web and leading the web to its full potential. Today, Tim currently sits as Director of the W3C. He was knighted by Queen Elizabeth in 2007. Now, Sir Tim promotes open government data globally and spends time fighting for rights such as net neutrality, privacy and the openness of the Web.

But there is still work left to be done. A slow [[thoughts/inevitability of centralization|recentralization of the Web]] is happening, and users lack agency over their own privacy. Of course, there have been many proposals to address this, including Tim's own [[thoughts/Solid|Solid project]] as well as my research on [[thoughts/Rhizome Proposal|Rhizhome]]. We are still early.

> When I try to explain the architecture now, I get the same distant look in people's eyes as I did in 1989, when I tried to explain how global hypertext would work. But I've found a few individuals who share the vision; I can see it from the way they gesticulate and talk rapidly.

## Quotes

### Relational Theories of the World

Enquire was a very early [[thoughts/RDF#RDF Triple|triple-store]] like [[posts/networked-thought|networked thought]] note-taking tool developed by Tim Berners-Lee. He made it to stored information without using structures like matrices or trees. After all, the human mind uses the organizing structures all the time, but can also break out of them and make intuitive leaps across the boundaries -- those coveted random associations.

In an extreme view, the world can be seen as only connections, nothing else. We think of a dictionary as the repository of meaning, but it defines words only in terms of other words.

### Separation of layers of the Web

The web's infrastructure can be thought of as composed of four horizontal layers; from bottom to top they are the

1. transmission medium: connecting computers together
2. computer hardware
3. software: runs web access
4. content: the Web itself

The independence of these layers is important. From the software engineering point of view, this is the basic principle of modularity. From the point of view of economics, it is the separation of horizontal competitive markets from anticompetitive vertical integration. From the information point of view, think of editorial independence, the neutrality of the medium.

I am more concerned about companies trying to take a vertical slice through the layers than creating a monopoly in any one layer. Keeping the medium and the content separate is a good rule in most media. When I turn on the television, I don't expect it to deliberately jump to a particular channel, I expect my television to be an impartial box.

I also expect the same neutrality of software. When I ask a search engine to find the information it can on a topic, I don't expect it to return just the sites of companies that happen to advertise with or make payments to the search company.

If a company claims to give access to the world of information, then presents a filtered view, the Web loses its credibility. That is why hardware, software, and transmission companies must remain unbiased toward content. I would like to keep the conduit separate from the content. I would like there always to be a choice of the unbiased way, combined carefully with the freedom to make commercial partnerships. And when other people are making a choice for me, I would like this to be made absolutely clear to me.

See also: [[thoughts/inevitability of centralization|inevitability of centralization]]

### Privacy

People should be able to surf the Web anonymously, or as a well-defined entity, and should be able to control the difference between the two. I would like to be able to decide who I will allow to use my personal information and for what.

The W3C is creating a technology that will allow automatic negotiation between a user's browser and store's server, leading to an agreement about privacy. The Platform for Privacy Preferences Project (P3P) will give a computer a way of describing its owner's privacy preferences and demands and give servers a way of describing their privacy policies.

See also: [[thoughts/privacy]]

### Annotations

I would like annotation servers to exist where groups could add links to documents they want to comment on. Annotation servers are third-party services allowing a group to share each others' comments on documents anywhere else on the Web. The browser gets the original page and then separately checks annotation servers for comments which are then superimposed on the page.

Imagine having servers for comments in different forums, perhaps family, school, and company. Again, the theme is human beings doing the thinking and machines helping it work on a larger scale, but nothing replacing wisdom in the end.

### Technology and Policy

[The W3C] defines mechanism, not policy. That said, it is essential that policy and technology be designed with a good understanding of each other. As I noted in closing the first International World Wide Web Conference at CERN in May 1994, technologists cannot simply leave the social and ethical questions to other people, because technology directly affects these matters.

See: [[thoughts/software and politics|software and politics]]

### The Web's Achilles' Heel: DNS

At the top of the [[thoughts/DNS|DNS]] hierarchy sits 13 root servers. An operator error at this level can black out huge portions of the web. However, that technical weakness is itself less of a concern than the social centralization that parallels it.

All domain names are given out in a delegated fashion. To set up the name www.lcs.mit.edu, one registers it with the Lab for Computer Science, which is owner of the lcs.mit.edu domain, LCS got its domain in turn from MIT, which is the registered owner of mit.edu. MIT got its domain from the owner of edu. Control over these 'top-level' domains gives control over all domain names and so is something of great power. Who should exercise that power?

### Semantic Web and Data Lensing

To build understanding, we need to be able to link terms. This will be made possible by _inference languages_, which work one level above the schema languages. Inference languages allow computers to explain to each other that two terms that may seem different are in some way the same -- a little like an English-French dictionary. Inference languages will allow computers to convert data from one format to another.

### Social

A person who's completely turned inward, who spends all his or her time alone, is someone who has trouble making balanced decisions and is unhappy. Someone who is completely turned outward, who's worried about the environment and international diplomacy and spends no time sitting at home or in their local community, also has trouble making balanced decisions and is also unhappy. It seems a person's happiness depends on having a balance of connections at different levels. We seem to have built into us what it takes in a person to be part of a fractal society.

### Teaching

Having to work with someone else's definitions is difficult. An awe-inspiring talent of my physics tutor, Professor John Moffat, was that when I brought him a problem I had worked out incorrectly, using a strange technique and symbols different from the well-established ones, he not only would follow my weird reasoning to find out where it went wrong, but would then use my own strange [[thoughts/notation|notation]] to explain the right answer.

This great feat involved looking at the world using my definitions, comparing them with his, and translating his knowledge and experience into my language. It was a mathematical version of the art of listening.

See: [[thoughts/teaching]]
