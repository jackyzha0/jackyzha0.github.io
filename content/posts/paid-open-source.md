---
title: "A case for funding Open Source"
date: 2021-02-27T12:03:33-08:00
tags:
  - fruit
---

## Making of Open Source software

I’ve recently made my way through [_Working in Public: The Making and Maintenance of Open Source Software_](thoughts/Making%20and%20Maintenance%20of%20OSS.md) by Nadia Asparouhova. Not only does it have some absolutely stunning cover art, it also touches on some thoughts that have been marinating in my head about the intersection of open source and [funding](thoughts/funding.md). So much so, that I’ve started experiencing the Baader-Meinhof effect, seeing something to do with open source and funding everywhere I look in tweets, conversations, and blogs.

This blog post is an exploration of processes in open source, the value it provides, and how money fits into the picture.

![Working in Public: The Making and Maintenance of Open Source Software](/posts/images/paid-oss/oss_book.jpg)_Working in Public: The Making and Maintenance of Open Source Software_

### How it's made

> "Open source developers were frequently characterized as 'hobby' developers, because the assumption was that only companies could make 'real' software."[^1]

As it stands, there are two primary schools of thought about how open source software is created.

1. **Firm-based** production involves companies, organizations, governments, or any institution with centralized resources. Their driving thesis is that only companies make software because, from a coordination standpoint, centralized firms are the most efficient way to manage resources. Most development done this way is motivated extrinsically by means of monetary compensation.
2. **Commons-based** production is a more vague concept that involves a distributed group of developers that work on a resource that is used, owned, and governed by its own community - free of employer affiliations. Most development done this way is motivated intrinsically, people do work because they want to do it.

Traditionally, software has been seen as a product of firms. Open source developers were often treated as hobbyists and the projects they made trivialized as toys. The assumption was that only companies could make ‘real’ software. However, the rise of [Internet computing](thoughts/internet%20computing.md) and collaboration tools like [[thoughts/git|Git]] have decreased the barrier to entry enough that producing software through a commons is now feasible and very much alive. The success of projects like Apache, Linux, and FreeBSD proved just how successful a commons-based method of production could be.

Surprisingly, this may also help to explain why some developers view open source and money as completely separate. If the commons-based method of production is rooted in intrinsic motivation, then [[thoughts/money]], an extrinsic motivator, will be seen as opposite to core ideals that open source stands for.

## Creation vs Maintenance

> "Creation is an intrinsic motivator, maintenance usually requires extrinsic motivation"
>
> @balupton, isaacs/github [#167](https://github.com/isaacs/github/issues/167)

When an artist finishes a painting, or a runner finishes a marathon, that usually signifies the end of said responsibility. There is no such finish line for an open source project, even after pushing out an initial product.

Creating a project is fun. It’s a wild exploration into a new idea, a frivolous journey to create something useful or to learn something new. As cloud platforms continue to eat the world, the costs of distributing and sharing a project are almost completely nullified.

Just a few clicks and a few taps of your keyboard and your project is readily available to any of the 4.66 billion people around the world with [Internet](thoughts/Internet.md) access. This adrenaline rush of finally releasing the labour of your work onto the world is the moment developers are constantly chasing. For most developers, the process of creation and distribution is intrinsically motivated; it’s an enjoyable process.

[Maintenance is less so](thoughts/maintenance.md). This is akin to a writer that’s been asked to edit and revise the same book day in and day out, long after they’ve reaped the initial financial and reputational rewards from its creation. Even when the creator wants to leave the project to work on something else, they can’t. They’re tightly shackled by the fact that hundreds of thousands of other organizations, companies, and tools rely on their code to keep their operations running. Bringing on additional developers may not help either, as they still require onboarding, code reviews, and general guidance.

Code may be nearly free to create and distribute, but maintenance is still expensive.

## Types of code

### Code as an artifact

There are two main ways we can look at code. The first of which is _static_ code. Code that, on its own, does nothing but exists as an archive. Others can copy and download the code without incurring any additional costs to the author. For the maintainers, it should make no difference in regards to cost whether 10 or 10,000 people use it.

This type of code is a pool resource or [public good](thoughts/public%20goods.md), it is

1. **Non-rivalrous.** My ability to copy the code doesn’t affect your ability to copy it. (This isn’t exactly true due to some marginal costs but I’ll discuss this later)
2. **Non-excludable.** If someone has a copy of the code, it is very difficult to prevent them from sharing that code with others.

Any code that is in this state is easy to share, copy, and distribute. This is the type of code that lives dormant on Github, on StackOverflow answers, and in GitHub’s Arctic Vault[^2]. However, the main purpose of consuming code is not to simply read and study it, but to actually use it and to let it interact with other code.

In doing so, we bring it to life.

### Code as an organism

> "Open source code derives its value not from its static qualities but from its living ones."[^1]

As soon as you hit CTRL-V on that snippet of code, as soon as that static code is inserted into your own, that code comes to life. Immediately, it might surface ridiculous amounts of red squigglies, break other code, or force you to rewrite your previous code just to make it work. But when code transitions from a resting static state to an active living state, it starts to also incur a set of hidden costs.

Like a living organism in a symbiotic relationship, there is a mutual [[thoughts/interdependence]] between it and others in the software ‘ecosystem’ in order to survive. As a result, this ecosystem requires constant upkeep to ensure that components don’t fall out of balance: dependency bumps, documentation updates, and infrastructure changes.

## Free as in speech, not as in beer

‘Free’ software doesn’t refer to its price. In fact, ‘free’ software is often extremely expensive. As Richard Stallman first described free software, it’s “free as in speech, not free as in beer.” The point Stallman was trying to make was that ‘free’ refers to what one could do with the software, rather than the price tag.

### Latent cost of software

In reality, code in its alive state is more like a free puppy. In the beginning, it’s a great and wonderful thing! Super fun and super cute. As it grows and gets older, you realize “geez, it actually takes a lot of my own time to take care of this thing.” Unlike a piece of inanimate furniture, bringing a living creature into one’s home comes with bringing in a new set of responsibilities too.

**Marginal costs** are costs increase on a per-user basis. I mentioned earlier that these costs mean that software is actually rivalrous, meaning that at some point, the project won’t be able to support the $n+1$th user. Some of this cost comes from physical infrastructure like code hosting and infrastructure. However, the majority of the cost comes from user support. Say you have a billion users and only 0.1% of them require support. If it takes you roughly 10 minutes to resolve each issue, you would still need 20,833 people working 8-hour shifts a day just to be able to keep up with the support volume. Maintainers are constantly wrestling with keeping their issue volume low and questions answered. Eventually, it just becomes a hindrance preventing them from working on the core product.

**Temporal costs** are those which build up and compound over time. Most of it comes from technical debt, choices that are easier today at the expense of time and money in the future. This is the eternal battle against entropy: the inevitable decay of systems over time. When code changes, all the supporting knowledge that surrounds it must be updated too. Documentation, tutorials, programming books, videos, and more slowly become obsolete.

Paying off these latent costs is seldom intrinsically motivated. When people talk about how fun making new projects is or contributing to open source, it’s never referring to writing documentation or refactoring code. This isn’t the ‘fun’ part of writing software. This is the nasty upkeep that goes into maintaining a building from the 1850s that’s had new rooms, plumbing, and electric wiring frankenstein-ed into it over the years.

## Funding Open Source

I first started on BentoML[^3] as a casual contributor last summer, submitting a few decently sized PRs. It was almost all intrinsically motivated; I found issues that I enjoyed working on and that I knew I would learn lots from. Satisfied with my experience, I decided to join the team as a paid contractor expecting to just continue the type of work I was doing in the summer. As issue after issue piled on, I slowly started to realize just how much extra work being a maintainer meant and why it was a paid position. Making proposals, triaging issues, adding tests, and writing documentation took up the majority of my time. While I recognized it was important work, it was not work I was intrinsically motivated to do. Thus, to motivate people like me to get that work done, an extrinsic motivator -- in this case, money -- needed to be applied.

How do we best incentivize maintainers to work tasks stripped of the very excitement and promise of creation that initially drew them to the project in the first place? There is a jarring disconnect between work that is needed versus work that is intrinsically motivated. This is where I believe open source funding should play a role.

### Funding projects

One possibility is to fund projects directly. This route builds a brand around the project. The status of the project then transcends any single person’s contributions and becomes a tangible entity that has the brand recognition and reputation that comes with becoming an independent entity.

Projects also tend to attract corporate/government funding much better than individuals can since companies are more comfortable paying for a product (code) than for a one off contract (talent). As part of the transaction, companies are typically promised service availability, influence in decision making, or technical support. However, this tradeoff also means that projects lose a bit of their freedom. Not only do maintainers have to worry about the future of the project, they need to make sure that the agreements laid out between the project and the companies are met too.

### Funding individuals

A more individualistic model would provide greater flexibility and avoids the centralized governance issues that are so antithetical to what open source stands for. Maintainers then don’t need to deal with figuring out who should get paid how much as each maintainer is responsible for securing their own funding (if even needed). Unlike a company, what each maintainer looks to get from contributing to a project may look completely different. One may be looking to build technical skill, another to gain reputation in the community. From a governance perspective, funding individual developers is also better aligned with the distributed nature of open source projects too.

As the world’s media moves towards empowering independent creators through platforms like Twitch, YouTube, and TikTok, funding individuals is becoming an increasingly viable option. The way most of these creators make money is through _patronage_ rather than donations. Although often conflated with donations, patronage is an interest and commitment to following a creator’s _future_ work based on their _current_ reputation rather than a one-time tip for their current work.

When you are funding an individual, you are paying for the regular delivery of well-defined value.[^1] There are three key parts to this:

1. **Paying.** This is an ongoing commitment to the production of content, not a one-off payment for one piece of content that catches the eye.
2. **Regular Delivery.** It isn't random discovery, rather the content is delivered directly to the user via email or application.
3. **Well-defined value.** It is clear what the money is going towards and what value it is helping provide.

Funding individuals means trusting not just in the projects they are currently working on, but also that they will continue to deliver future value too. Rather than being tied down to one project, creators then have the creative freedom to apply what they learned and create more groundbreaking initiatives.

## Mixing money and open source

> **Q:** Won't financial rewards adversely affect developer's [incentives](thoughts/incentives.md) to contribute?
>
> **A:** Yes, but it depends on who you're funding.

[Attention](thoughts/attention%20economy.md) is the main currency of production. Attention is what you divert when you choose to focus on prioritizing a feature request over adding support for a library that you promised to add a few months back. Attention is what limits you from doing everything at once.

Attention, then, is a common pool resource. It is non-excludable (anyone can bid for their attention) and rivalrous (limited attention). But, by charging for access to maintainer’s attention, it then becomes a private good: excludable and rivalrous. The belief is that, by making attention excludable, the quality of contributions will increase as contributors and users compete for the attention of producers.

There are two main camps on funding open source projects. The first camp believes that we should pay all maintainers to keep their projects alive. The other camp believes that paying project maintainers will destroy the entire ideology that open source is based upon.

I stand somewhere in between the two camps. I’m a big proponent of “if it ain’t broke, don’t fix it.” There are a lot of competing motivations already, both intrinsic and extrinsic, that powers open source today. We shouldn’t touch the parts that are currently working. Rather, we should focus on funding places that are absent from existing motivation like software maintenance and documentation

## Conclusion

There is an abundance of open source projects and casual contributors as it stands today. With the ever lowering barrier to entry, these will only become more abundant. Casual contributors already incur a marginal cost on maintainers, their contributions need a maintainer to review whether it’s okay to merge or not. Adding more extrinsic motivation will just exacerbate this existing problem. This is the same reason why initiatives like Hacktoberfest, which promises to give a free t-shirt to anyone who makes a few pull requests, are counterproductive to open source.

What isn’t significantly increasing are the number of maintainers responsible for maintaining the existing projects we have today. We should be funding maintainers who already have the contextual knowledge to be able to effectively tackle issues and guide the project. Funding will be an important extrinsic motivator to make sure that the difficult work that needs to be done, gets done.

This is not, by any means, an all-encompassing post about funding in open source. If that’s what you’re looking for, then Eghbal’s book is a great starting point. What this post does do, however, is raise important points about the processes behind open source and prod at why exactly we need to fund these seemingly ‘free’ processes. In order for open source to continue on its growth trajectory, these are questions we need to put more collective effort into thinking about.

[^1]: _Working in Public: The Making and Maintenance of Open Source Software_ by [Nadia Eghbal](https://nadiaeghbal.com/)
[^2]: [GitHub's Arctic Vault](https://archiveprogram.github.com/)
[^3]: [BentoML](https://github.com/bentoml/BentoML)
