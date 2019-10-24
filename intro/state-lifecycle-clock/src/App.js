import React from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './Clock';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
	  <Clock />
      </header>
	  <Clock />
	  	  The Code below is the component with lifecycle methods, before pulling state up
	  <Clock />

	  The Clock component no longer has the new Date Prop passed in
	  <Clock />


	  Since it doesn't know if this comes from state or props of Clock, each prop passed into FormattedDate is specific to it.

    </div>
  );
}
