import React, { useState } from "react";
import { useUser } from "./UserContext";
import { createUser } from "./api";
import { logInfo, logWarn, logError } from "./logger";

export default function UserGate() {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onRegister(e) {
    e.preventDefault();
    logInfo("UserGate: Registration submit", { username });
    setErr("");
    if (!username.trim()) {
      logWarn("UserGate: Empty username submit", {});
      setErr("Please enter a username.");
      return;
    }
    setLoading(true);
    try {
      const u = await createUser(username.trim());
      logInfo("UserGate: Registration API response", u);
      if (u && u.id) {
        setUser(u);
        setUsername("");
        setErr("");
      } else if (u && u.detail) {
        setErr("Registration failed: " + u.detail);
        logWarn("UserGate: Registration failed (backend detail)", u);
      } else {
        setErr("Registration failed. Unexpected response from server.");
        logWarn("UserGate: Registration failed (no id)", u);
      }
    } catch (error) {
      setErr("Registration failed. " + (error.message || "Network error."));
      logError("UserGate: Registration exception", error);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    logInfo("UserGate: Logout", { user });
    setUser(null);
    setUsername("");
    setErr("");
    setLoading(false);
  }

  if (!user) {
    logInfo("UserGate: Render not logged in", {});
    return (
      <form onSubmit={onRegister} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: "0.5em", borderRadius: "4px", border: "1px solid #ccc"}}
          autoComplete="off"
          disabled={loading}
        />
        <button
          type="submit"
          style={{
            padding: "0.5em 1.3em",
            border: "none",
            borderRadius: "4px",
            background: loading ? "#aaa" : "#3A6EA5",
            color: "#fff"
          }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register/Login"}
        </button>
        {err && <span style={{ color: "red" }}>{err}</span>}
      </form>
    );
  }

  logInfo("UserGate: Render logged in", { user });
  return (
    <div style={{ marginBottom: 15, display: "flex", alignItems: "center", gap: 8, flexDirection: "column" }}>
      <b style={{ color: "#6bf", fontSize:"1.1em" }}>Hello, {user.username}!</b>
      <button onClick={logout} style={{padding:"0.2em 1em", borderRadius:"4px"}}>Log out</button>
    </div>
  );
}
