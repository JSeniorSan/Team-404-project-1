import time
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from src.todo.router import router as router_todo
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="ToDo App")
origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin",
                   "Authorization"],
)
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
app.include_router(router_todo)

app.mount("/static", StaticFiles(directory="src/static"), name="static")


