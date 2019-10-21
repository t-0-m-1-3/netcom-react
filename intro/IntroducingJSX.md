## Introducing JSX
----
```javascript
const element = <h1> Hello, World!</h1>
```
* This isn't really `javascript` and it's not really `html` it's `JSX`. 

* It is called `JSX`, and it is a syntax extension to JavaScript. The team recommends using it with React to *describe* what the UI should look like. 
* JSX may remind you of a template language, but it comes with the full power of JavaScript.

JSX produces React “elements” which it renders to the DOM. 

## Why JSX?
---
* React embraces:
  *  the fact that rendering logic is inherently coupled with other UI logic: 
     *  how events are handled, 
     *  how the state changes over time, 
     *  how the data is prepared for display.

Instead of artificially separating technologies by putting markup and logic in separate files, 

* React separates concerns with coupled units called “**components**" that contain both. 

* React doesn’t require using JSX, 
* Most people find it helpful as a visual aid when working with UI inside the JavaScript code. 
* It also allows React to show more useful error and warning messages.

## Embedding Expressions in JSX
----
The example below declares a variable called `name` and then uses it inside JSX by wrapping it in curly braces:

```javascript
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
You can put any valid JavaScript expression inside the curly braces in JSX. 
For example, `2 + 2`, user`.firstName`, or `formatName(user)` are all valid JavaScript expressions.

In the example below, we embed the result of calling a JavaScript function, `formatName(user)`, into an `<h1>` element.

```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## JSX is an Expression Too
----
After compiling, JSX expressions become regular JavaScript functions and evaluate to objects.

You can use JSX inside of `if` statements and `for` loops, assign it to variables, accept it as arguments, and return it from functions:
```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

## Specifying Attributes with JSX
---
You may use **quotes** to specify **string literals** as attributes:
```javascript
const element = <div tabIndex="0"></div>;
```
You may also **use curly braces to embed** a JavaScript expression in an attribute:
```javascript
const element = <img src={user.avatarUrl}></img>;
```

* Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. 
  * You should **either use quotes** (for string values) **or curly braces** (for expressions), **but not both** in the same attribute.
  * Avoid collisions between javascript **clas** and jsx **className** ( this is why we use camelCase ) 

### Specifying Children with JSX
----
If a tag is empty, you may close it immediately with `/>`, like XML:
```javascript
const element = <img src={user.avatarUrl} />;
```
JSX tags may contain children:
```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);

JSX Prevents Injection Attacks

It is safe to embed user input in JSX:
```javascript
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```
By default, `React DOM` **escapes any values** embedded in JSX **before rendering** them. Thus it ensures that *you can never inject anything that’s not explicitly written* in your application. *Everything is converted to a string* before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

### JSX Represents Objects
----
`Babel` compiles JSX down to `React.createElement()` calls.

These two examples are identical:

```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
----

```javascript
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
`React.createElement()` performs a few checks to help you write bug-free code but essentially it creates an object like this:
```javascript
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
These objects are called “React elements”. You can think of them as descriptions of what you want to see on the screen. 

React reads these objects and uses them to construct the DOM and keep it up to date.


> Tip:
----
> We recommend using the “Babel” language definition for your editor of choice so that both ES6 and JSX code is properly highlighted. This website uses the Oceanic Next color scheme which is compatible with it.

[Next Page](./RenderingElements.md)