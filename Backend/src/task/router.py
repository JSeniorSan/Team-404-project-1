from typing import Any
from fastapi import Depends, APIRouter
from fastapi.encoders import jsonable_encoder
from sqlalchemy import delete, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.models import User
from src.database import get_db
from src.task.models import Task
from starlette.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_204_NO_CONTENT
from src.task.schemas import TaskInDb, TaskCreate, TaskUpdate
import crud
from src.auth.config import fastapi_users


router = APIRouter(
    prefix="/task",
    tags=["Task"],
)

current_user = fastapi_users.current_user()


@router.get("/", response_model=list[TaskInDb])
async def get_all_tasks(db_session: AsyncSession = Depends(get_db), user: User = Depends(current_user)) -> Any:
    '''
    Get all **tasks** of current user.
    '''
    tasks = await crud.task.read_all(db_session=db_session, user=user)
    return list(tasks)


@router.post("/", response_model=TaskInDb)
async def create_new_task(task_in: TaskCreate, db_session: AsyncSession = Depends(get_db), user: User = Depends(current_user)) -> Any:
    '''
    Create new **task**.
    '''
    task = await crud.task.create(db_session=db_session, obj_in=task_in, user=user)
    return task


@router.delete("/{id}", response_model=TaskInDb, dependencies=[Depends(current_user)])
async def delete_one_task(id: int, db_session: AsyncSession = Depends(get_db)) -> Any:
    '''
    Delete a **task** by **ID**.
    '''
    task = await crud.task.delete(db_session=db_session, id=id)
    return task


@router.get("/{id}", response_model=TaskInDb, dependencies=[Depends(current_user)])
async def get_one_task(id: int, db_session: AsyncSession = Depends(get_db)) -> Any:
    '''
    Get one **task** by **ID**.
    '''
    task = await crud.task.read_one(db_session=db_session, id=id)
    return task


@router.patch("/{id}", response_model=TaskInDb, dependencies=[Depends(current_user)])
async def update_task_status(
    id: int, 
    db_session: AsyncSession = Depends(get_db), 
    task: TaskInDb = Depends(get_one_task)
) -> Any:
    '''
    Reverse the status of **task**.
    '''
    current_status = task.is_completed
    stmt = update(Task).where(Task.id == id).values(is_completed = not current_status)
    await db_session.execute(stmt)
    await db_session.commit()
    await db_session.refresh(task)
    return task


@router.put("/{id}", response_model=TaskInDb, dependencies=[Depends(current_user)])
async def update_task(id: int, new_data: TaskUpdate, db_session: AsyncSession = Depends(get_db)):
    task = await crud.task.update(db_session=db_session, id=id, obj_in=new_data)
    return task