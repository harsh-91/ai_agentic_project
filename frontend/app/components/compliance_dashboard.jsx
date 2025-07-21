import React, { useState } from "react";
import { useUser } from "./UserContext";
import { fetchAudit } from "./api";
import { logInfo, logError } from "./logger";

export default function ComplianceDashboard() {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadEvents() {
    setLoading(true);
    logInfo("UI:Compliance load", {user});
    try {
      const evs = await fetchAudit(user && user.id);
      setEvents(evs);
      logInfo("UI:Compliance events", evs);
    } catch(e) {
      logError("UI:Compliance load error",e);
    }
    setLoading(false);
  }
  return (
    <div>
      <h2>Compliance & Audit Log</h2>
      <button onClick={loadEvents} disabled={!user}>Load My Audit Events</button>
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
      {!user && <p style={{color:"gray"}}>Register/login to view your compliance events.</p>}
    </div>
  );
}
