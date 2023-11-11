from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.auth.config import auth_backend, fastapi_users
from src.auth.schemas import UserRead, UserCreate, UserUpdate
from src.workspace.router import router as router_workspace
from src.panel.router import router as router_panel
from src.kanban.router import router as router_kanban
from src.task.router import router as router_task


app = FastAPI(title="Kanban App")


app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

app.include_router(router_workspace)
app.include_router(router_panel)
app.include_router(router_task)
app.include_router(router_kanban)


origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)

