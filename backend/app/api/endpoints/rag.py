from fastapi import APIRouter, Depends, UploadFile, File
from app.core.database import get_session
from app.core.business.rag_logic import ingest_document
from app.models.doc import Document

router = APIRouter()

@router.post("/document", response_model=Document)
async def upload_document(
    user_id: str,
    upload: UploadFile = File(...),
    session=Depends(get_session)
):
    contents = await upload.read()
    # You would store and vectorize contents here. For now, summary is empty.
    return await ingest_document(
        session,
        user_id=user_id,
        filename=upload.filename,
        filetype=upload.content_type,
        summary=None
    )
