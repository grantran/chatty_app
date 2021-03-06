import React, { Component } from 'react';

class Message extends Component {

  render() {
    const color =  this.props.userColor;
    if (this.props.user) {
      return (
      <div className="message">
        <span className="message-username" 
        style={{color}}>{this.props.user}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    )} else {
      return (
        <div className="message system">
          <span className="username-changed"> {this.props.content}</span>
        </div>
      )
    }
    }
  }

export default Message;