from crud.base import CRUDBase
from src.task.models import Task
from src.task.schemas import TaskCreate, TaskUpdate



class CRUDToDo(CRUDBase[Task, TaskCreate, TaskUpdate]):
    pass


task = CRUDToDo(Task)

