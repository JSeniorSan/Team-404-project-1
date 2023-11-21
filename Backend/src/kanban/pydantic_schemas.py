from datetime import datetime
import uuid
from pydantic import BaseModel


class TaskKanban(BaseModel):
    id: int
    title: str
    description: str
    is_completed: bool
    created_at: datetime
    updated_at: datetime | None


class PanelKanban(BaseModel):
    id: int
    name: str
    tasks: list[TaskKanban]


class MemberKanban(BaseModel):
    id: uuid.UUID
    email: str
    username: str


class WorkspaceKanban(BaseModel):
    id: int
    name: str
    panels: list[PanelKanban]
    members: list[MemberKanban]

