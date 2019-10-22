# Handling Authentication in React with Context and Hooks

Identity management in React can be quite confusing because there are multiple ways you can handle the user sessions in your application. This tutorial will show how you can handle identity management in React by creating a global state for your authentication details with Context and update these details with Hooks.

Read more at: https://auth0.com/blog/handling-authentication-in-react-with–context-and-hooks/


-----
TL;DR: Identity management in React can be quite confusing because there are multiple ways you can handle the user sessions in your application. This tutorial will show how you can handle identity management in React by creating a global state for your authentication details with Context and update these details with Hooks. If you need, you can check this repo to see the files created throughout this article.

### Prerequisites

Before continue reading this tutorial you will need node and npm installed on your machine. You will also need some knowledge around JavaScript and React. If you are new to React, check out this article first. Lastly, you will need an Auth0 account (which you can get for free). If you don't have one, you can use this link to create an account.

### State Management in React

As mentioned before, this tutorial will show you how to store the authentication details for your users in a global state. Having a global state is something important for SPAs because it can be seen as a snapshot for your application at a given moment. How to handle this state is something that has evolved a lot in React the past years.

An important distinction to make is that there are generally two types of states in React applications, a local state, and a global state. Where the local state is often limited to information about specific pages or components, the global state represents the state of the entire application. For this local state React already had a solution integrated to its core, but not for the global state.

In order to have a global state that could be mutated from all your components, you had to install packages like Redux to handle this for you. However, with the release of React version 16.3, a renewed version of the Context API was introduced that makes having a global state possible.
Introduction to Context

The Context API has been around for a long time but was always marked as an experimental feature. Even so, popular packages like Redux and React Router made use of it. With Context, it becomes easier to access props in different components, without having to pass them down on each level explicitly. By using a Higher-Order Component (HOC), you can retrieve props from components that are placed lower in your component tree.

Nowadays, as this API is generally available, you can create a new context by using the React.createContext() function. This function creates an object that has two components: a Provider and a Consumer. The example below illustrates this concept:
```javascript
import React from 'react';

const Context = React.createContext();

render() {
  return (
    <Context.Provider>
      <Context.Consumer>
        { /* custom components */ }
      </Context.Consumer>
    </Context.Provider>
  );
}
```
### Passing props

In order to pass props within a Context, you must use both the Provider and the Consumer component. This Provider component is the place where you'd pass a prop called value to, which you can subsequently consume within the Consumer component. Using the example of Context above, props from the Provider would be passed to the Consumer in this way:
```javascript
<Context.Provider value={/* object */}>
  <Context.Consumer>
    { props => /* custom components */ }
  </Context.Consumer>
</Context.Provider>
```

### Updating a Context

As the Context Provider takes an object to set the value that is passed to the Consumer, this value can be mutated at the level of the Provider. For this, you can use React's local state simply by passing an initial state value to this Provider and a function that mutates this state by using the setState() method. The implementation for this would like something like the following code example:
```javascript
import React from 'react';
const Context = React.createContext();
export default class App extends React.Component {
  state = {
    value: 'foo'
  }
  updateState(value) {
    this.setState({ value });
  }
  render() {
    return (
      <Context.Provider value={ { value: this.state.value, updateState: this.updateState } }>
        <Context.Consumer>
          { props => /* custom components */ }
        </Context.Consumer>
      </Context.Provider>
    );
  }
}
```

### Introduction to Hooks

Since the official introduction of Hooks in React version 16.8, the previous code example can be drastically simplified. Multiple predefined Hooks as useState and useReducer were introduced; along with a possibility to create your own, custom Hooks. One of the Hooks with the biggest use case would be the useState Hook, that gives you a shortcut to local state-management. Let's apply it to the code example above:
```javascript
import React from 'react'

const Context = React.createContext();

const initialState = {
  value: 'foo'
}

const [state, updateState] = React.useState(initialState);

const App = () => (
  <Context.Provider value={ { value: state.value, updateState } }>
      <Context.Consumer>
          { props => // … custom components }
      </Context.Consumer>
  </Context.Provider>
);

export default App;
```

### The useReducer hook

The setup above will work completely fine if you're dealing with small components and only need to update the state locally. For bigger applications or more advanced use cases, you could use the useReducer Hook instead.

By using the useReducer Hook you can update an initial object based on whatever type of event would be fired. The difference with the useState Hook is that this initial object is unrelated to the built-in local state-management of React, so it can be applied globally in your application.

If you've ever used global state-management libraries like Redux, this might sound familiar to you. But if you're not, this is how the useReducer Hooks is applied in a similar fashion as Redux:
```javascript
const initialState = {
  value: 'foo'
}

reducer(state, action) {
  switch(action.type) {
    case 'updateValue':
      return {
        …state,
        value: action.payload
      }
    default:
      return state
  }
}

const [state, dispatch] = React.useReducer(reducer, initialState);
```
In the example above you can see that the useReducer Hook takes the constants reducer and initialState as a parameter. The output is the returned value by the reducer and a function to invoke the reducer function, that takes just the action as a parameter and inherits the current state. In this case, the reducer looks for a field called type in the action and updates the state with the value of payload from that action whenever it's type equals updateValue. If not, the reducer will just return the current value of the state. This function to update the field value of initialState, can be called by doing the following:
```javascript
{
  () => dispatch({ type: "updateValue", payload: "new value" });
}
```
The action object that is used as a parameter for the dispatch function includes the fields type and payload, which the reducer will now use to update the field value of initialState.

### Updating Context with Hooks

With the help of the useReducer Hook, you can also set the value that's passed to the Context Provider, and mutate this value if you'd also pass the dispatch function. To demonstrate how to achieve this, let's create a new project in the form of an application that can be used to manage a fictional event.

### Create a new React project

The first step is to create a new React project using Create React App, which provides you with a suitable configuration for most React applications. If you're unfamiliar with the use of Create React App, please have a look at the documentation that explains what it is and how it can be used.

You can create a new application by executing the following command from your terminal. You can replace the new-project suffix with another name. This setting defines the name of your project:

```bash
npx create-react-app new-project
```
You can now move into the directory new-project and open the project in your preferred code editor. In the next section, you'll make changes to the files that reside in the src directory.
Add a Context Provider and Consumer

Now, open the src/App.js file and replace its code with this:
```javascript
// src/App.js
import React from 'react';

const MeetupContext = React.createContext();

const initialState = {
  title: 'Auth0 Online Meetup',
  date: Date()
};

const App = () => (
  <MeetupContext.Provider value={initialState}>
    <MeetupContext.Consumer>
      {props => (
        <div>
          <h1>{props.title}</h1>
          <span>{props.date}</span>
        </div>
      )}
    </MeetupContext.Consumer>
  </MeetupContext.Provider>
);

export default App;
```
The code block above represents an implementation of the Context API in the form of MeetupContext. This context contains a Provider that receives initialState and a Consumer that displays this information.

After that, you can remove the src/App.test.js, src/App.css, and src/Logo.svg files, as you won't deal with testing or styling in this tutorial.

Now, if you run your app (npm start) then visit it in your browser, you will see the first version of it. This version displays a title and the current date and time.

### Running the first version of your React app.

Next, you will extend this information with some attendees for this fictional meetup. Therefore, you need to add a new field to the initialState object. You will call it attendees and assign an array with random names to it:
```javascript
// src/App.js

// ... import React, MeetupContext ...

const initialState = {
    title: 'Auth0 Online Meetup',
    date: Date(),
    attendees: ['Bob', 'Jessy', 'Christina', 'Adam']
};

// ... const App, export App ...
```
Then, you will make your app consume this list of attendees:
```javascript
// src/App.js

// ... import React, MeetupContext, and initialState ...

const App = () => (
  <MeetupContext.Provider value={initialState}>
    <MeetupContext.Consumer>
      {props => (
        <div>
          <h1>{props.title}</h1>
          <span>{props.date}</span>
          <div>
            <h2>{`Attendees (${props.attendees.length})`}</h2>
            {props.attendees.map(attendant => (
              <li>{attendant}</li>
            ))}
          </div>
        </div>
      )}
    </MeetupContext.Consumer>
  </MeetupContext.Provider>
);

export default App;
```
The application is now able to display not only the meetup information but also a list of attendees. In the next sections, you will continue by adding the functionality to subscribe to this meetup.
Nested Context

Before you can actually subscribe to this meetup, you need to add a new Context for the user. You can nest multiple Context Providers and Consumers, making it possible to access props globally. To see this in action, update the src/App.js file as follows:
```javascript
// src/App.js

// ... import React ...

const MeetupContext = React.createContext();
const UserContext = React.createContext();

// ... initialState, and App ...
```
As the Context for the user also needs an initial value, the current initialState constant with the value for the MeetupContext can be extended. You can do this by moving the fields about the meetup to a new nested object called meetup. Then, you can add a new property to this object for the user with just the field name.
```javascript
// src/App.js

// ... import React and context objects definintion ... 

const initialState = {
  meetup: {
    title: 'Auth0 Online Meetup',
    date: Date(),
    attendees: ['Bob', 'Jessy', 'Christina', 'Adam']
  },
  user: {
    name: 'Roy'
  }
};

// ... const App ...
```
Next, you can add the newly created UserContext to your app and make it use the user field from initialState. Also, you will need to specify that MeetupContext should use the meetup field from initialState as its value. MeetupContext is placed within UserContext, as the Context for the user might be needed in other components (like a profile page) in the future as well.

Also, the Consumer for the user can be placed just above MeetupContext, and should return the value from the Provider not as props but as the variable user. Otherwise, it would lead to a duplicate declaration of the constant props. For clarity, you can also rename the return value from the Meetup's Consumer.

In the end, your App constant will look like this:
```javascript
// src/App.js

// ... import React, context objects definition, and initialState

const App = () => (
  <UserContext.Provider value={initialState.user}>
    <UserContext.Consumer>
      {user => (
        <MeetupContext.Provider value={initialState.meetup}>
          <MeetupContext.Consumer>
            {meetup => (
              <div>
                <h1>{meetup.title}</h1>
                <span>{meetup.date}</span>
                <div>
                  <h2>{`Attendees (${meetup.attendees.length})`}</h2>
                  {meetup.attendees.map(attendant => (
                    <li>{attendant}</li>
                  ))}
                </div>
              </div>
            )}
          </MeetupContext.Consumer>
        </MeetupContext.Provider>
      )}
    </UserContext.Consumer>
  </UserContext.Provider>
);
```
With both the Context for the user and meetup returned in the render() function, you can have this user subscribe to this meetup in the next step.
Implement the useReducer hook

When users subscribe to this meetup, you want to add their names to the list of attendees. Therefore the initial value for MeetupContext.Provider should be mutated and, as mentioned before, you can use the useReducer hook to accomplish this.

You can start by creating a new component that returns the Provider for MeetupContext and takes both the user Context and any children as a prop. In this component, you can add the useReducer Hook, and extend the value for MeetupContext with the dispatch function that is returned by the hook.
```javascript
// src/App.js

// ... import React, contexts, and initialState ...

const MeetupContextProvider = ({ user, ...props }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState.meetup);
  return (
    <MeetupContext.Provider
      value={ {
        ...state,
        handleSubscribe: () =>
          dispatch({ type: 'subscribeUser', payload: user.name }),
        handleUnSubscribe: () =>
          dispatch({ type: 'unSubscribeUser', payload: user.name })
      } }
    >
      {props.children}
    </MeetupContext.Provider>
  );
};

// ... const App ...
```
As you can see this useReducer hook also takes the reducer as a parameter, which you can add directly above the MeetupContextProvider component. This reducer takes both the state and the received action as parameters, when it receives an action with the type subscribeUser it will add the payload field of that action to the attendees' array.
```javascript
// src/App.js

// ... import React, contexts, and initialState ...

const reducer = (state, action) => {
  switch (action.type) {
    case 'subscribeUser':
      return {
        ...state,
        attendees: [...state.attendees, action.payload],
        subscribe: true
      };
    default:
      return state;
  }
};

// ... MeetupContextProvider and App definition ...
```
You can do the same to unsubscribe the user from the meetup by extending the reducer function:
```javascript
// src/App.js

// ... import React, contexts, and initialState ...

const reducer = (state, action) => {
  switch (action.type) {
    case 'subscribeUser':
      return {
        ...state,
        attendees: [...state.attendees, action.payload],
        subscribed: true
      };
    case 'unSubscribeUser':
      return {
        ...state,
        attendees: state.attendees.filter(
          attendee => attendee !== action.payload
        ),
        subscribed: false
      };
    default:
      return state;
  }
};

// ... import React, contexts, and initialState ...
```
Then, as this action is now available within the Consumer for the meetup, you need to add a button that invokes this function to the application. Also, you need to send the user Context to MeetupContextProvider as this is needed to add the user to the list of attendees.

As such, your App component will look like this:
```javascript
// src/App.js

// ... import React, context objects, etc ...

const App = () => (
  <UserContext.Provider value={initialState.user}>
    <UserContext.Consumer>
      {user => (
        <MeetupContextProvider user={user}>
          <MeetupContext.Consumer>
            {meetup => (
              <div>
                <h1>{meetup.title}</h1>
                <span>{meetup.date}</span>
                <div>
                  <h2>{`Attendees (${meetup.attendees.length})`}</h2>
                  {meetup.attendees.map(attendant => (
                    <li>{attendant}</li>
                  ))}
                  <p>
                    {!meetup.subscribed ? (
                      <button onClick={meetup.handleSubscribe}>
                        Subscribe
                      </button>
                    ) : (
                      <button onClick={meetup.handleUnSubscribe}>
                        Unsubscribe
                      </button>
                    )}
                  </p>
                </div>
              </div>
            )}
          </MeetupContext.Consumer>
        </MeetupContextProvider>
      )}
    </UserContext.Consumer>
  </UserContext.Provider>
);

export default App;
```
If you check your application in your browser, you will see that you can update the list of attendees by clicking on the Subscribe button. Note that, every time you click this button, the Context will update, which leads to a new render of the Consumer.

In the next section, as you don't want unauthenticated users to subscribe to the meetup, you will add authentication to the application.
Add authentication to your app

As you're going to use Auth0 for authentication, you will need to create an Auth0 Application in your dashboard. So, head to the Applications section and click on the Create Application button. After clicking on it, fill in the form as follows:

    Application Name: React + Hooks
    Application Type: Single Page Web Applications

Then, after clicking on the Create button, head to the Settings tab. There, you will need to add `http://localhost:3000/?callback` to the Allowed Callback URLs _ field and click on the Save Changes_ button. After doing so, leave this page open. You will need to copy some values from it soon.

In order to safely add authentication with Auth0 to your app, you need to install two npm packages. The first one is dotenv that is used to add local environment variables to your application. The other one is auth0-js, which is the official client-side JavaScript SDK from Auth0. To install these packages, issue the following code into your terminal (you might need to end the current process by hitting Ctrl + C):
```bash
npm install dotenv auth0-js
```
With these two packages installed, you can create a .env file on the project root to store your application keys in your local environment. So, create this file and add the following to it:

##### `./.env`
```text
REACT_APP_AUTH0_DOMAIN=[DOMAIN]
REACT_APP_AUTH0_CLIENT_ID=[CLIENT ID]
```
Note that you will have to replace `[DOMAIN]` and `[CLIENT ID]` with your own Auth0 properties. So, back in your browser, on the page that you left open, copy the Domain and the Client ID properties; then use them to replace the placeholders used in the .env file.

Next, you will need to create the file containing the logic to handle the authentication process. You will do this by creating a new file called Auth.js in the src directory and adding the following code block to this file:
```javascript
// src/Auth.js

import auth0 from 'auth0-js';

export default class Auth {

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: 'http://localhost:3000/?callback',
      responseType: 'id_token',
      scope: 'openid profile'
    });

    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    this.auth0.authorize();
  }

  getProfile() {
    return this.profile;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }

        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
        resolve();
      });
    });
  }
}
```
The Auth class has all the methods to handle authentication and to store the tokens that Auth0 return to the app.

Now, open the src/App.js file and use the new class:
```javascript
// src/App.js
// ... import React ...

import Auth from './Auth';

const auth = new Auth();

// ... everything else ...
```
Then, you will need to create an object called UserContext to use the auth object. This new object will behave similarly to MeetupContext:
```javascript
// src/App.js

// ... import React, context object, auth, etc ...

const UserContextProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState.user);
  auth.handleAuthentication().then(() => {
    dispatch({
      type: 'loginUser',
      payload: {
        authenticated: true,
        user: auth.getProfile()
      }
    });
  });
  return (
    <UserContext.Provider
      value={ {
        ...state,
        handleLogin: auth.signIn
      } }
    >
      {props.children}
    </UserContext.Provider>
  );
};

// ... MeetupContextProvider and App ...
```
In the code block above, you are creating the Context Provider for the user. This provider also uses the useReducer hook. Inside this provider, you are using two functions from the Auth0 client to either initialize the authentication process or to verify it has returned a token.

The authentication can be initialized by invoking the handleLogin function that is available on the user's Context. If successful, the handleAuthentication function will dispatch an action that sets the user as verified in the reducer. This can be handled by adding another case statement to the reducer:
```javascript
// src/App.js
const reducer = (state, action) => {
  switch (action.type) {

    // ... leave subscribeUser and unSubscribeUser untouched ...

    case 'loginUser':
      return {
        ...state,
        isAuthenticated: action.payload.authenticated,
        name: action.payload.user.name,
      };
    default:
      return state;
  }
};
```
Now you can make the changes to the App component to allow users to log in and subscribe to the meetup:
```javascript
// src/App.js

// ... everything else ...

const App = () => (
  <UserContextProvider>
    <UserContext.Consumer>
      {user => (
        <MeetupContextProvider user={user}>
          <MeetupContext.Consumer>
            {meetup => (
              <div>
                <h1>{meetup.title}</h1>
                <span>{meetup.date}</span>
                <div>
                  <h2>{`Attendees (${meetup.attendees.length})`}</h2>
                  {meetup.attendees.map(attendant => (
                    <li key={attendant}>{attendant}</li>
                  ))}
                  <p>
                    {user.isAuthenticated ? (
                      !meetup.subscribed ? (
                        <button onClick={meetup.handleSubscribe}>
                          Subscribe
                        </button>
                      ) : (
                        <button onClick={meetup.handleUnSubscribe}>
                          Unsubscribe
                        </button>
                      )
                    ) : (
                      <button onClick={user.handleLogin}>Login</button>
                    )}
                  </p>
                </div>
              </div>
            )}
          </MeetupContext.Consumer>
        </MeetupContextProvider>
      )}
    </UserContext.Consumer>
  </UserContextProvider>
);

export default App;
```
Now, if you restart your project (npm start) and open it in your browser, you will be able to sign into your application. Then, if you click on the Subscribe button, you will see that the attendees' list will show your name or email instead of "Roy".

