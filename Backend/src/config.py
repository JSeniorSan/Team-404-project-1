from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    
    DB_USER: str
    DB_PASS: str
    DB_PORT: str
    DB_HOST: str
    DB_NAME: str
    
    MODE: str

    AUTH_SECRET: str

    @property
    def DB_URL(self):
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    @property
    def SYNC_DB_URL(self):
        return f"postgresql+psycopg2://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
