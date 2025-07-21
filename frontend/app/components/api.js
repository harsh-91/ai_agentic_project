import { logInfo, logWarn, logError } from "./logger";
const BASE = "http://localhost:8000";

async function feApi(name, url, options = {}) {
  logInfo(`[API CALL] ${name}`, { url, options });
  const t0 = Date.now();
  try {
    const resp = await fetch(url, options);
    const txt = await resp.clone().text();
    logInfo(`[API RESP] ${name} [status:${resp.status}]`, { resp: txt, ms: Date.now() - t0 });
    if (!resp.ok) {
      logError(`[API FAIL] ${name}`, { status: resp.status, resp: txt });
      throw new Error(`API ${name} failed: ${resp.status}`);
    }
    const data = await resp.json();
    logInfo(`[API DATA] ${name}`, data);
    return data;
  } catch (e) {
    logError(`[API ERR] ${name}`, e);
    throw e;
  }
}

export async function createUser(username) {
  const resp = await fetch(`http://localhost:8000/users/?username=${encodeURIComponent(username)}`, { method: "POST" });
  try {
    return await resp.json();
  } catch {
    return {};
  }
}

export function startSession(user_id) {
  return feApi("startSession", `${BASE}/chat/session?user_id=${user_id}`, { method: "POST" });
}
export function sendMessage(session_id, user_id, message) {
  return feApi("sendMessage",
    `${BASE}/chat/message?session_id=${session_id}&user_id=${user_id}`,
    {
      method: "POST",
      body: JSON.stringify(message),
      headers: { "Content-Type": "application/json" }
    }
  );
}
export function uploadDocument(user_id, file) {
  const form = new FormData();
  form.append("upload", file);
  return feApi("uploadDocument", `${BASE}/data/upload?user_id=${user_id}`, {
    method: "POST", body: form
  });
}
export function listDocuments(user_id) {
  return feApi("listDocuments", `${BASE}/data/documents?user_id=${user_id}`);
}
export function fetchMetrics() {
  return feApi("fetchMetrics", `${BASE}/observability/metrics`);
}
export function fetchLogs() {
  return feApi("fetchLogs", `${BASE}/observability/logs`);
}
export function fetchTraces() {
  return feApi("fetchTraces", `${BASE}/observability/traces`);
}
export function fetchAudit(user_id) {
  return feApi("fetchAudit", `${BASE}/compliance/audit${user_id ? `?user_id=${user_id}` : ""}`);
}
