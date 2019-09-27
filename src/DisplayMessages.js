import React from 'react';
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';

// Redux:
const ADD = 'ADD';
// action creator
const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = createStore(messageReducer);

// React:  ******************************************
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
      // messages: []    move messages from local state to Redux store props
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
      input: ''
      // messages: this.state.messages.concat(this.state.input) 
    });
    this.props.submitNewMessage(this.state.input);
  }
  render() {
    let list = this.props.messages.map(x => <li key={x + 1}>{x}</li>);
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input type='text'
          value={this.state.input}
          onChange={this.handleChange}
          onKeyUp={event => {
            if (event.key === 'Enter') { this.submitMessage() }
          }}
          autoFocus />
        <button onClick={this.submitMessage}>
          Submit
        </button>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(DisplayMessages);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};

export default AppWrapper;