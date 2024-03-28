from typing import Any
import uuid
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, status
from src.auth.models import User
from src.workspace.schemas import UpdatePanelsOrderAndMoveTasks, WorkspaceCreate, WorkspaceInDb, WorkspaceUpdate
from src.auth.config import fastapi_users
from src.workspace.service import workspace_service, manager


current_user = fastapi_users.current_user()


router = APIRouter(
    prefix="/workspace",
    tags=["Workspace"],
    dependencies=[Depends(current_user)]
)


@router.websocket("/{workspace_id}")
async def websocket_endpoint(
    websocket: WebSocket, 
    workspace_id: int,
    user: User = Depends(current_user)
):
    await manager.connect(websocket)
    try:
        while True:
            message = await websocket.receive_text()
            await manager.broadcast(message, workspace_id, user)
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@router.post("/", response_model=WorkspaceInDb)
async def create_workspace(new_workspace: WorkspaceCreate, user: User = Depends(current_user)) -> Any:
    '''
    Create **workspace**.
    '''
    workspace = await workspace_service.create_workspace(new_workspace, user.id)
    return workspace


@router.delete("/{workspace_id}", response_model=WorkspaceInDb)
async def delete_workspace(workspace_id: int) -> Any:
    '''
    Delete **workspace** by ID.
    '''
    workspace = await workspace_service.delete_workspace(workspace_id)
    return workspace


@router.get("/", response_model=list[WorkspaceInDb])
async def get_all_workspaces(user: User = Depends(current_user)) -> Any:
    '''
    Get all **workspaces** by user_id.
    '''
    workspaces = await workspace_service.read_all_workspaces(user.id)
    return workspaces


@router.get("/{workspace_id}", response_model=WorkspaceInDb)
async def get_workspace(workspace_id: int) -> Any:
    '''
    Get one **workspaces** by ID.
    '''
    workspace = await workspace_service.read_workspace(workspace_id)
    return workspace


@router.patch("/update_panels_order_and_move_tasks", status_code=status.HTTP_200_OK)
async def update_panels_order_and_move_tasks(new_data: UpdatePanelsOrderAndMoveTasks) -> None:
    await workspace_service.update_panels_order_and_move_tasks(new_data)


@router.patch("/{workspace_id}", response_model=WorkspaceInDb)
async def update_workspace(workspace_id: int, new_data: WorkspaceUpdate) -> Any:
    '''
    Update **workspace** by ID.
    '''
    workspace = await workspace_service.update_workspace(new_data, workspace_id)
    return workspace


@router.patch("/{workspace_id}/add_new_member", response_model=WorkspaceInDb)
async def add_new_member_to_workspace(workspace_id: int, new_member_id: uuid.UUID) -> Any:
    '''
    Add new member to workspace.
    '''
    workspace = await workspace_service.add_new_member_to_workspace(workspace_id, new_member_id)
    return workspace


