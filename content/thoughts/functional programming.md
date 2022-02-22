---
title: "Functional Programming"
date: 2022-02-21
tags:
- sapling
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

Monad lies (all of these equations should be satisfied)
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

## Haskell Syntax Things
1. `a $ b` generally useful for removing parenthesis in function calls (adds implicit parentheses and makes it right associative instead of left associative)
	1. Normally, `sort "abc" ++ "def"` would be interpreted as `(sort "abc") ++ "def"`
	2. If we use the `$` operator, we can do `sort $ "abc" ++ "def"` which is interpreted as `sort ("abc" ++ "def")` as intended.