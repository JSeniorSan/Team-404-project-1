from typing import Any
from fastapi import Depends, APIRouter
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.models import User
from src.database import get_db
from src.task.models import Task
from src.task.schemas import TaskInDb, TaskCreate, TaskUpdate
import crud
from src.auth.config import fastapi_users


current_user = fastapi_users.current_user()


router = APIRouter(
    prefix="/task",
    tags=["Task"],
    dependencies=[Depends(current_user)]
)


@router.post("/{panel_id}", response_model=TaskInDb)
async def create_new_task(panel_id: int, task_in: TaskCreate, db: AsyncSession = Depends(get_db)) -> Any:
    '''
    Create new **task**.
    '''
    # task = await crud.task.create(db_session=db_session, obj_in=task_in, user=user)
    # return task
    task = Task(**task_in.model_dump(), panel_id=panel_id)
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task


@router.get("/{panel_id}", response_model=list[TaskInDb])
async def get_all_tasks(panel_id: int, db: AsyncSession = Depends(get_db)) -> Any:
    '''
    Get all **tasks** in panel.
    '''
    # tasks = await crud.task.read_all(db_session=db_session, user=user)
    # return list(tasks)
    query = select(Task).where(Task.panel_id==panel_id)
    tasks = await db.execute(query)
    result = tasks.scalars().all()
    return result


@router.get("/{id}", response_model=TaskInDb)
async def get_one_task(id: int, db: AsyncSession = Depends(get_db)) -> Any:
    '''
    Get one **task** by ID.
    '''
    task = await db.get(Task, id)
    return task


@router.delete("/{id}", response_model=TaskInDb)
async def delete_one_task(id: int, db: AsyncSession = Depends(get_db)) -> Any:
    '''
    Delete a **task** by ID.
    '''
    task = await db.get(Task, id)
    await db.delete(task)
    await db.commit()
    return task


# @router.patch("/{id}", response_model=[TaskInDb])
# async def update_task_status(
#     id: int, 
#     db_session: AsyncSession = Depends(get_db), 
#     task: TaskInDb = Depends(get_one_task)
# ) -> Any:
#     '''
#     Reverse the status of **task**.
#     '''
#     current_status = task.is_completed
#     stmt = update(Task).where(Task.id == id).values(is_completed = not current_status)
#     await db_session.execute(stmt)
#     await db_session.commit()
#     await db_session.refresh(task)
#     return task


@router.put("/{id}", response_model=TaskInDb)
async def update_task(id: int, new_data: TaskUpdate, db: AsyncSession = Depends(get_db)) -> Any:
    '''
    Update **task** by ID.
    '''
    new_values = new_data.model_dump(exclude_unset=True)
    stmt = update(Task).where(Task.id==id).values(new_values)
    await db.execute(stmt)
    await db.commit()
    task = await db.get(Task, id)
    return task