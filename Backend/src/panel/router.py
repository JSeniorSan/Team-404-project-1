from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy import select, update
from src.panel.models import Panel
from src.database import get_db
from src.panel.schemas import PanelCreate, PanelInDb, PanelUpdate
from sqlalchemy.ext.asyncio import AsyncSession
from src.auth.config import fastapi_users


current_user = fastapi_users.current_user()

router = APIRouter(
    prefix="/panel",
    tags=["Panel"],
    dependencies=[Depends(current_user)]
)


@router.post("/{workspace_id}", response_model=PanelInDb)
async def create_panel(
    new_panel: PanelCreate,
    workspace_id: int,
    db: AsyncSession = Depends(get_db)
    ) -> Any:
    '''
    Create **panel** in workspace.
    '''
    panel = Panel(**new_panel.model_dump(), workspace_id=workspace_id)
    db.add(panel)
    await db.commit()
    await db.refresh(panel)
    return panel


@router.delete("/{id}", response_model=PanelInDb)
async def delete_panel(id: int, db: AsyncSession = Depends(get_db)) -> Any:
    '''
    Delete **panel** by ID.
    '''
    panel = await db.get(Panel, id)
    await db.delete(panel)
    await db.commit()
    return panel


@router.get("/{workspace_id}", response_model=list[PanelInDb])
async def get_all_panels(
    workspace_id: int,
    db: AsyncSession = Depends(get_db),
    ) -> Any:
    '''
    Get all **panels** in workspace.
    '''
    stmt = select(Panel).where(Panel.workspace_id==workspace_id)
    panels = await db.execute(stmt)
    result = panels.scalars().all()
    return result


@router.put("/{id}", response_model=PanelInDb)
async def update_panel(
    id: int,
    new_data: PanelUpdate,
    db: AsyncSession = Depends(get_db)
    ) -> Any:
    '''
    Update **panel** by ID.
    '''
    new_values = new_data.model_dump(exclude_unset=True)
    stmt = update(Panel).where(Panel.id==id).values(new_values)
    await db.execute(stmt)
    await db.commit()
    panel = await db.get(Panel, id)
    return panel