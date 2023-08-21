---
title: "Open Source and Politics"
date: 2022-06-29
tags:
  - fruit
---

**Coraline Ada Ehmke** is an acclaimed speaker, writer, engineer, and activist with over 25 years of experience in software and almost 20 years in open source. She works to promote diversity, equity, and justice in open source communities and the tech industry as a whole. She created the Contributor Covenant, the very first code of conduct for open source communities, as well as the Hippocratic License, which legally prohibits an open source project from being used for human rights violations.

**Jacky Zhao** is studying computer science and philosophy at the University of British Columbia. He thinks a lot about how we can better incentivize public goods funding, support better interactions with computers, and be more responsible stewards of technology. He has built and maintains many widely used open source projects like Quartz, which enables users to host their digital gardens online for free, and cursor-chat, which is a library to add Figma-like cursor chat to websites.

_This conversation has been edited for clarity and length._

## How did we get here?

**Jacky:** I’m curious about how you first got involved with the tech justice movement and open source.

**Coraline:** I was a software engineer for 26 years. When I started my gender transition in 2013, I started experiencing first-hand some of the pervasive problems in open source and the tech industry that I had only been aware of intellectually before. It woke something up in me. It was around that time that I started becoming more interested in the issues of justice and equity and technology.

I remember back in the early 2010s, when tech conferences started becoming popular, there was a big fight to get tech conferences to have codes of conduct. It's something that seems so normal and natural today, but it was actually a very, very difficult fight.

2014 was also when I wrote version 1.0 of Contributor Covenant, which was the first code of conduct for open source communities. I feel like over the years — eight years now — that Contributor Covenant has been around, we've seen codes of conduct become more normalized in open source communities.

Today, it's hard to count the number of adoptions. It's in the ten thousands. And it's kind of wild! I was talking to a friend last year who said, “Coraline, there's an entire generation of engineers who have never worked in an open source project that did not have a code of conduct.”

One of the things I worry about though, with that normalization, is that we don't recognize our history. _People in tech have very, very, very short memories, which is part of why we keep reinventing the same stuff over and over._

**J:** Yeah. In my free time, I do a lot of open source projects and hack on a lot of little things in general. I initially started posting a lot of my projects on GitHub more for backup and archival purposes and never really expected any real usage, so I never really thought about being “a maintainer,” or whatever that meant.

It wasn't until my very first project started getting real usage that I realized there never was any real introduction to being an open source maintainer, or what it means to be a _good_ maintainer. There’s no “How to be a Good Maintainer 101” course. It wasn't until I started getting contributors that were like “Hey, you actually don't have a license or a code of conduct in your repository, have you considered adding one?” Then I realized, wait, I actually don't know much about — as you said — how we got here. What is the history of all these codes of conducts? I think that definitely kicked off a personal learning journey for me to figure out the history of a lot of this as well.

**C:** Yes. So that takes us to 2018. An activist group called Mijente was in the midst of their No Tech for ICE campaign. One of the things that they were doing was posting the names of companies that had contracts, either with Customs and Border Protection or with ICE directly. One of the companies that got called out was Chef, which plays a large role in infrastructure, server deployments, and was very necessary for a lot of the large-scale internet operations.

Seth Vargo, who had previously been a developer at Chef and had worked on open source tooling for them, saw that Chef was called out as one of these companies profiting from human rights abuses at the border. In an act of conscience, he pulled all of his open source code that was part of the Chef ecosystem and made a statement about why. But within two hours, both GitHub and RubyGems forcefully restored the code he took down because it was affecting the many companies around the world who depended on those libraries.

The open source establishment, or what I call “open source traditionalists,” saw this and said “No, no, you can't do that because open source is neutral.” I saw that as an epic moral failure on the part of the establishment. So I wrote version 1.0 of the Hippocratic License, which was not intended to be a viable license, but rather a lightning rod for broader discussion around the neutrality of open source tech in general.

**J:** That's really interesting. At school, I study computer science and philosophy, so I spend a lot of time thinking about how technology impacts the people that use it. And I think one of the foundational pieces that I read that really shaped my thinking around this was “[[thoughts/Do Artifacts Have Politics|Do Artifacts Have Politics?]]” I think that paper was really influential in terms of making me think, “Wait, actually, this technology that we spend so long claiming to be neutral actually has political implications as well.” And I think a lot of people working in tech spend a lot of time trying to deny the fact that it does.

**C:** A couple of years back, I gave a talk called “The Rising Ethical Storm in Open Source.” I actually traced that illusion, or, you know, honestly, that lie, that computer technology in particular is neutral. I traced it all the way back to the 1950s with Edmund Berkeley, who was one of the cofounders of the Association for Computing Machinery, and he served on the committee called the Social Responsibility of Computer Professionals.

Their findings were that yes, technologists are absolutely responsible for how and what is developed. The how, what, why and its impact. And the fledgling computer science industry at the time rejected that.

**J:**  I watched that talk that you mentioned. One of your quotes in that talk that really resonated with me was: “I believe that as technologists, we have a moral imperative to prevent our work from being used to harm others. Responsibility is about impact and not intent.” That definitely feels relevant.

One model I use often to think about tech is to model it as a multiplicative tool instead of something that's purely additive[^1]. Multiplicative in the sense that it will only exacerbate the existing discrepancies in distributions of power, right? Some people will obviously be way better off and then there's some that will be disproportionately harmed by it.

I feel like some other people hold a very strong belief that technology is purely additive in that it will just truly raise the ground bar of everyone who uses it. Yeah, I don't know. I feel like that's always been missing from how people think about technology, that there's always a hidden tradeoff or downside to whatever technology that you're building with.

I wonder whether the developers of these technologies should be responsible for expecting how their tools will be used in whatever way down the line, right? If you build an open source project, it's very hard to tell what type of people will actually end up using your project. And so, at what point do developers have to start thinking about these tradeoffs? For example, who will my end users be and what is acceptable use and what’s not?

Even from a developer standpoint, it obviously helps if you’re educated in these issues in order to make these calculations. But even as someone who is educated about these things, how do you weigh the potential upsides and the potential downsides.

I came across the concept of the [[thoughts/Collingridge dilemma|Collingridge Dilemma]] a while ago, which I think captures the [[thoughts/catch 22|double bind]] of technology quite well. In essence, it says that any efforts to influence or control further development of technology kind of faces a double bind, where you come across two irreconcilable problems. One is an information problem. You can’t really predict what impact your technology will have until it is extensively developed and widely used. But then, two, you also run into a power problem where by the time you’ve already extensively developed and put it into wide use, changes become too difficult because the technology has already become so entrenched in society. And at any point, it  is incredibly difficult to even begin to evaluate that type of impact. So, what is even the ideal place to start thinking about this impact?

**C:** Continually. You have to do it continually. You have to do it after deployment, you have to do it after it’s widespread. You have to do it continuously.

In academia, if you’re a sociologist or an anthropologist or in any of the social sciences, you have to go before an institutional review board when you’re planning a research or development project. One of the requirements for launching any such activity is having an effective plan for not only preventing harm, but mitigation plans when someone actually is harmed. We don’t see that same principle being applied to hard science, we don’t see it applied to engineering. Why not?

But to your point, it is very difficult to predict. One of the instruments that we’re developing at the Organization for Ethical Source is something we’re calling a priority of constituencies which comes from one of the [W3 specs](https://www.w3.org/TR/html-design-principles/#priority-of-constituencies) for HTML. So there’s this one sentence in the spec that was developed that said, in case of conflict, we “consider users over authors over implementors over specifiers over theoretical purity.”

When you draw a line like that, what you’re explicitly saying is that even if this makes it inconvenient for adopters, even if it makes it inconvenient for developers, even if it makes it inconvenient for end users, we have to make that decision based on the most vulnerable and work upward. It may be uncomfortable, but if the potential is there to reduce harm, to mitigate harm, or to have a plan for what to do when harm occurs, that cuts through a lot of the ethical gray areas.

**J:** I wanted to poke from the opposing side a little bit. I think there’s a non-negligible number of people who argue that by increasing consideration for [[thoughts/ethics|ethics]], even in the medical industry where I think a lot of this regulation is important, they say that the regulations are too tight to enable innovation at a speed that is continually beneficial to progress by imposing all of these restrictions on what you can do[^2]. It limits people from trying new things and innovating and developing new technologies that potentially could have far greater upsides than we could have predicted.

**C:** Every technology for the entire duration of human history has been modulated by understanding that it doesn’t exist in a vacuum, that it exists in an increasingly complicated sociotechnical space. There’s no telling ourselves that there’s neutrality. Doing so ignores the actual mechanisms of human community, human society, human civilization as a whole. So if that stifles innovation, if that means a given technology is five years late, isn’t it worth being careful? Isn’t it worth being safe?

Regulations are imperfect. But they are a way of codifying constraints or guardrails. And, you know, maybe it’s okay to slow down a little bit, right? If we’re gonna reduce harm, maybe it’s okay to slow down a bit.

## What can we do?

**J:** One take I have been seeing a lot is that top-down regulation is explicitly bad and we should “decentralize.” And I think one interesting aspect that I spend a lot of time thinking about is the value of decentralization when it comes to technology. A lot of these new technologies like blockchain treat decentralization as an end rather than as a means.

But there’s a lot of use cases that are very much building decentralized applications for the wrong reasons. I don't think decentralization is objectively a good thing [on its own], but rather something that can return agency to users. A lot of my research work this summer has been figuring out how to apply, for example, the net neutrality debate to data. The net neutrality debate was very much about separating content from providers; similarly, [[posts/towards-data-neutrality|how do we separate data from applications]]?

A lot of our modern centralized providers are incredibly successful and have such large [[thoughts/network effect|network effects]]. It is so hard to migrate from them because they have these huge data moats where it's impossible to just move from Facebook, for example, to some other provider that claims to be better. So a lot of it has been asking questions of how we reclaim agency for people to choose how to use their data, how they want to store their data.

I think the convincing case for decentralization is in terms of enabling agency for people to choose what types of frameworks they want, rather than having to be locked into these providers.

**C:** Twenty some years later, we’re never going to have an internet that’s 100 percent open source. And hopefully, we’ll never have an internet that's 100 percent closed or proprietary either. What we have to recognize is the reality of where we are — that we need more than data portability. We need data autonomy, and we need permeability between closed and open systems. And I believe permeability as opposed to mobility is an important aspect.

**J:** How would you differentiate permeability and mobility?

**C:** [[thoughts/credible exit|Mobility]] means you can export all of your tweets. Okay, well, what are you going to do with that? Can you import them into Mastodon? No. So when you withdraw your data, it becomes valueless. It's not in a form that you can ever reuse. So is that really ownership of your data? No.

**J:** Yeah, one common theme I am noticing in a lot of retrospectives of older peer-to-peer projects that have been alive for a while but haven’t really garnered any major usage is that they’ve thought about all these ways to create new shiny platforms that claim to be better or give more agency to users, but no one has really thought about how to off-ramp easily from existing systems to get people onto these new platforms.

**C:** I think the way we guarantee that kind of permeability between closed and open systems is through standards.

But the problem is that representation in these standards bodies are primarily private corporations, and they are trying to influence things. Logically, they will try to veto things that will probably impact their business models. Amnesty International actually wrote a paper in 2018 where they flat-out said that for platforms like Google and Facebook, their entire business models are predicated on human rights abuses and on harvesting data and surveillance capitalism. So we can’t expect those companies to do the right thing for the right reason. And those are the companies that have not only the economic power, but also power in the standards bodies and governing bodies. I think that reclaiming standards bodies is a way of having meaningful consequences for willful violations of standards. I think that’s critical.

**J:** I agree. At some point, being able to download the source code isn’t enough. Governance and accountability is critically important too.

What do you think the first step to reclaiming standards bodies even looks like? I read the [[thoughts/DID|Decentralized Identifiers (DID) specification]] a while ago and I remember that of all of the W3C members, only three members had formal objections about the proposal. They were Google, Apple, and Mozilla. When you propose new standards that inevitably will undermine the business model of these large companies, it feels incredibly difficult to get these pushed through.

Also, a lot of these standards and processes are illegible to people new to this space. I read a lot of these, like Internet Engineering Task Force (IETF) proposals, and they’re ridiculously long at times, often almost 100 pages. It feels like some of them require decades of experience working in the space to even begin to have a voice. It’s incredibly difficult for the average person to participate and make meaningful decisions.

So if you want to create a widely accepted standard, is there any way to do that without dismantling these original systems with these large corporations sitting on the standards boards?

**C:** I don’t know the answer to that. I don’t know how we do it. But I think we need to prioritize it. I think we need to figure it out.

There’s a growing trend: More people are asking the question of whether tech companies should pay for the tech that open source contributors are freely giving them today.

I think we have a lot of power. As participants and members in good standing in the open source community, we should find ways to hold these large players accountable, either by threatening their primacy through the development of alternatives, but also figuring out how can we pressure them to make governance as intentional, as equitable, as diverse as we’ve done within our developer communities.

It’s sort of a radiating effect, right? We’ve normalized codes of conduct. Now let’s normalize representative and equitable governance of open source projects. Let’s go a step beyond that and talk about standards and enforceable standards. And then beyond that, of course, we have the legal aspects.

I think of an InfoSec metaphor. You have a server on the internet. It is not secure, as it is impossible to secure any resource on the internet 100 percent. But what we do is we add layers of protection, layers of privacy, layers of security to make it not impossible to breach a system, but make it so involved and so expensive, that it’s no longer worth someone's while.

And I think that’s an approach that we can take with the development of ethical and equitable technology as well. If we’ve made it difficult for Google to sweep issues like accessibility standards under the rug, then we’re incentivizing them to do the right thing. Because if they don’t, they will lose status, they will lose their ability to draw employees. We as developers do have the ability to exercise some moral authority and we have the ability to decree meaningful consequences for the corporations.

## Where do we go from here?

**J:** How do you think we can best bring about these changes to build more ethical and equitable technology? The logical path forward seems to be either finding ways to empower a more diverse set of people to help build these standards and technologies or regulating how open source is used by these large companies through licenses and the law.

**C:** To be clear, ethical source is not about licensing. Ethical source is not about the Hippocratic License. It is not solely about legal instruments for trying to protect the vulnerable, marginalized, and under-represented. It’s bigger than that. It’s about codes of conduct. It’s about governance. It’s about social contracts and rights.

**J:** It’s about building those layers, right?

**C:** Exactly, that layered approach. I think it represents a movement to change our mindset to really ask ourselves some of these difficult questions, to look at who’s making the decisions around what technologies are developed. Are we comfortable leaving these decisions in the hands of those players?

It’s not a fire-and-forget thing either. It’s not a problem that we solve at the beginning and we’re good forever. These systems that can cause harm and perpetuate systemic inequities — they’re not static either. Just like how consent isn’t an event, it’s a process, harm reduction is also not an event, it’s a process.

And I think we have to start normalizing those processes [of harm reduction at all of these different layers], if we want any chance at all of allowing the internet to be the incredible force for good that it has the potential to be[^3].

And, as you said, part of that is being interdisciplinary, transdisciplinary, and multidisciplinary in our thinking. Bringing together the people who have different areas of expertise, whether it be technological or social in nature, because, you know, a lot of these problems that we’re facing have happened before. They’re not new problems.

**J:** I think a big part of this is moving beyond the individualistic perception of open source as a lone hacker in the basement and more towards curators and crafters of a community around this project that you’re building.

Based on personal experience, I think building a visible community around synchronous interaction with the actual users makes such a big difference when it comes to maintenance. As a maintainer or creator of a software library, most people are like, “I just want to make new features and do whatever works best for me.”

But there are so many edge cases and small bugs that don't work for a lot of users of your library. For example, users from Saudi Arabia said that they would really appreciate right-to-left support using Quartz. How do we enable people from all over the world who weren't necessarily the users that you initially had in mind to still be able to use the software and tools you make?[^4]

I think by curating a community that is open and accepting of more types of people and getting them to suggest and contribute.

**C**: Absolutely. And I think a lot of that comes down to ingroup-outgroup biases. Just look at it from the perspective of how much open source technology is simply tooling for people just like us.

**J:** Yeah. And I think this is a great call for more diversity in the space as well. A while ago, a friend and I noticed that the people who build developer tooling and tools for other developers do that because that’s the only problem they’ve really known their entire lives! And by bringing people who’ve had problems and experiences in other fields, then you start getting useful applications of technology in those areas. So this is a call for all types of people to contribute to technology, to contribute to open source in hopes of a more diverse future.

**C:** And we do that not through consultation, but meaningful empowerment. Getting people who are not like us in positions of power, by yielding power and distributing agency.

[^1]: This model emerged after reading "[[thoughts/The ones who walk away from Omelas|The Ones Who Walk Away From Omelas]]" by Ursula Le Guin for the second time. The story presents a classic utilitarian problem: is it morally justifiable to inflict suffering on one person in the service of others’ happiness (and a potential utopia)? Is it then morally just to develop technology to benefit others knowing that it will exacerbate the suffering of marginalized groups? Is progress to one person necessarily progress to the collective?
[^2]: Do we care more about technological progress or social progress? Historically, Silicon Valley has valued ‘[[thoughts/move fast and break things|moving fast and breaking things]]’, but progress implies direction. What is progress towards? Who decides that? The relatively new field of [[thoughts/progress#Progress Studies|Progress Studies]] attempts to critically take apart and answer this question, including looking at the potential drawbacks and mitigating risks of progress.
[^3]: Systems of feedback and regulation are incredibly important if we want to prevent absurd and tragic events from happening on the internet. As Ali Akkhatib states in his work [[thoughts/To Live in their Utopia|To Live in Their Utopia]]: "Absurdity follows when algorithmic systems deny the people they mistreat the status to lodge complaints, let alone the power to repair, resist, or escape the world that these systems create."
[^4]: Many treat algorithmic systems as ‘mathematically pure’ objects, taking only pure inputs and producing pure outputs. To these engineers, human lives are treated as ‘externalities’ that spoil that purity. Impacts on humans should be first an foremost. To quote [Runar Bjarnason](http://blog.higher-order.com/blog/2009/04/27/a-critique-of-impure-reason/) post on the future of software, “Why does a computer even exist? The reality is that computers exist solely for the purpose of executing programs. The machine is not a metaphysical primary. Reality has primacy, a program is a description, an abstraction, a proof of some hypothesis about an aspect of reality, and the computer exists to deduce the implications of that fact for the pursuit of human values.”
