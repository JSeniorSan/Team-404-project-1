from typing import Any, Generic, TypeVar, Type
from pydantic import BaseModel
from sqlalchemy import select
from Backend.src.database import Base
from sqlalchemy.ext.asyncio import AsyncSession


ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):

    def __init__(self, model: Type[ModelType]) -> None:
        '''
        CRUD object with the default methods to Create, Read, Update, Delete (CRUD).

        **Parameters**

        * `model`: A SQLAlchemy model class
        * `schems`: A Pydantic model (schema) class
        '''
        self.model = model

    def create():
        ...

    async def read_one(self, db_session: AsyncSession, id: Any) -> ModelType:
        query = select(self.model).where(self.model.id == id)
        obj = await db_session.execute(query)
        return obj
    
    async def read_all(self, db_session: AsyncSession) -> list[ModelType]:
        query = select(self.model)
        objs = await db_session.execute(query)
        return objs.scalars()

    def update():
        ...

    async def delete(self, db_session: AsyncSession, id: Any) -> ModelType:
        query = select(self.model).where(self.model.id == id)
        obj = await db_session.execute(query)
        await db_session.delete(obj)
        await db_session.commit()
        return obj
