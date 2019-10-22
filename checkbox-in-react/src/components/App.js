import React, { Component } from "react";
import Checkbox from "./Checkbox";

// `OPTIONS` is the defined array for the number of checkboxes. It could be anything to iterate by
const OPTIONS = ["One", "Two", "Three"];

// App component is a container component - encapsulates the entire application.
// It renders 3 instances of checkbox and 3 buttons = `Select All`, `Select None`, and `Save` 
// It also Logs to the console which has been selected
class App extends Component {
// This app has two states: `UI state` and `APPLICATION state`. The first makes the app work
// by rendering checkboxes, the second needs to make business sense ( the state needs to facilitate
// something that makes logical sense ). Major Architecture design decisions come from the 
// Top-Down heriarchy of react. Figuring out which component needs state depends on the actions of the app.
// Since Child components can only get access via `props` and Parent components can't directly
// access the state of their children, time should be spent thinking about state existing where
  state = {
// `state` is set to the initial state of the `App` component
    checkboxes: OPTIONS.reduce(
	    // `OPTIONS.reduce` breaks down the `OPTIONS` array into and interable array
	    // of `{"One": false, "Two": false,"Three": false}` 
	    // two states: `UI state` => Everything is deselected on initial render
	    // `APP state` => Users select one checkbox at a time: it answers which one
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    )
  };
// `selectAllCheckboxes` iterates over the checkboxes in app state and updates state
// based on the `isSelected` parameter
  selectAllCheckboxes = isSelected => {
	  // take in the `key` passed from checkboxes and update state for each.
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState(prevState => ({
        checkboxes: {
		//pull in previous state
          ...prevState.checkboxes,
		// assign value of `isSelected`
          [checkbox]: isSelected
        }
      }));
    });
  };

// `selectAll` calls `this.selectAllCheckboxes` and passed in the `true` arugment
  selectAll = () => this.selectAllCheckboxes(true);
// `deselectAll` calls `this.selectAllCheckboxes` and passed in the `false` arugment
  deselectAll = () => this.selectAllCheckboxes(false);

// `handleCheckboxChange` is an state management function to change the state when users interact
// with the application
// It receives a `changeEvent` object and accesses `name` to represent the toggled checkbox
// The function calls `this.setState` to request an update of the state and passed a 
// function that gets previous state, and returns the new state
// `name` then becomes the `key` in the new state object. `value` is changed to the opposite
  handleCheckboxChange = changeEvent => {
	  // get access to name of selected box
    const { name } = changeEvent.target;

	  // call `setState` and pass in `prevState` and spread out the checkbox values
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
	      // return the new state with `name` becoming the `key` returned
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

	// `handleFormSubmit` executes the users selected action 
  handleFormSubmit = formSubmitEvent => {
	  // prevent default behavior of form re-rendering/submitting the page
    formSubmitEvent.preventDefault();

	  // iterate over the checkboxes in app state
    Object.keys(this.state.checkboxes)
	  // `filter` over the checkbox in app state based on the selected checkbox
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
	      // for each selected checkbox `console.log` the value
        console.log(checkbox, "is selected.");
      });
  };

// NOTICE: The PLURAL and SINGULAR usage of naming conventions
// this is the definition of `createCheckbox` it takes in an option from the `OPTIONS` array 
// Each checkbox component instance gets four properties: 
	// `label` is the value from the `OPTIONS` array
	// `isSelected` is a boolean that tells the checkbox component if it renders as selected
	// `onCheckboxChange` references `this.handleCheckboxChange` so that when the user selects or deselects a checkbox, `REACT` will call `this.handleCheckboxChange` passing in the change event
	// `key` is the dynamically created `ID` field we are using to tell `REACT` how to identify the resource
  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

// NOTICE: The PLURAL and SINGULAR usage of naming conventions
// this is the definition of `createCheckboxes` it iterates over the `OPTIONS` array
// and calls `this.createCheckbox` for each item in the array.
// `OPTIONS` is defined in `App.js` as an array of 3 elements
  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

// render sets 3 `<div>` elements with bootstrap class names to help with styling
//
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
	    // Create the form, with access to app state using `this` 
	    // calling `.createCheckboxes with `this` creates 3 instances of a Checkbox componenet.
	    
	    // When the Form is triggered, it tells react to call `this.handleFormSubmit` for
	    // the user. 
            <form onSubmit={this.handleFormSubmit}>
	    // Without this state, form elements would render the same way regardless of user input
	    // Changes in `props` or `state` force `REACT` to re-render 
	    // components without lifecycle methods
	    // `state`s purpose is mechanical -> to make UI's interactive
              {this.createCheckboxes()}

              <div className="form-group mt-2">
	    // Create the Select All Button
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
	    // When this button is clicked it called `this.selectAll`
                  onClick={this.selectAll}
                >
                  Check All
                </button>
	    // Create the Deselect All Button
                <button
	    // Notice the button type
                  type="button"
                  className="btn btn-outline-primary mr-2"
	    // When this button is clicked it called `this.deselectAll`
                  onClick={this.deselectAll}
                >
                  Uncheck All
                </button>
	    // Create the Save Button
		    // Notice the button type
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
