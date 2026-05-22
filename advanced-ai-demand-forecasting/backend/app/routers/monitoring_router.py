from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.services.monitoring_service import (
    get_activity_logs_service,
    get_forecasting_history_service,
    capture_system_metrics_service,
    get_system_metrics_service
)

router = APIRouter(
    prefix="/monitoring",
    tags=["System Monitoring"]
)


@router.get("/activity-logs")
def get_activity_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_activity_logs_service(db)


@router.get("/forecasting-history")
def get_forecasting_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_forecasting_history_service(db)


@router.post("/capture-metrics")
def capture_system_metrics(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return capture_system_metrics_service(db)


@router.get("/system-metrics")
def get_system_metrics(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_system_metrics_service(db)