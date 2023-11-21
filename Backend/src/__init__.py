from src.workspace.router import router as router_workspace
from src.panel.router import router as router_panel
from src.kanban.router import router as router_kanban
from src.task.router import router as router_task

from src.task.models import Task
from src.auth.models import User, AccessToken
from src.panel.models import Panel
from src.workspace.models import Workspace, workspace_members


my_routers = [
    router_kanban,
    router_panel,
    router_task,
    router_workspace
]

my_models = [
    Task,
    User,
    AccessToken,
    Panel,
    Workspace, workspace_members
]
