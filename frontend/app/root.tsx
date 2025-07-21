import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import { UserProvider, useUser } from "./components/UserContext";

// Inline user greeting replacing login form
function UserBadge() {
  const { user } = useUser();
  return (
    <div style={{marginBottom:15, color:"#6bf", fontWeight:"bold"}}>Hello, {user.username}!</div>
  );
}

export default function Root() {
  return (
    <UserProvider>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <nav style={{ minWidth: 220, background: "#1a2233", color: "#fff", padding: "2rem 1rem" }}>
          <h2 style={{ color: "#6bf" }}>AI Agentic</h2>
          <hr style={{ opacity: 0.2 }} />
          <UserBadge />
          <ul style={{ listStyle: "none", padding: 0, fontSize: "1.13rem" }}>
            <li><Link to="/" style={{ color: "#fff" }}>Home</Link></li>
            <li><Link to="/chatbot" style={{ color: "#fff" }}>Chatbot</Link></li>
            <li><Link to="/rag" style={{ color: "#fff" }}>RAG</Link></li>
            <li><Link to="/user" style={{ color: "#fff" }}>User Data</Link></li>
            <li><Link to="/observability" style={{ color: "#fff" }}>Observability</Link></li>
            <li><Link to="/compliance" style={{ color: "#fff" }}>Compliance</Link></li>
          </ul>
        </nav>
        <main style={{ flex: 1, padding: "2rem 4rem" }}>
          <Outlet />
        </main>
      </div>
    </UserProvider>
  );
}
