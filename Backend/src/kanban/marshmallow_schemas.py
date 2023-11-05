from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from src.panel.models import Panel
from src.task.models import Task
from src.workspace.models import Workspace
from marshmallow_sqlalchemy.fields import Nested


class TaskAll(SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        include_relationships = True
        load_instance = True


class PanelAll(SQLAlchemyAutoSchema):
    class Meta:
        model = Panel
        include_relationships = True
        load_instance = True

    tasks = Nested(TaskAll, many=True, exclude=["panel"])
    

class WorkspaceAll(SQLAlchemyAutoSchema):
    class Meta:
        model = Workspace
        include_relationships = True
        load_instance = True
    
    panels = Nested(PanelAll, many=True, exclude=["workspace"])

workspace_all = WorkspaceAll()


