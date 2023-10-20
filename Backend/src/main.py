from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from src.todo.router import router as router_todo


app = FastAPI(title="ToDo App")
app.include_router(router_todo)

app.mount("/static", StaticFiles(directory="src/static"), name="static")


