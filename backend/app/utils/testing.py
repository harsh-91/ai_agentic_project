# app/utils/testing.py

import pytest
from sqlalchemy.ext.asyncio import AsyncSession

@pytest.fixture
async def db_session():
    # Import your local session factory
    from app.core.database import AsyncSessionLocal
    async with AsyncSessionLocal() as session:
        yield session

def assert_status(response, expected_status=200):
    assert response.status_code == expected_status, f"Expected {expected_status}, got {response.status_code}"

def dummy_user():
    import uuid
    from app.models.user import User
    from datetime import datetime
    return User(
        id=str(uuid.uuid4()),
        username="testuser",
        created_at=datetime.utcnow(),
        consented=True
    )
