import uuid
from pydantic import BaseModel, ConfigDict
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
# from src.panel.schemas import PanelAll
from src.workspace.models import Workspace
from marshmallow_sqlalchemy.fields import Nested



class WorkspaceBase(BaseModel):
    name: str

    model_config = ConfigDict(from_attributes=True)


class WorkspaceInDb(WorkspaceBase):
    id: int
    user_id: uuid.UUID


class WorkspaceCreate(WorkspaceBase):
    pass


class WorkspaceUpdate(WorkspaceBase):
    pass
