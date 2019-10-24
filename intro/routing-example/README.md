## React Router Dom
----
* React is widely used library for client side web applications. In any web applications, there will be multiple pages. 

* Routing the URL properly and load different pages based on route parameters is a general requirement.


* `react-router-dom`is one of the widely used react library.

### Basic routing
----

>   Home page (/)
>   About page (/about)

Create a simple react app using create-react-app CLI. 
* `npx create-react-app my-react-app`
```javascript
// App.js
import React from 'react';

const App = () => {
  return (
    <section className="App">
      <h1>React routing Example</h1>
    </section>
  );
};

export default App;
```
Lets create two pages. In simple terms two functional react component.
```javascript
// App.js
...

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

// more code and stuff...
```
* What are all needed for routing a page in react application.

 >  There will be **links** to navigate between pages.
 >  Define **Route** to the pages. It define the URL path and component to load for the URL.
 >  Define a **Router** which will check whether the requested URL exist in the defined Routes.

* Create the links and routes using react router’s `Link` and `Route` components. 
* Install the package `yarn add react-router-dom`
```javascript
// App.js
...
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';...

const App = () => {
  return (
    <section className="App">
      <Router>        
	      <Link to="/">Home</Link>        
	      <Link to="/about">About</Link>        
		      <Route path="/" component={IndexPage} />        
		      <Route path="/about" component={AboutPage} />      
      </Router>    
     </section>
  );
};
```


`import { Link, BrowserRouter as Router, Route } from 'react-router-dom';`

* Here we are importing three components,

>  **Link** component will create HTML link to the pages.
>  **Route** component will define the routes.
>  **Router** component will handle the logic of routing. When user click the link, it check whether this link exist in route definition. 
 If it exists, then the router will change the URL in browser and route will render the correct component.

> **BrowserRouter** is one type of router, it is also the widely used router. It uses HTML5 push state underneath the component to route your pages. 
```javascript
// Link with URL
<Router>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
</Router>
```
`Router` should be the parent component enclosing `Link` and `Route`. So that it can handle the routing. 

`Link` accept to props which defines the URL it want to link.
Why do we need `Link` component, why not a HTML anchor tag with href?

> HTML a tag will create a server side link. So each time, a user click on the route, it won’t check the router or the routes. Instead it simply redirect the page in the browser to that route.
> Whereas Link, check the router and the router check the route and load the component without reloading the page in the browser. Thats why it is called as client side routing. It doesn’t load the page from the server while clicking on the Link component.
```javascript
// Route with definition
<Route path="/" component={IndexPage} />
```
Here Route have path and component props. component props helps to render the component when user comes to this route. path props define the url path to be matched when user visits the page.

* If you go ahead and check whether our routes are working, it will work. But it have a small glitch.

* Because the path defined for about is `/about`. 
Here router traverses through the route definitions from top to bottom. 
> First checks the Route with path `/` and the about URL have `/`, so it renders IndexPage component first. 
> And then it checks the next Route `/about`, that also matches, so it renders AboutPage component.

### How to match exact route?
----
Use exact props in Route.

```javascript

const App = () => {
  return (
    <section className="App">
      <Router>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
		<Route exact path="/" component={IndexPage} />        
		<Route exact path="/about" component={AboutPage} />     
	</Router>
    </section>
  );
};

```

exact prop will help to match the route only if the whole route matches as it is, else it won’t render the component.

Now both the component will render fine and the Link will work properly.
