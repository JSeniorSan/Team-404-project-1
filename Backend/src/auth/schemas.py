from typing import Optional
import uuid
from fastapi_users import schemas
from pydantic import ConfigDict, EmailStr
from src.task.models import Task


class UserRead(schemas.BaseUser[uuid.UUID]):
    id: uuid.UUID
    email: EmailStr
    username: str
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
    

class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    password: str
    username: str
    is_active: bool | None = True
    is_superuser: bool | None = False
    is_verified: bool | None = False


class UserUpdate(schemas.BaseUserUpdate):
    password: Optional[str] = None
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_verified: Optional[bool] = None
