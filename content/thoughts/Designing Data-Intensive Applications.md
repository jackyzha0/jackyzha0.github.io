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

## Big-picture Content

- Would love sections on tradeoffs in data storage!
- Also either directly preceding or after, there should be a section on latency tradeoffs
	- e.g. deciding between hot/cold storage, deciding how to colocate data, etc.
	- Multi-zonal data (probably under distributed systems or partitioning)
- Cards in the style of [[A Pattern Language]] would be cool
	- We have the abstracted concept that we've seen used over and over
	- Here's a specific case study of how it might be implemented in a real world system

## Chapter 1
- I really like the clarity and writing style here already. It feels a lot more mature than the writing in the preface (though that's likely because the preface hasn't been updated)
	- I feel like there's a lot of duplication in the first few pages of the preface and the start of Chapter 1, we should just keep it in one place or the other
	- Or have one of those animal markers that tell you to skip ahead to Chapter 1 if they want the definition of data-intensive, etc.!
- Bullet point list probably needs to include zonal affinity (how do we make sure data is close to users)
- Glue is application code and network requests!
- Annotated diagram for OLTP vs OLAP access patterns would be more helpful than the table I think.
- Confusing part about "Analytic systems are often only accessible to employees of the company that owns the data"
	- paragraph feels disjoint, doesn't add anything to the chapter
- Data warehousing section, what caused the transition "for companies to stop using their OLTP systems for analytics purposes, and to run the analytics on a separate database system instead"
	- History here would be really cool
- Some transforms in ETL can have multiple inputs
- Is data mesh/fabric doing the same thing as a data warehouse but instead of actually storing it, it just stores a pointer to where to find it?
- Link to stream processing in "Beyond the data lake"
- Systems of record and derived data
	- "Never go to sea with two chronometers; take one or three."
	- Derived data systems definition should link out to the parts where it mentions indexes, materialized views, etc.
	- Have a section on why redundant systems are essential for getting good perf on read queries
		- Or link out to a chapter/section on latency tradeoffs
	- Diagram
