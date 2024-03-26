from datetime import datetime
from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Column, DateTime, ForeignKey, String, Table, Integer, UUID, func
from src.panel.models import Panel
import uuid


workspace_members = Table(
    "workspace_members",
    Base.metadata,
    Column("workspace_id", Integer, ForeignKey("workspaces.id", ondelete="CASCADE")),
    Column("member_id", UUID, ForeignKey("user.id", ondelete="CASCADE")),
)


class Workspace(Base):
    __tablename__ = "workspaces"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    hex: Mapped[str] = mapped_column(String(40), nullable=True)
    creator_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))
    panels: Mapped[list[Panel]] = relationship(back_populates="workspace", lazy='selectin', cascade="all, delete")
    members: Mapped[list["User"]] = relationship(back_populates="workspaces", lazy='selectin', cascade="all, delete", secondary=workspace_members)


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(String(1000), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)
    workspace_id: Mapped[int] = mapped_column(ForeignKey("workspaces.id", ondelete="CASCADE"))
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="messages")
    workspace: Mapped["Workspace"] = relationship(back_populates="messages")