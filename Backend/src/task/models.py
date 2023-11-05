from datetime import datetime
from sqlalchemy import ForeignKey, String, func, DateTime
from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(40), nullable=False)
    description: Mapped[str | None] = mapped_column(String(150), default=None, nullable=True)
    is_completed: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now(), nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(default=func.now(), onupdate=func.now(), nullable=True)
    panel_id: Mapped[int] = mapped_column(ForeignKey("panels.id"))
    panel: Mapped["Panel"] = relationship(back_populates="tasks")
    