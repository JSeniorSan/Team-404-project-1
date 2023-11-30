from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String
from src.task.models import Task


class Panel(Base):
    __tablename__ = "panels"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    tasks: Mapped[list[Task]] = relationship(back_populates="panel", lazy='selectin', cascade="all, delete")
    workspace_id: Mapped[int] = mapped_column(ForeignKey("workspaces.id", ondelete="CASCADE"))
    workspace: Mapped["Workspace"] = relationship(back_populates="panels")