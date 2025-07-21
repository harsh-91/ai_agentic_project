# backend/app/tests/test_chatbot.py

from fastapi.testclient import TestClient
from app.main import app
import uuid

def test_chat_session_and_message():
    client = TestClient(app)
    # Create user first
    user_resp = client.post("/users/", params={"username": "botuser"})
    user_id = user_resp.json()["id"]

    # Start chat session
    session_resp = client.post("/chat/session", params={"user_id": user_id})
    assert session_resp.status_code == 200
    session_id = session_resp.json()["id"]

    # Send message
    msg_resp = client.post(
        "/chat/message",
        params={"session_id": session_id, "user_id": user_id},
        json="hi"
    )
    assert msg_resp.status_code == 200
    assert msg_resp.json()["is_agent"] is True
