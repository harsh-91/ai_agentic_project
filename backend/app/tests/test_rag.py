# backend/app/tests/test_rag.py

from fastapi.testclient import TestClient
from app.main import app
import io

def test_document_upload_and_listing():
    client = TestClient(app)
    # Create user
    user_resp = client.post("/users/", params={"username": "docuser"})
    user_id = user_resp.json()["id"]

    # Upload document
    file_content = b"fake document content"
    files = {"upload": ("test.txt", file_content, "text/plain")}
    upload_resp = client.post(f"/data/upload?user_id={user_id}", files=files)
    assert upload_resp.status_code == 200
    doc_id = upload_resp.json()["id"]

    # List documents
    list_resp = client.get(f"/data/documents?user_id={user_id}")
    docs = list_resp.json()
    assert any(doc["id"] == doc_id for doc in docs)
