---
title: "Information Retrieval"
date: 2021-10-19
tags:
  - seed
---

[Information foraging](thoughts/information%20foraging.md) as a metaphor for exploring information retrieval and seeking. Heavily tied to [search](thoughts/search.md) systems.

A 'closed stack' library facilitates information transfer from collection to information seeker through some intermediary who controls access to said objects. 'Open stack' libraries often allow direct access to information objects (although sometimes with an intermediary's help). Both may utilize some ordering/index.

The goal of information seekers is to find information that are useful in answering the original query or research questions

System Relevance is the measure or degree to which a document 'was about' a topic. This can be used to measure performance of an information retrieval system by seeing the extent to which the system was able to retrieve all the relevant documents in the collection to a query (recall: ratio of relevant documents retrieved to total relevant documents), and only the relevant documents (precision: ratio of relevant documents retrieved to all documents).

Human relevance is the degree to which the document is useful to the search query of the user. Composed of 3 separate facets

1. Situational Relevance: useful, efficient, applicability to the task and situation
2. Cognitive Relevance: suited to the knowledge level of the searcher; contains novel content of interest
3. Affective Relevance: satisfies user goals and motivations, trustworthy, algns with beliefs and is emotionally engaging, aesthetics

Types of interactions then are

1. Between information seeker and intermediary
2. Between the intermediary and the collection
3. Between the information seeker and the collection

Information retrieval has a whole slew of related terminology surrounding it:

- Indexing (characterizing documents)
- Retrieval (characterizing information seeker's information problem as a query put to the collection)
- Information retrival system (combination of method to index, organization of the collection, and method of querying and searching the collection)

## Cranfield/SMART Paradigm

A 'test collection' is constructed, consisting of a collection of documents, a set of descriptions of information 'needs', and an exhaustive evaluation of the relevance of each document to each information need description.

Why it may be faulty:

- relevance assessments are collected once for each information need for each document alone, without reference to any other document (most queries involve looking at multiple sources, relevance can depend on documents they have seen before)
- evaluation is made of the performance of just the single query that represents each information need (queries are often iterative, you originally may not know what you don't know or what you are looking for)
- model of the user on which the measures are based limits their appropriateness for other possible user goals

The dominance of the SMART (very technical and computational approach to information retrieval) means the research in the field of information retrieval was split into two disciplines: information retrieval (mainly CS/computational, study of formal models of information retrieval) and information seeking/use (mainly library/information science, study of people's information-seeking behaviours and uses of and interactions with information systems). As a result, 'interactiveness' was more of an afterthought and relegated to the peripheral.

## Early information retrieval systems

Mostly 'batch', non-interactive 'closed stack' systems.

### Walker (1971)

> A key difference in interactive terminal search is that data is brought to the searcher rather than the searcher going to the data

Creating an online system as an access point for databases. However, these information retrieval systems required substantial knowledge not only of the characteristics of the database and its indexing systems but also of the details of the query language, boolean algebra for effective queries, and effective techniques for modifying queries given search results. This resulted in a new class of librarians and information scientists -- search intermediaries -- well versed in this new form of information seeking.

5 main filters to forming an effective query

1. Determining the subject of the information query
2. Determining the objective/motivation of information-seeking behaviour
3. Determining the personal characteristics of the inquirer
4. Establishing the relationship between the query description and the information system
5. Determining anticipated/acceptable answers

The problem: most people don't actually know the thing they are searching for.

### Savage-Knepshield and Belkin (1999)

Bennet was looking at some very important [HCI](thoughts/human%20computer%20interaction.md) considerations here, esp. w.r.t. the differences between human searcher and its automated counterpart. Asks some design questions to determine

- characteristics of the searchers served by the facility
- the conceptual framework presented to the searcher
- the role of feedback to the searcher during searches
- operational characteristics of the facility: the command language, display formats and response time
- the constraints of the terminal and techniques to ameliorate them
- the effects of the bibliographic database on the user interface for searchers
- how to introduce the search facility to the user
- the role of evaluation and feedback in the redesign cycle
