import uuid

from fastapi import WebSocket
from src.auth.models import User
from src.workspace.models import Workspace
from src.workspace.schemas import UpdatePanelsOrderAndMoveTasks, WorkspaceCreate, WorkspaceUpdate, WorkspaceInDb
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
        result = await self.workspace_repo.read_one(workspace_id)
        workspace = WorkspaceInDb.model_validate(result, from_attributes=True)
        
        try:
            workspace.panels.sort(key=lambda x: x.panel_position)

            for panel in workspace.panels:
                panel.tasks.sort(key=lambda x: x.task_position)

        except TypeError:
            return workspace

        return workspace

    async def read_all_workspaces(self, user_id: uuid.UUID) -> list[Workspace]:
        workspaces = await self.workspace_repo.read_all(user_id)
        return workspaces

    async def delete_workspace(self, workspace_id: int) -> Workspace:
        workspace = await self.workspace_repo.delete_one(workspace_id)
        return workspace

    async def update_workspace(self, new_data: WorkspaceUpdate, workspace_id: int) -> Workspace:
        new_data_dict = new_data.model_dump(exclude_unset=True)
        workspace = await self.workspace_repo.update_one(new_data_dict, workspace_id)
        return workspace
    
    async def update_panels_order_and_move_tasks(self, data: UpdatePanelsOrderAndMoveTasks) -> None:
        panels, tasks = data.panels, data.tasks
        await self.workspace_repo.update_panels_order_and_move_tasks(panels, tasks)
    
    async def add_new_member_to_workspace(self, workspace_id: int, new_member_id: uuid.UUID) -> Workspace:
        workspace = await self.workspace_repo.add_new_member_to_workspace(workspace_id, new_member_id)
        return workspace
    

workspace_service = WorkspaceService(workspace_repository)


class ConnectionManager:
    def __init__(self, workspace_repo: WorkspaceRepository) -> None:
        self.workspace_repo = workspace_repo
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, workspace_id: int, user: User):
        message_dict = {
            "content": message,
            "workspace_id": workspace_id,
            "user_id": user.id
        }
        message = await self.workspace_repo.add_message_to_workspace(message_dict)
        for connection in self.active_connections:
            await connection.send_json(
                {
                    "message": message,
                    "username": user.username
                }
            )


manager = ConnectionManager(workspace_repository)
