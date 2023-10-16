---
title: Lambda Calculus
date: 2023-10-14
tags:
  - seed
---


$\lambda$-calculus is a [[thoughts/notation|notation]] for functions and applications. The main ideas are _applying_ a function to an argument and forming functions by _abstraction_.

For example, to represent $f(x)=x^2-2x+5$ in $\lambda$-calculus, we can write a $\lambda$-term

$$\lambda x [x^2-2x+5]$$

For those coming from programming languages like JavaScript, this is equivalent to

```javascript
x => x^2 - 2*x + 5
```

This can be read as an expression 'waiting' for a value $a$ for the variable $x$. When given a value $a$, it is substituted to become $a^2-2a+5$. The act of receiving a value $a$ is referred to as applying the $\lambda$-term to the argument $a$. This is written in notation $Ma$ to denote applying function $M$ to argument $a$.

The central principle of the $\lambda$-calculus is $\beta$-conversion or $\beta$-reduction which is effectively saying that you can substitute values into arguments of functions, effectively binding them.

## Multi-argument operations
For example the Pythagorean theorem:

$$\textrm{Hypotenuse Length} := \lambda a [ \lambda b [ \sqrt{a^2 + b^2} ]]$$

Or in JavaScript:

```js
a => b => Math.sqrt(a^2 + b^2)
```

This is what currying does in any [[thoughts/functional programming|functional programming]] language.

## Binding
We write $M[x:=N]$ to denote the substitution of $N$ for the free occurrences of $x$ in $M$.

$\lambda x[M]$ can then be thought of as binding $x$ in the term $M$.

The following examples are in Scheme/Lisp/Racket:
- `(lambda (x) x)`, the `x` is a bound variable. There are no free variables so the expression can be considered a combinator.
- `(lambda (x) y)`, the `y` is a free variable and thus the expression is not a combinator.
- `(lambda (x) (lambda (y) x))`, there is only one variable `x` (`y` exists but it is a formal argument of the expression and not used).
## Combinators
A $\lambda$-term with no free variables. Effectively a self-contained or completely specified operation.

- S combinator: $\lambda x[\lambda y [\lambda z [xz(yz)]]]$
	- `const fn = x => y => z => (x(z))(y(z))`
- K combinator (constant function):  $\lambda x [\lambda y [x]]$
	- `const fn = x => _y => x` (e.g.) `f(5)(_any) = 5`
- I combinator (identity function): $\lambda x[x]$
	- `const fn = x => x`
- B combinator (right associative operator): $\lambda x[\lambda y[\lambda z[x(yz)]]]$
	- `const fn = x => y => z = x(y(z))`
	- This is disambiguated from the C combinator
- C combinator (left associative application): $\lambda x[\lambda y[\lambda z[xyz]]]$
	- `const fn = x => y => z = (x(y))(z)`
- $\omega$ combinator: $\lambda x[xx]$
	- `const fn = x => x(x)`
- $\Omega$ combinator: $\omega \omega$
	- Equivalent to application of the self-application combinator to itself: $\lambda (\lambda x[xx])[\lambda x[xx] \lambda x[xx]]$
		- $\lambda(\omega)[\omega \omega] \equiv \omega \omega$ (unsure if this is actually true)
	- `const fn = (x => x(x)) => (x => x(x))(x => x(x))`
- Y combinator: $\lambda f [(\lambda x [f(xx)])(\lambda x[f(xx)])]$
	- Higher order function that takes in a function that isn't recursive and returns a version of the function that is recursive
	- `const fn = f => (x => f(x(x)))(x => f(x(x)))`

## Y Combinator in detail
[Source](https://mvanier.livejournal.com/2897.html)

Implicit recursion operator, how might you define a recursive function without naming it?

It's a tried-and-true principle of functional programming that if you don't know exactly what you want to put somewhere in a piece of code, just abstract it out and make it a parameter of a function.

```scheme
(define factorial
	(lambda (n)
	  (if (= n 0)
		  1
		  (* n (factorial (- n 1))))))
```

We can abstract out the recursive call with another function that is provided as a parameter

```scheme
(define almost-factorial
	(lambda (f)
		(lambda (n)
			(if (= n 0)
				1
				(* n (f (- n 1)))))))
```

The Y combinator then effectively turns `(Y almost-factorial)` into something equivalent to `factorial`

In lazily evaluated languages, you can actually pass itself in as an argument and it will actually work correctly. That is, `(define factorial (almost-factorial factorial))` will produce an actual factorial function.

Unfortunately, this will infinitely loop for languages that use strict evaluation.

Let us imagine that we want to make some function `fn` recursive. We can
1. Do what we did above to create `almost-fn` by abstracting out the recursive call to `fn` as an argument `f`.
2. `(define almost-fn-0 (almost-fn identity))` where `identity` is just `(lambda x x)`. This works for the base case of `fn`.
3. Then, we construct `almost-fn-1` by `(define almost-fn-1 (almost-fn almost-fn-0)` which is equivalent to `(define almost-fn-1 (almost-fn (almost-fn identity)))`. This works for the base case and one level of recursion.
4. The natural extension of this is to create `(define almost-fn-infinity (almost-fn (almost-fn (almost-fn ... identity))))` which will work for all levels of recursion. `almost-fn-infinity` is the fixpoint of `almost-factorial`. That is, `fixpoint-fn = (almost-fn fixpoint-fn)`.
5. We can try to reverse engineer the definition of `fixpoint-fn` by repeatedly substituting the right-hand side of the equation. That is, we get `fixpoint-fn = (almost-fn (almost-fn (almost-fn ...)))`. Wouldn't it be great to get a function that takes in `almost-fn` and produces `fixpoint-fn`? This is the Y combinator.
6. Y combinator then is `(define Y fn) = fixpoint-fn`.

#### Deriving the lazy Y combinator
1. We know that `(define fn fixpoint-fn) = fixpoint-fn`
2. By reflexivity, we get `(define Y fn) = fixpoint-fn = (fn fixpoint-fn)`
3. Substituting, we get `(define Y fn) = (fn (Y fn))`. This is _a_ definition of Y but it will only work in a lazy language and, because it uses `Y` in its own definition, is not a true combinator.

In a strict language, we need to avoid using `Y` in its own definition. 

Let's modify the factorial function to take itself as an extra argument when you call the function: 

```scheme
(define part-factorial
	(lambda (self)
		(lambda (n)
			(if (= n 0)
				1
				(* n (self (- n 1)))))))
```

You would, however, need to call `(part-factorial part-factorial 5)` to calculate the factorial. To take this into account, we also need to modify the recursive call.

```scheme
(define part-factorial
	(lambda (self)
		(lambda (n)
			(if (= n 0)
				1
				(* n (self self (- n 1))))))) ; extra self
```

The `self self` call here isn't a problem as it only happens in the non-base case. We can try to make the inner part of `part-factorial` more like `almost-factorial` by creating a let binding for `self self`

```scheme
(define part-factorial
	(lambda (self)
		(let ((f (self self)))
			(lambda (n)
				(if (= n 0)
					1
					(* n (f (- n 1)))))))) ; extra self
```

Note that this won't actually work because the let binding makes `self self` get evaluated regardless of base case so will send us into an infinite loop in strictly evaluated languages. We can make it lazy because we can turn any let binding into a lambda expression

```scheme
(let ((x <expr1>)) <expr2>)
==> ((lambda (x) <expr2>) <expr1>)
; equiv as you are basically making an IIFE that binds <expr1> to x
; scoped to the lambda
```

Rewriting the above,

```scheme
(define part-factorial
	(lambda (self)
		((lambda (f) ; this is `almost-factorial`
			(lambda (n)
				(if (= n 0)
					1
					(* n (f (- n 1))))))
			(self self))))
```

Then after pulling out `almost-factorial`, `part-factorial` is

```scheme
(define part-factorial
	(lambda (self) (almost-factorial (self self))))

(define factorial (part-factorial part-factorial))
```

Inlining `part-factorial`,

```scheme
(define factorial
	(let (part-factorial)
		(lambda (self) (almost-factorial (self self)))
	(part-factorial part-factorial)))
```

Replacing the let binding with a lambda expression like above,

```scheme
(define factorial
	((lambda (part-factorial) (part-factorial part-factorial))
	(lambda (self) (almost-factorial (self self)))))

; renaming part-factorial x to make it more concise
; we can also rename self to x as the scope is different from x

(define factorial
	((lambda (x) (x x))
	(lambda (x) (almost-factorial (x x)))))
```

Finally, we can abstract  away the call to `almost-factorial` (which is actually the lazy Y combinator!)

```scheme
(define Y
	(lambda (f)
		((lambda (x) (x x))
		(lambda (x) (f (x x)))))))

(define factorial (Y almost-factorial))

(define almost-factorial
	(lambda (f)
		(lambda (n)
			(if (= n 0)
				1
				(* n (f (- n 1)))))))
```

We can apply the argument of the outer lambda to its definition to arrive at the common definition of the normal-order Y combinator.

```scheme
(define Y
	(lambda (f)
		((lambda (x) (f (x x)))
		(lambda (x) (f (x x))))))
```

Again, this application in JS to make it more clear:

```js
(x => x(x))(x => f(x(x)))
// replacing x in the fn with (x => f(x(x)))
(x => f(x(x)))(x => f(x(x)))
```