import React from "react";

// Checkbox component renders a checkbox with a label. 
// Each `Checkbox` component will be a controlled component: `checked` comes from `isSelected`
// that is not responsible for managing it's own state
// `Checkbox` will receive `isSelected` props ( after user interaction ), render the `input`
// element based on that prop and call `onCheckboxChange` as a callback prop
// `Checkbox` is a stateless functional component recieving 3 props:
	// `label` text representing thename of the checkbox
	// `isSelected` is a boolean telling react to render or not
	// `onCheckboxChange` is callback function `REACT` will call when a user selects/deselects

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
	// renders `<div>` elements with bootstrap class names for styling
  <div className="form-check">
    <label>
	// `<label>` has two children `input`element and `label` text
      <input
	// `<input>` renders the checkbox and has 4 Properties:
	// `type` of the input: `checkbox` in our case
	// `name` of the input: option passed as a from from `App` => `One`, `Two`, `Three` 
		// `checked` is whether the checkbox is selected or not, value comes from `App`
	// `onChange` the `change` event handler: `onCheckboxChange` is called when a user clicks
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

export default Checkbox;
