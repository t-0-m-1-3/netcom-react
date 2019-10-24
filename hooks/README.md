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


### Using the State Hook
----
```javascript
import React, {useState} from 'react';
function Example(){
//declare new state variable
const [count,setCount] = useState(0);

return (
	<div>
	 <p> You clicked {count} times </p>
	 <button onClick={() => setCount(count + 1)}>
	 	Click Me
	</button>
	</div>
);
}
```

##### what did this used to look like?

```javascript 
class Example extends React.component{
	constructor(props) {
	   super(props);
	   this.state = {
	   count: 0
	   };
	}

	render() {
	   return {
	      <div>
	        <p> You clicked {this.state.count} times </p>
		<button onClick={()=> setState({count: this.state.count + 1 }))}>
			Click Me
		</button>
		</div>
		);
		}
	}
```

* State starts as an object `{count: 0 }` and is increment `state.count` using the click handler calling `this.setState()`. 

### Hooks and Function Components
----
Functional Components in React 
```javascript
const Example = (props) => {
//You can use hooks in here too
	return <div />;
}
```
or simply
```javascript
function Example(props) {
// hooks can go here
	return <div />;
}
```
* These were previously known as "stateless components", since state is now able to be used inside of them, they are called **funciton components**.

### What's a Hook
----
* Start by importing them from `react` 

```javascript
import React, { useState } from 'react';
function Example() {
// dragons and stuff
}
```
* **A Hook** is a special function that lets you "hook into" React features. `useState` is a hook that lets you add React state to function components 
* **When to use a hook**? If you write a function component and realize you need to add some state to it, you previously had to convert it to a class. Use a Hook inside the existing function component.

### Declaring a State Variable
----
* In a class we set the state to `0` by setting `this.state` to `{count: 0}` in the constructor
```javascript
class Example extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
	count: 0
	};
}
```
* Function componenets have no `this` to assign or read `this.state`. 
* `useState` Hook is used inside the component. 
```javascript
import React, {useState} from 'react';
function Example(){
//declare a new state var
const [count, setCount] = useState(0);
```

* **What does calling `useState` do**? It decalres the *state variable* (`count`). It could be called anything though
* This is just a way to "preserve" some values between the function calls.
* `useState` extracts the same capabilities that `this.state` did. 
* **What do we pass to `useState` as an argument**? Just initial state.
* **What does `useState` return**? Returns a pair of values: current state and a function to update it. `const [count, setCount] = useState()` 

```javascript
import React, {useState} from 'react';
class Example extends React.Component {
	const [count, setCount] = useState(0);
}
```
* Declare a state variable `count` set to `0`. React will remember its current value between re-renders, and provide the most recent one to our function. 

### Reading State
----
* To display the curent count in a class, read `this.state.count` 
```javascript
<p> You clicked {this.state.count} times </p>
```
* With a function you just use `count` directly
```javascript
<p> You clicked {count} times </p>
```

### Updating State
----
* With Classes you call `this.setState()` to update `count` 
```javascript
<button onClick={() => this.setState({count: this.state.count + 1 })}>
	click me
</button>
```
* With funcitons `setCount` and `count` are already variables, exclude `this` 
```javascript
<button onClick={() setCount(count + 1 )}>
	click me
</button>

```

### Summing Up
----
 ```javascript
import React, { useState } from 'react';
 
function Example() {
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
*    Line 1: We import the useState Hook from React. It lets us keep local state in a function component.
*    Line 4: Inside the Example component, we declare a new state variable by calling the useState Hook. It returns a pair of values, to which we give names. We’re calling our variable count because it holds the number of button clicks. We initialize it to zero by passing 0 as the only useState argument. The second returned item is itself a function. It lets us update the count so we’ll name it setCount.
*    Line 9: When the user clicks, we call setCount with a new value. React will then re-render the Example component, passing the new count value to it.

#### What do the Sqaure Brackets Mean?
----
`const [count, setCount] = useState(0);`
* The names on the left aren't part of the React API, but you can name your own state vars
`const [fruit, setFruit] = useState('banana');`
* The Javascript syntax is called **array destructuring**. It means that two new variables `fruit` and `setFruit` are returned by `useState`; `fruit` is the first and `setFruit` is the second

It's the same as 
```javascript
var fruitStateVariable = useState('banana'); // retuns a pair
var fruit = fruitStateVariable[0]; //first item in a pair
var setFruit = fruitStateVariable[1] ; //second item in pair
```
* Declaring a state variable `useState`, it returns a pair, instead of using bracket notation to represent them, destructuring is used. 

#### Using multiple state variables
----
* Decalring state variables as a pair of `[something, setSomething]` allows different names to different state variables
```javascript
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Make Coffee' }]);
```

* You don’t have to use many state variables. 
* State variables can hold objects and arrays just fine, so you can still group related data together. 
However, unlike `this.setState` in a class, updating a state variable always replaces it instead of merging it.



### Using the Effect Hook
----
* **Effect Hook** lets you perform side effects in functions
```javascript
import React, {useState, useEffect} from 'react';
function Example() {
 const [count, setCount] = useState(0);
 // Similar to componentDidMount and ComponentDidUpdate
 useEffect(() => {
   //update the title of the document
   document.title = `You clicked ${count} times`; 
   });

   return (
   <div>
	    <p> You cliked {count} times</p>
	    <button onClick={()=> setCount(count + 1)}>
		    Click me
	    </button>
    </div>

);
}
```

* Data fetching, setting up a subscription, and manually chaning the DOM in React components are all **side effects**
* Two common side effects are: Those that don't require cleanup, and those that do

### Effects without Cleanup
---
* Sometimes we want to run **additional code after the DOM is update**. Network requests, manual DOM, and loggin are common examples that don't require cleanup, they're run and not handled after. 

#### Example using classes
----
* React class components the `render` method shouldn't cause side effects. Effects are after the DOM is updated by React
* React classes have side effects put into `componentDidMount` and `componentDidUpdate`. 

```javascript
class Example extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
	count: 0
	};
	}

	componentDidMount() {
	  document.title = `You clicked ${this.state.count} times`;
	}
	
	componenDidUpdate() {
	  document.title = `You clicked ${this.state.count} times`;

	}

	render() {
	 return (
	   <div>
	     <p> You clicked {this.state.count} times </p>
	     <button onClick={() => this.setState({count: this.state.count + 1 })}>
	      click me
	     </button>
	   </div>
	);
	}
}
```
* Lifecycle methods don't really apply that well to DRY code

### Example Using Hooks
----
```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

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
* **What does `useEffect` do**? This hooks tells React that your component needs to do something after render. React remembers the function you passed as an effect and calls it later after performing updates.
* **Why is `useEffect` called in a component**? Placing `useEffect` inside the component lets `count` state variables be accessible. Hooks use JavaScript closures and avoid introducing React specific APIs.
	* **Does `useEffect` run after every render**? Yes it does by default. React guarantees the DOM has been updated by the time it runs the effects.

#### Detailed Explanation
----
```javascript
function Example(){
 const [count, setCount] = useState(0);

 useEffect(()=> {
  document.title = `You clicked ${count} times`;
  });
  }
```
* Decalre the `count` state variable and tell react we need to use an effect.
* Pass the `useEffect` Hook a funtion, it *is* the effect. 
* The funciton passed to `useEffect` is going to be different on every render. 
* Everytime react re-renders, a *different* effect is scheduled. 

### Effects with Cleanup
----
* Setting up something like a subscription to an external data source needs cleanup to not expose a memory leak

#### Example using Classes
----
* In react classes you typically set a subscription in `componentDidMount` and cleans it up with `componentWillUnmount` 
```javascript
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```
* `componentDidMount` and `componenDidUpdate` need to mirror each other. Forcing lifecycle methods to split logic by method rather than logic. 

#### Example Using Hooks
----
* No separate effect to perform the cleanup is needed, add and remove the subscription 
```javascript
import React, {useState, useEffect} from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    } 
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
* **Why did we return a function from our effect**? An optional cleanup mechanism for effects. 
* **When exactly does React clean up an effect**? React perfroms cleanup when the component unmounts

### Tips for Using Effects
---

#### Tip: Use Multiple Effects to Separate Concerns

One of the problems outlined in the Motivation for Hooks is that class lifecycle methods often contain unrelated logic, but related logic gets broken up into several methods. Here is a component that combines the counter and the friend status indicator logic from the previous examples:

```javascript
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```
Note how the logic that sets `document.title` is split between `componentDidMount` and `componentDidUpdate`. The subscription logic is also spread between `componentDidMount` and `componentWillUnmount`. And `componentDidMount` contains code for both tasks.

How can Hooks solve this problem? Just like you can use the State Hook more than once, you can also use several effects. 
```javascript
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```
Hooks let us split the code based on what it is doing rather than a lifecycle method name. React will apply every effect used by the component, in the order they were specified.

#### Explanation: Why Effects Run on Each Update
----
If you’re used to classes, you might be wondering why the effect cleanup phase happens after every re-render, and not just once during unmounting. 

Example `FriendStatus` component that displays whether a friend is online or not class reads `friend.id` from `this.props`, subscribes to the friend status after the component mounts, and unsubscribes during unmounting:
```javascript
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```
What happens if the friend prop changes while the component is on the screen? Our component would continue displaying the online status of a different friend. This is a bug. We would also cause a memory leak or crash when unmounting since the unsubscribe call would use the wrong friend ID.

In a class component, we would need to add `componentDidUpdate`:
```javascript
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate(prevProps) {
    // Unsubscribe from the previous friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Subscribe to the next friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```
Forgetting to handle `componentDidUpdate` properly is a common source of bugs in React applications.

 What about with Hooks
```javascript
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

There is no special code for handling updates because `useEffect` handles them by default. It cleans up the previous effects before applying the next effects. 
```javascript
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
```
This behavior ensures consistency by default and prevents bugs that are common in class components due to missing update logic.

#### Tip: Optimizing Performance by Skipping Effects
----
Cleaning up or applying the effect after every render might create a performance problem. 

In class components, solve this by writing an extra comparison with prevProps or prevState inside `componentDidUpdate`:
```javascript
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```
You can tell React to skip applying an effect if certain values haven’t changed between re-renders. To do so, pass an array as an optional second argument to `useEffect`:
```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```
In the example above, we pass `[count]` as the second argument. What does this mean? If the count is 5, and then our component re-renders with count still equal to 5, React will compare `[5]` from the previous render and `[5]` from the next render. Because all items in the array are the same `(5 === 5)`, React would skip the effect. That’s our optimization.

When we render with count updated to 6, React will compare the items in the `[5]` array from the previous render to items in the `[6]` array from the next render. This time, React will re-apply the effect because `5 !== 6`. If there are multiple items in the array, React will re-run the effect even if just one of them is different.

This also works for effects that have a cleanup phase:
```javascript
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes
```
In the future, the second argument might get added automatically by a build-time transformation.


### Building You Own Hooks
----
Building your own Hooks lets you extract component logic into reusable functions.

When we were learning about using the Effect Hook, we saw this component from a chat application that displays a message indicating whether a friend is online or offline:
```javascript
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
* Say that our chat application also has a contact list, and we want to render names of online users with a green color. We could copy and paste similar logic above into our `FriendListItem` component but it wouldn’t be ideal:
```javascript
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```
Instead, like to share this logic between `FriendStatus` and `FriendListItem`.

Traditionally in React, we’ve had two popular ways to share stateful logic between components: `render props` and `higher-order components`.

### Extracting a Custom Hook
---
When we want to share logic between two JavaScript functions, we extract it to a third function. Both components and Hooks are functions

A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks. For example, `useFriendStatus` below is our first custom Hook:
```javascript
import React, { useState, useEffect } from 'react';
// The Custom Hook is Extracted
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
// Composed of the other Hooks
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```
There’s nothing new inside of it — the logic is copied from the components above. Just like in a component, make sure to only call other Hooks unconditionally at the top level of your custom Hook.

A custom Hook doesn’t need to have a specific signature. 

We can decide what it takes as arguments, and what, if anything, it should return. 

In other words, it’s just like a normal function. Its name should always start with use so that you can tell at a glance that the rules of Hooks apply to it.

The purpose of our `useFriendStatus` Hook is to subscribe us to a friend’s status. This is why it takes `friendID` as an argument, and returns whether this friend is online:
```javascript
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

### Using a Custom Hook
----
In the beginning, our stated goal was to remove the duplicated logic from the `FriendStatus` and `FriendListItem` components. Both of them want to know whether a friend is online.

Now that we’ve extracted this logic to a `useFriendStatus` hook, we can just use it:
```javascript
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```
* Is this code equivalent to the original examples? Yes, it works in exactly the same way. If you look closely, you’ll notice we didn’t make any changes to the behavior. 

* All we did was to extract some common code between two functions into a separate function. Custom Hooks are a convention that naturally follows from the design of Hooks, rather than a React feature.

* **Do I have to name my custom Hooks starting with “use”**? Yes. This convention is very important. Without it, we wouldn’t be able to automatically check for violations of rules of Hooks 

* **Do two components using the same Hook share state**? No. Custom Hooks are a mechanism to reuse stateful logic (such as setting up a subscription and remembering the current value), but every time you use a custom Hook, all state and effects inside of it are fully isolated.

* **How does a custom Hook get isolated state**? Each call to a Hook gets isolated state. Because we call `useFriendStatus` directly, from React’s point of view our component just calls `useState` and `useEffect`. And as we learned earlier, we can call `useState` and `useEffect` many times in one component, and they will be completely independent.


### Tip: Pass Information Between Hooks

* Since Hooks are functions, we can pass information between them.

To illustrate this, we’ll use another component from our hypothetical chat example. This is a chat message recipient picker that displays whether the currently selected friend is online:
```javascript
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```
We keep the currently chosen friend ID in the recipientID state variable, and update it if the user chooses a different friend in the `<select>` picker.

Because the `useState` Hook call gives us the latest value of the `recipientID` state variable, we can pass it to our custom `useFriendStatus` Hook as an argument:
```javascript
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```
This lets us know whether the currently selected friend is online. If we pick a different friend and update the `recipientID` state variable, our `useFriendStatus` Hook will unsubscribe from the previously selected friend, and subscribe to the status of the newly selected one.

#### `useYourImagination()`
----
Custom Hooks offer the flexibility of sharing logic that wasn’t possible in React components before. You can write custom Hooks that cover a wide range of use cases like form handling, animation, declarative subscriptions, timers, and probably many more we haven’t considered. You can build Hooks that are just as easy to use as React’s built-in features.

Try to resist adding abstraction too early. Now that function components can do more, it’s likely that the average function component in your codebase will become longer. This is normal — don’t feel like you have to immediately split it into Hooks. 

For example, maybe you have a complex component that contains a lot of local state that is managed in an ad-hoc way. `useState` doesn’t make centralizing the update logic any easier so you might prefer to write it as a Redux reducer:
```javascript
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... other actions ...
    default:
      return state;
  }
}
```
Reducers are very convenient to test in isolation, and scale to express complex update logic. You can further break them apart into smaller reducers if necessary. However, you might also enjoy the benefits of using React local state, or might not want to install another library.

So what if we could write a `useReducer` Hook that lets us manage the local state of our component with a reducer? A simplified version of it might look like this:
```javascript
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```
Now we could use it in our component, and let the reducer drive its state management:
```javascript
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```
The need to manage local state with a reducer in a complex component is common enough that we’ve built the `useReducer` Hook right into React.
