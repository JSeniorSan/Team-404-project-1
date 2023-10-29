from typing import Any, Generic, TypeVar, Type
from fastapi import Depends
from src.auth.config import fastapi_users
from pydantic import BaseModel
from sqlalchemy import select, update
from src.auth.models import User
from src.database import Base
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.encoders import jsonable_encoder


ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

current_user = fastapi_users.current_user()


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):

    def __init__(self, model: Type[ModelType]) -> None:
        '''
        CRUD object with the default methods to Create, Read, Update, Delete (CRUD).

        **Parameters**

        * `model`: A SQLAlchemy model class
        * `schemas`: A Pydantic model (schema) class
        '''
        self.model = model

    async def create(
            self, 
            db_session: AsyncSession, 
            obj_in: CreateSchemaType, 
            user: User
            ) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, user_id=user.id)
        db_session.add(db_obj)
        await db_session.commit()
        await db_session.refresh(db_obj)
        return db_obj

    async def read_one(
            self,
            db_session: AsyncSession, 
            id: Any,
            ) -> ModelType:
        obj = await db_session.get(self.model, id)
        return obj
    
    async def read_all(
            self, 
            db_session: AsyncSession,
            user: User
            ) -> list[ModelType]:
        query = select(self.model).where(self.model.user_id == user.id)
        objs = await db_session.execute(query) # objs is like objects
        return objs.scalars()

    async def update(self, db_session: AsyncSession, id: Any, obj_in: UpdateSchemaType) -> ModelType:
        new_data = obj_in.model_dump(exclude_unset=True)
        stmt = update(self.model).where(self.model.id == id).values(new_data)
        await db_session.execute(stmt)
        await db_session.commit()
        db_obj = await db_session.get(self.model, id)
        return db_obj
    

    async def delete(self, db_session: AsyncSession, id: Any) -> ModelType:
        obj = await db_session.get(self.model, id)
        await db_session.delete(obj)
        await db_session.commit()
        return obj
