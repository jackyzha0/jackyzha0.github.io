---
title: "Datalog"
date: 2022-12-29
tags:
- seed
---

Sources:
- *What You Always Wanted to Know About Datalog (And Never Dared to Ask)*

Datalog is basically a simplified version of general Logic Programming.

In the formalism of Datalog, both facts and rules are represented as Horn clauses of the general shape `L0 :- L1, ..., Ln`. Each `L` is a predicate symbol `p(t1, ..., ti)` where `t` are the terms. A term can either be a constant or a variable.

A logic program consists of a finite set of:
1. Facts: assertions about a relevant piece of the world. These are represented as clauses with empty bodies (e.g. `friends(alice, bob).`)
2. Rules: statements which allow us to deduce facts from other facts. These usually contain variables (e.g. `mutual(X, Y) :- friends(X, Z), friends(Z, Y).`)

Normally, constants and predicate symbols are strings that begin with a lower-case character and variables are strings that begin with an upper-case character.

A clause that does not contain any variables is called *ground*. To guarantee that the set of all facts that can be derived from a Datalog program `P` is finite, we require:
1. Each fact of `P` is ground
2. Each variable which occurs in the head of a rule of `P` must also occur in the body of the same rule

When using facts stored in an external relational database (sometimes called the Extensional Database or EDB), we distinguish these from facts stored *within* the logic program `P` (sometimes called the Intensional Database or IDB).

We can consider the program `P` as a query against the EDB. The EDB is normally considered a time-varying collection of information. A query then is a time-*invariant* mapping which maps the EDB to result states.

A program `P` might produce a large number of intermediate IDB-relations. However, users are only interested in a subset of these relationships. We can express this as a *goal* to a Datalog program. To Prolog users, this is familiar. It is a single predicate that looks like `?-friends(alice, X).` which would, for example, get all people who `alice` is friends with.

More notation/terminology:
- Herbrand base (HB) is the set of all facts we can express in the language of Datalog
- If `S` is a finite set of Datalog clauses, we denote `cons(S)` the set of all logical consequences of `S`

## Inference Rules
### Bottom-up Evaluation
One example is the Elementary Production Principle (EPP). Given a rule that looks like `friends(X, X) :- person(X)`

If we can substitute facts (`e.g. person(john).`) for terms in the body such that the entire body is true and ground, then the head of the rule becomes a new fact. In the example above, `friends(john, john).` is then added as a fact, using the substitution $\theta$ = `{X <- john}`.

The sequence of applications of EPP which is used to infer a ground fact `F` from `S` is called a proof of `F` from `S`. We say $S \vdash F$ (F can be inferred from S) iff:
1. $F \in S$
2. $F$ can be obtained by applying EPP a finite number of times

Using this to derive `cons(S)` is also sometimes called forward-chaining (it follows the logical implication sign from premises to conclusions

### Top-down Evaluation
Sometimes called backward-chaining. This method is particularly appropriate when a goal is specified together with a Datalog program.

One example of this is called the Query-Subquery (QSQ) Approach. Prolog uses this!

## Expressivity
- Positive relational algebra (RA+) is equivalent to non-recursive Datalog
- Datalog can express recursive queries which RA can't express
- Full relational algebra (RA) can express negation which Datalog can't express
	- However, Datalog can be enriched to support logical negation $\lnot$