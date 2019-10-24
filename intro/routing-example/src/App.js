import React from 'react';
import './App.css';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

const IndexPage = () => {
  return (
    <h3>Home Page</h3>
  );
};

const AboutPage = () => {
  return (
    <h3>About Page</h3>
  );
};

export default function App() {
  return (
 <section className="App">
      <Router>        
	  <Link to="/">Home</Link>        
	  <br />
	  <Link to="/about">About</Link>        
	  <Route path="/" component={IndexPage} />        
	  <Route path="/about" component={AboutPage} />      
      </Router>    
 </section>
  );
}
