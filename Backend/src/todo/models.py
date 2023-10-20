from datetime import date
from sqlalchemy import String
from src.database import Base
from sqlalchemy.orm import Mapped, mapped_column


class ToDo(Base):
    __tablename__ = "todos"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(40), nullable=False)
    description: Mapped[str | None] = mapped_column(String(150), default=None, nullable=True)
    status: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[date] = mapped_column(default=date.today().strftime('%Y.%m.%d'))
