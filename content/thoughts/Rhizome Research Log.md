---
title: "Rhizome Research Log"
date: 2022-05-03
tags:
- evergreen
- rhizome
---

## May
### May 20th
- Chatted with Justin Glibert who gave some very piercing advice
	- least amount of work and most impact
		- via negativa -> essentially the study of what not to do
			- In action, it is a recipe for what to avoid, what not to do—subtraction, not addition, say, in medicine.
		- can't know what is going to work but also dont do stuff that is obviously wrong
		- dont try to think you are a god and reinvent everything, thats what the urbit guys did
	- dont be in the middle
		- either write a blogpost at the end focussing on your learning making it clear that you don't expect anyone to use it
		- or make it small and meaningful enough that people will
		- counterpoint: what if i just want to work on it for the sake of working on it
	- 10 beautiful idea tokens in your life you want to do it so you should just do it
		- dont just do the plumbing or work to justify your idea
		- if this is something you just want to work on (true in this case) then work on it completely
	- not harsh because its a bad idea
		- last summer without responsibilities
		- i just dont want you to waste time
	- is this actually a generalized form of state channels ??
		- evm + solidity on top of little chains
		- minecraft on top of this → building engines like https://www.worldql.com/

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

### May 12th + May 13th
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