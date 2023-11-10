from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String
from src.panel.models import Panel
import uuid


class Workspace(Base):
    __tablename__ = "workspaces"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(40), nullable=False)
    panels: Mapped[list[Panel]] = relationship(back_populates="workspace", lazy='selectin')
    parent_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))