# backend/app/tests/test_compliance.py

from fastapi.testclient import TestClient
from app.main import app

def test_audit_event_api():
    client = TestClient(app)
    response = client.get("/compliance/audit")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
