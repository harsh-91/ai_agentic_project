from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from app.core.database import get_session
from app.models.doc import Document
from app.core.business.rag_logic import ingest_document
from sqlmodel import select

router = APIRouter()

@router.post("/upload", response_model=Document)
async def upload_data(
    user_id: str,
    upload: UploadFile = File(...),
    session=Depends(get_session)
):
    contents = await upload.read()
    # Here, contents would be parsed/vectorized in production.
    doc = await ingest_document(
        session,
        user_id=user_id,
        filename=upload.filename,
        filetype=upload.content_type,
        summary=None
    )
    return doc

@router.get("/documents", response_model=list[Document])
async def list_documents(user_id: str = None, session=Depends(get_session)):
    stmt = select(Document)
    if user_id:
        stmt = stmt.where(Document.user_id == user_id)
    result = await session.execute(stmt)
    return result.scalars().all()
