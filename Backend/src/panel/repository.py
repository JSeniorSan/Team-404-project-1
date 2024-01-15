from sqlalchemy import select, update
from sqlalchemy.orm import selectinload
from src.database import Session
from utils.repository import SQLAlchemyRespository
from src.panel.models import Panel
from src.panel.schemas import PanelUpdateTasksOrder
from src.task.models import Task


class PanelRepository(SQLAlchemyRespository[Panel]):
    
    async def read_one(self, panel_id: int) -> Panel:
        async with Session() as session:
            query = (
                select(Panel)
                .options(selectinload(Panel.tasks))
                .where(Panel.id == panel_id)
            )
            result = await session.execute(query)
            return result.scalar_one()

    async def update_tasks_order(self, panel_id: int, data: PanelUpdateTasksOrder) -> Panel:
        async with Session() as session:
            task_number = 0
            for task in data.tasks:
                stmt = (
                    update(Task)
                    .where(Task.id==task.id)
                    .values(task_position=task_number)
                )
                await session.execute(stmt)
                task_number += 1

            await session.commit()
            query = select(Panel).where(Panel.id==panel_id)
            result = await session.execute(query)
            return result.scalar_one()


panel_repository = PanelRepository(Panel)