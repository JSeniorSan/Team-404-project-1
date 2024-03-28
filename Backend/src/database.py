from typing import AsyncGenerator
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from src.config import settings

if settings.MODE == "PROD":
    settings.DB_HOST = "db"

SQLALCHEMY_DATABASE_URL = settings.DB_URL

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)

Session = async_sessionmaker(autoflush=False, autocommit=False, bind=engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with Session() as session:
        yield session
