from datetime import date
from pydantic import BaseModel, ConfigDict


class ToDoBase(BaseModel):
    title: str
    description: str | None

    model_config = ConfigDict(from_attributes=True)


class ToDoInDB(ToDoBase):
    id: int
    status: bool
    created_at: date

    

class ToDoCreate(ToDoBase):
    pass


class ToDoUpdate(ToDoBase):
    pass
