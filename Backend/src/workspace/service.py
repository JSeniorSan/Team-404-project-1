import uuid
from src.auth.models import User
from src.workspace.models import Workspace
from src.workspace.schemas import WorkspaceCreate, WorkspaceUpdate
from src.workspace.repository import WorkspaceRepository, workspace_repository


class WorkspaceService:

    def __init__(self, workspace_repo: WorkspaceRepository) -> None:
        self.workspace_repo = workspace_repo

    async def create_workspace(self, new_workspace: WorkspaceCreate, creator_id: uuid.UUID) -> Workspace:
        new_workspace_dict = new_workspace.model_dump()
        new_workspace_dict["creator_id"] = creator_id
        workspace = await self.workspace_repo.create_one(new_workspace_dict, creator_id)
        return workspace

    async def read_workspace(self, workspace_id: int) -> Workspace:
        workspace = await self.workspace_repo.read_one(workspace_id)
        return workspace

    async def read_all_workspaces(self, creator_id: uuid.UUID) -> list[Workspace]:
        filter = {"creator_id": creator_id}
        workspaces = await self.workspace_repo.read_all(filter)
        return workspaces

    async def delete_workspace(self, workspace_id: int) -> Workspace:
        workspace = await self.workspace_repo.delete_one(workspace_id)
        return workspace

    async def update_workspace(self, new_data: WorkspaceUpdate, workspace_id: int) -> Workspace:
        new_data_dict = new_data.model_dump()
        workspace = await self.workspace_repo.update_one(new_data_dict, workspace_id)
        return workspace
    
    async def add_new_member_to_workspace(self, workspace_id: int, new_member_id: uuid.UUID) -> Workspace:
        workspace = await self.workspace_repo.add_new_member_to_workspace(workspace_id, new_member_id)
        return workspace
    

workspace_service = WorkspaceService(workspace_repository)