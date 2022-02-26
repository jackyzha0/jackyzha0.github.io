---
title: "Functional Programming"
date: 2022-02-21
tags:
- sapling
- technical
---

## Terminology
### Functor
A type that can be mapped over.

```haskell
class Functor f where
	fmap :: (a -> b) -> f a -> f b
	(<$) :: a -> f b -> f a
```

`fmap` takes a function which maps a value from `a` to `b` and applies it to a Functor `f`.

### Monad
All Monads are functors. Monads allow you to 'chain' or compose monads. A container for values that can be mapped over.

```haskell
class Monad m where
  -- bind operation
  -- takes an f :: (a -> m b) and applies it to
  -- the inner value a of m
  (>>=)  :: m a -> (a -> m b) -> m b

  -- replaces m a with m b
  (>>)   :: m a ->  m b       -> m b

  -- constructs the simplest monad m using a
  return ::   a               -> m a
```

Monad facts (all of these equations should be satisfied)
```haskell
return a >>= k                  =  k a
m        >>= return             =  m
m        >>= (\x -> k x >>= h)  =  (m >>= k) >>= h
```

## Left and Right Associativity
Associativity of an operator determines how operators are grouped in the absence of parentheses.

For the following examples, we consider a fictional operator `~`

1. Associative: operations can be grouped arbitrarily (e.g. addition, order doesn't matter)
2. Left-associative: operations are grouped left to right
	1. `a ~ b ~ c` is interpreted as `(a ~ b) ~ c`
	2. Examples include
		1. Function application operator
3. Right-associative: operations are grouped right to left
	1. `a ~ b ~ c` is interpreted as `a ~ (b ~ c)`
	2. Examples include
		1. Variable assignment (`=`)
		2. Exponentiation (`^`)
4. Non-associative: operations cannot be chained

## Parser Combinators
> Parser combinators are a technique for implementing parsers by defining them in terms of other parsers

Notes on [Chumsky](https://github.com/zesterer/chumsky)

Where `a` and `b` are both parsers.

Parser Methods
1. `just(a)` accepts a single string `a`
2. `a.or(b)` parse `a`, if `a` fails, try parsing `b`
3. `a.choice(b,c,d...)` try parsing `b`, `c`, `d`, return first one that succeeds
4. `a.or_not()` optionally parse `a`
5. `a.ignore_then(b)` ignore pattern `a` then parse `b`
6. `a.then_ignore(b)` parse `a` then ignore `b`
7. `a.then(b)` parse both `a` and `b` and return a tuple of `(a,b)`
8. `a.padded()` ignore whitespace around `a`
9. `a.repeated().at_least(n)` parse `a` at least `n` times
10. `a.filter(fn)` only accept `a` if `fn(a)` evaluates to true

Result Methods
1. `a.collect()` turn results of `a` into an iterator
2. `a.map(b)` map results of `a` into type `b`
3. `a.chain(b)` concatenate results of parsers `a` and `b` into collection
4. `a.copy(b)` duplicate parser definition 
5. `a.flatten()` flatten nested collection
6. `a.to(b)` marks result of `a` as type `b`
7. `a.labelled(b)` label result of a with `b`
8. `a.end()` indicate end of parser

## Haskell Syntax Things
1. `a $ b` generally useful for removing parenthesis in function calls (adds implicit parentheses and makes it right associative instead of left associative)
	1. Normally, `sort "abc" ++ "def"` would be interpreted as `(sort "abc") ++ "def"`
	2. If we use the `$` operator, we can do `sort $ "abc" ++ "def"` which is interpreted as `sort ("abc" ++ "def")` as intended.