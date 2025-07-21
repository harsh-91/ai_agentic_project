import React, { useEffect, useState } from "react";
import { fetchMetrics, fetchLogs, fetchTraces } from "./api";

export default function Observability() {
  const [metrics, setMetrics] = useState({});
  const [logs, setLogs] = useState([]);
  const [traces, setTraces] = useState([]);

  useEffect(() => {
    fetchData();
    // Optionally, poll in real time
    const iv = setInterval(fetchData, 4000);
    return () => clearInterval(iv);
    async function fetchData() {
      setMetrics(await fetchMetrics());
      setLogs(((await fetchLogs()).log_tail || []));
      setTraces(((await fetchTraces()).traces || []));
    }
  }, []);

  return (
    <div>
      <h2>Observability</h2>
      <h4>System Metrics</h4>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
      <h4>Tail Logs</h4>
      <pre style={{maxHeight:200, overflowY:"auto", background:"#20232a", color:"#bde"}}>{logs.join("")}</pre>
      <h4>Traces Preview</h4>
      <ul>
        {traces.map(t => <li key={t.id}>{t.span}: {t.status}</li>)}
      </ul>
    </div>
  );
}
