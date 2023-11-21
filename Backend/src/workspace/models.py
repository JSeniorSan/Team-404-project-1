from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Column, ForeignKey, String, Table, Integer, UUID
from src.panel.models import Panel
import uuid


workspace_members = Table(
    "workspace_members",
    Base.metadata,
    Column("workspace_id", Integer, ForeignKey("workspaces.id")),
    Column("member_id", UUID, ForeignKey("user.id")),
)


class Workspace(Base):
    __tablename__ = "workspaces"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(40), nullable=False)
    panels: Mapped[list[Panel]] = relationship(back_populates="workspace", lazy='selectin', cascade="all, delete")
    creator_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))
    members: Mapped[list["User"]] = relationship(back_populates="workspaces", lazy='selectin', cascade="all, delete", secondary=workspace_members)
