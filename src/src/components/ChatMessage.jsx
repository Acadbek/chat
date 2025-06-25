import React from 'react';
import { auth } from '../../firebase';

function ChatMessage(props) {
  const { text, uid, displayName, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="User Avatar" />
      <div className="message-content">
        <p className="sender-name">{displayName}</p>
        <p className="text">{text}</p>
      </div>
    </div>
  );
}

export default ChatMessage;