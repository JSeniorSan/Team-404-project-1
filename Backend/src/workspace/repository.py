from typing import Any
import uuid
from sqlalchemy import insert, select
from src.auth.models import User
from src.workspace.models import Workspace, workspace_members
from utils.repository import SQLAlchemyRespository
from src.database import Session


class WorkspaceRepository(SQLAlchemyRespository[Workspace]):

    async def read_all(self, user_id: uuid.UUID) -> list[Workspace]:
        async with Session() as session:
            query = (
                select(self.model)
                .join(workspace_members)
                .join(User)
                .where(User.id == user_id)
            )
            result = await session.execute(query)
            return result.scalars().all()

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

workspace_repository = WorkspaceRepository(Workspace)
