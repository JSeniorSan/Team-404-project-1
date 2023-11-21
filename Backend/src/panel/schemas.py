from pydantic import BaseModel, ConfigDict


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
