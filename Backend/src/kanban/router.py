from typing import Any
from fastapi import APIRouter, Depends
from src.kanban.pydantic_schemas import WorkspaceKanban
from src.database import get_db
from src.kanban.marshmallow_schemas import workspace_all
from src.workspace.models import Workspace
from src.auth.config import fastapi_users
from sqlalchemy.ext.asyncio import AsyncSession


current_user = fastapi_users.current_user()

router = APIRouter(
    prefix="/kanban",
    tags=["Kanban"],
    dependencies=[Depends(current_user)]
)


@router.get("/{id}", response_model=WorkspaceKanban, deprecated=True)
async def get_everything_in_workspace(id: int, db: AsyncSession = Depends(get_db)) -> Any:
    '''
    Get all info wrom **workspace**.
    '''
    workspace = await db.get(Workspace, id)
    dump_data = workspace_all.dump(workspace)
    return dump_data