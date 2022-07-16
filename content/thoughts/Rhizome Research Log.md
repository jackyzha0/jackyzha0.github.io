---
title: "Rhizome Research Log"
date: 2022-05-03
tags:
- evergreen
- rhizome
---

I think research logs tend to generally focus too much on what one did rather than what one felt. This log aspired to have a healthy mix of both.

## July
### July 15th
- Part of the nail of my left pinkie ripped off today argH it is now painful to type :((
- Realized that when doing site redesign, I lost a commit's worth of notes (sad) but also Obsidian Sync which I normally use for backup *also* expired today (double sad). Not as bad as it could have been though! Thankfully I commit often :)
- Spent a lot of time just reading today, a lot of different scattered blogs that I've been meaning to get to. [One link that was sent](https://generative-identity.org/human-identity-the-number-one-challenge-in-computer-science/?curius=1294) in the Metagov Slack particularly stood out to me though. It was on human identity and, more specifically, a critique of specifically [[thoughts/Self-sovereign Identity (SSI)|SSI]]
	- Long read but I think it captures a lot of my thinking around why I think [[thoughts/digital permanence|digital permanence]] is scary (and why I've been thinking about relational notions of identity!) TLDR;
		- The concept of identity is very noun-like (i.e. tied to physical traits and current state) in Computer Science + software systems
		- Contrasts with identity as verb-like (i.e. incredibly contextual, based on who you are with, how you are feeling, what experiences you have)
			- "The joins are the pathways for information exchange and transformation, for organising, and the expansion of organisational identity. Joins give the dots their meaning, their contextual relevance, their identity, just as dots give the information exchange direction and potency."

### July 14th
- Reboot published my research proposal / manifesto / essay on Rhizome and data-neutrality today!
	- [Check it out on Substack](https://reboothq.substack.com/p/rhizome)
	- Ben Tarnoff, the guy who cofounded Logic, actually read and [tweeted about it](https://twitter.com/bentarnoff/status/1547619611796914179) and readers seemed to resonate a lot with the post!
	- Two general sentiments:
		1. This project seems really exciting and I appreciate it recognizes existing work. What will get people to use this though? The social difficulty with "apps as a view over data" is that it requires users to understand data models and this consensus over data models has proven difficult
			- I agree with this evaluation and so far, feels unsolved. I think a promising solution is to think about it like how community-sourced types for TypeScript work. There's a whole open-source project that wildly popular that provides TypeScript definitions for plain JS libraries called [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (with over 12.6 million usages!). I think there's a potential for this to work with data schemas as well
		2. Well.. crypto/existing-thing actually solves this! Blockchain scaling techniques are getting pretty good, don't see why this work is necessary.
			- Again, true. I think these new technologies all seem really promising and I definitely try to keep up with all the developments in the space but my main concern comes from how convoluted these solutions are slowly getting.
			- A lott of smart people in crypto have been working on these problems for a while, I'm starting to think it might be easier to tackle it from the other side. Plurality of approaches y'know :))
- nobody: ...
   youtube: https://www.youtube.com/watch?v=g7MSfHEdxXs
- Going to read more about [[thoughts/causal tree|causal trees]] as a way of understanding more basic forms of [[thoughts/CRDT|CRDTs]] that value readability over correctness

### July 13th
- Feeling a little tired of just reading papers and coding
- Going to do a mental reset and just play piano for a while and then doing that person website redesign that I've been thinking about for a while now...
	- Update: this is so fun gah
	- Realized that the typography on the old site was kind of garbage and hard to read. Spent a bit of time reading up on good typography practices and it looks soooo much better

### July 12th
- Ok, a bit of a wrench in the system : ' )))) CRDTs are incredibly hard to reason with for the average dev and *cannot guarantee global invariants* without requiring consensus.
- Finished up CRDT implementation collection over at [[thoughts/CRDT Implementations|CRDT Implementations]].. I feel like I'm getting a better grasp at how to write op-based CRDTs but less so for state-based

### July 11th
- Seems like there are a lot of open research questions in CRDTs that I could plausibly spend *years* working on (e.g. undo operations in CRDTs, encrypted CRDTs using homomorphic encryption)
- I need to read more about this but it seems like most traditional consensus algorithms require synchronicity from all nodes for them to be considered honest. I wonder how we can reconcile this methods like CRDTs that allow for more asynchronous forms of consistency
	- Is it possible to take advantage of the partially synchronous [[thoughts/system model|system model]] and having CRDT-like behaviour in async modes and Raft/Paxos-like behaviour during synchronous periods for compaction
	- This is especially important as users will rarely have all (or even supermajority) of their nodes online at any given time. Will need to look into variations on Raft that tolerate live membership changes
		- "The network can partition and recover, and nodes can operate in disconnected mode for some time."

### July 10th
- A lot of good meditations on adoption of tech that gives agency to users at a Hack Night that Rishi hosted :))
- Currently at another session of the writing circle. Good to probably zoom out from a lot of the technical in-the-weeds work and re-orient about what this means for the average consumer
- Do people care about data ownership and data agency?
	- The average user probably doesn't. They want convenience and are comfortable with current options.
	- But as a counterpoint, if you ask anyone on the street whether they would be comfortable sharing their entire browsing history right there on the spot, my bet is that ~95% of people will say no
		- This could be a really fun social experiment: incrementally increase the amount you offer strangers to look at their browsing history
		- How much does the average person value their [[thoughts/privacy|privacy]]?
	- Another question is why having a *real person* snoop on your data feels so different than large companies snooping and *profiting* off of your data
		- I suspect a large part of this is due to learned helplessness
		- We haven't ever really known what it is like for companies *not* to be doing that
		- It feels abstract! A company remotely snooping on your data is something that a user could remain fully blissfully ignorant from
	- I think people don't care because they haven't known what a possible future could look like
		- People don't ask for cars because all they've known in their lives are horses. They can only think of faster horses
- How do we convince the average consumer that this is something worth caring about?
	- Near zero-friction doesn't necessarily people will want to switch to this new paradigm. It is still a non-neglible activation energy to move platforms
	- This probably won't happen unless there is both 1) a radical *push away* from existing centralized platforms and 2) a strong and convincing *pull towards* new decentralized platforms like Rhizome
		1. This is where I think regulation, anti-trust, and legal requirements for data usage transparency are incredibly important! There are institutions just as powerful as these large tech companies that can serve as a counterbalancing force too
			- This still feels incredibly difficult as these tech companies have started invading these regulatory bodies and holding immense lobbying power
		2. We do so by providing tangible and real improvements over existing products (that matter to the average consumer)
			- Never need to manage a million different accounts again
			- Local-first feels lighter and faster
			- Easily understandable ToS (people know what access are giving away)
			- End-user programming should be trivial and non-technical (i.e. making integrations like Zapier useless)
- Why would companies care about this model of computing?
	- tldr; building and maintaining a data moat is hard
	- Computation happens almost entirely on end-user devices, need to host massive infrastructure goes way down (unless you are doing heavy ML and info processing, which most companies are not)
	- New markets for lending compute to the masses rather than just to programmers and tech companies
	- Almost all the grunt work of data transformations is eliminated so companies can focus on business logic
	- GDPR compliance built-in, users have freedom to manage their own data
- Meta-meditations: this was incredibly helpful to iron out philosophy a bit more. I think this is starting to make more sense from both a user and company perspective, but only for people who *care* about these sorts of things. I think end-game is getting my Mom to understand why this is important.

### July 9th
- Various notes on CRDTs
	- Seem to require [[thoughts/consensus|consensus]] for state compaction
	- Learning about [[thoughts/clocks#Hybrid Logical Clocks|HLCs]] and maintaining [[thoughts/causality#Causal Order|causal order]] in CRDTs

### July 8th
- Learning more about [[thoughts/CRDT|CRDTs]], [[thoughts/Order theory|Order Theory]]
- I got my first email from a mutual which was along the lines of "help, I'm stuck in leetcode hell, how do I escape and do other things?"
	- I feel like I barely know what I'm doing, let alone ready to help another person along on their journey! I sent along a few questions that were really helpful for me when convincing myself to do this project and I hope it's useful.
	- Here was the email response I sent: ![[thoughts/images/Screenshot 2022-07-08 at 4.08.41 PM.png]]
- Had a great chat with Saffron today about some of the really cool research she's thinking about doing re: online identity and data agency.
	- This really would not have happened if Spencer hadn't pushed me to write a thread briefly summarizing what I was working on this summer. I've had a lot of super cool folks reach out and say that they are really excited by the work I'm doing! This is both reassuring but also extremely nerve-wracking. Expectations!!!! A concept
	- One point we talked about that I'm still ruminating on is the idea that selling data requires a baseline level of interoperability between two parties
		- How do current data markets work? If Facebook for example sells their data to another company, is it literally a raw export? How does that handoff happen and how do they ensure the format of the data they are using is understandable by both parties?
		- I think inspiring more thoughts on what potential business models could exist on a platform like this

### July 7th
- Finished up Tim Roughgarden's lectures on the foundations of blockchain which had some really useful theoretical details on traditional [[thoughts/consensus|consensus]] mechanisms which definitely solidified my understanding
- Currently at ~$900/mo in terms of sponsors and I'm just blown away by the volume of support people have expressed. This is more than halfway to monthly living expenses and it feels so close?
	- At first I was a little nervous because, y'know, that's a lot of expectation of producing something meaningful
	- But I think this is exactly the forcing function I need to be active in doing as much as I feasibly can and share as much as possible. Even if someone steals my idea and runs with it, so what? The future is pluralistic. If it's interoperable, it doesn't matter how many implementations there are!
- Read a really good paper on [[thoughts/neutrality|neutrality]] and learned about the [Data Transfer Project](https://datatransferproject.dev/)

### July 6th
- Holy shit [Morgan](https://twitter.com/morgallant), [Aadil](https://twitter.com/aadillpickle), [David](https://twitter.com/TheDavidZhou), and [JZ](https://twitter.com/jzlegion) just sponsored me for ~$400/mo for this research project and ... I am genuinely just speechless??
	- It's just so wild to me that this little project that I’ve just felt so strongly about because of reasons that still seem to evade words is something that other people are interested in seeing come to life too.
	- It feels like this project is a mountain I've set my sights on hiking for the longest time. And for a while I was hiking it alone, appreciating the scenery and the path but the path was lonely. But now I can hear the singing and laughing of my friends as people cheer and join along for the journey and it feels just a bit more manageable.
	- The generosity of these friends (shoutout to MFC and Anson) means that paying the next two months of rent and food isn't something constantly nagging at the back of my mind :')
- There were many points this summer I was fully ready to give up (see: plenty of mental breakdowns below) and stop trying because I questioned whether this was worth doing -- if I should just stop and get an actual job
	- I felt really silly for asking people to help financially on a project that I sometimes had trouble believing in too.
	- So thank you for your trust, thank you for dreaming with me
	- Today's soundtrack is from [La La Land -- Audition (The Fools Who Dream)](https://open.spotify.com/track/6j0wBBAP3hMe4t1Ymj7GIe?si=ef50241abfe04ac2)

![???](thoughts/images/IMG_1805.png)

### July 5th
- Finalizing notes on [[thoughts/Tendermint|Tendermint]] and wondering if I should switch out [[thoughts/Raft Consensus Algorithm|Raft]] for it. How valuable is [[thoughts/fault tolerance#Byzantine Faults|BFT]] anyways? Do we assume nodes are prone to potentially malicious takeover?

### July 2-4th
- An 'aha' moment caught in 4k... watch me try to figure out why asynchronous and partially synchronous [[thoughts/system model|system models]] aren't the same thing (s/o Sebastien for being so kind and patient). This was super satisfying! ![[thoughts/images/on-async-partially-sync-models.png]]

### July 1st
- Internet went out today halfway through watching lectures :(( 
	- Spent a bunch of time just reading books + thinking
- More notes from Tim Roughgarden's foundation course on [[thoughts/Public-key Infrastructure|PKI]], [[thoughts/Byzantine Broadcast|BB]], impossibility theorems, etc.

## June
### June 30th
- Settling into a better work rhythm I think.
	- Food here is surprisingly expensive but groceries is still miles cheaper than just getting Uber Eats everyday. 
- Have a sudden urge to work on my personal site but I will ignore that for the time being...
- Sebastien sent a [YouTube playlist](https://www.youtube.com/watch?v=KNJGPI0fuFA&list=PLEGCF-WLh2RLOHv_xUGLqRts_9JxrckiA&index=1) on the foundations of [[thoughts/blockchain|blockchains]] that have some sections which seem highly relevant. Slowly making my way through these

### June 29th
- Finally wrapped up school! Anson is headed back to Arizona today too :((
	- Living together has been a fun dance of trying to balance our energy levels, but felt very much like a team throughout. I'm really glad I chose to prioritize relationship, truly some moments over the past month where I was like "wow, is this real". It feels like I'm selectively giving deep attention in-turn to the things I care most about.
	- Now is the era to just fully focus my attention on research and this project though
- I think this finally means that the vast majority of my waking hours will be on research. Uninstalled a game I was spending way too much time playing :')' it is grind time

### June 27-28th
- Nearing the end of my literature review era. Still need to go through Braid/Redwood, SSB, Yjs, and Hypercore inner-workings.
- Thinking it might be good to do a general overview of [[thoughts/CRDT|CRDTs]] before delving any further

### June 26th
- Belinda and Athena from Incepto told me about an SF writer event which happens every week and I'm currently at it right now. So many people here are just working on such really cool things and I'm excited to potentially have this space as incredibly condensed resesarch + thinking time. I think this is a great forcing function every Sunday to just... orient myself for the week and get shit done.
- Talked with some really really cool people at a birthday party in SF which were surprisingly receptive and interested in my work. Will definitely follow up on these conversations.
- More research on [[thoughts/CouchDB|CouchDB]] and other database replication mechanisms to see what I can learn from it

### June 25th
- HackLodge meetup today, also met up with Spencer and Liam. Talked lots about the project then realized I haven't spent much time just... sitting down and grinding out work.
- A decent chunk of it is 1) summer courses taking up much more time than I expected them to and 2) wanting to meet people in SF and spend time with Anson while she is still in SF... priorities priorities
- To borrow words from Anson, it's "hermit time". I feel like I am definitely behind schedule in terms of what I wanted to get done by this point of summer and I need to put in some serious work and thinking into this project.

### June 24th 
- Reading about [[thoughts/Hyper Hyper Space|Hyper Hyper Space]], doesn't seem to place a big deal of emphasis on finality which seems important for a large chunk of applications.
- Open questions:
	- Append-only log or append-only Merkle-DAG? Leaning more towards log still for easy understandability + debug even though Merkle-DAGs are more expressive (and battletested in [[thoughts/blockchain|blockchains]] and `git`)

### June 20th - 23rd
- Reading about [[thoughts/file system#Virtual Distributed File System|VDFS']] (specifically Alluxio) and 
- Open Questions
	- Handling cases where data > storage availability
	- Checkpoint heuristics: when to checkpoint? especially important if Rhizome is to run indefinitely
		- "Lineage chains can grow very long in a long-running system like Alluxio, therefore the checkpointing algorithm should provide a bound on how long it takes to recompute data in the case of failures"
- Settling into new place, we cleaned out the garage (which is where I am staying) and made it somewhat liveable?? Took a lot of work, the previous tenant didn't even properly move out which was a stressor for a little while
	- Because there is no proper heating/cooling, sometimes I literally work with the garage door open for good circulation which gets me weird looks from the neighbours but it's fun
	- Incepto people have all been super nice and they are all working on/exploring cool things. I get a little distracted sometimes just working in the garage so it's really nice I can just hop over to the hackerspace in the house to get some more focused work done.

### June 16 - 19th
- Interact Retreat! Lots of good conversations about the work I'm doing which has been super clarifying for what type of explanation gets through to certain types of people
- Generally find framing it in terms of net neutrality but applied to data gets a lot of people excited about it, as well as meaningfully explaining + differentiating from Tim Berners-Lee's [[thoughts/Solid|Solid]] project and how Rhizome focuses on addressing main retro points from major p2p protocols.

### June 14 - 15th
- Mostly trying to answer questions around how [[thoughts/decentralized marketplace|decentralized marketplaces]] for demand work, looking at Golem and Orchid
- Lots of moving around (moved from Tempe to SF, about to head to Interact retreat!)

### June 13th
- Rough research notes and open questions on [[thoughts/DID#DWN|DWNs]]
- DID document needs to specify the service
	- Resolve a DID to web node URI
	- `did:example:123` -> resolve to Decentralized Web Node endpoint(s) -> `https://dwn.example.com`
- Raw vs Signed Data
	- Raw → only data + descriptor
	- Signed → data + descriptor + attestation (JSON web signature/JWS)
	- more details: https://identity.foundation/decentralized-web-node/spec/#message-descriptors
- Storing data relative to a schema
	- https://identity.foundation/decentralized-web-node/spec/#query
	- schema field in descriptor
	- JSON-LD + https://schema.org ?
	- or... openzepellin style, vetted schemas
	- data lensing should fit into this
- Permissions request
	- https://identity.foundation/decentralized-web-node/spec/#request
	- signed message
	- define scope
	- based on DAG commit range perhaps?
	- Potentially using [[thoughts/UCAN|UCANs]]
- Open questions
	- How does DID ownership work? what is it pinned to? is IPFS sufficient?
		- TLDR; DID needs to be generally anchored to something. Notes on [[thoughts/Sidetree|Sidetree]], a backend agnostic DID persistence mechanism
	- How do we make ownership/data management easy for non-technical people?

### June 11-12th
- Roadtrip with Anson! Much needed break to get a mental break and reset

### June 10th
- Spicy day today... Jack Dorsey just announced TBD working on Web5, supposedly an extra decentralized web platform (https://twitter.com/jack/status/1535314738078486533)
	- web5 seems to focus on the philosophy side a lot more than actual usability
	- Very similar to [[thoughts/WebID|WebID]] except anchored on bitcoin (lots of interesting stuff using [[thoughts/Sidetree|Sidetree]])
- Feel like a little boat in a big ocean where huge battleships drift by every now and then
	- Makes me doubt what I can really do as this small little boat
	- But reminded that steering my own little boat gives me agency as to what I can explore and do
	- The little boat that could

### June 9th
- Lots of research, mostly around [[thoughts/FOAF|FOAF]], [[thoughts/LDP|LDP]], [[thoughts/RDF|RDF]]
- Looked more into [[thoughts/decentralized marketplace|decentralized marketplaces]] like Raiden and Orchid to see how they handle payments
- Mostly just reading articles and specifications, your average day of research

### June 8th
- Got my first grant rejection from Emergent Ventures today :((
	- Feeling.. kinda numb? I feel like grand scheme of things it doesn't matter but this is the first *hard* no that I've gotten
	- Spent some time looking for some other grants but my conclusion is that I should spend more time getting shit done before asking for more funding.
	- I have enough in savings to last me until end of summer but it means I'll have to start contracting during the school year which isn't ideal, but gives me pure focused time this summer to just do research.
	- Onwards!
- Lots of really great bits from Browser Co's piece on Optimizing for Feelings
	- "Anything new is by nature without precedent — meaning, without data to know whether it will work or not. So when we approach building new things, we don’t optimize for metrics. We optimize for feelings"
	- "How do you feel when you finally step foot in your own living room, after weeks away from home? When you plop down on your own bed, or whip up a meal in your own kitchen? It conjures up a specific feeling, doesn’t it? That’s because these spaces are a reflection of you — created by you, for you. Software can feel the same way if individuals have agency and sovereignty over what is on their screens."

### June 4th - June 7th
- Getting back into a working groove after moving again, Arizona is ridiculously hot. Made the dumb mistake of walking to the grocery instead of taking transit lol
- Learned more about underlying datastructures of [[thoughts/IPFS|IPFS]] including [[thoughts/CID|CIDs]]
	- Potential for interop between IPFS and [[thoughts/DID#Creating DIDs using IPLD|DID Documents]]?
- More notes on [[thoughts/DHT|DHTs]] and [[thoughts/Kademlia DHT|Kademlia]] in particular

### June 1st - June 3rd
- Had a call with a few others folks working adjacent to decentralized infrastructure and people seemed pretty excited about the proposal! It was the first time in the past month that I felt pretty confident about the project when talking about this with others, definitely a personal milestone :)

## May
### May 28th - May 29th
- Attending friends' graduation for the past few days, crazy to think that this will be the last time I see some of these friends for a long time.
- Worked on thinking about and polishing my grant proposal, finally getting to some phrasings that resonate and sound good

### May 27th
- Finishing up `miniraft`, added tests for voting and fixed up some workflow stuff to auto-test and publish documentation!!! It's [published now on GitHub :))](https://github.com/jackyzha0/miniraft)
- Notes on [[thoughts/DID|DID]] which seems particularly applicable to the notion of identity + identity documents
- Once again had a breakdown :)) Constantly feel like I'm not doing enough and that time is slipping between my fingertips...

### May 23rd - May 26th
- Catching up on school work
- More reading + notes in [[thoughts/decentralization|decentralization]], [[thoughts/authorization|authorization]], and [[thoughts/federation|federation]]. Notable readings:
	- [IETF Draft on Centralization and Internet Standards](https://www.ietf.org/archive/id/draft-nottingham-avoiding-internet-centralization-03.html?curius=1294)
	- Gordon Brander on [Modularity](https://subconscious.substack.com/p/modularity?s=r&curius=1294), [weblike things](https://subconscious.substack.com/p/weblike-things?s=r&curius=1294), and [feudal metaphors for the web](https://subconscious.substack.com/p/web3?s=r&curius=1294)
	- [Fission on UCAN for serverless authorization](https://fission.codes/blog/auth-without-backend/?curius=1294)

### May 21st - May 22nd
- Packing + flights! I am now in Vancouver for the next week :))
- Hectic flying experience... didn't get much done

### May 20th
- Chatted with Justin Glibert who gave some very piercing advice
	- What is the most you can cut from your current proposal and have it still be meaningful?
		- *via negativa*: essentially the study of what not to do
			- In action, it is a recipe for what to avoid, what not to do—subtraction, not addition.
		- You can't know what is going to work but also you know there are things that are obviously not.
		- Don't try to think you are a god and reinvent everything from scratch. Don't catch NIH syndrome.
	- You only have 10 beautiful idea tokens in your life you want to do it so you should just do it
		- Don't just do the plumbing and make stuff you already are good at if you're trying to learn
		- If this is something you just want to work on (true in this case) then work on it with your full heart
	- Not being harsh because it's a bad idea
		- But rather I don't want you to waste your time. This is your last summer without 'real-world' responsibilities. I would trade so much to be in your position right now.
		- I am being harsh so that you spend your time wisely and don't do something stupid.
- Technical thoughts
	- Is Rhizome actually a generalized form of state channels?
		- EVM + Solidity on top of little chains between people
		- Minecraft on top of this to build engines like https://www.worldql.com/

### May 19th
- Proposal re-writes + more research today, got a lot done in office today and still had time to head to Central Park to read... a great day all things considered.
- Open questions from today's reading + writing:
	- How do identity 'clusters' or organizations/groups of people work? How are they represented?
		- Perhaps instead of having separate instantiation of your identity on fixed set of apps, we can have the same identity with separate instantiations of the app?
	- Who runs cloud peers?
		- Have a global marketplace where people can list/sell spare compute and storage
	- Who does the compute?
		- Most apps are lightweight to run on people's own devices
		- The main reason we've needed massive datastores and compute centers in the first place is because large companies have centralized billions of people's data into their own servers
		- Cloud peers can offload and perform heavy lifting if necessary
- More meditations on identity and data
	- Thinking about how data exists only as *relations* between things... how do we preserve this?
	- 'Data' is data in the context of that user (or group of users) using that specific application
	- Learned about the concept of [[thoughts/Zooko's Triangle#Petnames|petnames]] in more depth today and there's a really cool way of thinking about identity here perhaps
		- Almost all of the contexts in which we collaborate are not global. The *you* I know is likely different from the you your family knows. Identity should be relational rather than standalone?

### May 18th
- Grant writing + Verses proposal wrangling
- Had Anson tear apart my proposal today
	- It was so incredibly helpful to get that level of honest feedback but I just feel in the dumps right now LOL I need to figure out how to untie my own self-worth from my work
	- I expect something similar will happen when I meet with Justin.. and many more times this summer
- Good feedback is equal parts bitter and sweet
	- Bitter in that it tells you the harsh truths that few have the courage to
	- Sweet in that they truly care enough and have enough faith to point harsh truths out
	- "When you’re screwing up and nobody says anything to you anymore that means they’ve given up on you…you may not want to hear it but your critics are often the ones telling you they still love you and care about you and want to make you better." ― Randy Pausch, The Last Lecture

### May 17th
- Went to NYC to work at the Thrive Capital office with some Interact folks and wow... the difference being outside and in a good working environment makes is ridiculous.
- Migrated all the tracing stuff out of `server.rs` and `log.rs` into its own file. Makes the code a lot cleaner to work with.
- Deleted `transport.rs` (and moved the contents into `tests/common.rs`) now that it is no longer a part of the server. Realizing now I'll probably need to do another refactor of the transport layer to support simulating network partitions, dropping packets, etc. so I have more surface area to test with.
- Talked with Sebastien who has been doing independent research for almost a decade now. Mentioned that I was really feeling like I was in the depths of the Valley of Despair and he just laughed and said "that was me 10 years ago and I still feel that way." Horrifying but also weirdly comforting? He gave me some advice and thoughts (mostly with regards to independent research but honestly a lot of sage life advice too):
	- In independent research, one often pendulums between two brains that drive your day-to-day
		1. Brain 1: I want to make change in the world, I want to ship and build
		2. Brain 2: I want to *understand* why this works the way it does
		- It is almost always Brain 2 thinking that leads to incredibly high payoffs in clarity and increased conviction.
	- Still, breaking things into legible pieces is important. If not for other people, for yourself to have small wins.
		- Don't build for the sake of building, build as a by-product of understanding
		- Don't get trapped in the mindset of having every little thing you do fit perfectly in your grand master plan.
		- It is sufficient to do things to learn and to understand (even if just about yourself)
	- Don't have conviction that you are right because that will lead to disappointment. Have conviction that you will learn regardless.
		- He flew out every weekend from SF to San Diego just to attend a lecture from a professor he really liked and he said it was worth every flight.
	- Often times, it is one core principle that if followed to its natural conclusion/end will result in a fundamental perspective shift (e.g. quantum mechanics).
		- What is that core principle that sits at the heart of everything you find interesting? The connection between the dots is only evident in hindsight so don't spend too long thinking about it. But just follow your gut, it right more often than not.
- To be honest, I don't really understand all of this advice yet and I don't pretend to but at the moment, it gives me comfort that even if there isn't light at the end of the tunnel, the darkness will still be enjoyable

### May 16th
- Grant writing again... Finished rough draft for Protocol Labs RFP 000 and writing EV grant proposal + getting feedback
- Had a mini-breakdown today after realizing I am just not enjoying this as much as I thought I would be. I'm often spending 12+ hour days writing code or grants and I just feel so behind. And I don't get why!!!! I've been looking forward to this summer for so long.
	- I think financial uncertainty is becoming more real day after day... really hoping that one of these goes through and is successful
	- It's too early to quit. There's still so much more to build/learn/do/write and I'm not ready to throw in the towel just yet.

### May 15th
- Family roadtrip, no work today :)

### May 14th
- Finish testing harness - it looks so pretty!
- Finally updating research proposals after putting it off for 3 days. I suspect I'm using `miniraft` as an excuse to avoid the grant writing because making things legible is hard!! I'd much rather write code and look at pretty command line outputs instead but this is important work that needs to be done.

### May 12th - May 13th
- Reaffirming myself that a lot of this is necessary learning and this is a worthwhile project
	- Not sure if this is actually true
	- But more so convincing myself of it so that I have the energy/motivation to go through with it
- A lot of technical refactoring going on to accommodate unit testing
	- Removed a lot of unnecessary lifetimes while changing `RaftServer` functions to return a vector of sendable messages rather than directly having each server hold a mutable reference to the transport layer (Rust doesn't allow multiple mutable references without a `RefCell`!)

> Let's say you want to become good at [x].
> 
> It's almost impossible to do it because every day on Twitter you have friends who’ve raised 6 million to do crazy stuff. And so every single day, you open your books, and you take your notes and you start writing stuff, and you have to solve those equations.
> 
> And every single day you tell yourself, why am I doing this?
> 
> I could just go out and bullshit investors and build a company. And I think too many people actually do that. Myself included. I managed to resist for a while and I spent a lot of time learning different, difficult things, but it's very hard not to have ADD in this world. It's very hard to stay focused on important things that take a while to be learned.
> 
> - [Justin Glibert on doing hard things](https://masterplan.substack.com/p/master-plan-justin-glibert-foundation?curius=1294&s=r)

### May 11th
- Finished the first pass of implementation of `miniraft`! In the midst of adding test infrastructure and verifying correctness of the implementation.
	- Probably spent tooo long making it look nice but hey, if I'm going to be spending hours looking at this it might as well be good to look at
- Also spent an hour trying to debug a test only before realizing `cargo test` runs in parallel so debug messages were out of whack
- Feeling quite demotivated regarding overall self-belief in the project even though I'm only 11 days in! Been trying to explain Rhizome to a few folks who have experience in the space and it is often so intimidating.
	- Like yeah, I know this probably isn't the best way to go about it. Maybe they'll tell me what I'm working on is a long solved problem and I'm wasting my time. Or "couldn't you just use x and y to achieve the same effect"? I can't help but sometimes feel like I'm wasting my time -- there are so many smart people working on the same problem, what makes me feel like I can be the one to make a meaningful contribution to it?
	- I know that regardless of whether this project succeeds a lot, I'm already learning a lot in terms of technical skills and also about myself in the face of uncertainty and more independent work so I will take that as a win regardless.

### May 10th
- Discussing grant proposals with Verses folks, doing a lot more grant/proposal writing than I'd like these days
- Finished most of `miniraft` logic up until `commit_log_entries`. Still need to add tests though :')
- Tech bear market isn't promising for raising funding, esp for more experimental/greenfield work like this :((

### May 9th
- Literally just wrestling with Rust's borrow checker because `dyn` traits are funky :((
	- Ran into a really weird design problem where I wasn't sure how to order the lifetimes of the log or the state machine (should the app own the log which owns the state machine? should the log hold a reference to the app)? 
	- I opted to construct the application first then pass a pointer to the log so that when appending entries to the log, it can just call `self.entries.iter().for_each(|entry| self.app.transition_fn(entry))`
- Finally caved and watched an hour long video on closures, `Fn`, `FnOnce`, `FnMut`, boxed closures, and function pointers ([Jon Gjengset, I owe you my life](https://www.youtube.com/watch?v=dHkzSZnYXmk&t=3005s))
	- Feels really stupid but it was literally a change from `&'s mut dyn App<'s, T, S>` to `Box<dyn App<T, S>`
	- When lifetimes get as messy as they did, there's probably a cleaner way to do it with a heap allocated value :)) Use `Box` more often!

### May 8th
- Sketching out grant proposals to Emergent Ventures + Protocol Labs
- Had a chat with Sebastien about research institutes and what long-term support for work like this could look like in the context of Verses
- More implementation work for `miniraft`, about halfway done I think?
- More of a slower day to spend time with family for Mothers Day :)

### May 7th
- Does not seem promising that my research work will be support by Verses this summer...
- Looking for other places to apply for funding but ugh this is unfortunate
- Lots of coding today for `miniraft`! Finally feeling like I'm becoming more fluent in Rust. Figured out some nasty named lifetime stuff today by drawing a few diagrams and kinda feel like a wizard!!! Small wins

### May 6th
- Mostly writing up recent learnings and incorporating them into the [[thoughts/Rhizome Proposal|research proposal]]... lots of words today
	- Sometimes I feel like I'm doing research to be able to do more research...
- I think I am finally getting to a point where Rhizome is making more and more sense and obvious why it is necessary
	- I started this project/research very much like "oh wow, this is a cool set of technologies and here are some vague words and feelings about what I think is inadequate in the space" and it has sort of refined itself into a clear use case!
	- Came across the concept of a "cloud peer" today in Hypercore documentation and it was like "WOW I had this exact same idea and they already have a name for it" and it was so cool
	- Really excited about this future of 'personal cloud computing'
	- I think this summer will be mostly focused on the data replication / identity aspect of Rhizome, realizing that I think I was way too ambitious with my first proposal
- More implementation on `miniraft`. Rust feels so slow to get back into a 'de-rusted state' (hah) where code just 'flows'. It feels fun though! Type system reminds me a lot of Haskell.

![[thoughts/images/rhizome-may-6.jpeg]]

### May 5th
- Finishing up [[thoughts/distributed systems#Martin Kleppmann's Course|Martin Kleppmann's Course on Distributed Systems]]
	- Cleaning up notes into atomic concepts that I can reference
- Continuing implementation of `miniraft`
- What if... Rhizome had built in mechanisms for managing 'branches'
	- Default branches are single stream
	- To make a collaborative doc you can 'fuse' or 'join' branches together temporarily to sync them with each other
		- What if we made something on top of `git` like this that actually functions on a syntax level rather than a character level... one for the [[thoughts/idea list|idea list]]
	- Pace layers for collaboration
		- Real-time (keystroke-by-keystroke)
		- On-click (manually click refresh)
		- Suggest changes (like Google Docs, accept/reject)
- Agreeing on what operations a [[thoughts/CRDT|CRDT]] can perform still seems to be difficult ([see 1hr into this talk](https://youtu.be/Qytg0Ibet2E?t=3665))
	- Possible room for data lensing on public schemas to be useful here

### May 4th
- Skimming [[thoughts/distributed systems#Martin Kleppmann's Course|Martin Kleppmann's Course on Distributed Systems]]
	- Really good foundation to work off of
	- Learned about differences between physical and logical [[thoughts/clocks|clocks]] and realizing that `miniraft` should probably use some sort of [[thoughts/clocks|logical clock]] rate

### May 3rd
- Read about more [[thoughts/NAT#Efficacy|NAT traversal and holepunching efficacy]], turns out hole punching is just not as reliable as I thought it was
- Compared more traditional consensus algorithms like [[thoughts/Raft Consensus Algorithm|Raft]] to [[thoughts/Solana|Solana]].
- First formal architecture sketch?
	- Need to read more about DID and IPFS but this seems like a promising start?
	- Each user is essentially a DID that is associated with an IPFS document that references a bunch of other things
		- Each device in the devices array runs a Rhizome Node which is essentially a wrapped IPFS node that pins the user IPFS object and can edit it
		- Right now, this means that if all a user's devices are offline, those files are unreachable. For people who still want their stuff to be replicated online, perhaps can integrate FileCoin to incentivize other nodes to pin their document?
	- The devices array is also used by Raft to coordinate what devices should be included in the cluster
		- Modifications in the devices array leads to a Raft configuration update
		- All devices that are reachable sync via Raft to keep an `appState` object up to date for the user
		- When any `appState` log gets too long, it is snapshotted by the leader and persisted in IPFS.
	- All the questions that are unanswered right now are in red. Lots of unanswered questions :))
		- How does auth work for applications?
		- How will schemas be published? Is there an app store?
		- Who runs the web host? Is it self-hosted?
			- What about non-technical people?
		- How is a user created?

![[thoughts/images/rhizome-may-3.jpeg]]

### May 2nd
- Mostly reading about [[thoughts/Raft Consensus Algorithm|Raft]] consensus algorithm today and understanding how it works
	- Always wondered how these consensus algorithms deal with bad actors -- turn out they don't! That's where [[thoughts/fault tolerance#Byzantine Faults|BFT]] comes in
	- Seems to be promising for replicating between trusted peers (potentially applicable)
- Starting a very minimal stripped down implementation of [[thoughts/Raft Consensus Algorithm|Raft]] in Rust I am nicknaming `miniraft`. Code [here](https://github.com/jackyzha0/miniraft) (but will most likely be private until it is done).

### May 1st
- Settling back into home, general research reading + writing [[thoughts/Rhizome Proposal|the proposal]]
- Read various papers
	- [[thoughts/internet computing#Changing an entrenched internet|Changing an entrenched Internet]]
	- [[thoughts/mechanism design|Mechanism Design]]
	- [[thoughts/Raft Consensus Algorithm|Raft]]
- Learned about the basic premise of [[thoughts/Self-sovereign Identity (SSI)|SSI]]