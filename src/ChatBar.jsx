import React, { Component } from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '' 
      }
    }
  
  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      // console.log(event);
      this.onMessage();
    }
  }

  handleChange = (event) => {
    this.setState({ content: event.target.value });
  }

  onMessage() {
  // console.log('onpost');
    this.props.onNewMessage(this.state.content);
    this.setState({ content: '' });
  }


  handleUserChange = (event) => {
    this.props.onNameChange(event.target.value);
  }

  // NameChange() {
  //   this.props.onNameChange(this.state.currentUser.name)
  
  // }


  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser ? this.props.currentUser.name : undefined}
          onChange={this.handleUserChange}
           />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyDown={this.handleKeyPress}
          onChange={this.handleChange}
          value={this.state.content}
          />
      </footer>
    )
  }
}

export default ChatBar;