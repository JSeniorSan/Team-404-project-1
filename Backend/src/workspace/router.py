from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy import insert, select, update
from src.workspace.models import Workspace
from src.auth.models import User
from src.workspace.schemas import WorkspaceCreate, WorkspaceInDb, WorkspaceUpdate
from src.database import get_db
from src.auth.config import fastapi_users
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(
    prefix="/workspace",
    tags=["Workspace"]
)


current_user = fastapi_users.current_user()


@router.post("/", response_model=WorkspaceInDb)
async def create_workspace(
    new_workspace: WorkspaceCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(current_user)
    ) -> Any:
    '''
    Create **workspace**.
    '''
    workspace = Workspace(**new_workspace.model_dump(), user_id=user.id)
    db.add(workspace)
    await db.commit()
    await db.refresh(workspace)
    return workspace


@router.delete("/{id}", response_model=WorkspaceInDb, dependencies=[Depends(current_user)])
async def delete_workspace(id: int, db: AsyncSession = Depends(get_db)) -> Any:
    '''
    Delete **workspace** by ID.
    '''
    workspace = await db.get(Workspace, id)
    await db.delete(workspace)
    await db.commit()
    return workspace


@router.get("/", response_model=list[WorkspaceInDb])
async def get_all_workspaces(
    db: AsyncSession = Depends(get_db),
    user: User = Depends(current_user)
    ) -> Any:
    '''
    Get all **workspaces**.
    '''
    stmt = select(Workspace).where(Workspace.user_id==user.id)
    workspaces = await db.execute(stmt)
    result = workspaces.scalars().all()
    return result


@router.put("/{id}", response_model=WorkspaceInDb)
async def update_workspace(
    id: int,
    new_data: WorkspaceUpdate,
    db: AsyncSession = Depends(get_db)
    ) -> Any:
    '''
    Update **workspace** by ID.
    '''
    new_values = new_data.model_dump(exclude_unset=True)
    stmt = update(Workspace).where(Workspace.id==id).values(new_values)
    await db.execute(stmt)
    await db.commit()
    workspace = await db.get(Workspace, id)
    return workspace
