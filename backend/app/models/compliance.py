from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class ComplianceEvent(SQLModel, table=True):
    id: str = Field(primary_key=True, index=True)
    event_type: str  # e.g. 'consent_given', 'data_deleted', etc.
    user_id: Optional[str] = Field(default=None, index=True)
    resource_id: Optional[str] = Field(default=None)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    detail: Optional[str] = None
