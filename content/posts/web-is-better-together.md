---
title: "LAN the Internet again"
date: 2022-11-29
tags:
- fruit
- Rhizome
---

> This post is part of an ongoing letter series with [Spencer](https://www.spencerchang.me/) and some other internet friends about what we think the future of the Internet could look like. This is my first letter that articulates what I think the future of the internet could look like. Find more letters over on our [(we)bsite](https://we-b.site/)

I vividly remember the Minecraft LAN parties we would have during middle school lunch breaks. Our eyes, glued to the wall clock as each minute by agonizing minute ticked by slowly. The lunch bell would ring and we'd rush out into the hallway to set up our laptops. We spent the next 55 minutes tapping at our keys, yelling about how somebody stole all the diamonds we spent the last week collecting and how there was a village just over the hill. After school, we retreated to the computer lab to play more Minecraft before our parents drove to pick us up to go home.

![[thoughts/images/minecraft.png]]

At some point, school IT blocked the port ranges that Minecraft uses to establish local multiplayer worlds. No more lunch-time Minecraft. I remember asking the school if we could run a Minecraft server using the school computers and they said no.

As any stubborn middle schooler would do, I spent the next few weeks figuring out how to host my own Minecraft server on a laptop at home because who was the school administration to tell me what I could do on my lunch break. Running this server meant that us gathering in our virtual blocky world didn't need to stop as soon as we left the school perimeter.

Sometimes, I would get up at 2am and sneak downstairs to my laptop to figure out which cool new plugins and mods we could add and combine without completely crashing the game. I sneaked because I was only allowed 45 minutes of computer time after school.

I cried because in the last week before winter break, some random person joined and completely blew up the server with TNT and we didn't know backups were a thing.

---

In 7th grade, our home room teacher showed us [Scratch](https://scratch.mit.edu/) for the first time. The majority of fun with Scratch was sharing. Posting graphics on the walls, modifying and experimenting with each other's work, and bringing the "new" products back to the original inventors.

But the real spark of Scratch came from just how easy it was to make shared state. In Scratch, you can create a [globally consistent variable](https://en.scratch-wiki.info/wiki/Cloud_Data) that is synced across every one who ran my game just as easily as any other variable. Adding a leaderboard to my game was just as easy as replacing my variable with a Cloud Variable.

![[thoughts/images/cloud-variable.png|300]]
*Making a shared variable is as easy as clicking a checkbox*

This was the last era of the internet where it felt personal, multiplayer, distributed, and evolvable. It was easy to build stuff on your own and remix the work of others. It felt like a clearing in the woods, a safe gathering space for those who knew about it.

---

![[thoughts/images/house-from-up.jpg]]
*The house from Up (2009)*

Over time, this started to fade. Geocities came and went. Big platforms like Facebook, Google, and Amazon swooped in to buy all the real estate around our little clearing. It lost most of the personal aspects as it grew into an app platform. 

Some stubbornly kept their little hypertext gardens but doing so was a radical act rather than the norm. We, as citizens of the internet, have lost our ability to shape it and make it a home.

In 2019, Yancey Strickler illustrated this in what he called the *[Dark Forest Theory of the Internet](https://onezero.medium.com/the-dark-forest-theory-of-the-internet-7dc3e68a7cb1)*. 

> Imagine a dark forest at night. It’s deathly quiet. Nothing moves. Nothing stirs. This could lead one to assume that the forest is devoid of life. But of course, it’s not. The dark forest is full of life. It’s quiet because night is when the predators come out. To survive, the animals stay silent.
> 
> This is also what the internet is becoming: a dark forest. In response to the ads, the tracking, the trolling, the hype, and other predatory behaviors, we’re retreating to our dark forests of the internet, and away from the mainstream.

Our web has turned into a relentless competition for our attention. As corporations and influencers grasp for power, an increasing number of the web have retreated to the underground burrows of the cozy web to avoid the fallout. Hidden away from a hostile public web filled with spam, AI marketing, and malware, we find respite in our group chats, Discord servers, and forums.

![[thoughts/images/dark-forest.png|500]]
*Maggie Appleton in [The Dark Forest and the Cozy Web](https://maggieappleton.com/cozy-web)*

But we've fallen into a very narrow set of design patterns. In the name of profit, platforms optimize for views, hours spent, and clicks. They 'accidentally' boost provocative and incendiary behaviour because they know that it draws people to their platform, healthy or not. Each additional app on the web increasingly competes for increasing scarce [[thoughts/attention economy|attention]]. Who has space for authentic connection anymore? That doesn't make profit numbers go up.

It seems that we've reached the inevitable conclusion of optimizing "connecting with each other" to the extreme. With no feedback system for users to have a say or improve the conditions, the web is quickly spiralling into something that doesn't do all that good of a job. The thing that the web originally was meant to do -- enable people to meaningfully meet and worth with each other -- is harder than ever. Perhaps we might carve out a bit of space for those again?

In design, there is a technique [diverge-converge](https://www.nngroup.com/articles/diverge-converge/), which as the name suggests, has two stages:
1. Diverge: come up with many independent solutions to the problem
2. Converge: narrow down and refine a small number of solutions to the problem

The early days of the internet exemplified the diverge cycle of design. We tried a lot of ways to connect people and things on the web. Over time, some things stuck and others didn't. Evolutionarily, we've guided ourselves to this unfortunate set of web design practices and it's not clear that these will continue to serve us well.

How might we broaden the design space again?

---

The first step to this seems to be to dispel the myth that the internet and the web as a whole is something so vast and monolithic that it is unchangeable. We look at these entrenched protocols and take them as a given.

But here's the wonderful bit about software (and specifically the web) that feels uniquely special: you don't need permission to make things.

The internet is the first place people got to build real things without needing to ask someone if they could. This is powerful. We should give people the ability to own technology, to bring it into their own complex life stories. The *real* use cases may be the ones waiting to be discovered. One of my favourite examples is of the French bistro.

> The small Parisian restaurants serving home-cooked meals in very modest settings—like the cafe before it, was an invention. Many tales exist of its origin. Some say it was working-class landlords opening their kitchens for extra income. Others say it was the Auvergnats, immigrating to Paris from what is today central-south France, who first worked as rag-pickers, then wood and coal sellers, then metalworkers, who created small working-class restaurants to supplement their income. **Either way, it was not planned or engineered, but simply not-disallowed.** There were no rules in place to stop this invention.
> 
> (Simon Sarris, *[Welcome, ghosts](https://simonsarris.substack.com/p/welcome-ghosts)*, emphasis added)

The best pieces of software I've had the pleasure of using are ones that are agentic. Examples like Minecraft and Scratch let me fully construct a world for myself in which I operate. They set the rules, but *I* am the once who decides how I want to play.

Agentic software designs for and explicitly allows user-made [[thoughts/desire paths|desire paths]] and [[thoughts/cozy software#Folk Software|folk-usages of software]]. People will use software in whatever informal, distributed ways that emerge from real world contexts. Folksonomies are a great example of these informal taxonomies developed by users on social sharing platforms. Tumblr tags, for example, have adapted to become not just a form of tagging or organizing, but also metacommentary, memes, and other comedic content.

![[thoughts/images/yokocho-alley.png]]
*An alleyway in Yokochō, Japan. There is an inherent smallness to the design that fosters communication and character. Owners say that the smallness enables genuine communication between staff and customers as well as among characters, much unlike the homogenization of shopping malls and chain stores (paraphrased from Emergent Tokyo: Designing the Spontaneous City). How might we create Yokochō alleys of the internet?*

Agentic software embodies a [Hundertwasser flavour of design](https://hundertwasser.com/en/texts/verschimmelungsmanifest_gegen_den_rationalismus_in_der_architektur) where:
-  The resident has access to the same tools as the architect.
-  Everything is writeable, everything is rewriteable.
-  People can solve their own problems.

For this to happen, we need to reduce the burden of building software. Not all tools need to be complex power tools that require university degrees to operate. Progress can mean simplifying tools to enable the layman to shape his immediate environment to his taste. How might we make software not just the tools of the engineering elite but the layperson as well?

> Like any society, it is not only architects, builders, or engineers that move us towards this collective consciousness. We need people to bring themselves and assume new identities—perhaps where the role of ‘technologist’ is fluid and all-encompassing. Where ‘technologist’ is everyone and anyone concerned with the role of technology, empowered to use it to shape their experience in our pervasive digital world.
> 
> (Chia, *[There is an internet that is mine & I would like you to live in it with me](https://chias.blog/2022/there-is-an-internet-that-is-mine)*)

We must make it possible for the average layperson to be able to change and adapt software for their own needs; for them to treat creating software not like a professional chef, but [[thoughts/cozy software|a home cook]].

---

First, we need to address the double-edged sword that is scale. Scale, of course, can be a good thing. Economies of scale enable us to have cheap hosting, comprehensive web search, and many more luxuries we enjoy on the web today. But also, the Silicon Valley mindset of always asking what the billion-dollar version of your idea is and how you can get _everyone_ using it is slowly poisoning how we think about software.

Because realistically, when most of us want to create software, the intention isn't to release something that the whole world will end up using. Yet, with all the knowledge you end up needing to be able to do it, it seems like everything we release into the world needs to be production ready!

For someone to make a web service today, they need to know
- HTML, CSS, and JavaScript
	- If they want to use a framework like [[posts/react|React]], multiple these by 2-3x
- How to pick and choose a hosting provider to put their service on the web
- Basics of [[thoughts/DNS|DNS]] so they can use a custom domain
- Choosing between SQL and NoSQL
	- How to safely talk to their database to their service
- How to safely talk to APIs without leaking secrets
- ... and many more I'm not mentioning here

I spent a lot of time around university-aged students first learning software engineering and there is a *really* large gap between how easy it is to get a static website on the web and how difficult it is to add a database to it. This, for most people, is where they decide that software is too difficult and give up.

It has become so difficult to learn that it has almost killed software's viability as a tool for expression. Imagine if, every time you cooked a meal for your friends or family, world-class critics came in to judge and prod at your food. Or if, every time you wanted to write a letter to your partner, the postal service would refuse to send it if it contained even a single grammatical error.

> Learning how to store passwords or add OAuth2 to your toy web site is not fun. So much of programming today is busywork, or playing defense against a raging internet. You can do so much more, but the activation energy required to start writing fun collaborative software is so much higher you end up using some half-baked SaaS instead.
> 
> Writing a web service for use by your friends should not be a form of combat, where you spend your days worrying about XSS attacks or buffer overflows. You should be focused on creating something new and wonderful in a place without bad people hounding you.
> 
>  (David Crawshaw, *[Remembering the LAN](https://tailscale.com/blog/remembering-the-lan/)*)

It didn't always used to be like this. In fact, the internet used to be pretty flexible. In the days when [we still had plenty of IPv4 addresses to hand out to computers](https://en.wikipedia.org/wiki/IPv4_address_exhaustion), when  [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) and [[thoughts/NAT|NAT]] hadn't made the web [[thoughts/peer-to-peer]] hostile, LANs meant it was easy to just learn about computers and experiment with things. I could just run something on my machine and open the port to my computer from my router and anyone in the world could see it.

Unfortunately, we can't just naively revert back to this. It is no secret that our modern internet is peer-to-peer hostile. Almost all of the communication we do on the web is fully client-server because that was the easiest way to make things secure and work.

Part of this comes down to the entrenched nature of how the web is structured. Our browsers and home computers can only speak and request from services, but we've lost the ability to [listen for others and serve services of our own](https://www.robinsloan.com/lab/bad-hosts/). Security is a hard problem to solve and there are a lot of malicious people out on the web. But going down this path closes a lot of doors for what we *could* be doing with the internet.

How do we make *making* on the web easy and fun again?

![[thoughts/images/just make learning fun.png|300]]
*From the blogpost introducing [CoCo](https://medium.com/mit-media-lab/meet-coco-a-real-time-co-creative-learning-platform-for-young-people-bdfe23edd5a7)*

--- 

It's true that networks are [fundamentally sloppy and all sorts of broken.](https://apenwarr.ca/log/?m=202007#:~:text=Internets%20are%20fundamentally%20sloppy) But broken does not mean unmendable. 

This later point is one that Chia talks a lot about in her articulation [for a future of the internet](https://chias.blog/2022/there-is-an-internet-that-is-mine/).  To declare it unmendable or unfixable is to abandon the many people that still need these deeply broken technologies. 

Starting a new system from scratch with a grand vision is not the way to do this either. History has shown us that trying to purge everything and build out a totalizing vision can have [[thoughts/Seeing like a State|terrible implications]], regardless of whether they succeeded or not.

To try to reform the web is not to wipe everything and start over *tabula rasa*, but rather to move through the [adjacent possible](https://subconscious.substack.com/p/evolution-adjacent-possible), figuring out how we can improve the existing condition of those trapped by these systems without uprooting them.

In fact, this is how the Internet today evolved. It was bootstrapped on top of existing telephone networks, exapting existing phone hardware to get it off the ground. It didn't need to deploy expensive new hardware or lay down new cables, it just conformed to existing infrastructure. The internet is based off of [[thoughts/Postel's Law]]: work the world as it already is, not as you wish it were. When something didn't connect, someone hacked on it until it worked.

We can do the same, with a new web. Here's what I'm thinking.

Maybe we bring back the philosophy of LANs, but rather than networks be based on closeness in physical distance bounded by routers, what about LANs in **social and trust space**?

The internet is a network of networks. This is true at the level of hardware and infrastructure, but less so for the applications we depend so heavily on. What if we also made the web a network of networks? And users could be a part of multiple networks at once?

What if I could make a LAN with all my friends who are interested in poetic computation? I could host a copy of my website on the LAN where they can freely leave comments, drawings, annotations, like getting handed a marked up book with all the marginalia meant for you to read.

![[thoughts/images/digital community gardens.png|500]]

We could have:
1. Countless local networks, many overlapping with each other. 
2. A larger network of networks. This allows cross-network collaboration to happen.

In fact, this *is* a design pattern we have seen work well in the past with subreddits, Facebook groups, and forums. Many platforms are effectively just networks of networks. Within these local networks, communities of people have complete agency over their own little networks.

Usually, platforms reinvent this infrastructure from scratch every time. But what if we baked this in at a network infrastructure level? I dream of a future where we have this LAN-like experience back again with all the best parts of the 21st century internet. **A safe small space of people we trust, where we can go and rest, a safe harbour from the multi-billion-person internet for when we want to feel cozy and safe.**

---

Of course, I'm not exactly sure what this looks like quite yet. I've sketched some lines and said some words, but nothing really concrete.

What I do know is *why* this is important for more people to think about and work on. In times of stability, [[thoughts/inevitability of centralization|centralization is great]]. We’ve converged on a state of the internet that worked great for the first 15 or so years, but now parts are creaking and showing its age.

As we spend increasing amount of time on the web, it’s clear what may have worked for a smaller web no longer works today. In this web, the powerful become more powerful, the rich become richer. The day-to-day users have no say over the terms of service we are served. We live in a feudal.

Yet... the web remains powerful. It lets us collaborate and coordinate on scales we've never seen before. As global issues like climate change become increasingly prominent, it's critical to also work on the coordination fabric that enables us to work on these problems.We need to give agency back to the everyday users so they can craft networks that work for them in supporting how they exist in the world and on the web.

It used to be the case you needed to train to become a scribe to write words for any reason. But just as pens were taken out of the hands of the scribe during the Reformation of Europe, we must take the code out of the hands of software engineers and give it to the masses.

Writing software shouldn’t take a degree and many years of training, it should be as simple as making a meal at home or writing a letter to a friend. Doing so will lead to a more diverse and resilient internet, with a greater variety of voices and perspectives represented so we may build an internet that works for us.

Let's make the web feel local and multi-player again. Let's LAN the internet again.

---

Hello stranger! If you're still reading by this point, then you've probably been thinking about similar things for a while. I want to extend [an open invite](https://we-b.site/) to you to lend your thoughts too.

Join us as we write about what it would be like to make these fictions become reality because the way these ideas become powerful and revolutionary is to have more people contribute to them.

*Thanks again to [Anson](https://www.ansonyu.me/), [Spencer](https://www.spencerchang.me/), and [Vivian](https://vivianmeng.com/) for some really clarrifying feedback.*