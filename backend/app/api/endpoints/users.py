from fastapi import APIRouter, Depends, HTTPException
from app.core.database import get_session
from app.core.business.user_logic import register_user
from app.models.user import User
from sqlalchemy.exc import IntegrityError

router = APIRouter()

@router.post("/", response_model=User)
async def create_user(username: str, email: str = None, session=Depends(get_session)):
    try:
        return await register_user(session, username, email)
    except IntegrityError:
        raise HTTPException(status_code=409, detail="User already exists")
