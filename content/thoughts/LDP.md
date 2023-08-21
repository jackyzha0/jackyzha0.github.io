---
title: "Linked Data Platform (LDP)"
date: 2022-06-09
tags:
  - seed
aliases:
  - LDP
---

Think of an LDP as a way of interacting with [[thoughts/RDF|RDF]] resources in a way that is similar to a web site with folders and documents in a RESTful manner.

The term "Linked Data" refers to an approach to publishing data that puts linking at the heart of the notion of data, and uses the linking technologies provided by the Web to enable the weaving of a global distributed database. By naming real world entities - be they web resources, physical objects such as the Eiffel Tower, or even more abstract things such as relations or concepts - with http(s) URLs, whose meaning can be determined by dereferencing the document at that URL, and by using the relational framework provided by [[thoughts/RDF|RDF]], data can be published and linked in the same way web pages can.

Rules of LDP:

1.  Use URIs as names for things
2.  Use [[thoughts/HTTP]] URIs so that people can look up those names
3.  When someone looks up a URI, provide useful information, using the standards (RDF, SPARQL)
4.  Include links to other URIs, so that they can discover more things

## What it enables

LDP enables a very connected way of working with RDF data. You make HTTP requests to URI's and they get resolved to resources (Containers or RDFSources), which you can then consume to get at all the triples. And of course you can create resources, update them, list members of a container, etc. In this way, you can build web applications, that use RESTful requests.
