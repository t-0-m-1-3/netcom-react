### Hooks at a Glance
---
* Hooks are backwards compatible

#### State Hook
----
The counter example
```javascript
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  //unlike `this.setState` the argument doesn't need to be an object
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```
* In this function `useState` is a hook, it is called inside a function componenet to add some local state
* React preserves this between re-renders
* `useState` returns a pair; the *current state* and a function that lets you update it.
* You can call this function from an event handler or somewhere else. 
* Similar to `this.setState` in a class without merging the old and new state together.
* The only argument is taakes is the initial state.
* Arguments for `useState` don't have to be objects, but they can be if you want them to
* Initial state is only used in the first render

### Declaring multiple state variables
----
* Using the state hook multiple times in a single component saves space
```javascript
function ExampleWithManyState(){
	//declare multiple state vars
	const [age, setAge] = useState(42);
	const [fruit, setFruit] = useState('banana');
	const [todos, setTodos] = useState([{text: 'replace lifecycle methods with hooks'}]);
	// other stuff and logic
	}
```
* **Array Destructuring** syntax gives different names to the state variables by calling `useState`.
* React assumes that if you call `useState` many times, you do it in the same order during every render

#### What are these things?
--- 
* Hooks are just functions ( like everything is an object in JS, everything in hooks are functions )
* They let you *hook into* React state and lifecycle features from **function components**.
* **Hooks do not work in classes**; ~React doesn't recommend re-writing your apps in Hooks~
* React provides a few built-in hooks like `useState`; you can also create your own or find more at [Awesome-Hooks Github](https://github.com/rehooks/awesome-react-hooks)


## Effect Hook
----
* **Side Effects** are operations that affect other components and cannot be done during rendering; This is like data fetching, subscriptions, or manually changing the DOM. 
* The Effect Hook, `useEffect`, adds the ability to perform side effects from a function component. 
	* it serves the same purpose as: `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes within on API. 

```javascript 
// setting a document title after React updates the DOM
import React, {useState, useEffect} from 'react';
function Example() {
  const [count, setCount] = useState(0);

// Similar to componentDidMount and componentDidUpdate
useEffect(() => {
//update the document title using the browser API
	document.title = `You Clicked ${count} times`;
}); 
return (
	<div>
	 <p> You clicked {count} times </p>
		 <button onClick{() => setCount(count + 1)}>
			Click Me Please
		</button>
	</div>
);
}
```
* Calling the `useEffect` tells react the run the effect function *after* flushing changes to the DOM.
* Effects are declared inside the component so they have access to props and state. 
* Default: React runs the effects after *ever* render, including the first.
* Effects may also optionally specifiy how to "clean up" by returning a function
```javascript
import React, {useState, useEffect} from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
  setIsOnline(status.isOnline);
  }

  useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

  return () => {
  ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
  });

  if (isOnline === null) {
  return 'Loading ...';
  }
  return inOnline ? 'Online' : 'Offline';
  }
  ```

* Here react unsubscribes from the `ChatAPI` when the component unmounts, and before re-running the ffect for a subsequent re-render. ( you can tell react to skip this is the `props.friend.id` didn't chnge ) 
* You can use more than a single effect in a component, just like `useState` 
```javascript 
function FriendStatusWithCounter(props){
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    });

    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
    });

    funtion handleStatusChange(status){
    setIsOnline(status.isOnline);
    }
    // more logic below
```
* Hooks allow you to organize side effects in a component by what peices are related, rather than splitting up by lifecycle methods. 

### Rules of Hooks
----
* Hooks are functions, but they impose two additional rules:
1. Only call hooks at the **top level**, not inside of loops, conditions, or nested functions. 
2. Only call hooks **from React function components**, not in regular JS functions. 

* Facebook provides it's custom [linter program they built](https://www.npmjs.com/package/eslint-plugin-react-hooks) to help 

* Assuming you already have ESLint installed, run:
```bash
# npm 
npm install eslint-plugin-react-hooks --save-dev
 
# yarn 
yarn add eslint-plugin-react-hooks --dev
``` 
* inside eslint configurations
```json
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Building your Own Hooks
----
* Reusing stateful logic between components is a powerful feature of React.
* Previously, **Higher Order Components** and **Render Props** were the two paradigms used

```javascript
// the former FriendStatus component called `useState` and `useEffect` to subscribe to a friends status
// to reuse this logic in another component, one design pattern is
import React, {useState, useEffect} from 'react';
function useFriendStatus(friendID){
	const [isOnline, setIsOnline] = useState(null);
function handleStatusChange(status) {
setIsOnline(status.isOnline);
}

useEffect(() => {
	ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
	return () => {
	ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
	};
	});
	return isOnline;
	}
```
* This takes `friendID` as an argument and returns whether or not the friend is online, now it can be reused

```javascript
function FriendStatus(props) {
 const isOnline = useFriendStatus(props.friend.id);

 if (isOnline === null ) {
  return 'Loading ...';
  }
   return isOnline ? 'Online' : 'Offline';
   }
```
and in the other component
```javascript
function FriendListItem(props) {
const isOnline = userFriendStatus(props.friend.id);

return (
	<li style={{color: isOnline ? 'green' : 'black' }}>
	{props.friend.name}
	</li>
	);
	}
```

* State here is completely independent. Hooks are ways to reuse *stateful* logic, not *state*.
* Each call to a Hook is a completely isolated state. ( use same Hook twice in a component)
* Custom hooks are more of a convention than feature. 
	* function names that state with `use` and calls other Hooks it's a **custom** hook. 
	* `useWhatever` will be picked up by the linter. 

### Other Hooks
----
* Less common built in hooks can also be useful
* `useContext` lets you subscribe to React context without nesting
```javascript
function Example() {
 const locale = useContext(LocalContext);
 const theme = useContext(ThemeContext):
 //dragons and stuff
 }
```

* `useReducer` lets you manage local state of complex components with a reducer. 
```javascript 
function Todos() {
   const [todos, setTodos] = useReducer(todosReducer);
   // other logic to print or manipulate todos
```
```
