from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from pydantic import BaseModel, ConfigDict
# from src.task.schemas import TaskAll
from src.panel.models import Panel
from marshmallow_sqlalchemy.fields import Nested


class PanelBase(BaseModel):
    name: str

    model_config = ConfigDict(from_attributes=True)


class PanelInDb(PanelBase):
    id: int
    workspace_id: int


class PanelCreate(PanelBase):
    pass


class PanelUpdate(PanelBase):
    pass
