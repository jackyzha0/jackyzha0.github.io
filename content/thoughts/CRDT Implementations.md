---
title: "CRDT Implementations"
date: 2022-07-11
tags:
  - seed
---

All examples below are written in pseudocode that happens to carry a lot of syntax from Typescript. Syntax liberties are taken where intention is clear

## Spec

### Op-based

See [[thoughts/CRDT#Operation-based|operation-based CRDTs]] for more properties

```ts
// the initial value of the data type (on each replicate)
type State = {
	...
}

class OpCRDT<State> {
	state: State

	// any function that computes a view of the payload and has no side effects
	// can return a value
	@query
	function query(...args: any[]): any {
		if (invariant) {
			// do something
			return
		}
	}

	// any global function that take in arguments and has two phases
	@update
	function update(...args: any[]): Closure {
		if (local_invariant) {
			// phase 1: may compute results to be prepared as arguments for the second phase
			// includes precondition checks, etc.

			// phase 2: returns a closure to be run on all nodes, including this one
			return (...) => {
				if (downstream_invariant) {
					...
				}
			}
		}
	}
}
```

### State-based

See [[thoughts/CRDT#State-based|state-based CRDTs]] for more properties

```ts
// the initial value of the data type (on each replicate)
type State = {
	...
}

class StateCRDT<State> {
	state: State

	// any function that computes a view of the payload and has no side effects
	// can return a value
	@query
	function query(...args: any[]): any {
		if (invariant) {
			// do something
			return
		}
	}

	// any function that when evaluated, has side-effects on the payload
	@update
	function update(...args: any[]) {
		if (local_invariant) {
			// do something
		}
	}

	// a function that compares two states in the semilattice (see: order theory)
	@compare
	function cmp(a: State, b: State): boolean {
		// is a <= b in the semilattice?
	}

	// a function that performs a least-upper-bound merge on two states
	@merge
	function merge(a: State, b: State): State {
		// least-upper-bound merge on a and b at any replica
	}
}
```

## Counters

### Op-based

This implementation is trivially correct as both addition and subtraction commute

```ts
type State = {
	i: number
}

class OpCRDT<State> {
	@query
	value(): number {
		return this.i
	}

	@update
	function increment(): Closure {
		return (node) => node.i := node.i + 1
	}

	@update
	function decrement(): Closure {
		return (node) => node.i := node.i - 1
	}
}
```

### State-based

Inspired by vector clocks. Merge takes max of each entry so this forms a monotonic semilattice. We need two vectors as just operating on a single vector as max wouldn't even work if we included decrement.

For example, say you have two states `[1, 0, 1]` and `[1, 1, 1]`. You would never tell if the first one happens after the second (second node subtraction) or if the second one happens after the first (second node addition).

```ts
type State = {
	plus: number[n];
	minus: number[n];
}

class StateCRDT<State> {
	@query
	function value(): int {
		return sum(this.plus) - sum(this.minus)
	}

	@query
	function increment() {
		const id = this.id()
		this.plus[id] = this.plus[id] + 1
	}

	@update
	function decrement() {
		const id = this.id()
		this.minus[id] = this.minus[id] + 1
	}

	@compare
	function cmp(x: State, y: State): boolean {
		return zip(x.plus, y.plus).every((x_i, y_i) => x_i <= y_i) &&
			   zip(x.minus, y.minus).every((x_i, y_i) => x_i <= y_i)
	}

	@merge
	function merge(x: State, y: State): State {
		return Payload {
			plus: zip(x.plus, y.plus).map((x_i, y_i) => max(x_i, y_i))
			minus: zip(x.minus, y.minus).map((x_i, y_i) => max(x_i, y_i))
		}
	}
}
```

## Last-writer-wins Registers

A register is a memory cell storing a single value.

### Op-based

`X` is an arbitrary type

```ts
type State<X> = {
	val: X;
	t: number;
}

class OpCRDT<State> {
	@query
	function value(): X {
		return this.val
	}

	@update
	function assign(x: X): Closure {
		const t_now = now()
		return (node) => {
			if node.t < t_now {
				node.val = x
				node.t = t_now
			}
		}
	}
}
```

### State-based

Timestamp is monotonic increasing so compare created a valid monotonic semilattice.

```ts
type State<X> = {
	x: X;
	t: number;
}

class StateCRDT<State> {
	@query
	function value(): X {
		return this.val
	}

	@update
	function assign(x: X) {
		this.t = now()
		this.x := x
	}

	@compare
	function cmp<X>(x: State<X>, y: State<X>): boolean {
		return x.t <= y.t
	}

	@merge
	function merge<X>(x: State<X>, y:State<X>): State<X> {
		// return most recent write by logical clock
		return cmp(x, y) ? y : x
	}
}
```

## Sets

A foundational data structure that form the basis of containers, maps, and graphs.

Naively adding and removing from a set does not commute so we can only approximate the properties of a set.

Most implementations below differ by how they handle concurrent $add(e) \parallel remove(e)$

For example:

- Grow-only set (G-Set) avoids remove altogether
- 2-Phase set (2P-Set) is a variant where both add and remove are valid operations but an element cannot be re-added once removed
- Unique set (U-Set) is an extension of 2-Phase set where we additionally assume elements are unique. Additional requirement that causal dependencies are respected (op-based CRDTs are sufficient to ensure this)
- Add-wins set (OR-Set/AW-Set) supports both adding and removing elements. Add has precedence when an add and remove happen concurrently.

### State-based 2P-Set

The compare function (checking to see if `x` comes before `y` in the semilattice) here is quite tricky and not immediately obvious why it is correct.

- If `x.set` is a subset of `y.set`, then `x` must have come before `y` because nothing is ever removed from `set`
- If `x.set` is the same set as `y.set`, then `x` can only have come before `y` if `x.removed` is a subset of `y.subset`
- If `x.set` is not a subset of `y.set` then `x` cannot have come before `y`

```ts
type State<X> = {
	set: Set<X>;
	removed: Set<X>;
}

class StateCRDT<State> {
	@query
	function has(x: X): bool {
		return this.set.has(x) && !this.removed.has(x)
	}

	@update
	function add(x: X) {
		set.add(x)
	}

	@update
	function remove(x: X) {
		if has(x) {
			removed.add(x)
		}
	}

	@compare
	function cmp<X>(x: State<X>, y: State<X>): boolean {
		return x.set.is_subset_of(y.set) ||
			   x.removed.is_subset_if(y.removed)
	}

	@merge
	function merge<X>(x: State<X>, y:State<X>): State<X> {
		// return most recent write by logical clock
		return Payload {
			set: union(x.set, y.set)
			removed: union(x.removed, y.removed)
		}
	}
}
```

### Op-based U-Set

Again, this op-based implementation assumes causal ordering in message delivering

```ts
type State<X> = {
	set: Set<X>;
}

class OpCRDT<State> {
	@query
	function has(x: X): boolean {
		return this.set.has(x)
	}

	@update
	function add(x: X): Closure {
		return this.set.add(x)
	}

	@update
	function remove(x: X): Closure {
		if this.has(x) {
			// due to causal ordering assumption, add(x) must have been delivered already
			return (node) => node.set.remove(x)
		}
	}
}

```

### Op-based AW-Set

Intuition here is to generate a unique ID for each element added. Multiple `add`s will add multiple values and `delete` will delete all elements with the same value.

Concurrent `add`s commute as each `add` is unique. If a concurrent `add` and `remove` happen, it also commutes as `add` has precedence.

```ts
type State<X> = {
	// track element and uuid
	set: Set<(X, number)>;
}

class OpCRDT<State> {
	@query
	function has(x: X): boolean {
		return this.set.values.any((val, id) => val === x)
	}

	@update
	function add(x: X): Closure {
		const id = uuid()
		return (node) => node.set.add((x, id))
	}

	@update
	function remove(x: X): Closure {
		if this.has(x) {
			const vals_to_delete = this.set.values.filter((val, id) => x === val)
			return (node) => node.set.remove(vals_to_delete)
		}
	}
}
```

## Sequences

A sequence for text editing (or just sequence hereafter) is a totally-ordered set of elements, each composed of a unique identifier and an atom.

For the rest of this section, assume the following definitions

```ts
const __LEFT: any = ("START", -1)
const __RIGHT: any = ("END", 0)

// e.g., a character, a string, an XML tag, or an embedded graphic
type Atom = any

// Timestamps are unique, positive, and increase consistently with causality
type T = number
type Vertex = (Atom, T)
```

### Replicated Growable Array (RGA)

Automerge the library uses this!

Represented as a 2P-Set of vertices in a linked list.

Essentially,

- Build the tree, connecting each item to its parent
- When an item has multiple children, sort them by sequence number then by their ID.
- The resulting list (or text document) can be made by flattening the tree with a depth-first traversal.

```ts
type State = {
	// 2P-Set of vertices
	v_added: Set<Vertex> = [__LEFT, __RIGHT];
	v_rmved: Set<Vertex> = [];

	// G-Set of edges
	edges: Set<(Vertex, Vertex)> = [(__LEFT, RIGHT)];
}

class OpCRDT {
	@query
	function lookup(v: Vertex): boolean {
		return this.v_added.has(v) && !this.v_rmved.has(v)
	}

	// is u before v in the sequence?
	@query
	function before(u: Vertex, v: Vertex): boolean {
		if this.lookup(u) && this.lookup(v) {
			// see if there is a valid path from u to v using dfs
			const stack = [u]
			while stack.length > 0 {
				const cur = stack.pop()
				if cur === v {
					return true
				}

				const outgoing_vertices = this
					.edges
					.filter((_u, _v) => u === _u)
					.map((_, _v) => v)

				stack.push(...outgoing_vertices)
			}
			return false
		}
	}

	@query
	function successor(u: Vertex): Vertex {
		if this.lookup(u) {
			return this.edges.find((_u, _v) => u === _u)[1]
		}
	}

	@update
	function addRight(v: Vertex, x: Atom) {
		// ensure valid insert
		if v !== __RIGHT && this.v_added.sub(this.v_rmved).has(v) {
			const t = now()
			const w = (x, t)

			return (node) => {
				// find right place to insert node
				if node.v_added.has(v) {
					const l = v
					const r = node.successor(v)
					while true {
						const _v, _t = r
						if t < _t {
							// move forward one step
							l = r
							r = node.successor(r)
						} else {
							// right spot!
							// remove old edge
							this.edges.remove((l, r))
							// add new ones
							this.edges.add((l, w))
							this.edges.add((w, r))
							return
						}
					}
				}
			}
		}
	}

	@update
	function remove(v: Vertex) {
		if this.lookup(v) {
			return (node) => v_rmved.add(v)
		}
	}
}
```

### Continuous Sequence using real numbers

We need to translate indices into unique immutable positions (what the user intuitively means when they say 'insert here').

This assumption of relative order of elements remains constant over time is called the **strong list specification**.

Performance depends critically on the implementation of identifiers. One possible implementation is to use a dense identifier space like $\mathbb{R}$ where a unique identifier can always be allocated between any two identifiers.

Indices are based off of what % of the text they get inserted at. 0.0 is the index of the start sequence, 1.0 is the index of the end sequence (this is similar to what Treedoc does).

```
0.0       1.0
NUL       NUL
```

Inserting a single character would be halfway between 0.0 and 1.0 so it would have an index of 0.5.

```
0.0   0.5   1.0
NUL   'B'   NUL
```

Inserting to the left of 'B' would be between 0.0 and 0.5 so 0.25.

```
0.0  0.25  0.5   1.0
NUL   'A'  'B'   NUL
```

We represent the continuum using a tree. The first element is allocated at the root. Thereafter, it is always possible to create a new leaf $e$ between any two nodes $n$ and $m$.

We do this by representing the tree using a U-Set

```ts
type Element = (Atom, number)

type State = {
	set: Set<Element> = [];
}

class OpCRDT {
	@query
	function lookup(u: Element): boolean {
		return this.set.has(u)
	}

	@query
	function before(u: Element, v: Element): boolean {
		if this.lookup(u) && this.lookup(v) {
			const _, u_id = u
			const _, v_id = v
			return u_id < v_id
		}
	}

	@update
	function addBetween(u: Element, x: Atom, v: Element) {
		if this.before(u, v) {
			const _, u_id = u
			const _, v_id = v
			const new_el = (x, (u_id + v_id) / 2)
			return (node) => {
				node.set.add(new_el)
			}
		}
	}

	@update
	function remove(u: Element) {
		if this.lookup(u) {
			return (node) => node.set.remove(u)
		}
	}
}
```

## Graphs

Generally, graphs are difficult to maintain due to the property that CRDTs _cannot compute and maintain_ global invariants like structure.

However, some stronger forms of acyclicity are implied by local properties, for instance
a monotonic DAG, in which an edge may be added only if it oriented in the same direction
as an existing path. Vertices and edges can be stores as sets.

See reference implementations in [this paper](https://hal.inria.fr/inria-00555588/document)
