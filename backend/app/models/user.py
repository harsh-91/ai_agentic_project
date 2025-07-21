# app/models/user.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class User(SQLModel, table=True):
    id: str = Field(primary_key=True)
    username: str
    created_at: datetime
    consented: bool = False
    email: Optional[str] = None
