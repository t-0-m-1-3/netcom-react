import React from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './Clock';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a quick look at the clock example and how props, state, and lifecycle methods change things
        </p>
	  <p> The goal with a react componenet is to write it once and leave it alone, having something else control props </p>
      </header>
	  	  The Code below is the component with lifecycle methods, before pulling state up
	  <Clock time={new Date()}/>
	  The Clock component should be above
    </div>
  );
}
