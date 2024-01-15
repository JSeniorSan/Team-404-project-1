from typing import Any
from fastapi import Depends, APIRouter, status
from src.task.schemas import TaskInDb, TaskCreate, TaskMoveBetweenPanels, TaskUpdate
from src.auth.config import fastapi_users
from src.task.service import task_service



current_user = fastapi_users.current_user()


router = APIRouter(
    prefix="/task",
    tags=["Task"],
    dependencies=[Depends(current_user)]
)


@router.post("/{panel_id}", response_model=TaskInDb)
async def create_new_task(panel_id: int, task_in: TaskCreate) -> Any:
    '''
    Create new **task** in panel.
    '''
    task = await task_service.create_task(task_in, panel_id)
    return task


@router.get("/{task_id}", response_model=TaskInDb)
async def get_one_task(task_id: int) -> Any:
    '''
    Get one **task** by ID.
    '''
    task = await task_service.read_task(task_id)
    return task


@router.delete("/{task_id}", response_model=TaskInDb)
async def delete_one_task(task_id: int) -> Any:
    '''
    Delete a **task** by ID.
    '''
    task = await task_service.delete_task(task_id)
    return task


@router.patch("/{task_id}", response_model=TaskInDb)
async def update_task(task_id: int, new_data: TaskUpdate) -> Any:
    '''
    Update **task's** title and/or description by ID, also you can move task to other panel.
    '''
    task = await task_service.update_task(new_data, task_id)
    return task


@router.patch("/move_tasks_between_panels", status_code=status.HTTP_200_OK)
async def move_tasks_between_panels(data: TaskMoveBetweenPanels) -> None:
    await task_service.move_tasks_between_panels(data)
