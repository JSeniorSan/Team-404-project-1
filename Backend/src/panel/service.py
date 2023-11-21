from src.panel.models import Panel
from src.panel.schemas import PanelCreate, PanelUpdate
from src.panel.repository import PanelRepository, panel_repository


class PanelService:

    def __init__(self, panel_repo: PanelRepository) -> None:
        self.panel_repo = panel_repo

    async def create_panel(self, new_panel: PanelCreate, workspace_id: int) -> Panel:
        new_panel_dict = new_panel.model_dump()
        new_panel_dict["workspace_id"] = workspace_id
        panel = await self.panel_repo.create_one(new_panel_dict)
        return panel
    
    async def read_panel(self, panel_id: int) -> Panel:
        panel = await self.panel_repo.read_one(panel_id)
        return panel
    
    async def delete_panel(self, panel_id: int) -> Panel:
        panel = await self.panel_repo.delete_one(panel_id)
        return panel
    
    async def update_panel(self, new_data: PanelUpdate, panel_id: int) -> Panel:
        new_data_dict = new_data.model_dump()
        panel = await self.panel_repo.update_one(new_data_dict, panel_id)
        return panel
    

panel_service = PanelService(panel_repository)