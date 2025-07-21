from fastapi import APIRouter, Depends, HTTPException, Body
from app.core.database import get_session
from app.core.business.chatbot_logic import start_chat_session, add_chat_message
from app.models.chat import ChatSession, ChatMessage

router = APIRouter()

@router.post("/session", response_model=ChatSession)
async def create_session(user_id: str, session=Depends(get_session)):
    return await start_chat_session(session, user_id)

@router.post("/message", response_model=ChatMessage)
async def post_message(
    session_id: str,
    user_id: str,
    message: str = Body(...),
    session=Depends(get_session)
):
    # Replace the below agent logic as you upgrade to real LLM agent calls!
    agent_resp = "Hello, how can I help you?" if message.lower() == "hi" else "I'm your agent!"
    # Persist the user's message
    await add_chat_message(session, session_id, user_id, content=message, is_agent=False)
    # Persist agent's response
    return await add_chat_message(session, session_id, user_id, content=agent_resp, is_agent=True)
