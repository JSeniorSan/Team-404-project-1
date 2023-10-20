from datetime import date
from pydantic import BaseModel


class ToDoSchema(BaseModel):
    id: int
    title: str
    description: str | None
    status: bool
    created_at: date

    class Config():
        from_attributes = True
        