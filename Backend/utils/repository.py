from typing import Any, Type, TypeVar, Generic
import uuid
from sqlalchemy import delete, insert, select, update
from src.database import Session, Base


Model = TypeVar("Model", bound=Base)


class SQLAlchemyRespository(Generic[Model]):
    
    def __init__(self, model: Type[Model]) -> None:
        self.model = model

    async def create_one(self, data: dict[str, Any], owner_id: int | uuid.UUID) -> Model:
        async with Session() as session:
            stmt = insert(self.model).values(parent_id = owner_id, **data).returning(self.model)
            result = await session.execute(stmt)
            await session.commit()
            return result.scalar_one()
        
    async def read_one(self, id: int | uuid.UUID) -> Model:
        async with Session() as session:
            query = select(self.model).where(self.model.id == id)
            result = await session.execute(query)
            return result.scalar_one()
        
    async def delete_one(self, id: int | uuid.UUID) -> Model:
        async with Session() as session:
            stmt = delete(self.model).where(self.model.id == id).returning(self.model)
            result = await session.execute(stmt)
            await session.commit()
            return result.scalar_one()
        
    async def update_one(self, new_data: dict[str, Any], id: int | uuid.UUID) -> Model:
        async with Session() as session:
            stmt = update(self.model).where(self.model.id == id).values(**new_data).returning(self.model)
            result = await session.execute(stmt)
            await session.commit()
            return result.scalar_one()