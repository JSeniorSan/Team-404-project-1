from fastapi import Depends
from fastapi_users.db import SQLAlchemyUserDatabase
from src.auth.models import AccessToken, User
from src.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyAccessTokenDatabase
from fastapi_users.authentication.strategy.db import AccessTokenDatabase, DatabaseStrategy



async def get_user_db(db_session: AsyncSession = Depends(get_db)):
    yield SQLAlchemyUserDatabase(session=db_session, user_table=User)


async def get_access_token_db(db_session: AsyncSession = Depends(get_db),):  
    yield SQLAlchemyAccessTokenDatabase(session=db_session, access_token_table=AccessToken)


def get_database_strategy(access_token_db: AccessTokenDatabase[AccessToken] = Depends(get_access_token_db)) -> DatabaseStrategy:
    return DatabaseStrategy(database=access_token_db, lifetime_seconds=43200) # 12 hours
