from src.task.models import Task
from src.task.schemas import TaskCreate, TaskUpdate
from src.task.repository import TaskRepository, task_repository


class TaskService:

    def __init__(self, task_repo: TaskRepository) -> None:
        self.task_repo = task_repo

    async def create_task(self, new_task: TaskCreate, owner_id: int) -> Task:
        new_task_dict = new_task.model_dump()
        task = await self.task_repo.create_one(new_task_dict, owner_id)
        return task
    
    async def read_task(self, id: int) -> Task:
        task = await self.task_repo.read_one(id)
        return task

    async def delete_task(self, id: int) -> Task:
        task = await self.task_repo.delete_one(id)
        return task

    async def update_task(self, new_data: TaskUpdate, id: int) -> Task:
        new_data_dict = new_data.model_dump()
        task = await self.task_repo.update_one(new_data_dict, id)
        return task

    async def change_panel(self, new_panel_id: int, task_id: int) -> Task:
        task = await self.task_repo.change_panel(new_panel_id, task_id)
        return task


task_service = TaskService(task_repository)
