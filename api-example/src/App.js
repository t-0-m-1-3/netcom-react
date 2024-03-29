import React, { useState, useEffect } from 'react';
import logo from './chuck-norris.png';
import './App.css';
import { decode } from 'he';

const App = () => {
  const [joke, setJoke] = useState('');
  
const fetchJoke = async signal => {
const url = new URL('https://api.icndb.com/jokes/random');
// signal is a 2nd parameter that allows the calle to be cancled  
const response = await fetch(url, { signal });
  const { value } = await response.json();
  console.log('response', response)
  
  setJoke(decode(value.joke));
}

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
      <button className="App-link" onClick={()=>setJoke('')}>
      Get a New Joke
      </button>
      </header>
    </div>
  );
}

export default App;