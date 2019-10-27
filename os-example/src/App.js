import React from 'react';
import logo from './logo.svg';
import './App.css';
import OSarch from './OS_Arch';
import OSplatform from './OS_Platform';
import OSfreemem from './OS_FreeMem';
import OShostname from './OS_Hostname';
import OSuptime from './OS_Uptime';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
	  <OSarch />
	  <OSplatform />
	  <OSfreemem />
	  <OShostname />
	  <OSuptime />
    </div>
  );
}
