from typing import Any
from fastapi import Depends, APIRouter
from fastapi.encoders import jsonable_encoder
from sqlalchemy import delete, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.todo.models import ToDo
from starlette.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_204_NO_CONTENT
from src.todo.schemas import ToDoInDB, ToDoCreate
import crud


router = APIRouter(
    prefix="/todo",
    tags=["ToDo"],
)


@router.get("/", response_model=list[ToDoInDB])
async def get_all_todos(db_session: AsyncSession = Depends(get_db)) -> Any:
    '''
    Get all **todos**.
    '''
    todos = await crud.todo.read_all(db_session=db_session)
    return todos


@router.post("/", response_model=ToDoInDB)
async def create_new_todo(todo_in: ToDoCreate, db_session: AsyncSession = Depends(get_db)) -> Any:
    '''
    Create new **todo**.
    '''
    todo = await crud.todo.create(db_session=db_session, obj_in=todo_in)
    return todo


@router.delete("/{id}", response_model=ToDoInDB)
async def delete_one_todo(id: int, db_session: AsyncSession = Depends(get_db)) -> Any:
    '''
    Delete a **todo** by **ID**.
    '''
    todo = await crud.todo.delete(db_session=db_session, id=id)
    return todo


@router.get("/{id}", response_model=ToDoInDB)
async def get_one_todo(id: int, db_session: AsyncSession = Depends(get_db)) -> Any:
    '''
    Get one **todo** by **ID**.
    '''
    todo = await crud.todo.read_one(db_session=db_session, id=id)
    return todo


@router.patch("/{id}", response_model=ToDoInDB)
async def update_todo_status(
    id: int, 
    db_session: AsyncSession = Depends(get_db), 
    todo: ToDoInDB = Depends(get_one_todo)
) -> Any:
    '''
    Reverse the status of **todo**.
    '''
    current_status = todo.status
    stmt = update(ToDo).where(ToDo.id == id).values(status = not current_status)
    await db_session.execute(stmt)
    await db_session.commit()
    await db_session.refresh(todo)
    return todo
