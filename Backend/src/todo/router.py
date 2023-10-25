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
    Get all todos.
    '''
    todos = await crud.todo.read_all(db_session=db_session)
    return todos


@router.post("/")
async def create_new_todo(todo: ToDoCreate, db_session: AsyncSession = Depends(get_db)) -> ToDoInDB:
    '''Создать новую ТуДу'''
    todo_in_db = jsonable_encoder(todo)
    todo_obj = ToDo(**todo_in_db)
    db_session.add(todo_obj)
    await db_session.commit()
    await db_session.refresh(todo_obj)
    return todo_obj


@router.delete("/{id}", response_model=ToDoInDB)
async def delete_one_todo(id: int, db_session: AsyncSession = Depends(get_db)) -> Any:
    '''
    Delete a todo by ID.
    '''
    todo = await crud.todo.delete(db_session=db_session, id=id)
    return todo



@router.get("/{id}")
async def get_one_todo(id: int, db_session: AsyncSession = Depends(get_db)) -> ToDoInDB:
    '''Получить конкретную ТуДу по ID'''
    query = select(ToDo).where(ToDo.id == id)
    result = await db_session.execute(query)
    return result.scalar_one()


@router.patch("/{id}")
async def update_todo_status(
    id: int, 
    db_session: AsyncSession = Depends(get_db), 
    todo: ToDoInDB = Depends(get_one_todo)
):
    '''Меняет статус у конкретной ТуДу (по ID) на противоположный'''
    current_status = todo.status
    stmt = update(ToDo).where(ToDo.id == id).values(status = not current_status)
    await db_session.execute(stmt)
    await db_session.commit()
    return {
        "status": HTTP_204_NO_CONTENT
    }
