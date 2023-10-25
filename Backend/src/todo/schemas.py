from datetime import date
from pydantic import BaseModel


class ToDoBase(BaseModel):
    title: str
    description: str | None

    class Config():
        from_attributes = True


class ToDoInDB(ToDoBase):
    id: int
    status: bool
    created_at: date

    

class ToDoCreate(ToDoBase):
    pass


class ToDoUpdate(ToDoBase):
    pass
