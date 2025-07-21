import React, { useState } from "react";
import { createUser } from "./api";

export default function UserData() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState();

  async function onCreate(e) {
    e.preventDefault();
    const user = await createUser(username);
    setResult(user);
  }
  return (
    <div>
      <h2>User Creation & Preview</h2>
      <form onSubmit={onCreate}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
        <button>Create User</button>
      </form>
      {result &&
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      }
    </div>
  );
}
