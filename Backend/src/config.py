from dotenv import load_dotenv
import os

from fastapi.templating import Jinja2Templates

load_dotenv()

DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")
DB_PORT = os.environ.get("DB_PORT")
DB_HOST = os.environ.get("DB_HOST")
DB_NAME = os.environ.get("DB_NAME")

templates = Jinja2Templates(directory="templates")
