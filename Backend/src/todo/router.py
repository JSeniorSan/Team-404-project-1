from fastapi import Depends, APIRouter
from sqlalchemy import delete, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.todo.models import ToDo
from starlette.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_204_NO_CONTENT
from src.todo.schemas import ToDoReturn, ToDoCreate


router = APIRouter(
    prefix="/todo",
    tags=["ToDo"],
)


@router.get("/")
async def get_all_todos(db_session: AsyncSession = Depends(get_db)) -> list[ToDoReturn]:
    '''Получить список всех ТуДу'''
    query = select(ToDo)
    todos = await db_session.execute(query)
    return todos.scalars()


@router.post("/")
async def create_new_todo(todo: ToDoCreate, db_session: AsyncSession = Depends(get_db)) -> ToDoCreate:
    '''Создать новую ТуДу'''
    stmt = insert(ToDo).values(**todo.model_dump())
    await db_session.execute(stmt)
    await db_session.commit()
    return todo


@router.delete("/{id}")
async def delete_one_todo(id: int, db_session: AsyncSession = Depends(get_db)):
    '''Удалить одну ТуДу по ID'''
    stmt = delete(ToDo).where(ToDo.id == id)
    await db_session.execute(stmt)
    await db_session.commit()
    return {
        "status": HTTP_200_OK
    }


@router.get("/{id}")
async def get_one_todo(id: int, db_session: AsyncSession = Depends(get_db)) -> ToDoReturn:
    '''Получить конкретную ТуДу по ID'''
    query = select(ToDo).where(ToDo.id == id)
    result = await db_session.execute(query)
    return result.scalar_one()


@router.patch("/{id}/status")
async def update_todo_status(
    id: int, 
    db_session: AsyncSession = Depends(get_db), 
    todo: ToDoReturn = Depends(get_one_todo)
):
    '''Меняет статус у конкретной ТуДу (по ID) на противоположный'''
    current_status = todo.status
    stmt = update(ToDo).where(ToDo.id == id).values(status = not current_status)
    await db_session.execute(stmt)
    await db_session.commit()
    return {
        "status": HTTP_204_NO_CONTENT
    }
