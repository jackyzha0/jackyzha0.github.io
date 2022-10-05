---
title: "Domain Specific Language (DSL)"
date: 2022-09-22
tags:
- seed
aliases:
- DSL
---

Implementation Stages
1. Tokenization `String -> [Token]`
	1. Makes defining and recognizing correct sequences easier
	2. Sometimes called lexing
2. Parsing `[Token] -> ParseTree`
	1. A tree that represents a successful parsing of a sequence of tokens
3. (optional) AST Conversion `ParseTree -> AST`
4. (optional) Static Checks `AST -> AST`
6. Evaluate `AST -> Result`
	1. Run the input or generate code for it
	2. (optional) Dynamic Checks

## Grammar Rules
e.g. for BNF, EBNF

- Generally matches left to right
- Single-quoted strings are literal
- Grammar rules end with semicolons

### ANTLR Lexer
```antlr
lexer grammar TinyHTMLLexer;
// DEFAULT_MODE is the implicit defualt
TITLE_START: 'Title:' WS* -> mode(TEXT_MODE) ;
TABLE_START: 'Table:' ;
ROW_START  : '[' WS* -> mode(TEXT_MODE) ;
ROW_END    : ']' ;
SEP        : '|' WS* -> mode(TEXT_MODE) ;
WS         : [\r\n\t] -> channel(HIDDEN) ;

mode TEXT_MODE;
TEXT       : ~[[|\]\r\n]* -> mode(DEFAULT_MODE) ;
// cant infinite match because as soon as we match, we exist TEXT_MODE
```

### ANTLR Parser
- Parser grammar rules have lower-case non-terminal symbols
- Parser rule bodies can use both parser non-terminals and lexer ones
	- Though, we should avoid doing this and keep parser and lexer rules separate
- Parser rule bodies may not include regex character classes (e.g. `[0-9]` or `\d`)

```antlr
parser grammar TinyHTMLParser;
options { tokenVocab = TionyHTMLLexer; }

program: title table+ EOF ;
title  : TITLE_START TEXT ;
table  : TABLE_START boldrow row+ ;
boldrow: row ;
row    : ROW_START (item (SEP item)*)? ROW_END ;
item   : TEXT ;
```

3 Parsing Guidelines
1. The grammar cannot be ambiguous: any given input string has at most one parse tree that accepts it
2. No left recursion: each rule cannot start with itself (even indirect)
	1. Should not allow `T ::= T ...`
3. Grammar must be locally deterministic: for each choice, we must be able to choose between them based only on the next token (avoid common prefixes, factor them out into separate rules)

## Language Principles
- Maximize information hiding
	- Make classes, members as private as possible
	- Public classes should have no public fields (with the exception of constants)
- Don't confuse users
	- Keep things simple
	- Name things well
	- Keep things consistent
	- Have good documentation
	- Avoid unnecessary boilerplate
	- Make it boring (intuitive, expected)

What is the purpose of a language?
- We think in a particular language and it determines how you think (see: [[thoughts/linguistic relativism|Sapir-Whorf]])
- Languages should help us think better

## Cognitive Dimensions of Notations
1. Abstraction Gradient
	- Abstractions make it hard for first-time programmers to understand it
	- Abstractions are powerful for professional software developers to make easy to write, read, and maintain software
	- There should be a **gradual** increase in complexity ![[thoughts/images/abstraction-gradient.png|500]]
	- Languages with a high abstraction floor are called abstraction-hungry
	- Languages with a low abstraction ceiling are called abstraction-hating
2. Consistency
	- Coherence across the features of a language. It is easier to learn something if there are few exceptions to learn
3. Diffuseness
	- How many things there are to learn about a language
	- Number of keywords is a good approximation for diffuseness
4. Error-proneness
	- Bloch: make it *easy to do it right, hard to do it wrong*
	- The more guarantees you want to make about the program at compile time, the more work the programmer needs to do to get something running
5. Secondary Notation
	- Anything that is only there to help the programmer but does not affect what the code actually does

## Evaluation
### Recursive Evaluation
Each node has an evaluate method. Recursively traverse the tree and evaluate each node.

But this only supports a single type of traversing the AST. What if we want to support other types of checkers? We have many different operations that traverse the AST

Putting all functionality into AST methods violates SRP. We can instead, implement the visitor pattern.

### Visitor Pattern
The visitor design pattern is a way of separating an algorithm from an object structure on which it operates.

Basically, you are passing this visitor object to a node's accept function.
- Visitor defines a `visit` for each concrete node type to detail how to visit that node + its children (functionality depends on visitor)
- If it needs to visit another node, it calls `accept` on itself (functionality also depends on the node type)

We perform double dispatch as the functionality depends on two things:
1. the type of AST object (via the `accept` call) and
2. the type of visitor object (via the `visit` call)

We could just evaluate each AST node, but this places the responsibility on the nodes for how to do this.

1. Support multiple kinds of "evaluation" for our AST without having to edit every node every node every time
2. Evaluation is in a separate file from the AST implementation

```typescript
export class Client() {
	nodes: Element
	doSomething() {
		const visitor: Visitor<T, U> = // idk some visitor to do something
		for (node in this.nodes) {
			node.accept(visitor)
		}
	}
}

export interface Element {
	accept: (visitor: Visitor<T, U>, param: T): void,
}

// same for ConcreteB
class ConcreteA implements Element {
	accept(visitor: Visitor<T, U>, param: T) {
		visitor.visit(this, param)
	}
}

export interface Visitor<T, U> {
	// where ConreteA and ConcreteB both inherit from Element
	// error checks here are runtime checks
	visit: (a: ConcreteA, param: T): void,
	visit: (b: ConcreteB, param: T): void,
	...
}
```

1. Create a `Visitor` interface under AST and define a bunch of visit methods for each concrete node type
2. Under the abstract `Node` class, create an abstract `accept` method
3. Create a new visitor class that implements the `Visitor` interface