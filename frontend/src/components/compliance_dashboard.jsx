import React, { useState } from "react";
import { fetchAudit } from "./api";

export default function ComplianceDashboard() {
  const [userId, setUserId] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadEvents() {
    setLoading(true);
    const evs = await fetchAudit(userId);
    setEvents(evs);
    setLoading(false);
  }
  return (
    <div>
      <h2>Compliance & Audit Log</h2>
      <form onSubmit={e => {e.preventDefault(); loadEvents();}}>
        <input placeholder="User ID (optional)" value={userId} onChange={e=>setUserId(e.target.value)} />
        <button>Load Audit Events</button>
      </form>
      {loading && <p>Loading...</p>}
      <ul>
        {events && events.map(ev =>
          <li key={ev.id}>
            <b>{ev.event_type}</b> <small>{ev.timestamp}</small>
            {ev.user_id && <> user:{ev.user_id}</>}
            {ev.resource_id && <> res:{ev.resource_id}</>}
          </li>
        )}
      </ul>
    </div>
  );
}
