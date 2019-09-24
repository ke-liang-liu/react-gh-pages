import React from 'react';

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleChange(event) {
    console.log(event.target);
    this.setState({
      input: event.target.value
    })
  }
  submitMessage() {
    this.setState({
      messages: this.state.messages.concat(this.state.input),
      input: ''
    })
  }
  render() {
    let list = this.state.messages.map(x => <li key={x + 1}>{x}</li>);
    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* render an input, button, and ul here */}
        <input type='text'
          value={this.state.input}
          onChange={this.handleChange}  
          onKeyUp={ event => {
            if (event.key === 'Enter') {this.submitMessage()}
          }}
          autoFocus />
        <button onClick={this.submitMessage}>
          Submit
        </button>
        <ul>
          {list}
        </ul>
        { /* change code above this line */}
      </div>
    );
  }
};

export default DisplayMessages;