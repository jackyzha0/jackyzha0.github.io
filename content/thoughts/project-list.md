---
title: "Project Idea List"
date: 2021-06-17T00:33:42-04:00
---

## Continuations
### Desktop Portal
Creating a desktop version of portal for easier UX

## Ideas
### Tools for Thought
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


### Long Term Archival Storage Service


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

### c → fast and free link shortener
-   dynamodb for storage
	-   tables
		-   registrations
		-   links
-   serverless go
	-   registration service
		-   status path
			-   `/status/<gh-username>`
				-   registered (no repo found)
				-   malformed toml
					-   subdomain taken?
					-   validation errors
				-   serving links (last updated)
		-   listen on github webhooks
			-   wait on github star event hook to register and unregister ([](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#star)[https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#star](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#star))
		-   register
			-   add entry to registrations table
		-   unregister
			-   remove all links with this person as id
	-   request redir service
		-   reverse proxy with cache from dynamodb
		-   lookup based off of subdomain + short path
-   self-host on gh
	-   everyone makes a repo called c-cfg
		-   toml based
			-   main property → subdomain
			-   row properties
				-   author (gh id)
				-   short
				-   long
				-   desc
				-   ttl
				-   published

[https://stackoverflow.com/questions/1943356/creating-subdomains-programmatically](https://stackoverflow.com/questions/1943356/creating-subdomains-programmatically)

### living room
* recreating [communal living spaces](/thoughts/communities) in digital space
* [ephemerality](/thoughts/ephemereal-content) and [digital permanence](/thoughts/digital-permanence)
    
### next.js for TUIs?

### tabfs but for emails
[](https://bazil.org/fuse/)[https://bazil.org/fuse/](https://bazil.org/fuse/)

[](https://blog.gopheracademy.com/advent-2014/fuse-zipfs/)[https://blog.gopheracademy.com/advent-2014/fuse-zipfs/](https://blog.gopheracademy.com/advent-2014/fuse-zipfs/)

-   listen on any email server
-   cli based for configuring backend
    -   or just yaml
-   react/electron frontend
    -   ability to add plugins
        -   modular by design, creating [workflows](thoughts/workflows.md)
    
### simple recording/timelapse tool for artists
[https://fireship.io/lessons/electron-screen-recorder-project-tutorial/](https://fireship.io/lessons/electron-screen-recorder-project-tutorial/)

###  aka → bash profiles, makefile style
###  deep foveal VR rendering