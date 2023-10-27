from typing import Any
import uuid
from fastapi import Depends, Request, Response
from fastapi_users import BaseUserManager, InvalidPasswordException, UUIDIDMixin
from src.auth.schemas import UserCreate
from src.config import AUTH_SECRET
from src.database import get_db
from src.auth.models import User


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = AUTH_SECRET
    verification_token_secret = AUTH_SECRET

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
        with open("common_passwords/list_of_passwords.txt") as file:
            common_passwords = file.read()
            if password in common_passwords:
                raise InvalidPasswordException(
                reason="Your password is found in the list of easy passwords"
            )

    async def on_after_register(self, user: User, request: Request | None = None):
        print(f"User {user.id} has registered.")

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
    

async def get_user_manager(user_db=Depends(get_db)):
    yield UserManager(user_db)
