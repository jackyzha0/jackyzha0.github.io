---
title: Database
date: 2024-01-27
tags:
  - seed
---
Excerpts from [[thoughts/Designing Data-Intensive Applications|Designing Data-Intensive Applications]]

## Data Models

Data models are perhaps the most important part of developing software, because they have such a profound effect: not only on how the software is written, but also on how we think about the problem that we are solving.

### Relational model
Data is organized into relations (called tables in SQL), where each relation is an unordered collection of tuples (rows in SQL).

- Upsides
	- Better support for joins, many-to-one, and many-to-many relationships
- Downsides
	- Much application development today is done in object-oriented programming languages, which leads to a common criticism of the SQL data model: if data is stored in relational tables, an awkward translation layer is required between the objects in the application code and the database model of tables, rows, and columns. We generally use ORMs to reduce the boilerplate for this translation layer.
	- In relational databases there isn’t a standard way of representing reorderable lists, and various tricks are used
### Document Model
Usually represents data as JSON. 

- Upsides
	- Schema flexibility
	- Better performance due to locality
	- The relational technique of shredding -- splitting a document-like structure into multiple tables -- can lead to cumbersome schemas and complicated application code
- Downsides
	- Many-to-one and many-to-many relationships do not easily fit within one self-contained JSON document

Document databases are sometimes called schemaless but a more accurate term is schema-on-read (the structure of the data is implicit, and only interpreted when the data is read)

### Graph Model
What if many-to-many relationships are very common in your data? As the connections within your data become more complex, it becomes more natural to start modeling your data as a graph.

A graph consists of two kinds of objects: vertices (also known as nodes or entities) and edges (also known as relationships or arcs).

Graph models lets us ask questions that contain a variable number of joins which is very difficult to express in traditional SQL (requires the use of recursive common table expressions).

#### Property Graphs
In the property graph (also known as labeled property graph) model:

Each vertex consists of:
- A unique identifier
- A label (string) to describe what type of object this vertex represents
- A set of outgoing edges
- A set of incoming edges
- A collection of properties (key-value pairs)

Each edge consists of: 
- A unique identifier
- The vertex at which the edge starts (the tail vertex)
- The vertex at which the edge ends (the head vertex)
- A label to describe the kind of relationship between the two vertices
- A collection of properties (key-value pairs)

Important notes:
- Any vertex can have an edge connecting it with any other vertex. There is no schema that restricts which kinds of things can or cannot be associated.
- Given any vertex, you can efficiently find both its incoming and its outgoing edges, and thus traverse the graph—i.e., follow a path through a chain of verti‐ ces—both forward and backward.
#### Triple Stores
See also [[thoughts/RDF]]

In a triple-store, all information is stored in the form of very simple three-part statements: (subject, predicate, object).

For example, in the triple (Jim, likes, bananas), Jim is the subject, likes is the predicate (verb), and bananas is the object.

Generally queried by making a set of constraints.

### Event Sourcing
In complex applications it can sometimes be difficult to find a single data representation that is able to satisfy all the different ways that the data needs to be queried and presented.

In such situations, it can be beneficial to write data in one form, and then to derive from it several representations that are optimized for different types of reads.

The simplest, fastest, and most expressive way of writing data is an event log: every time you want to write some data, you encode it as a self-contained string (perhaps as JSON), including a timestamp, and then append it to a sequence of events. Events in this log are immutable: you never change or delete them, you only ever append more events to the log (which may supersede earlier events).

The principle of maintaining separate read-optimized representations and deriving them from the write-optimized representation is called command query responsibility segregation. Similar ideas can be found in [[thoughts/State Machine Replication (SMR)|SMR]]

### Normalization
Normalization refers to how many ways there are of representation the same underlying information. This is typically done by giving an ID to each piece of data so that there is only one 'canonical' way of referring to it.

Looking up an ID and replacing it with the actual information it refers to is often called *hydration*

- When you use an ID, your data is more normalized: the information that is meaningful to humans is stored in only one place, and everything that refers to it uses an ID.
- When you store the text directly, you are duplicating the human-meaningful information in every record that uses it; this representation is denormalized, there are multiple potential referring to the same information.

Tradeoffs:
- In a denormalized representation, the information in each document is self-contained meaning we don't need to make another lookup to figure out what the ID refers to. However, if we do need to change the underlying information, we then need to go and find all the occurrences of the old information and update it.
	- TLDR; faster read, slower write
- In a normalized representation, updating the information is as easy as changing the information that the ID refers to. However, each reference to the ID requires looking the ID up to get the corresponding information.
	- TLDR; faster write, slower read

## Query Languages

- Declarative Query Languages allow you to specify the pattern of the data you want—what conditions the results must meet, and how you want the data to be transformed (e.g., sorted, grouped, and aggregated)—but not how to achieve that goal
- Imperative Query Languages require you to write an algorithm —i.e., telling the computer which operations to perform in which order