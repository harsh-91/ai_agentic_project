from fastapi import APIRouter, Depends
from app.models.compliance import ComplianceEvent
from app.core.database import get_session
from sqlmodel import select

router = APIRouter()

@router.get("/audit", response_model=list[ComplianceEvent])
async def list_audit_events(user_id: str = None, session=Depends(get_session)):
    stmt = select(ComplianceEvent)
    if user_id:
        stmt = stmt.where(ComplianceEvent.user_id == user_id)
    result = await session.execute(stmt)
    return result.scalars().all()
