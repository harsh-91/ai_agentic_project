# app/core/business/rag_logic.py

from app.models.doc import Document
from app.core.crud import create_document
from datetime import datetime
import uuid

async def ingest_document(session, user_id: str, filename: str, filetype: str, summary: str = None) -> Document:
    doc = Document(
        id=str(uuid.uuid4()),
        user_id=user_id,
        filename=filename,
        filetype=filetype,
        uploaded_at=datetime.utcnow(),
        summary=summary,
        is_vectorized=False
    )
    return await create_document(session, doc)
