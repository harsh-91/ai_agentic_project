export function logInfo(msg, meta) {
  const m = meta ? JSON.stringify(meta) : "";
  console.info(`[FE-INFO] ${msg} :: ${m}`);
  sendLog("info", msg, meta);
}
export function logWarn(msg, meta) {
  const m = meta ? JSON.stringify(meta) : "";
  console.warn(`[FE-WARN] ${msg} :: ${m}`);
  sendLog("warn", msg, meta);
}
export function logError(msg, meta) {
  const m = meta ? JSON.stringify(meta) : "";
  console.error(`[FE-ERR] ${msg} :: ${m}`);
  sendLog("error", msg, meta);
}
function sendLog(level, msg, meta) {
  try {
    fetch("http://localhost:8000/audit/log-fe", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        level,
        msg,
        meta,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "node"
      })
    });
  } catch(_) {}
}
