from src.workspace.models import Workspace
from utils.repository import SQLAlchemyRespository


class WorkspaceRepository(SQLAlchemyRespository[Workspace]):
    pass


workspace_repository = WorkspaceRepository(Workspace)
