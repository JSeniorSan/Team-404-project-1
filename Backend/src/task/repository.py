from sqlalchemy import update
from src.task.models import Task
from utils.repository import SQLAlchemyRespository
from src.database import Session


class TaskRepository(SQLAlchemyRespository[Task]):
    
    async def change_panel(self, new_panel_id: int, task_id: int) -> Task:
        async with Session() as session:
            stmt = update(self.model).where(self.model.id == task_id).values(parent_id = new_panel_id).returning(self.model)
            result = await session.execute(stmt)
            await session.commit()
            return result.scalar_one()

task_repository = TaskRepository(Task)