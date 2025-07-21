# backend/app/tests/test_heatlh.py

from fastapi.testclient import TestClient
from app.main import app

def test_healthz_endpoint():
    client = TestClient(app)
    response = client.get("/observability/healthz")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
