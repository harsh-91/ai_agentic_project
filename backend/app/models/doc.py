from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Document(SQLModel, table=True):
    id: str = Field(primary_key=True, index=True)
    user_id: Optional[str] = Field(default=None, index=True)
    filename: str
    filetype: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    summary: Optional[str] = None
    is_vectorized: bool = Field(default=False)
