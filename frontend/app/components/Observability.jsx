import React, { useEffect, useState } from "react";
import { fetchMetrics, fetchLogs, fetchTraces } from "./api";
import { logInfo, logError } from "./logger";

export default function Observability() {
  const [metrics, setMetrics] = useState({});
  const [logs, setLogs] = useState([]);
  const [traces, setTraces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      logInfo("UI:Obs fetchData");
      try {
        setMetrics(await fetchMetrics());
        setLogs(((await fetchLogs()).log_tail || []));
        setTraces(((await fetchTraces()).traces || []));
      } catch(e) { logError("UI:Obs fetch error", e);}
    }
    fetchData();
    const iv = setInterval(fetchData, 4000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div>
      <h2>Observability</h2>
      <h4>System Metrics</h4>
      <pre style={{background:"#222",color:"#bde",padding:"10px",borderRadius:"8px"}}>{JSON.stringify(metrics, null, 2)}</pre>
      <h4>Tail Logs</h4>
      <pre style={{ maxHeight: 200, overflowY: "auto", background: "#20232a", color: "#bde",padding:"10px",borderRadius:"8px" }}>{logs.join("")}</pre>
      <h4>Traces Preview</h4>
      <ul>
        {traces.map((t,i) => <li key={i}>{t.span}: {t.status}</li>)}
      </ul>
    </div>
  );
}
