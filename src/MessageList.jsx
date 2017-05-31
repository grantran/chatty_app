import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log('rendering messagelist')
      const message = this.props.messages.map(message => {
        return <Message
          key={message.id}  
          user={message.username} 
          content={message.content} />
      });
      

  return (
      <main className="messages">
        <div>
          {message}
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    )
  }
}

export default MessageList;