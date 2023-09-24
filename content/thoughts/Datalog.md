---
title: "Datalog"
date: 2022-12-29
tags:
  - seed
---

Source: _What You Always Wanted to Know About Datalog (And Never Dared to Ask)_

Datalog is basically a simplified version of general Logic Programming.

In the formalism of Datalog, both facts and rules are represented as Horn clauses of the general shape `L0 :- L1, ..., Ln` which is equivalent to $L_1 \land \dots \land L_n \implies L_0$. Each `L` is a predicate symbol `p(t1, ..., ti)` where `t` are the terms. A term can either be a constant or a variable.

A logic program consists of a finite set of:

1. Facts: assertions about a relevant piece of the world. These are represented as clauses with empty bodies (e.g. `friends(alice, bob).`)
2. Rules: statements which allow us to deduce facts from other facts. These usually contain variables (e.g. `mutual(X, Y) :- friends(X, Z), friends(Z, Y).`)

Normally, constants and predicate symbols are strings that begin with a lower-case character and variables are strings that begin with an upper-case character.

A clause that does not contain any variables is called _ground_. To guarantee that the set of all facts that can be derived from a Datalog program `P` is finite, we require:

1. Each fact of `P` is ground
2. Each variable which occurs in the head of a rule of `P` must also occur in the body of the same rule

When using facts stored in an external relational database (sometimes called the Extensional Database or EDB), we distinguish these from facts stored _within_ the logic program `P` (sometimes called the Intensional Database or IDB).

We can consider the program `P` as a query against the EDB. The EDB is normally considered a time-varying collection of information. A query then is a time-_invariant_ mapping which maps the EDB to result states.

A program `P` might produce a large number of intermediate IDB-relations. However, users are only interested in a subset of these relationships. We can express this as a _goal_ to a Datalog program. To Prolog users, this is familiar. It is a single predicate that looks like `?-friends(alice, X).` which would, for example, get all people who `alice` is friends with.

More notation/terminology:

- Herbrand base (HB) is the set of all facts we can express in the language of Datalog
- If `S` is a finite set of Datalog clauses, we denote `cons(S)` the set of all logical consequences of `S`
- A fixpoint is a state of the evaluation process in which no more rules can be applied and all of the predicates in the program have reached their final, "fixed" values.

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

Rules are seen as problem generators. Each goal is considered as a problem that must be solved. The initial goal is matched with the left hand side of some rule, and generates other problems corresponding to the right-hand side predicates of that rule; this process is continued until no new problems are generated.

One example of this is called the Query-Subquery (QSQ) Approach (this feels quite similar to chained currying in Haskell). Prolog uses this!

Datalog goals seem more naturally executed through breadth-first techniques, as the result of the computation is neither affected by the order of predicates within the right-hand sides (RHS) of rules, nor by the order of rules within the program.

### Table of Methods

- Evaluation methods: effective evaluation strategies (improvements at runtime)
  - Bottom-up
    - Naive: On each iteration, the program takes its current database of facts and computes all new facts that can be produced by one step of deductive inference, by iterating over all of the rules and exhaustively unifying them. If any new facts were produced, it then merges those with the previous set and repeats the process with another iteration; otherwise, it terminates.
    - Semi-naive: Semi-naive evaluation solves this inefficiency by only attempting to evaluate rules where at least one term on the right-hand side of the rule was generated (i.e., is new) since the previous iteration.
    - Henschen-Naqvi
  - Top-down
    - Query-subquery (QSQ)
- Rewriting method: program transformation which yields a more efficient computation (improvements at compile time)
  - Logic
    - Magic sets
    - Counting
    - Magic Counting
    - Static Filtering
  - Algebraic
    - Variable reduction and constant reduction

## Expressivity

- Positive relational algebra (RA+) is equivalent to non-recursive Datalog
- Datalog can express recursive queries which RA can't express
- Full relational algebra (RA) can express negation which Datalog can't express
  - However, Datalog can be enriched to support logical negation $\lnot$

## Negation

Incorporating negation can be allowed by adopting the Closed World Assumption (CWA). That is, if a fact does not logically follow from a set of Datalog clauses, then we conclude that the negation of this fact is true.

That is, we assume our facts _completely_ describe the domain we are interested. For the purposes of [[thoughts/CRDT|CRDTs]], this unfortunately is not true.

Even with negation in Datalog, we can't derive new facts from these negations. That is, we can't express premises that contain a negative in the formulation (e.g. "if X is a student and X is not a graduate student, then X is an undergraduate student").

This is possible in relational algebra using the set-difference operator.

We _can_ extend Datalog to support negated literals in rule bodies using stratified Datalog

## Stratification

Consider a rule such as `boring(chess) :- !interesting(chess)`

We try to _stratify_ the clauses of the program such that when evaluating a predicate in a rule head, it is always possible to completely evaluate all the predicates which occur negatively in the rule body or in the bodies of some subsequent rules.

In the above case, it is always possible to fully evaluate the `interesting(chess)` predicate before evaluating `bording(chess)`. Formally, a stratified program $P$ can be partitioned into disjoint sets of clauses $P = P^1 \cup \dots \cup P^n$

Let's consider an example program $P$ where `d` is the only EDB-predicate:

```prolog
r1: p(X,Y) :- !q(X,Y), s(X,Y).
r2: q(X,Y) :- q(X,Z), q(Z,Y).
r3: q(X,Y) :- d(X,Y), !r(X,Y).
r4: r(X,Y) :- d(Y,X).
r5: s(X,Y) :- q(X,Z),q(Y,T), X != Y
```

We can turn these statements into an extended dependency graph (EDG) by

- Making nodes of the IDB-predicate symbols in $P$
- Create a directed edge $\langle p, q \rangle$ iff the predicate symbol $q$ occurs positively or negatively in a body of a rule with head predicate $p$
  - If the symbol $q$ occurs negatively, we mark the edge with $\lnot$ (that is, an edge is marked $\lnot$ if there is at least one rule with head predicate $p$ such that $q$ occurs negatively in the body)

The program can be stratified iff the EDG does not contain any cycle involving an edge labeled $\lnot$.

We can then stratify $P$ into 3 layers by doing a topological sort on the dependency graph:

1. `r4`
2. `r2`, `r3`, `r5`
3. `r1`

This is one of many possible stratifications (however, they are all equivalent).

### Misc

- Three-valued logic? A fact can be true, false, or undefined
- Complex objects
  - $NF^2$ model (Jaeschke and Schek)
  - Nested Relations (Fisher and Thomas)
  - Model of Abiteboul and Beeri
  - ALGRES
- Modularization and structure types?
