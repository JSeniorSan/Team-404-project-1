from typing import AsyncGenerator
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from src.config import settings


SQLALCHEMY_DATABASE_URL = settings.DB_URL
SYNC_SQLALCHEMY_DATABASE_URL = settings.SYNC_DB_URL

engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=True)
test_engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=False)
sync_engine = create_engine(SYNC_SQLALCHEMY_DATABASE_URL, echo=False)

Session = async_sessionmaker(autoflush=False, autocommit=False, bind=engine, expire_on_commit=False)
TestSession = async_sessionmaker(autoflush=False, autocommit=False, bind=test_engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with Session() as session:
        yield session
