from pydantic import BaseModel, ConfigDict
from src.task.schemas import TaskInDb


class PanelBase(BaseModel):
    name: str

    model_config = ConfigDict(from_attributes=True)


class PanelInDb(PanelBase):
    id: int
    workspace_id: int
    tasks: list[TaskInDb]
    panel_position: int | None

class PanelCreate(PanelBase):
    pass


class PanelUpdate(PanelBase):
    name: str | None = None
    panel_position: int | None = None


class PanelUpdateTasksOrder(BaseModel):
    tasks: list[TaskInDb]

    model_config = ConfigDict(from_attributes=True)