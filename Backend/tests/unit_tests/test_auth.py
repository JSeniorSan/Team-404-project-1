import pytest
from httpx import AsyncClient
from sqlalchemy import select
from src.auth.models import User
from src.auth.schemas import UserCreate
from sqlalchemy.ext.asyncio import AsyncSession


@pytest.mark.asyncio
async def test_create_user(client: AsyncClient, session: AsyncSession):
    await client.post("/auth/register", json=UserCreate(
        email="test@example.ru",
        password="klajdfhg123",
        username="Nickname"
    ).model_dump())
    stmt = select(User)
    result = await session.execute(stmt)
    assert len(result.scalars().all()) == 1
    user = result.scalars().all()
    assert user == User
    assert user.email == "test@example.ru"