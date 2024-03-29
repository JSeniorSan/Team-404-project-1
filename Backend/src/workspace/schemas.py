import uuid
from pydantic import BaseModel, ConfigDict
from src.task.schemas import TaskInDb
from src.auth.schemas import UserSimple
from src.panel.schemas import PanelInDb


class WorkspaceBase(BaseModel):
    name: str
    hex: str | None

    model_config = ConfigDict(from_attributes=True)


class WorkspaceInDb(WorkspaceBase):
    id: int
    creator_id: uuid.UUID
    panels: list[PanelInDb]
    members: list[UserSimple]

class WorkspaceCreate(WorkspaceBase):
    pass


class WorkspaceUpdate(WorkspaceBase):
    pass


class UpdatePanelsOrderAndMoveTasks(BaseModel):
    panels: list[int]
    tasks: list[TaskInDb]

    model_config = ConfigDict(from_attributes=True)
