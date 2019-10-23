import React from 'react';
import './App.css';
import Example from './Example';
import Explanation from './Explanation';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Example />
        </p>
      </header>
    <Explanation />
    </div>
  );
}
