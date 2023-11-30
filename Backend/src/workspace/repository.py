from typing import Any
import uuid
from sqlalchemy import insert, select
from sqlalchemy.orm import selectinload, joinedload
from src.workspace.schemas import WorkspaceInDb
from src.auth.models import User
from src.workspace.models import Workspace, workspace_members
from utils.repository import SQLAlchemyRespository
from src.database import Session


class WorkspaceRepository(SQLAlchemyRespository[Workspace]):

    async def read_all(self, user_id: uuid.UUID) -> list[Workspace]:
        async with Session() as session:
            query = (
                select(self.model)
                .join(workspace_members, workspace_members.c.workspace_id == self.model.id)
                .join(User, User.id == workspace_members.c.member_id)
                .where(User.id == user_id)
            )
            result = await session.execute(query)
            result_orm = result.scalars().all()
            workspaces = [WorkspaceInDb.model_validate(row, from_attributes=True) for row in result_orm]
            return workspaces

    async def create_one(self, new_workspace: dict[str, Any], creator_id: uuid.UUID) -> Workspace:
        async with Session() as session:
            stmt = insert(self.model).values(**new_workspace).returning(self.model)
            result = await session.execute(stmt)
            workspace = result.scalar_one()

            query = select(User).where(User.id == creator_id)
            result = await session.execute(query)
            new_member = result.scalar_one()
            
            workspace.members.append(new_member)
            await session.commit()
            return workspace

    async def add_new_member_to_workspace(self, workspace_id: int, new_member_id: uuid.UUID) -> Workspace:
        async with Session() as session:
            query = select(self.model).where(self.model.id == workspace_id)
            result = await session.execute(query)
            workspace = result.scalar_one()
            
            query = select(User).where(User.id == new_member_id)
            result = await session.execute(query)
            new_member = result.scalar_one()

            workspace.members.append(new_member)
            await session.commit()
            return workspace

    async def read_one(self, workspace_id: int) -> Workspace:
        async with Session() as session:
            query = (
                select(Workspace)
                .options(selectinload(Workspace.panels))
                .where(Workspace.id == workspace_id)
            )
            result = await session.execute(query)
            return result.scalar_one()

workspace_repository = WorkspaceRepository(Workspace)
