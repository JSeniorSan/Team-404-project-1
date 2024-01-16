from typing import Any
import uuid
from sqlalchemy import insert, select, update
from sqlalchemy.orm import selectinload, joinedload
from src.panel.schemas import PanelInDb
from src.task.schemas import TaskInDb
from src.workspace.schemas import WorkspaceInDb, WorkspaceUpdatePanelsOrder
from src.auth.models import User
from src.workspace.models import Workspace, workspace_members
from utils.repository import SQLAlchemyRespository
from src.database import Session
from src.panel.models import Panel
from src.task.models import Task


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
        
    async def update_panels_order_and_move_tasks(self, panels: list[PanelInDb], tasks: list[TaskInDb]) -> None:
        async with Session() as session:
            panel_number = 0
            for panel in panels:
                stmt = (
                    update(Panel)
                    .where(Panel.id==panel.id)
                    .values(panel_position=panel_number)
                )
                await session.execute(stmt)
                panel_number += 1

            task_number = 0
            for task in tasks:
                stmt = (
                    update(Task)
                    .where(Task.id==task.id)
                    .values(panel_id=task.panel_id, task_position=task_number)
                )
                await session.execute(stmt)
                task_number += 1

            await session.commit()
            # query = select(self.model).where(self.model.id==workspace_id)
            # result = await session.execute(query)
            # return result.scalar_one()


workspace_repository = WorkspaceRepository(Workspace)
