# Api-Call README
----

### Bootstrap Your React App
---

To get React up and running quickly without a lot of hassle, you can use the `create-react-app` tool. React recommends `yarn` if you have it installed. Install both with:

```bash
npm install --global create-react-app yarn
```
Once installed, you create a new app with:

```bash
create-react-app api-example
```
Or 
```bash
npx create-react-app api-example
```
The script will create a new directory with some starters, install dependencies needed to get things up and running and start the project with git. Change into the directory and start the development server, to open the app in your web browser. Your browser will automatically update whenever you change any source files (**hot reloading**)).

```bash
cd api-example
yarn start
```
### React start app
---

### Adding Style
---
Change out the default logo to something funny, save a random photo from the internet you think fun and put it into the import line for the logo in the create react app generated statement. 

```css
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

.App-header {
  background-color: gray;
  padding: 10px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

button.App-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
}
```
### Use React Hooks to Fetch Some Jokes
---

With the release of React 16.8, you can now use hooks to make your code components a little simpler. It’s not necessary, but, why not? In your `src/App.js`, change the `App` component from a class to a function. The default looks something like this:

```javascript

class App extends Component {
  render() {
    return (
      // ...
    );
  }
}
```

To make it a functional component, change it to :

```javascript

const App = () => {
  return (
    // ...
  )
}
```
It’s not a huge difference, but it’ll allow us to add hooks in, which are a bit simpler than using the class lifecycle methods.

To add a piece of state with hooks, you’ll need to use the `useState` function exported from React. You’ll also be using `useEffect` later, so make sure to import both. Change the importing React line to:

```javascript
Import React, { useState, useEffect } from 'react';
```
Then to use a piece of state, add the following to the top of your App function, before the return statement:
```javascript

const [joke, setJoke] = useState('');
```
You now have a way to read a joke and change its value. By default, it will just be an empty string until you fetch it. Speaking of fetching, you can use [The Official Joke API](https://github.com/15Dkatz/official_joke_api) to fetch jokes. 
They come already encoded for HTML, but React expects strings to be decoded (e.g. " instead of &quot;). You can install the he library to handle this for you, then import it using import { decode } from 'he'. Install it using:

```bash
yarn add he@1.2.0
```
Now you’ll need to write a function to fetch jokes. Since this will need to reference setJoke, it should be written inside the App component. The fetch API supports a signal that will allow you to cancel the call. This would be important to make sure calls come back in the right order. If you have two or three calls successively, you don’t really care about the first two, but instead, just want the final result.

```javascript

const fetchJoke = async signal => {
  const url = new URL('https://official-joke-api.appspot.com/jokes/programming/random');
  const response = await fetch(url, { signal });
  const { value } = await response.json();

  setJoke(decode(value.joke));
};
```
You’ll also need an “effect” hook to fetch the joke whenever there isn’t one. The `useEffect` hook will run any time the component renders. You can add an array of values to watch, which will cause it to only run the effect when one of those values changes. 

Here, we only want to run the effect when the joke changes, or fetch one if there are no joke set yet. If the effect has a return value, it will be run when cleaning up the app, or before rendering again. Here is where you can provide a function that will cancel the fetch.

```javascript
useEffect(() => {
  if (!joke) {
    const controller = new AbortController();
    fetchJoke(controller.signal);

    return () => controller.abort();
  }
}, [joke]);
```
Now you just need to display the joke and add a button to fetch a new one where clicking the button will set the joke to an empty string, and the effect will take care of fetching a new joke. 

Replace the contents of the `<p> tag with the joke (<p>{joke || '...'}</p>)`, and replace the `<a>` tag with a button:

```javascript
<button className="App-link" onClick={() => setJoke('')}>
  Get a new joke
</button>
```
Your final code for `App.js` should look like this:

``` javascript
import React, { useState, useEffect } from 'react';
import { decode } from 'he';

import logo from './chuck-norris.png';
import './App.css';

const App = () => {
  const [joke, setJoke] = useState('');

  const fetchJoke = async signal => {
    const url = new URL('https://api.icndb.com/jokes/random');
    const response = await fetch(url, { signal });
    const { value } = await response.json();

    setJoke(decode(value.joke));
  };

  useEffect(() => {
    if (!joke) {
      const controller = new AbortController();
      fetchJoke(controller.signal);

      return () => controller.abort();
    }
  }, [joke]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{joke || '...'}</p>
        <button className="App-link" onClick={() => setJoke('')}>
          Get a new joke
        </button>
      </header>
    </div>
  );
}

export default App;
```

### Further Reading Or Homework:
----
1. How could I change this code to display Jokes by type and give the user the option of a **general**, **programming**, **random** joke or **ten** random jokes? 
2. Could I Extend this component to display multiple jokes in their own component?
3. Find your own favorite API to practice with [here](https://github.com/davemachado/public-api)