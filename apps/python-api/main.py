from fastapi import FastAPI
from python_health.health import router as health_router

app = FastAPI()

app.include_router(health_router)
