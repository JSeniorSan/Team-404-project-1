from sqlalchemy import update
from src.task.models import Task
from utils.repository import SQLAlchemyRespository
from src.database import Session


class TaskRepository(SQLAlchemyRespository[Task]):
    pass

task_repository = TaskRepository(Task)