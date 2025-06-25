import React, { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import ChatMessage from './ChatMessage';
import { auth, firestore } from '../../firebase';
// import ChatMessage from './ChatMessage';


function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState('');
  const dummy = useRef();

  useEffect(() => {
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesData);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue.trim() === '') return;

    const { uid, displayName, photoURL } = auth.currentUser;
    const messagesRef = collection(firestore, 'messages');

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      displayName,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Xabar yozing..."
        />
        <button type="submit" disabled={!formValue}>➡️</button>
      </form>
    </>
  );
}

export default ChatRoom;