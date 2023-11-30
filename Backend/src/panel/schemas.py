from pydantic import BaseModel, ConfigDict
from src.task.schemas import TaskInDb


class PanelBase(BaseModel):
    name: str

    model_config = ConfigDict(from_attributes=True)


class PanelInDb(PanelBase):
    id: int
    workspace_id: int
    tasks: list[TaskInDb]

class PanelCreate(PanelBase):
    pass


class PanelUpdate(PanelBase):
    pass
