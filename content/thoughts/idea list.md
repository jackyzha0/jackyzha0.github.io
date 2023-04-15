---
title: "Idea List"
date: 2021-06-17T00:33:42-04:00
tags:
- evergreen
---

## Technical
- quartz v4
	- side notes https://christophlabacher.com/notes/ethnographic-research-on-dynamicland
	- voice over support, similar to substack
	- rewrite for v4 to make it a CLI binary that is a one-line install
		- `quartz new`: make a fresh, empty quartz with CLI prompts for setup
			- walks through all steps with dialog prompts for confirmation at each step
			- should make onboarding significantly easier
		- `quartz import`: import an existing folder
			- Can write custom parsers for different flavours of Markdown. Default will only support Obsidian but would be trivial to add parsers for Roam, Logseq, Notion, etc.
		- `quartz update`: update Quartz binary using upstream
		- `quartz preview`: local preview
		- `quartz push`: push changes to remote
	- ingest (rewrite of hugo-obsidian)
		- base Markdown processor using remark (this should solve a bunch of the hacky markdown textprocessing that is currently being done)
	- output: HTML + indices
		- replace Hugo with [astro](https://docs.astro.build/en/guides/markdown-content/)
		- astro allows passing indices to each page so building plugins is pretty trivial
		- rss feed
	- custom plugin system for configuration
		- latex
		- graph
		- contextual backlinks
		- command bar
		- search
		- admonition callouts
		- light/dark mode
		- clipboard + title for codeblocks
- markup any site with a webcrawler + yjs + tldraw
	- markupthis.site is not taken!!
- daily link share
	- inventory packing simulator but its with tabs... what would affect tab size? length of article == perceived weight in bag?
	- what if you could bring your little backpack of tabs with you to a square or market and trade your tabs with other people
- WASM-based `npm` with [[thoughts/CID|CIDs]] distributed using a [[thoughts/Sloppy Hashing DHT]]
- https://blog.adamant-lang.org/2019/rust-lifetime-visualization-ideas/ but with vim gutters and program slicing
- rotmg but actually good lol
	- dodge mechanic
	- no instakill, should be iframes and way less health (similar to EtG)
	- keep soulbound mechanic
	- no screen rotation
	- multi-floor dungeons, take more inspo from roguelites
	- crowdsources levels + bossfights - community rating system like how Geometry Dash does it
	- should have one free key a day
	- actual good graveyard mechanics to look at past runs/chars
- latency based quorum sensing, similar to how bacteria release a particular molecule and behave differently if sensors of the molecule are particularly active
	- see also: [[thoughts/Sloppy Hashing DHT]]
- [duplex](https://ai.googleblog.com/2018/05/duplex-ai-system-for-natural-conversation.html) and [whisper](https://openai.com/research/whisper) to interact with notes
	- automatically identify and converse about outdated notes
	- update notes in place
	- https://azure.microsoft.com/en-us/products/cognitive-services/text-to-speech/#features
- calvin and hobbes semantic image search
- IPFS as a versioned package manager for all software
- [webgpt](https://openai.com/blog/webgpt/) but its for tools for thought
	- "A [reader-generated essay](https://escapingflatland.substack.com/p/reader-generated-essays) is what you get when you can go into someone else’s knowledge graph and make a linear journey through the network, while GPT-5 generates a just-in-time essay that is human-readable."
	- turning a graph traversal into a beautiful essay
- a text experience where latency increases as more texts are sent
- what does entropy + erosion of data look like
	- is they ways to make [[thoughts/cryptography|cryptography]] that are valid in time windows?
- treesitter based CRDT for smart [[thoughts/git|git]] merges
	- https://www.wilfred.me.uk/blog/2022/09/06/difftastic-the-fantastic-diff/
- big touchscreen desk
	- what if i just got a huge old flatscreen tv
	- mounted 4 pressure sensors on each corner and then got a big sheet of thin glass
	- 4 points is enough to pinpoint single-point touch accurately for dragging
	- what if you could use it like a scratch space? like an always available figjam/muse board that also supports linking and trails a la [[thoughts/tools for thought#Memex|memex]]
		- a vision of [communal computing](https://interconnected.org/home/2021/12/21/sage) perhaps
		- a shared screen which anyone can 'connect' to as an external display
		- anyone can drag windows/files to and from it
- wave function collapse for poetry
	- bringing shape-shifting text to its most literal form
	- [https://oskarstalberg.com/Townscaper/](https://oskarstalberg.com/Townscaper/ "https://oskarstalberg.com/Townscaper/") for words
	- base representation is word vectors
		- you can jiggle word vectors around
		- apply transformations to vectors (e.g. the past tense vector)
		- some sort of 1d marching cubes which modifies a vector depending on context?
			- potentially transformer related
	- image <-> text interop using CLIP/unCLIP/DALL-E?
- better search
	- searching through vectors
		- (no clue if this would work) integral images but applied to vector similarity search in text documents
		- viola-jones for text [[thoughts/latent-factor model|embeddings]]
		- https://github.com/facebookresearch/faiss
	- how do we encode sentences/paragraphs/documents as vectors?
		- https://beta.openai.com/docs/guides/embeddings/text-search-using-embeddings
		- https://github.com/ryankiros/skip-thoughts
		- https://github.com/pytorch/fairseq/tree/main/examples/data2vec
- baba is you but for browser interactions
	-   data plane is main source of truth
		- optionally replicated using [[thoughts/Rhizome Proposal|Rhizome]]
	-   data inputs like webcam, keyboard, mouse, window size, etc.
	-   relations are from data plane → data plane (no functions!)
		- e.g. x bounces off of y
	-   rendering using canvas (higher performance games/interactions) or plain html elements (UI)
- data provenance
	- https://www.cs.cmu.edu/~NatProg/whyline.html
- how do we design better UI that reflects true application state?
	- https://www.scattered-thoughts.net/writing/relational-ui/
	- CRDTs as reducers over event-logs... that produce a view?
- data lensing for databases
	- using https://www.inkandswitch.com/cambria/ maybe?
	- some cool [interoperability](thoughts/interoperability.md) things
	- CRDTs for databases? https://archive.jlongster.com/using-crdts-in-the-wild
		- https://cse.buffalo.edu/tech-reports/2014-04.pdf
	- distributed state
- tools for thought applied to IDEs?
	- IDEs as graph editors?
-   LayoutLM + screenshots → auto-categorization of knowledge
	- https://screenotate.com/ but with atlas recall
    -  maybe turn this into an app which auto-extracts semantic info from screenshots/images on webpages and does something w it idk
    - how do we prevent https://twitter.com/rsnous/status/1130910375795277824
-   Marginalia for the web? browser as a graph database, chronological browsing?
    -   what if you could 3 finger swipe up on a browser to see what pages this page is connected to in a graph
    -   and you could write on the margins of pages and share those with friends
        -   a little annotated web
-   location-based ephemeral social groups with zero-knowledge proofs on location
    -   each location/city has a chat group which has a compound hash of all people in that location, derive only a boolean of whether a person is in a city or not without revealing exact location
    -   when a person leaves/arrives at a city, city hash is updated
- Conversational GPS
  - why do we even look at a screen when we can just ask for directions as if it was a normal person lol
- sound-based hashing for cryptographic verification
- google photos + olo radio (see [attention economy](thoughts/attention%20economy.md))
* web3 action-space exploration
	- chain crawlers indexing smart contracts → creating logical relations
	- prolog goal-first search? how can i prove that I can transmute resource A into resource B using relations on the network?
	- suggesting what you can do with existing resources in your wallet
		- over time, emergent best-practices develop (i.e. whats the most obvious thing to do after you buy BTC, what does this [NFT](thoughts/NFT.md) enable me to do?)
* DreamCoder boolsat
	* Creating a LISP-like higher-order language to exploit reusable sub-proofs in specific domains (e.g. graph colouring)
	* kinda iffy on the sat problem solver using dreamcoder, not a lot of exploitable structure in the proofs (otherwise we'd have a more reliable human method)
	* Background:
		- https://en.wikipedia.org/wiki/Boolean_satisfiability_problem
		- https://searchworks.stanford.edu/view/13250178
	- NeuroSAT Paper:
		- https://arxiv.org/pdf/1802.03685.pdf
	- DreamCoder Paper:
		- https://arxiv.org/pdf/2006.08381.pdf
		- https://www.youtube.com/watch?v=qtu0aSTDE2I
* Shale: the cloud-native scripting language
	* things to prioritize
		1. great tooling and extensibility
			1. static type hinting (great compile errors that detail relevant variables and possible fixes)
			2. full HTTP server and request engine
			3. compiles down to bytecode using LLVM (find some go/rust bindings for this)
			4. URL-based module imports
		2. easy to read code
		3. features u love
			1. pattern matching `match n { ... }`
			2. a block `a = { ... }` is just a zero-arg anon fn `a = () => { ... }`
			3. object and array destructuring (same as JS)
			4. option container
				1. built-in retry mechanisms on failure
				2. null coalescing for sensible defaults (converting `Option[Int]` to `Int` for example)
			5. function chaining (really just function composition) `123 -> a -> b` is equivalent to `b(a(123))`
			6. fat arrow fns `someFn = a => b`
		4. proper stderr for errors (works well with UNIX pipes, can also read STDIN using `input`)
	* notes on syntax
		1. function chaining using the pipe `->`
		2. fat arrow functions `=>` return by default unless you include curly braces (then explicit return is required)
		3. type checking is OPTIONAL (using `::`)but if annotations are provided, will be caught at compile time (default type is `Unknown`)
			1. explicit casting can be done using the `as()` function
			2. can include `const` to prevent mutations
* Better personal analytics
	* small js bundle
	* doesn't sell user data!!
	* things to track
		* rough location of each user
		* total users
		* user visit distribution vs time
* living room
	* recreating [communal living spaces](/thoughts/communities) in digital space
	* [ephemerality](thoughts/ephemereal%20content.md) and [digital permanence](thoughts/digital%20permanence.md)
- tabfs but for emails
	* [https://bazil.org/fuse/](https://bazil.org/fuse/)
	- [https://blog.gopheracademy.com/advent-2014/fuse-zipfs/](https://blog.gopheracademy.com/advent-2014/fuse-zipfs/)
	-   listen on any email server
-  deep foveal VR rendering

## Writing
- Short stories/speculative fiction
	- [[thoughts/CID|CID]] as the library of babel
	- Interplanetary communication / state machine
	- Packet switched electricity
	- saving sun for later
		- make something we take for granted extremely scarce
- Poetry
	- We like sunset because it's the only time we see the cosmos move
- Essays
	- Analog software: software by analogy and by atomic building blocks that interface with each other
		- We should be able to directly manipulate them, like files, rather than only indirectly work with them, like layer activations in a neural network.
		- Software representations for similar ideas should be obviously similar in some way – they should click together, or look similar, or feel similar to the touch.
		- Ideas should remember where they came from – what blog I copied it from, which author I quoted it from, and so on.
	- essay on epistemic play + jestermaxxing + mill’s take on why censorship is unethical
	- limits to [[thoughts/Byzantine Faults|BFT]]
		- some malicious activity is indistinguishable from legitimate activity (e.g. deleting a document)
			- *semantic* byzantine fault tolerance vs protocol byzantine fault tolerance
		- Making distributed systems reliable is inherently impossible; we cling to Byzantine fault tolerance like Charlton Heston clings to his guns, hoping that a series of complex software protocols will somehow protect us from the oncoming storm of furious apes who have somehow learned how to wear pants and maliciously tamper with our network packets. (*[The Saddest Moment](https://scholar.harvard.edu/files/mickens/files/thesaddestmoment.pdf)* by James Mickens)
		- "I have never had a real-life experience that resembled a Byzantine fault tolerant protocol."
	- against recipes
		-   recipes are for reproducibility, determinism → and thus fungibility
		-   bad for creatives? or anything that is high flux
		-   how does this differ for rules, traditions, social norms, algorithms
		-   redistributes the interestingness into the hands of a few
			- [[thoughts/Seeing like a State]]: similarly concentrates the autonomy and agency of decision making around city planning
	- [[thoughts/independent research|independent research]] is applied [[thoughts/taste]]
	- Good [[thoughts/search|search]] (aggregators) turns random networks into scale-free networks (see: [[thoughts/Network Theory|network theory]])
		- Servers are just clients that are located in a particular position in the network, and that are not the source of truth for any data; these nodes serve only to reduce latency in the system by replicating information.
	- a brief history of time