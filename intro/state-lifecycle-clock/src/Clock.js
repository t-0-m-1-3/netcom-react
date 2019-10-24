import React from 'react';

// User Defined Component passing it's props down to a child component
// `FormattedDate` recieved the `date` in `props` and not care where it came from
// `Clock`'s state or props
// This is "top-down" date flow, state is owned by a specific component, and anything from that state can only affect components "below" them in the Tree.
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}
