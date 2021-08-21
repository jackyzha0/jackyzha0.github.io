---
title: "React in 30 minutes or your money back"
date: 2021-08-07T08:38:11-04:00
draft: true
---

React is, as the [website](https://reactjs.org/) says, "a JavaScript library for building user interfaces." What this means exactly, is often confusing to people.

Many articles claim to teach you "React in 10 minutes" but rarely go beyond a few code examples. The problem is that this leaves you with an inkling of what React looks like and maybe how to write a bit of it, but no clue *why* it works and how to think about fixing React bugs.

This isn't some random bullshit tutorial which throws you a bunch of example code that you go on to copy-and-paste and then leaves you hanging wondering what it does. The goal is to give you a good foundation of the concepts within React, *why* people choose to use React, and how it works behind the hood. Hopefully, this gives you a good enough foundation to avoid entire classes of bugs when starting out in React.

This post assumes that you know basic HTML, CSS, and JavaScript.

## What is React?
The TLDR; is that it's a bunch of code you can add to your project that makes building websites and interfaces that **react** to changes when you do things (e.g. press buttons) really easy.

React has two distinguishing features that set it apart:
1. React is **declarative** meaning you tell React exactly what you want the page to look like and it'll figure out how to do that.
2. React is **component based** meaning that you can create pieces of the UI that you can reuse across different parts of your application.

## How a website works
Most likely, you've written some code for a website in plain old HTML before. This, as you know, defines the structure for what is inside a webpage. If the webpage is a house, the HTML is the blueprint that tells you what the house should generally look like and what is inside.

Yet, to turn that bunch of HTML into something displayable in your web browser, it needs to parse it into a more intermediate format it can more easily work with: the Document Object Model (DOM).

The nested structure of the HTML lends itself very well to a tree-like structure which the browser can then efficiently traverse and make updates to.

[insert html -> dom -> site image]

## How React works
### The Virtual DOM
Of course, you can still manipulate and interact with the regular DOM [through JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) still but the main gripe that React has with this way of manipulating the DOM (e.g. adding new things to the screen or modifying existing bits on the page) is that it is *realllyyy* slow.

This is where the mystical **virtual DOM** comes in. Because modifying the real DOM takes a really long time and an in-memory version implemented in JavaScript would be magnitudes faster, that's exactly what React does. React creates a virtual DOM where it keeps track of what it would *like* the real DOM to look like and then intelligently batches and combines changes together to optimize and squeeze the most performance out of the few expensive writes to the actual DOM it does. More info on [how DOM diffing and patching works](https://buildwithreact.com/tutorial/under-the-hood) under the hood for those curious.

### Components
Another things that React tackles really well is that regular HTML and JS makes it a lot more difficult than it should be to re-use the same UI and logic across different pages on your website.

[component reuse diagram]

The main philosophy of functional React is that you should override and inherit behaviour. Instead, get the behaviour you want by creating and composing reusable *components*. Each of these components can hold some sort of data of its own, called its **state**. Each component can also take in a few arguments or parameters called **properties** or **props** for short.

Each component is composed up of either primative HTML elements (e.g. `<div>` or `<h1>`) or other React components. The elements that a component is composed of is called its **children**.

[state, props, and children diagram]

### JSX
JSX is a extension to regular JS which lets you write HTML-like code to define React components. 

JSX is declarative at heart. This menas you describe exactly what you want the component to look like based off of some given data (props and state in this case) and React will figure out how to get the page to look like that.

```jsx

// JSX can be just regular HTML
<div>Bottom Text</div>

// It can also be a user-defined Component. In this case, the component has
// no children or 'inner HTML' so we can write it like this
<ExampleComponent/>

// We can also pass in properties to a component by adding a tag with that
// property name. Any string can be passed in regularly, or you can also choose
// to pass in any JS expression (e.g. number, function, object, etc.) by enclosing
// it in curly braces
<Hello name="World" number={2 + 3}/>

// To 'compose' components, you can nest them like so
<Dashboard>
  <Greeting/>
  <Statistics>
    <BarChart data={data}/>
    <PieChart data={data}/>
  </Statistics>
</Dashboard>
```

Great, so that's just what JSX *looks like*, how do we use it in React? The first thing to note is that a **component in React is just defined as a function which returns some JSX**.

```jsx

// A simple 'Hello World' component in React!
// React passes us all of the props in a 'props' object
// Then, we can use {} to indicate a JS expression (in this
// case, we're accessing the 'name' prop)
function Greeting(props) {
  return <p>Hello {props.name}!</p>
}

// Let's say we want to create a component that re-uses our Greeting
// component from above
function HelloWorld() {
  return (<div>
    <h1>My Hello World App</h1>
	<Greeting name="World!"/>
  </div>)
}
```

Then, at the end, we tell React to finally render these components into the actual DOM

```jsx
// We use use the ReactDOM.render function to tell React
// to replace the element with the id 'root' in the real DOM
// with our HelloWorld component
ReactDOM.render(HelloWorld, document.getElementById('root'))
```

## Life Cycle
So this covers static components, but this misses the biggest benefit that React offers: reactivity to data changes.

react _reacts_ to changes in data and changes the DOM based off it

All living things are born. And then they die. React components have similar lifecycles. They are born (mounted), updated, and eventually die (unmounted).

1. Mount (when the component is first added to the virtual DOM)
set initial state and props
initial paint to DOM, run initial useEffect

2. Update (when parent is updated, state changes, or on first render)
Render Phase -> update state
Commit Phase -> reconcile real DOM with virtual DOM, run any effects necessary

3. Unmount (when the parent component is no longer rendered to the DOM)
Commit Phase -> cleanup all effects (run callback returned from each effect), reconcile DOMs

## Hooks
The way we create

-   what are hooks???
    -   react lifecycle → hook into the lifecycle


### `useState`
### `useEffect`
### `useSWR`



## Building an App
https://github.com/jackyzha0/min-react
