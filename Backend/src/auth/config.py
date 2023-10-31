from fastapi_users import FastAPIUsers
from fastapi_users.authentication import CookieTransport, AuthenticationBackend
from src.auth.manager import get_user_manager
from src.auth.deps import get_database_strategy
from src.auth.models import User
import uuid


cookie_transport = CookieTransport(cookie_max_age=43200, cookie_samesite='none') # 12 hours 

auth_backend = AuthenticationBackend(
    name="database_cookie",
    transport=cookie_transport,
    get_strategy=get_database_strategy
)


fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)
