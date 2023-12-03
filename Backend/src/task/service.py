from src.task.models import Task
from src.task.schemas import TaskCreate, TaskUpdate
from src.task.repository import TaskRepository, task_repository


class TaskService:

    def __init__(self, task_repo: TaskRepository) -> None:
        self.task_repo = task_repo

    async def create_task(self, new_task: TaskCreate, panel_id: int) -> Task:
        new_task_dict = new_task.model_dump()
        new_task_dict["panel_id"] = panel_id
        task = await self.task_repo.create_one(new_task_dict)
        return task
    
    async def read_task(self, task_id: int) -> Task:
        task = await self.task_repo.read_one(task_id)
        return task

    async def delete_task(self, task_id: int) -> Task:
        task = await self.task_repo.delete_one(task_id)
        return task

    async def update_task(self, new_data: TaskUpdate, task_id: int) -> Task:
        new_data_dict = new_data.model_dump(exclude_unset=True)
        task = await self.task_repo.update_one(new_data_dict, task_id)
        return task


task_service = TaskService(task_repository)
