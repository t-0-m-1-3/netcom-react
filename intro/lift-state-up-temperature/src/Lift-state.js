import React from 'react';



export default class BoilingVerdict extends React.Component {
 (props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}


