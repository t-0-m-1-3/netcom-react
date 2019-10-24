import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListsAndKeys from './ListsAndKeys';
import MapListsAndKeys from './MapListsAndKeys';

const numbers = [1, 2, 3, 4, 5];
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
	  <h1> Without Keys, just a list </h1>
	  <ListsAndKeys />
	  <h1> Built with a Map </h1>
	  <MapListsAndKeys numbers={numbers} />
    </div>
  );
}

export default App;
