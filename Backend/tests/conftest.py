from src.database import Base, sync_engine
from src.task.models import Task
from src.panel.models import Panel
from src.workspace.models import Workspace
from src.auth.models import User, AccessToken
from src.config import settings
import pytest


@pytest.fixture(autouse=True, scope="session")
def setup_db():
    assert settings.MODE == "TEST"
    Base.metadata.drop_all(sync_engine)
    Base.metadata.create_all(sync_engine)
    yield None
    Base.metadata.drop_all(sync_engine)
    
