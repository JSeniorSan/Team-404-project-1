import asyncio
from src.database import Base, test_engine
from src import my_models
from src.config import settings
import pytest
import pytest_asyncio
from httpx import AsyncClient
from src.main import app
from typing import AsyncGenerator
from fastapi.testclient import TestClient

    
@pytest_asyncio.fixture(autouse=True, scope='session')
async def prepare_database():
    assert settings.MODE == 'TEST'
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    yield
    # async with test_engine.begin() as conn:
    #     await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture(scope='session')
def event_loop(request):
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


client = TestClient(app)


@pytest_asyncio.fixture(scope="session")
async def ac() -> AsyncGenerator[AsyncClient, None]:
    async with AsyncClient(app=app, base_url="http://localhost:8000") as ac:
        yield ac
