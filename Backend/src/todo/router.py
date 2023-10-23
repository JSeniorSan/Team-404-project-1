from fastapi import Depends, APIRouter
from sqlalchemy import delete, insert, select, update
from sqlalchemy.orm import Session
from src.database import get_db
from src.todo.models import ToDo
from starlette.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_204_NO_CONTENT
from src.todo.schemas import ToDoReturn, ToDoCreate


router = APIRouter(
    prefix="/todo",
    tags=["ToDo"],
)


@router.get("/")
def get_all_todos(db_session: Session = Depends(get_db)) -> list[ToDoReturn]:
    '''Получить список всех ТуДу'''
    todos = db_session.query(ToDo).all()
    return todos


@router.post("/")
def create_new_todo(todo: ToDoCreate, db_session: Session = Depends(get_db)):
    '''Создать новую ТуДу'''
    stmt = insert(ToDo).values(**todo.model_dump())
    db_session.execute(stmt)
    db_session.commit()
    return {
        "status": HTTP_201_CREATED
    }


@router.delete("/{id}")
def delete_one_todo(id: int, db_session: Session = Depends(get_db)):
    '''Удалить одну ТуДу по ID'''
    stmt = delete(ToDo).where(ToDo.id == id)
    db_session.execute(stmt)
    db_session.commit()
    return {
        "status": HTTP_200_OK
    }


@router.get("/{id}")
def get_one_todo(id: int, db_session: Session = Depends(get_db)) -> ToDoReturn:
    '''Получить конкретную ТуДу по ID'''
    query = select(ToDo).where(ToDo.id == id)
    result = db_session.execute(query)
    return result.mappings().one()


@router.patch("/{id}/status")
def update_todo_status(id: int, db_session: Session = Depends(get_db)):
    '''Меняет статус у конкретной ТуДу (по ID) на противоположный'''
    current_status = db_session.execute(select(ToDo.status).where(ToDo.id == id))
    stmt = update(ToDo).where(ToDo.id == id).values(status = not current_status)
    db_session.execute(stmt)
    db_session.commit()
    return {
        "status": HTTP_204_NO_CONTENT
    }
