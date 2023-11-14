import uuid
from pydantic import BaseModel, ConfigDict


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
