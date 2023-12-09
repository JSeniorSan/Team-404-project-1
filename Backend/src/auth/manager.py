from typing import Any
import uuid
from fastapi import Depends, Request, Response
from fastapi_users import BaseUserManager, InvalidPasswordException, UUIDIDMixin
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from src.auth.deps import get_user_db
from src.auth.schemas import UserCreate
from src.config import settings
from src.auth.models import User
from src.auth.common_passwords.list_of_passwords import passwords_list
from src.workspace.models import Workspace
from src.panel.models import Panel
from src.task.models import Task
from src.database import Session


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = settings.AUTH_SECRET
    verification_token_secret = settings.AUTH_SECRET

    async def validate_password(
        self,
        password: str,
        user: UserCreate | User,
    ) -> None:
        if len(password) < 8:
            raise InvalidPasswordException(
                reason="Password should be at least 8 characters"
            )
        if user.email in password:
            raise InvalidPasswordException(
                reason="Password should not contain e-mail"
            )
        if user.username in password:
            raise InvalidPasswordException(
                reason="Password should not contain username"
            )
        if user.username in passwords_list:
            raise InvalidPasswordException(
                reason="Your password is found in the list of easy passwords"
            )

    async def on_after_register(
            self, 
            user: User, 
            request: Request | None = None,  
        ) -> None:
        '''
        Creates welcome **workspace**.
        '''
        async with Session() as session:

            workspace = Workspace(name="Привет, это твой первый проект!", creator_id=user.id, hex='GFHA48')
            session.add(workspace)
            await session.commit()
            await session.refresh(workspace)

            panel_todo = Panel(name="Запланировано", workspace_id=workspace.id, panel_position=0)
            panel_in_progress = Panel(name="В работе", workspace_id=workspace.id, panel_position=1)
            panel_done = Panel(name="Выполнено", workspace_id=workspace.id, panel_position=2)
            session.add_all([panel_todo, panel_in_progress, panel_done])
            await session.commit()
            await session.refresh(panel_todo)
            await session.refresh(panel_in_progress)
            await session.refresh(panel_done)

            task_todo = Task(title="Запланированная задача", 
                             panel_id=panel_todo.id, 
                             description="Это пример" \
                                        " запланированной задачи," \
                                        " можешь попробовать" \
                                        " отредактировать её.",
                             task_position=0)
            task_in_progress = Task(title="Эта задача в процессе", 
                                    panel_id=panel_in_progress.id, 
                                    description="Описание текущей задачи." \
                                               " Её подробности.",
                                    task_position=0)
            task_done = Task(title="А это задача уже выполнена", 
                             panel_id=panel_done.id, 
                             description="Эту задачу уже выполнили." \
                                        " Можно оставить какие-то комментарии.",
                             task_position=0)
            session.add_all([task_todo, task_in_progress, task_done])
            await session.commit()


    async def on_after_update(
        self,
        user: User,
        update_dict: dict[str, Any],
        request: Request | None = None,
    ):
        print(f"User {user.id} has been updated with {update_dict}.")

    async def on_after_login(
        self,
        user: User,
        request: Request | None = None,
        response: Response | None = None,
    ):
        print(f"User {user.id} logged in.")

    async def on_after_request_verify(
        self, user: User, token: str, request: Request | None = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")

    async def on_after_verify(
        self, user: User, request: Request | None = None
    ):
        print(f"User {user.id} has been verified")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Request | None = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_reset_password(self, user: User, request: Request | None = None):
        print(f"User {user.id} has reset their password.")

    async def on_before_delete(self, user: User, request: Request | None = None):
        print(f"User {user.id} is going to be deleted")

    async def on_after_delete(self, user: User, request: Request | None = None):
        print(f"User {user.id} is successfully deleted")
    

async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)
