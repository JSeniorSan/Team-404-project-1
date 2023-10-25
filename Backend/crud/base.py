from typing import Any, Generic, TypeVar, Type
from pydantic import BaseModel
from sqlalchemy import select
from src.database import Base
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.encoders import jsonable_encoder


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

    async def create(self, db_session: AsyncSession, obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)
        db_session.add(db_obj)
        await db_session.commit()
        await db_session.refresh(db_obj)
        return db_obj

    async def read_one(self, db_session: AsyncSession, id: Any) -> ModelType:
        query = select(self.model).where(self.model.id == id)
        obj = await db_session.execute(query)
        return obj
    
    async def read_all(self, db_session: AsyncSession) -> list[ModelType]:
        query = select(self.model)
        objs = await db_session.execute(query) # objs is like objects
        return objs.scalars()

    async def update(self, db_session: AsyncSession, db_obj: ModelType, obj_in: UpdateSchemaType | dict[str, Any]) -> ModelType:
        db_obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
        for field in db_obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db_session.add(db_obj)
        await db_session.commit()
        await db_session.refresh(db_obj)
        return db_obj

    async def delete(self, db_session: AsyncSession, id: Any) -> ModelType:
        obj = await db_session.get(self.model, id)
        await db_session.delete(obj)
        await db_session.commit()
        return obj
