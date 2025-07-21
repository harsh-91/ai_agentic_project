const BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

export async function createUser(username) {
  const resp = await fetch(`${BASE}/users/?username=${encodeURIComponent(username)}`, { method: "POST" });
  return await resp.json();
}

export async function startSession(user_id) {
  const resp = await fetch(`${BASE}/chat/session?user_id=${user_id}`, { method: "POST" });
  return await resp.json();
}

export async function sendMessage(session_id, user_id, message) {
  const resp = await fetch(`${BASE}/chat/message?session_id=${session_id}&user_id=${user_id}`, {
    method: "POST",
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" }
  });
  return await resp.json();
}

export async function uploadDocument(user_id, file) {
  const form = new FormData();
  form.append("upload", file);
  const resp = await fetch(`${BASE}/data/upload?user_id=${user_id}`, {
    method: "POST",
    body: form
  });
  return await resp.json();
}

export async function listDocuments(user_id) {
  const resp = await fetch(`${BASE}/data/documents?user_id=${user_id}`);
  return await resp.json();
}

export async function fetchMetrics() {
  const resp = await fetch(`${BASE}/observability/metrics`);
  return await resp.json();
}

export async function fetchLogs() {
  const resp = await fetch(`${BASE}/observability/logs`);
  return await resp.json();
}

export async function fetchTraces() {
  const resp = await fetch(`${BASE}/observability/traces`);
  return await resp.json();
}

export async function fetchAudit(user_id) {
  const resp = await fetch(`${BASE}/compliance/audit${user_id ? `?user_id=${user_id}` : ""}`);
  return await resp.json();
}
