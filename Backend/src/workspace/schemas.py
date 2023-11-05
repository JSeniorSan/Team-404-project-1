import uuid
from pydantic import BaseModel, ConfigDict
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from src.workspace.models import Workspace


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



class WorkspaceAll(SQLAlchemyAutoSchema):
    class Meta:
        model = Workspace
        include_relationships = True
        load_instance = True

workspace_all = WorkspaceAll()