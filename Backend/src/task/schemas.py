from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class TaskBase(BaseModel):
    title: str
    description: str | None = None

    model_config = ConfigDict(from_attributes=True)


class TaskInDb(TaskBase):
    id: int
    created_at: datetime | None
    updated_at: datetime | None
    panel_id: int
    task_position: int | None

    

class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    title: str | None = None
    panel_id: int | None = None
    task_position: int | None = None
