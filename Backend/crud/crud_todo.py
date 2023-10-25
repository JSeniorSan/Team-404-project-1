from crud.base import CRUDBase
from src.todo.models import ToDo
from src.todo.schemas import ToDoCreate, ToDoUpdate



class CRUDToDo(CRUDBase[ToDo, ToDoCreate, ToDoUpdate]):
    pass


todo = CRUDToDo(ToDo)

