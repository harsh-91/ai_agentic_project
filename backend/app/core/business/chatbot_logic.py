# app/core/business/chatbot_logic.py

from app.models.chat import ChatSession, ChatMessage
from app.core.crud import create_session, create_message, get_session
from datetime import datetime
import uuid

async def start_chat_session(session, user_id: str) -> ChatSession:
    chat_session = ChatSession(
        id=str(uuid.uuid4()),
        user_id=user_id,
        started_at=datetime.now()
    )
    return await create_session(session, chat_session)

async def add_chat_message(session, session_id: str, user_id: str, content: str, is_agent: bool) -> ChatMessage:
    chat_msg = ChatMessage(
        id=str(uuid.uuid4()),
        session_id=session_id,
        user_id=user_id,
        content=content,
        sent_at=datetime.now(),
        is_agent=is_agent,
    )
    return await create_message(session, chat_msg)
