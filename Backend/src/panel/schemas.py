from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from pydantic import BaseModel, ConfigDict
from src.panel.models import Panel


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


class PanelAll(SQLAlchemyAutoSchema):
    class Meta:
        model = Panel
        include_relationships = True
        load_instance = True

panel_all = PanelAll()