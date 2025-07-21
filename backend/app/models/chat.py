from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class ChatMessage(SQLModel, table=True):
    id: str = Field(primary_key=True, index=True)
    session_id: str = Field(foreign_key="chatsession.id")
    user_id: Optional[str] = Field(default=None, index=True)
    content: str
    sent_at: datetime = Field(default_factory=datetime.utcnow)
    is_agent: bool = Field(default=False)

class ChatSession(SQLModel, table=True):
    id: str = Field(primary_key=True, index=True)
    user_id: Optional[str] = Field(default=None, index=True)
    started_at: datetime = Field(default_factory=datetime.utcnow)
    ended_at: Optional[datetime] = None

    # Not persisted as DB field, only as relationship reference for querying
    messages: List["ChatMessage"] = Relationship(back_populates="session")
