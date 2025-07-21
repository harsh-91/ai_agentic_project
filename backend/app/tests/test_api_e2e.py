# backend/app/tests/test_api_e2e.py

from fastapi.testclient import TestClient
from app.main import app
import io

def test_full_flow():
    client = TestClient(app)
    # Register user
    user_resp = client.post("/users/", params={"username": "e2e"})
    user_id = user_resp.json()["id"]

    # Start chat session
    session_resp = client.post("/chat/session", params={"user_id": user_id})
    session_id = session_resp.json()["id"]

    # Send and receive message
    msg_resp = client.post(
        "/chat/message",
        params={"session_id": session_id, "user_id": user_id},
        json="hi"
    )
    assert msg_resp.status_code == 200

    # Upload document
    files = {"upload": ("t.txt", b"demo", "text/plain")}
    doc_resp = client.post(f"/data/upload?user_id={user_id}", files=files)
    assert doc_resp.status_code == 200

    # Query audit log
    audit = client.get(f"/compliance/audit?user_id={user_id}")
    assert audit.status_code == 200
