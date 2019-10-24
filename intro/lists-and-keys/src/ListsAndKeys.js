import React from 'react';

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

export default class ListsAndKeys extends React.Component{
	render() {
  return (
    <div className="lists-and-keys">
	  <ul>{listItems}</ul>
    </div>

  );
}
}
