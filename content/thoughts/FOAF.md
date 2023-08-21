---
title: "FOAF"
date: 2022-06-08
tags:
  - seed
---

Summarized from [the xmlns FOAF specs](http://xmlns.com/foaf/spec/)

FOAF stands for 'friend of a friend'

> FOAF is a project devoted to linking people and information using the Web... If people publish information in the FOAF document format, machines will be able to make use of that information. If those files contain "see also" references to other such documents in the Web, we will have a machine-friendly version of today's [[thoughts/hypertext|hypertext]] Web.

It is a way of creating a semantically meaningful network of objects, useful for enabling the Semantic Web.

- FOAF descriptions are published as linked documents in the Web
- The result of the FOAF project is a network of documents describing a network of people (and other stuff).

Example FOAF describing a person (using [[thoughts/RDF|RDF]])

```xml
<foaf:Person rdf:about="#danbri" xmlns:foaf="http://xmlns.com/foaf/0.1/">
  <foaf:name>Dan Brickley</foaf:name>
  <foaf:homepage rdf:resource="http://danbri.org/" />
  <foaf:openid rdf:resource="http://danbri.org/" />
  <foaf:img rdf:resource="/images/me.jpg" />
</foaf:Person>
```

It basically says, "there is a [foaf:Person](http://xmlns.com/foaf/spec/#term_Person) with a [foaf:name](http://xmlns.com/foaf/spec/#term_name) property of 'Dan Brickley'; this person stands in [foaf:homepage](http://xmlns.com/foaf/spec/#term_homepage) and [foaf:openid](http://xmlns.com/foaf/spec/#term_openid) relationship to a thing called http://danbri.org/ and a [foaf:img](http://xmlns.com/foaf/spec/#term_img) relationship to a thing referenced by a relative URI of /images/me.jpg

## Adoption

[Source](https://www.joelonsoftware.com/2022/12/19/progress-on-the-block-protocol/)

> **people will only add semantic markup to their web pages if doing so is easier than not.**

Now imagine this world for a second:

- I want to insert a book into my blog post
- I type **/book**
- A search box appears where I start typing in the title of my book and choose from an autocomplete list.
- Once I find the book, a block gets inserted in my blog post showing details of the book in a format I like, *with nice semantic markup behind the scenes*.
