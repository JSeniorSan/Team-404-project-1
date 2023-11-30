from sqlalchemy import select
from sqlalchemy.orm import selectinload
from src.database import Session
from utils.repository import SQLAlchemyRespository
from src.panel.models import Panel


class PanelRepository(SQLAlchemyRespository[Panel]):
    
    async def read_one(self, panel_id: int) -> Panel:
        async with Session() as session:
            query = (
                select(Panel)
                .options(selectinload(Panel.tasks))
                .where(Panel.id == panel_id)
            )
            result = await session.execute(query)
            return result.scalar_one()


panel_repository = PanelRepository(Panel)