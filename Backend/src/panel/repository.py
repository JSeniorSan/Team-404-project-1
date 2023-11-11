from utils.repository import SQLAlchemyRespository
from src.panel.models import Panel


class PanelRepository(SQLAlchemyRespository[Panel]):
    pass


panel_repository = PanelRepository(Panel)