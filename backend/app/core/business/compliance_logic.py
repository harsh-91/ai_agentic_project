# app/core/business/compliance_logic.py

from app.models.compliance import ComplianceEvent
from app.core.crud import log_compliance_event
from datetime import datetime
import uuid

async def log_event(session, event_type: str, user_id: str = None, resource_id: str = None, detail: str = None):
    event = ComplianceEvent(
        id=str(uuid.uuid4()),
        event_type=event_type,
        user_id=user_id,
        resource_id=resource_id,
        timestamp=datetime.utcnow(),
        detail=detail
    )
    return await log_compliance_event(session, event)
