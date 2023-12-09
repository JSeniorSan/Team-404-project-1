import pytest
from httpx import AsyncClient
from sqlalchemy import select
from src.workspace.schemas import WorkspaceInDb
from src.workspace.models import Workspace
from src.database import TestSession
from src.auth.models import User
from src.auth.schemas import UserCreate


@pytest.mark.asyncio
async def test_create_user(ac: AsyncClient):

    new_user = UserCreate(
        email="test@example.ru",
        password="klajdfhg123",
        username="Nickname"
    ).model_dump()
    
    await ac.post("/auth/register", json=new_user)

    async with TestSession() as session:
        stmt = select(User)
        result = await session.execute(stmt)

    user = result.scalar_one()
    assert isinstance(user, User)
    assert user.email == "test@example.ru"

    async with TestSession() as session:

        stmt = select(Workspace).where(Workspace.id == 1)
        result = await session.execute(stmt)
    
    result_scalar = result.scalar_one()
    welcome_workspace = WorkspaceInDb.model_validate(result_scalar, from_attributes=True)
    
    assert welcome_workspace.name == "Привет, это твой первый проект!"
    assert len(welcome_workspace.panels) == 3