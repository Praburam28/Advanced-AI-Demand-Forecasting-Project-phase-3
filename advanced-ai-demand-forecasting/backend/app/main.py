from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine


from app.models import (
    user,
    dataset,
    forecast,
    report,
    activity_log,
    system_metric
)

from app.routers import (
    auth_router,
    dataset_router,
    forecast_router,
    analytics_router,
    report_router,
    monitoring_router,
    user_router,
    search_router,
    ai_router,
    websocket_router
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Advanced AI Demand Forecasting API",
    description="Enterprise-level AI Demand Forecasting System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(dataset_router.router)
app.include_router(forecast_router.router)
app.include_router(analytics_router.router)
app.include_router(report_router.router)
app.include_router(monitoring_router.router)
app.include_router(user_router.router)
app.include_router(search_router.router)
app.include_router(ai_router.router)
app.include_router(websocket_router.router)


@app.get("/")
def home():
    return {
        "message": "Advanced AI Demand Forecasting API is running",
        "status": "success"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected"
    }