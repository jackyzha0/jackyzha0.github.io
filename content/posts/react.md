---
title: "React in 30 minutes or your money back"
date: 2021-08-07T08:38:11-04:00
draft: true
---

## Essence of React
Let's say you want to make a todo list website


## How a website works
Common analogy for a website
1. HTML is the foundation and frame of the house
2. CSS is the decoration that goes into each room
3. JS is the electricity and plumbing that makes it all work

Thinking about it hierarchically

## How React works
breaking things down into reusable components
each component can hold state or some sort of data
optionally pass it down to its children

when data changes,
-   DOM diffing and patching
-   react _reacts_ to changes in data and changes the DOM based off it

## Setting up a React project

https://github.com/jackyzha0/min-react

## Components
in HTML and JS, rendering logic (HTML) is separate from UI logic (JS)

React focuses on separation of concerns instead of separation of technologies by using *components* that contain both.


```jsx
// defining a component (a function that returns some JSX)
const Greeting = () => {
  return <p>Hello World!</p>
}

const App = () => {
  return (<div>
	<Greeting />
  </div>)
}

// inserting a react component into our page (at the root)
ReactDOM.render(HelloWorld, document.getElementById('root'))
```

### Composition over Inheritance


### Properties
What if we want to pass information down to our components?

```jsx
const Greeting = (props) => {
  return <p>Hello {props.name}!</p>
}

const App = () => {
  return (<div>
	<Greeting name="Jacky"/>
  </div>)
}

// inserting a react component into our page (at the root)
ReactDOM.render(HelloWorld, document.getElementById('root'))
```

## Hooks
So this covers static components, but this misses the biggest benefit that React offers: reactivity to data changes.

> React elements are immutable. Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

-   what are hooks???
    -   react lifecycle → hook into the lifecycle

### `useState`
### `useEffect`
### `useSWR`

## Building an App
-   simple todo list


Ruth is bad as