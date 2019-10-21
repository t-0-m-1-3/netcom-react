## Create React App
---
Create React App is a comfortable environment for learning React, and is the best way to start building a new single-page application in React.

It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have `Node >= 8.10` and `npm >= 5.6` on your machine. To create a project, run:
```bash
npx create-react-app my-app
cd my-app
npm start
```
>Note
>
> npx on the first line is not a typo — it’s a package runner tool that comes with npm 5.2+.

Create React App doesn’t handle backend logic or databases; it just creates a frontend build pipeline, so you can use it with any backend you want. Under the hood, it uses `Babel` and `webpack`, but you don’t need to know anything about them.

When you’re ready to deploy to production, running `npm run build` will create an optimized build of your app in the `build` folder. You can learn more about Create React App from its README and the [User Guide.](https://facebook.github.io/create-react-app/)

### Creating a Toolchain from Scratch
---
A JavaScript build toolchain typically consists of:

    A package manager, such as Yarn or npm. It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.

    A bundler, such as webpack or Parcel. It lets you write modular code and bundle it together into small packages to optimize load time.

    A compiler such as Babel. It lets you write modern JavaScript code that still works in older browsers.

If you prefer to set up your own JavaScript toolchain from scratch, [check out this guide](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) that re-creates some of the Create React App functionality.

Don’t forget to ensure your custom toolchain [is correctly set up for production](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build).

##  CDN Links
-----
* Both React and ReactDOM are available over a CDN.

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```
* Minified and optimized production versions of React are available

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

### Why the crossorigin Attribute?

If you serve React from a CDN,  keep the **crossorigin** CORS attribute set:
```html
<script crossorigin src="..."></script>
```

[Next Page](./HelloWorld.md)

