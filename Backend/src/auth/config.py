from fastapi_users.authentication import CookieTransport, AuthenticationBackend
from src.auth.deps import get_database_strategy

cookie_transport = CookieTransport(cookie_max_age=43200) # 12 hours 

auth_backend = AuthenticationBackend(
    name="database_cockie",
    transport=cookie_transport,
    get_strategy=get_database_strategy
)

# TODO: user_manager