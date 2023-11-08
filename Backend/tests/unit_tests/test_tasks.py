import pytest
from sqlalchemy import select
from src.task.models import Task
from src.database import Session


@pytest.mark.asyncio
@pytest.mark.usefixtures("setup_db")
async def test_task():
    async with Session() as session:
        stmt = select(Task)
        result = await session.execute(stmt)
        tasks = result.scalars().all()
        assert tasks == []
