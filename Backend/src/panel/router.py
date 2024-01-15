from typing import Any
from fastapi import APIRouter, Depends, status
from src.panel.schemas import PanelCreate, PanelInDb, PanelUpdate, PanelUpdateTasksOrder
from src.auth.config import fastapi_users
from src.panel.service import panel_service


current_user = fastapi_users.current_user()

router = APIRouter(
    prefix="/panel",
    tags=["Panel"],
    dependencies=[Depends(current_user)]
)


@router.post("/{workspace_id}", response_model=PanelInDb)
async def create_panel(new_panel: PanelCreate, workspace_id: int) -> Any:
    '''
    Create **panel** in workspace.
    '''
    panel = await panel_service.create_panel(new_panel, workspace_id)
    return panel


@router.delete("/{panel_id}", response_model=PanelInDb)
async def delete_panel(panel_id: int) -> Any:
    '''
    Delete **panel** by ID.
    '''
    panel = await panel_service.delete_panel(panel_id)
    return panel


@router.get("/{panel_id}", response_model=PanelInDb)
async def get_panel(panel_id: int) -> Any:
    '''
    Get **panel** in workspace.
    '''
    panel = await panel_service.read_panel(panel_id)
    return panel


@router.patch("/{panel_id}", response_model=PanelInDb)
async def update_panel(new_data: PanelUpdate, panel_id: int) -> Any:
    '''
    Update **panel** by ID.
    '''
    panel = await panel_service.update_panel(new_data, panel_id)
    return panel


@router.patch("/{panel_id}/update_tasks_order", status_code=status.HTTP_200_OK)
async def update_tasks_order(new_data: PanelUpdateTasksOrder, panel_id: int) -> None:
    await panel_service.update_tasks_order(panel_id, new_data)
