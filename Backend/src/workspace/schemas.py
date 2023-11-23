import uuid
from pydantic import BaseModel, ConfigDict


class WorkspaceBase(BaseModel):
    name: str
    hex: str | None

    model_config = ConfigDict(from_attributes=True)


class WorkspaceInDb(WorkspaceBase):
    id: int
    creator_id: uuid.UUID


class WorkspaceCreate(WorkspaceBase):
    pass


class WorkspaceUpdate(WorkspaceBase):
    pass
