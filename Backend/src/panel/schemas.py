from pydantic import BaseModel, ConfigDict


class PanelBase(BaseModel):
    name: str

    model_config = ConfigDict(from_attributes=True)


class WorkspaceInDb(PanelBase):
    id: int
    workspace_id: id


class PanelCreate(PanelBase):
    pass


class PanelUpdate(PanelBase):
    pass
