from src.database import Base, sync_engine, TestSession, Session
from src.task.models import Task
from src.panel.models import Panel
from src.workspace.models import Workspace
from src.auth.models import User, AccessToken
from src.config import settings
import pytest
import pytest_asyncio
from httpx import AsyncClient
from src.main import app
from typing import AsyncIterator
from sqlalchemy.ext.asyncio import AsyncSession


@pytest.fixture(autouse=True, scope="session")
def setup_db():
    assert settings.MODE == "TEST"
    Base.metadata.drop_all(sync_engine)
    Base.metadata.create_all(sync_engine)
    yield None
    Base.metadata.drop_all(sync_engine)
    

@pytest_asyncio.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://localhost") as client:
        yield client


@pytest_asyncio.fixture
async def session() -> AsyncIterator[AsyncSession]:
    async with Session() as session:
        yield session