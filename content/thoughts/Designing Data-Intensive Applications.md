---
title: Designing Data-Intensive Applications
date: 2024-01-12
tags:
  - seed
  - book
draft: true
---
Reviewing the second edition by *Martin Kleppmann*. This is the first book I'm helping revise in a formal capacity!

## Preface

- Preface should skip that entire first page (xiii) this doesn't appear to add/contextualize anything
- Start with what data-intensive applications are (top of xiv) then provide examples
	- If we want to include the driving forces list on xiii, this is a good place to move it
- "We call an application data-intensive if data is its primary challenge—the quantity of data, the complexity of data, or the speed at which it is changing—as opposed to compute-intensive, where CPU cycles are the bottleneck."
	- This is a key line that defines data-intensive applications. To me, this should reflect the majority of the contents of the book.
	- Specifically: data replication and consistency should be emphasized more here! Especially after seeing that a good chunk of the book focuses on this.
	- I don't actually think 'the speed at which it is changing' is talked about at all in the book, maybe remove that part
	- Would remove the comparison to compute-intensive, doesn't seem to aid the definition.
- Love the part on why terminology and underlying principles are important -- it's true!
- Who should read this book section
	- Axe first sentence of second paragraph
- Scope section
	- References and further reading seem implied (and references are already mentioned in the scope section), we can probably axe

## Content

- Would love sections on tradeoffs in data storage!
- Also either directly preceding or after, there should be a section on latency tradeoffs
	- e.g. deciding between hot/cold storage, deciding how to colocate data, etc.
	- Multi-zonal data (probably under distributed systems or partitioning)
- 