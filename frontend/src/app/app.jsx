import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import RAG from "./components/RAG";
import UserData from "./components/UserData";
import Observability from "./components/Observability";
import ComplianceDashboard from "./components/ComplianceDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{display: "flex", minHeight: "100vh"}}>
        <nav style={{minWidth: 200, background: "#1a2233", color:"#fff", padding: "2rem 1rem"}}>
          <h2 style={{color:"#6bf"}}>AI Agentic</h2>
          <hr style={{opacity:0.2}}/>
          <ul style={{listStyle:"none", padding:0, fontSize:"1.13rem"}}>
            <li><Link to="/" style={{color:"#fff"}}>Chatbot</Link></li>
            <li><Link to="/rag" style={{color:"#fff"}}>RAG</Link></li>
            <li><Link to="/user" style={{color:"#fff"}}>User Data</Link></li>
            <li><Link to="/observability" style={{color:"#fff"}}>Observability</Link></li>
            <li><Link to="/compliance" style={{color:"#fff"}}>Compliance</Link></li>
          </ul>
        </nav>
        <main style={{flex: 1, padding:"2rem 4rem"}}>
          <Routes>
            <Route path="/" element={<Chatbot />} />
            <Route path="/rag" element={<RAG />} />
            <Route path="/user" element={<UserData />} />
            <Route path="/observability" element={<Observability />} />
            <Route path="/compliance" element={<ComplianceDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
