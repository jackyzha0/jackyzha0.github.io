$\lambda$-calculus is a functions and applications.

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

$\lambda x[M]$ can then be thought of as binding $x$ in the term $M$
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
	- `const fn = f => (x => f(x(x)))(x => f(x(x)))`
	- Implicit recursion operator, how might you define a recursive function without naming it?