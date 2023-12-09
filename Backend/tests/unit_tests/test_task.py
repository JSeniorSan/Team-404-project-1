import pytest
from sqlalchemy import select
from src.task.models import Task
from sqlalchemy.ext.asyncio import AsyncSession


# @pytest.mark.asyncio
# async def test_task(session: AsyncSession):
#     stmt = select(Task)
#     result = await session.execute(stmt)
#     tasks = result.scalars().all()
#     assert tasks == []
