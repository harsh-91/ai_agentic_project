# app/core/business/user_logic.py

import uuid
from datetime import datetime
from app.models.user import User
from app.models.compliance import ComplianceEvent
from app.core.crud import create_user, log_compliance_event

async def register_user(session, username: str, email: str = None) -> User:
    user_obj = User(
        id=str(uuid.uuid4()),
        username=username,
        created_at=datetime.utcnow(),
        consented=True,
        email=email
    )
    new_user = await create_user(session, user_obj)
    # Log compliance event
    await log_compliance_event(
        session,
        ComplianceEvent(
            id=str(uuid.uuid4()),
            event_type="consent_given",
            user_id=new_user.id,
            timestamp=datetime.utcnow()
        )
    )
    return new_user
