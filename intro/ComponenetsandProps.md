### Components and Props
----
* Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

Components are like JavaScript functions. 

They *accept* arbitrary *inputs* (called “**props**”) and *return* *React elements* describing what should appear on the screen.

### Function and Class Components
---
The simplest way to define a component is to write a JavaScript function:
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

This function is a valid React component because it accepts a single “props” argument with data and returns a React element. 

These components "**function components**” because they are literally JavaScript functions.

You can also use an ES6 class to define a component:
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
The above two components are equivalent to React.


### Rendering a Component
---
So far React elements only represent DOM tags:
```javascript
const element = <div />;
```
Elements can also represent user-defined components:
```javascript
const element = <Welcome name="Sara" />;
```
* React sees an element representing a user-defined component, it *passes JSX attributes* to this component as a single object, called “**props**”.

For example, this code renders “Hello, Sara” on the page:
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
>  Note: Always start component names with a capital letter.
> React treats components starting with lowercase letters as DOM tags.

## Composing Components
---

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. 

We can create an App component that renders Welcome many times:
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
``` 

Typically, new React apps have a single App component at the very top. 

However, if you integrate React into an existing app, you might start bottom-up with a small component like Button and gradually work your way to the top of the view hierarchy.

### Extracting Components
---
Split components into smaller components.

For example, consider this Comment component:
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
``` 
It accepts `author` (an object), `text` (a string), and `date` (a date) as **props**, and *describes a comment on a social media* website.

This component can be tricky to change because of all the nesting, and it is also hard to reuse individual parts of it. 

Let’s extract a few components from it.

First, we will extract **Avatar**:
```javascript
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

* The Avatar doesn’t need to know that it is being rendered inside a Comment. 
    * This is why we have given its prop a more generic name: user rather than author.

> Name props from the component’s own point of view rather than the context in which it is being used.

We can now simplify Comment a tiny bit:
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Next, we will extract a `UserInfo` component that renders an Avatar next to the user’s name:
```javascript
function UserInfo(props) {
  return (
    <div className="UserInfo">
      // Avatar is here receiving props of user
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```
This lets us simplify Comment even further:
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Extracting components leads to a palette of reusable components pays off in larger apps. 

A good rule of thumb is that if a part of your UI is used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, Comment), it is a good candidate to be a reusable component.

### Props are Read-Only
----
Whether you declare a component as a function or a class, it must never modify its own props. Consider this sum function:
```javascript
function sum(a, b) {
  return a + b;
}
```
Such functions are called “**pure**” because they *do not attempt to change their inputs*, and always *return the same result* for the same inputs.

In contrast, this function is impure because it changes its own input:
```javascript
function withdraw(account, amount) {
  account.total -= amount;
}
```
React is pretty flexible but it has a single strict rule:

> All React components must act like pure functions with respect to their props.

Of course, application UIs are dynamic and change over time.
[Next Page](./StateAndLIfeCycle.md)