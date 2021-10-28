---
title: "Project Idea List"
date: 2021-06-17T00:33:42-04:00
---

## Ideas
-   AR + Magic Leap for 3D sculpting
-   LayoutLM + screenshots → auto-categorization of knowledge
    -   maybe turn this into an app which auto-extracts semantic info from screenshots/images on webpages and does something w it idk
-   Reverse of the above? using LayoutLM to create semantically useful webpage annotations for those with reduced vision
-   Marginalia for the web? browser as a graph database, chronological browsing?
    -   what if you could 3 finger swipe up on a browser to see what pages this page is connected to in a graph
    -   and you could write on the margins of pages and share those with friends
        -   a little annotated web
-   Data ownership with personal crypto addresses (personal data management?)
    -   zero-knowledge proofs on data ownership within ML
-   location-based ephemeral social groups with zero-knowledge proofs on location
    -   each location/city has a chat group which has a compound hash of all people in that location, derive only a boolean of whether a person is in a city or not without revealing exact location
    -   when a person leaves/arrives at a city, city hash is updated
-   p2p reddit w custom chain crawlers and the ability to bake keys into content
-   autocomplete for rendered latex with a computer algebra system
- Conversational GPS
  - why do we even look at a screen when we can just ask for directions as if it was a normal person lol

### Website revamp (again)
- make graph absolute on side
- killing the spinny text
- merge garden index with main page
- rewrite interests section
- add feed of most recent digital garden bits
- separate employment + projects stuff into subpage
	- make projects a folder and each entry is a file
- digital gardening
	- seperate sources from thoughts
	- rename concepts to be more atomic
- https://locomotivemtl.github.io/locomotive-scroll/

### Tools for Thought
* write first, organize later
	* good daily notes, choose what to carry over from the previous day
* block based editors are neat cause i can move stuff around really easily
	* if u drag outside the page it makes a new note, super easy to break down big complex topics into more granular/atomic notes
	* spatially consistent? [memory palace](thoughts/memory-palace.md) vibes -> https://twitter.com/jordanmoore/status/1418942880941477891
* card based backlinks/outgoing links
	* on the left, you can see all the notes that link to the current page
	* on the right, you can see all outoing links
	* hovering on each card will reveal another layer which those ones are connected to
* graph view
	* i wanted to have the option for 3d graphs too
* timeline view
	* each note will come with a date so you can chronologically order notes and view them that way (kind of like a git history) if ur brain works better that way
* good global search
	* being able to index content fast and effectively


### Long Term Archival Storage Service (Shale)
Why is storage expensive lmao

What if there was [Golem](https://www.golem.network/) but for storage instead of compute? [Decentralized](thoughts/decentralization.md) storage so you can

1. Sell extra storage space you have and get paid based off of capacity + availability
	2. maybe use a coin for this ($SHALE)?
	3. create a client to facilitate this
2. Buying storage means your local folder that you choose will be symlinked to a mounted network drive
	1. what is actually happening is that your files are redundantly 

Questions
1. can i just do this using hyperspace instead of using a blockchain lol
2. ETH layer 2?
3. any way to avoid gas fees?
4. Is it possible to build on top of the [Golem platform](https://www.golem.network/platform) directly?

### DreamCoder boolsat
Creating a LISP-like higher-order language to exploit reusable sub-proofs in specific domains (e.g. graph colouring)

kinda iffy on the sat problem solver using dreamcoder, not a lot of exploitable structure in the proofs (otherwise we'd have a more reliable human method)

Background:
- https://en.wikipedia.org/wiki/Boolean_satisfiability_problem
- https://searchworks.stanford.edu/view/13250178

NeuroSAT Paper:
- https://arxiv.org/pdf/1802.03685.pdf

DreamCoder Paper:
- https://arxiv.org/pdf/2006.08381.pdf
- https://www.youtube.com/watch?v=qtu0aSTDE2I

### Themis — go-based api testing framework
```yaml
tests:
- name: "test 1"
  url: "/test/:id"
  - var1: "val"
  config:
	flags: []
	benchmark: false
	env:
	  GO_PATH: "/usr/local/go"
  cases:
  - desc: ""
		type: "EXACT" # [exact, contains, regex]
		input: "asdf"
		expected: "asdf"
```
-   language agnostic using dockerbasical
-   github actions for CI integration
-   considerations?
	-   different http verbs
	-   form data
	-   mock headers
-   test reports
-   can actually use concurrency lmao
	-   buffered channel of tests, run x tests in parallel

###  Better graph visualization
[social-graphs](/thoughts/social-graphs)

[https://twitter.com/azlenelza/status/1370159999691919364](https://twitter.com/azlenelza/status/1370159999691919364) but for graphs
    
[https://twitter.com/astralwave/status/1293104261778354176](https://twitter.com/astralwave/status/1293104261778354176)
    
###  better bash using go (clay)
workflow

1.  clay build -o program
2.  ./program

philosophies

1.  no explicit loops (foreach, map, filter, reduce only)
2.  no errors (exit w err code by default)

should be

1.  really simple to do simple disk ops (move, copy, remove)
2.  common file format reading (csv, txt, excel)
3.  easy data wrangling with functional pipeline (e.g. map, filter, reduce, pattern match, regex)
4.  simple http requests
5.  interface with system processes (e.g. get output of subprocess call like htop or something)
6.  easy to use modules (import from url would be pog)

```tsx
import io
import http
import sys

content = http.get("<https://example.com/data.csv>")
print(`fetch completed with status ${content.status}`)
io.create("data.csv", content.data) // if content is null here, exit 1

fizzbuzz = num -> (num % 3, num % 5) match {
	case (0, 0) -> "FizzBuzz"
	case (0, _) -> "Fizz"
	case (_, 0) -> "Buzz"
	case _ -> num
}

data = readCsv("data.csv")
res = data
	.map(row -> {
		// destructuring
		id, num = row
		fizzbuzz(num)
	})
	.filter(row -> row == "FizzBuzz")
	.length

io.move("data.csv", "downloaded.csv")
print(`got ${res} FizzBuzzes`)

resFile = {
	result: res,
}

 io.isDir("results") match {
	filename = "result.json"

	// sys.exec returns content and status code
	// discard status code here
	lineNumber, _ = sys.exec(`cat ${filename} | wc -l`)

	// if too long, remove and recreate
	(lineNumber > 5000) match {
		true -> {
			io.rm(`results/${filename}`)
			io.create(`results/${filename}`) // create with no second arg is touch
		}
		false -> () // do nothing
	}

	io.append("results/result.json", resFile)
}

// exit(0) is implied
```
    
###  Multi-level blogs
blogging/reading platform where simplicity level can be adjusted
    
###  Better personal analytics
* small js bundle
* doesn't sell user data!!
* things to track
	* rough location of each user
	* total users
	* user visit distribution vs time

### living room
* recreating [communal living spaces](/thoughts/communities) in digital space
* [ephemerality](/thoughts/ephemereal-content) and [digital permanence](/thoughts/digital-permanence)

### tabfs but for emails
[](https://bazil.org/fuse/)[https://bazil.org/fuse/](https://bazil.org/fuse/)

[](https://blog.gopheracademy.com/advent-2014/fuse-zipfs/)[https://blog.gopheracademy.com/advent-2014/fuse-zipfs/](https://blog.gopheracademy.com/advent-2014/fuse-zipfs/)

-   listen on any email server
-   cli based for configuring backend
    -   or just yaml
-   react/electron frontend
    -   ability to add plugins
        -   modular by design, creating [workflows](thoughts/workflows.md)

###  aka → bash profiles, makefile style
###  deep foveal VR rendering