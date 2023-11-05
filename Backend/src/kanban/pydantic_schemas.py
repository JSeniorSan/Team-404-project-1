from datetime import datetime
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


class WorkspaceKanban(BaseModel):
    id: int
    name: str
    panels: list[PanelKanban]
    