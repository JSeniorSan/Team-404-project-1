from datetime import datetime
from pydantic import BaseModel, ConfigDict


class TaskBase(BaseModel):
    title: str
    description: str | None

    model_config = ConfigDict(from_attributes=True)


class TaskInDb(TaskBase):
    id: int
    created_at: datetime | None
    updated_at: datetime | None
    panel_id: int

    

class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    panel_id: int
