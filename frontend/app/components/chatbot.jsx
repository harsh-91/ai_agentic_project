import React, { useState } from "react";
import { useUser } from "./UserContext";
import { startSession, sendMessage } from "./api";
import { logInfo, logWarn, logError } from "./logger";

export default function Chatbot() {
  const { user } = useUser();
  const [session, setSession] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("");

  if (!user) {
    logWarn("UI:Chatbot Render - not logged in", {});
    return <div style={{color:"gray"}}>Please register/login as a user to chat.</div>;
  }

  async function onStartSession() {
    setStatus("");
    logInfo("UI:Chatbot startSession", { user });
    try {
      const sess = await startSession(user.id);
      setSession(sess);
      setMessages([]);
      logInfo("UI:Chatbot Session Started", sess);
    } catch (err) {
      setStatus("Could not start session.");
      logError("UI:Chatbot startSession exception", err);
    }
  }
  async function onSend(e) {
    e.preventDefault();
    setStatus("");
    logInfo("UI:Chatbot sendMessage", { session, message });
    if (!session || !message.trim()) return;
    setMessages(m => [...m, { content: message, is_agent: false }]);
    setMessage("");
    try {
      const agentMsg = await sendMessage(session.id, user.id, message);
      setMessages(m => [...m, agentMsg]);
      logInfo("UI:Chatbot Received", agentMsg);
    } catch (err) {
      setStatus("Could not send message.");
      logError("UI:Chatbot sendMessage error", err);
    }
  }
  return (
    <div>
      <h2 style={{marginBottom:16}}>Chatbot Demo</h2>
      {!session && <button onClick={onStartSession} style={{marginBottom:8}}>New Chat Session</button>}
      {status && <span style={{color:"red"}}>{status}</span>}
      {session && 
        <div>
          <div style={{ border:"1px solid #eee", height:260, overflowY:"auto", padding:10, marginBottom:10, background:"#f9f9f9" }}>
            {messages.map((m, i) =>
              <div key={i} style={{ textAlign: m.is_agent ? "right" : "left"}}>
                <b>{m.is_agent ? "AI" : user.username}:</b> {m.content}
              </div>
            )}
          </div>
          <form onSubmit={onSend} style={{display:"flex",gap:8}}>
            <input value={message} onChange={e=>setMessage(e.target.value)}
              placeholder="Ask the agent..." required style={{flex:1}} disabled={!session}/>
            <button type="submit">Send</button>
          </form>
        </div>
      }
    </div>
  );
}
