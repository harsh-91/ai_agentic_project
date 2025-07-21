import React, { useState } from "react";
import { createUser, startSession, sendMessage } from "./api";

export default function Chatbot() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // User creation
  async function onUserCreate(e) {
    e.preventDefault();
    const newUser = await createUser(username);
    setUser(newUser);
  }

  // Start a chat session
  async function onStartSession() {
    if (!user) return;
    const sess = await startSession(user.id);
    setSession(sess);
    setMessages([]);
  }

  // Send message
  async function onSend(e) {
    e.preventDefault();
    if (!session || !user || !message) return;
    // User message goes in list instantly
    setMessages(m => [...m, {content: message, is_agent: false}]);
    setMessage("");
    // Agent response
    const agentMsg = await sendMessage(session.id, user.id, message);
    setMessages(m => [...m, agentMsg]);
  }

  return (
    <div>
      <h2>Chatbot Demo</h2>
      {!user &&
        <form onSubmit={onUserCreate}>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
          <button type="submit">Start as User</button>
        </form>}
      {user && !session &&
        <button onClick={onStartSession}>New Chat Session</button>}
      {session &&
        <div>
          <div style={{border: "1px solid #eee", height:260, overflowY:"auto", padding:10, marginBottom:10, background: "#f9f9f9"}}>
            {messages.map((m, i) =>
              <div key={i} style={{textAlign: m.is_agent ? "right":"left"}}>
                <b>{m.is_agent ? "AI" : user.username}:</b> {m.content}
              </div>
            )}
          </div>
          <form onSubmit={onSend} style={{display:"flex",gap:8}}>
            <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Ask the agent..." required style={{flex:1}}/>
            <button type="submit">Send</button>
          </form>
        </div>}
    </div>
  );
}
