from fastapi import Depends, Form, Request, APIRouter
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from src.database import get_db
from src.todo.models import ToDo
from src.config import templates
from starlette.status import HTTP_302_FOUND, HTTP_303_SEE_OTHER


router = APIRouter(prefix="")

@router.get("/")
def main_page(request: Request, db_session: Session = Depends(get_db)):
    todos = db_session.query(ToDo).all()
    return templates.TemplateResponse("index.html", {
        "request": request,
        "todo_list": todos,
        "title": "ToDo App"
    })



@router.post("/add")
def add_todo(title: str = Form(...), db_session: Session = Depends(get_db)):
    todo = ToDo(title=title)
    db_session.add(todo)
    db_session.commit()

    url = router.url_path_for("main_page")
    return RedirectResponse(url=url, status_code=HTTP_303_SEE_OTHER)


@router.get("/update/{todo_id}")
def update_status(todo_id: int, db_session: Session = Depends(get_db)):
    todo = db_session.query(ToDo).filter(ToDo.id == todo_id).first()
    todo.status = not todo.status
    db_session.commit()

    url = router.url_path_for("main_page")
    return RedirectResponse(url=url, status_code=HTTP_302_FOUND)


@router.get("/delete/{todo_id}")
def delete_todo(todo_id: int, db_session: Session = Depends(get_db)):
    todo = db_session.query(ToDo).filter(ToDo.id == todo_id).first()
    db_session.delete(todo)
    db_session.commit()

    url = router.url_path_for("main_page")
    return RedirectResponse(url=url, status_code=HTTP_302_FOUND)
