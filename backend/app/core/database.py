from sqlmodel import SQLModel, create_engine
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os
from app.models.user import User
from contextlib import asynccontextmanager

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://user:password@localhost:5432/ai_agentic_db")

# Async engine for production use
async_engine = create_async_engine(DATABASE_URL, echo=True, future=True)
AsyncSessionLocal = sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def init_db():
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

@asynccontextmanager
async def get_session():
    async with AsyncSessionLocal() as session:
        yield session
async def get_user_by_id(session, user_id: str) -> User:
    result = await session.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def create_user(session, user: User):
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user