from typing import Optional, List
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from app.models.user import User
from app.models.chat import ChatSession, ChatMessage
from app.models.doc import Document
from app.models.compliance import ComplianceEvent

# --- User CRUD ---
async def create_user(session: AsyncSession, user: User) -> User:
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user

async def get_user(session: AsyncSession, user_id: str) -> Optional[User]:
    result = await session.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def get_all_users(session: AsyncSession) -> List[User]:
    result = await session.execute(select(User))
    return result.scalars().all()

# --- ChatSession CRUD ---
async def create_session(session: AsyncSession, chat_session: ChatSession) -> ChatSession:
    session.add(chat_session)
    await session.commit()
    await session.refresh(chat_session)
    return chat_session

async def get_session(session: AsyncSession, session_id: str) -> Optional[ChatSession]:
    result = await session.execute(select(ChatSession).where(ChatSession.id == session_id))
    return result.scalar_one_or_none()

# --- ChatMessage CRUD ---
async def create_message(session: AsyncSession, msg: ChatMessage) -> ChatMessage:
    session.add(msg)
    await session.commit()
    await session.refresh(msg)
    return msg

# --- Document CRUD ---
async def create_document(session: AsyncSession, doc: Document) -> Document:
    session.add(doc)
    await session.commit()
    await session.refresh(doc)
    return doc

# --- Compliance Events CRUD ---
async def log_compliance_event(session: AsyncSession, event: ComplianceEvent) -> ComplianceEvent:
    session.add(event)
    await session.commit()
    await session.refresh(event)
    return event
