from datetime import date, datetime
import uuid
from pydantic import BaseModel, ConfigDict


class TaskBase(BaseModel):
    title: str
    description: str | None

    model_config = ConfigDict(from_attributes=True)


class TaskInDb(TaskBase):
    id: int
    is_completed: bool
    created_at: datetime | None
    updated_at: datetime | None
    user_id: uuid.UUID

    

class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    pass
