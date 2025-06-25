import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import './App.css';
import SignOut from './src/components/SignOut';
import SignIn from './src/components/SignIn';
import ChatRoom from './src/components/ChatRoom';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Real-time Chat 💬</h1>
        {user && <SignOut />}
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;