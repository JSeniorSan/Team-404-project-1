from datetime import datetime
from pydantic import BaseModel, ConfigDict
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from src.task.models import Task


class TaskBase(BaseModel):
    title: str
    description: str | None

    model_config = ConfigDict(from_attributes=True)


class TaskInDb(TaskBase):
    id: int
    is_completed: bool
    created_at: datetime | None
    updated_at: datetime | None
    parent_id: int

    

class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    pass
