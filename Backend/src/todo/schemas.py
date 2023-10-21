from datetime import date
from pydantic import BaseModel


class ToDoReturn(BaseModel):
    id: int
    title: str
    description: str | None
    status: bool
    created_at: date

    class Config():
        from_attributes = True


class ToDoCreate(BaseModel):
    title: str
    description: str | None

    class Config():
        from_attributes = True  