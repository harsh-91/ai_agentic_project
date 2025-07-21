import React, { useState } from "react";
import { createUser, uploadDocument, listDocuments } from "./api";

export default function RAG() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState();
  const [file, setFile] = useState();
  const [docs, setDocs] = useState([]);

  async function onUserCreate(e) {
    e.preventDefault();
    const u = await createUser(username);
    setUser(u);
    loadDocs(u.id);
  }

  async function loadDocs(user_id) {
    const d = await listDocuments(user_id);
    setDocs(d);
  }

  async function onUpload(e) {
    e.preventDefault();
    if (!user || !file) return;
    await uploadDocument(user.id, file);
    setFile(null);
    loadDocs(user.id);
  }

  return (
    <div>
      <h2>RAG Workflow Demo</h2>
      {!user &&
        <form onSubmit={onUserCreate}>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <button type="submit">Create User</button>
        </form>}
      {user &&
        <div>
          <form onSubmit={onUpload}>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button type="submit" disabled={!file}>Upload File</button>
          </form>
          <h4>Documents:</h4>
          <ul>
            {docs.map(doc =>
              <li key={doc.id}>{doc.filename} ({doc.filetype})</li>
            )}
          </ul>
        </div>}
    </div>
  );
}
