from sqlalchemy import update
from src.task.schemas import TaskInDb
from src.task.models import Task
from utils.repository import SQLAlchemyRespository
from src.database import Session
from fastapi import status


class TaskRepository(SQLAlchemyRespository[Task]):
    
    async def move_tasks_between_panels(tasks: list[TaskInDb]) -> None:
        async with Session() as session:
            task_number = 0
            for task in tasks:
                stmt = (
                    update(Task)
                    .where(Task.id==task.id)
                    .values(task_position=task_number, panel_id=task.panel_id)
                )
                await session.execute(stmt)
                task_number += 1
            await session.commit()

task_repository = TaskRepository(Task)