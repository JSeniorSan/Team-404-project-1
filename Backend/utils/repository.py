from typing import Any, Type, TypeVar, Generic
import uuid
from sqlalchemy import delete, insert, select, update
from src.database import Session, Base


Model = TypeVar("Model", bound=Base)


class SQLAlchemyRespository(Generic[Model]):
    
    def __init__(self, model: Type[Model]) -> None:
        self.model = model

    async def create_one(self, data: dict[str, Any]) -> Model:
        async with Session() as session:
            stmt = insert(self.model).values(**data).returning(self.model)
            result = await session.execute(stmt)
            await session.commit()
            return result.scalar_one()
        
    async def read_one(self, id: int | uuid.UUID) -> Model:
        async with Session() as session:
            query = select(self.model).where(self.model.id == id)
            result = await session.execute(query)
            return result.scalar_one()
        
    async def read_all(self, filter: dict[str, int | uuid.UUID]) -> list[Model]:
        async with Session() as session:
            query = select(self.model).filter_by(**filter)
            result = await session.execute(query)
            return result.scalars().all()

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
        
    