---
title: "Project Idea List"
date: 2021-06-17T00:33:42-04:00
tags:
- evergreen
- technical
---

## Ideas
- data lensing for databases
	- using https://www.inkandswitch.com/cambria/ maybe?
	- some cool [interoperability](thoughts/interoperability.md) things
-   app agnostic channel-based/event-driven communication using hypercore
	- e.g. wait for message of type x
	- hypercore as a universal message bus
- canvas identity primitive
	- allow users to register 3p providers that use signing
-   tools for thought applied to IDEs?
	-   IDEs as graph editors?
- permaweb npm?
	- pinning specific code versions
-   LRU blockchain
	-   RBAC blockchain???
	-   groups of roles
	-   mutability in a window
	-   permanence outside of it
	-   edit only the last message you send
-   recaptcha model for moderation / proof of humanity
-   library of decentralized data structures
-  website inspo
	- fun interactions
		- https://victoiredouy.com/about
		- http://www.narrowdesign.com/
		- https://remix.run/
		- https://lynnandtonic.com/
		- https://thebrowser.company/
	- misc
		- https://shapefarm.net/
	- 3d
		- https://chartogne-taillet.com/en
		- https://flowersforsociety.com/
		- https://bruno-simon.com/
		- https://danny-garcia.com/
		- http://richardmattka.com/prototypes/red-shift
	
-   LayoutLM + screenshots → auto-categorization of knowledge
    -   maybe turn this into an app which auto-extracts semantic info from screenshots/images on webpages and does something w it idk
    - how do we prevent https://twitter.com/rsnous/status/1130910375795277824
-   Reverse of the above? using LayoutLM to create semantically useful webpage annotations for those with reduced vision
-   Marginalia for the web? browser as a graph database, chronological browsing?
    -   what if you could 3 finger swipe up on a browser to see what pages this page is connected to in a graph
    -   and you could write on the margins of pages and share those with friends
        -   a little annotated web
-   location-based ephemeral social groups with zero-knowledge proofs on location
    -   each location/city has a chat group which has a compound hash of all people in that location, derive only a boolean of whether a person is in a city or not without revealing exact location
    -   when a person leaves/arrives at a city, city hash is updated
-   p2p reddit w custom chain crawlers and the ability to bake keys into content
-   autocomplete for rendered latex with a computer algebra system
- Conversational GPS
  - why do we even look at a screen when we can just ask for directions as if it was a normal person lol
- Discord bot for interacting with DAOs
- aws for web3
- tool to [interoperability](thoughts/interoperability.md) between different graph representations
	-   e.g. Notion to Roam to Obsidian
	-   CommonGraph??
- sound-based hashing for cryptographic verification
- google photos + olo radio (see [attention economy](thoughts/attention%20economy.md))
- (no clue if this would work) integral images but applied to vector similarity search in text documents
	- viola-jones for text embeddings
* web3 action-space exploration
	* Possible referents/verses extension?
	- chain crawlers indexing smart contracts → creating logical relations
	- prolog goal-first search? how can i prove that I can transmute resource A into resource B using relations on the network?
	- suggesting what you can do with existing resources in your wallet
		- over time, emergent best-practices develop (i.e. whats the most obvious thing to do after you buy BTC, what does this [NFT](thoughts/NFT.md) enable me to do?)
* [Tools for Thought](thoughts/tools%20for%20thought.md)
	* write first, organize later
		* good daily notes, choose what to carry over from the previous day
	* block based editors are neat cause i can move stuff around really easily
		* if u drag outside the page it makes a new note, super easy to break down big complex topics into more granular/atomic notes
		* spatially consistent? [memory palace](thoughts/memory%20palace.md) vibes -> https://twitter.com/jordanmoore/status/1418942880941477891
	* card based backlinks/outgoing links
		* on the left, you can see all the notes that link to the current page
		* on the right, you can see all outgoing links
		* hovering on each card will reveal another layer which those ones are connected to
	* graph view
		* i wanted to have the option for 3d graphs too
	* timeline view
		* each note will come with a date so you can chronologically order notes and view them that way (kind of like a git history) if ur brain works better that way
	* good global search
		* being able to index content fast and effectively
	* [interoperability](thoughts/interoperability.md), of data, easy export
* Long Term Archival Storage Service
	- Why is storage expensive lmao
	- What if there was [Golem](https://www.golem.network/) but for storage instead of compute? [Decentralized](thoughts/decentralization.md) storage so you can
    1. Sell extra storage space you have and get paid based off of capacity + availability
		1. maybe use a coin for this ($SHALE)?
		2. create a client to facilitate this
	2. Buying storage means your local folder that you choose will be symlinked to a mounted network drive
		1. what is actually happening is that your files are redundantly 
	* Questions
		1. can i just do this using hyperspace instead of using a blockchain lol
		2. ETH layer 2?
		3. any way to avoid gas fees?
		4. Is it possible to build on top of the [Golem platform](https://www.golem.network/platform) directly?
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
* Themis — go-based api testing framework
	-   language agnostic using dockerbasical
	-   github actions for CI integration
	-   considerations?
		-   different http verbs
		-   form data
		-   mock headers
	-   test reports
	-   can actually use concurrency lmao
		-   buffered channel of tests, run x tests in parallel
* Better graph visualization
	* [social graphs](thoughts/social%20graphs.md)
	* [https://twitter.com/azlenelza/status/1370159999691919364](https://twitter.com/azlenelza/status/1370159999691919364) but for graphs
	* [https://twitter.com/astralwave/status/1293104261778354176](https://twitter.com/astralwave/status/1293104261778354176)
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

#### Hello World
```js
name = input()
print(`Hello {name}!`)

// alternatively, to write to file
name -> writeln("output.txt", mode="append")
```

#### Reading input
```js
// reading from stdin (works for pipe and )
file = input("some prompt to print to stdout")

// reading from command-line flags e.g. ./program --name="john"
name = flag("name")

// reading from env
secret = env("SECRET_KEY")

// reading from remote
training_set = read("https://some_remote", type=CSV)

// reading from local file
shakespeare = read("../files/hamlet.txt")
```

#### Calculator CLI Tool
```js
num1 = input("Input first number: ")
op = match input("Input operation (one of +, -, *, /): ") {
	"+" : (x,y) => x + y
	"-" : (x,y) => x - y
	"*" : (x,y) => x * y
	"/" : (x,y) => x / y
	inputOp : error(`{inputOp} was an invalid operation`)
}
num2 = input("Input second number: ")
res = op(num1, num2)
print(`Your result: {res}`)
```

#### Playing with CSVs
```js
type Row {
	name   :: String
	age    :: Int
	points :: Float
}
type CSVFormat Row[]

export readcsv = url => 
	readRemote(url, type=CSV).retry(times=3, strategy="exponential")
		-> slice(1)
		-> as(CSVFormat)

export totalPoints = file =>
		-> map(row => row.points)
		-> write("points.txt", mode="overwrite")
		-> reduce((+), 0)
		
main = {
	readcsv("http://some_url")
		-> totalPoints
		-> x => print(`Total points: {x}`)
	// implicit return 0
}
```

#### Testing Programs
```js
// in script.json
{
	"name": "count points",
	"version": "v1.2.1",
	"scripts": {
		"build": "clay build",
		"test": "clay test",
		"lint": "clay lint",
	},
}

// in tests/mocks.json
"remote": {
	"http://some_url": "name,age,points\nbob,23,500\njoe,18,1200"
}

// in tests/points.cl
mocks = read("./mocks.json", type=JSON)

// explicitly overwrite async read ops defined in file
mock(mocks)

import("../tallyPoints.cl") as prog

it("works", () => {
	assert(prog.main.code == 0)
	assert(prog.main.stdout == "Total points: 1700")
})
```

#### FizzBuzz
```js
// fizzbuzz.cl
range(0, 100)
	-> n => match (n % 3, n % 5) {
		(0, 0): "FizzBuzz"
		(0, _): "Fizz"
		(_, 0): "Buzz"
		(_, _): `{n}`
	}
	-> each(print)
```

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
	* [](https://bazil.org/fuse/)[https://bazil.org/fuse/](https://bazil.org/fuse/)
	- [](https://blog.gopheracademy.com/advent-2014/fuse-zipfs/)[https://blog.gopheracademy.com/advent-2014/fuse-zipfs/](https://blog.gopheracademy.com/advent-2014/fuse-zipfs/)
	-   listen on any email server
	-   cli based for configuring backend
	    -   or just yaml
	-   react/electron frontend
	    -   ability to add plugins
	        -   modular by design, creating [workflows](thoughts/workflows.md)
-  deep foveal VR rendering