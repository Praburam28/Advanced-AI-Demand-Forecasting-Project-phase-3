import time
import psutil
from sqlalchemy.orm import Session

from app.models.activity_log import ActivityLog
from app.models.system_metric import SystemMetric
from app.models.forecast import Forecast


def create_activity_log(
    db: Session,
    user_id: int | None,
    activity_type: str,
    description: str,
    endpoint: str | None = None
):
    log = ActivityLog(
        user_id=user_id,
        activity_type=activity_type,
        description=description,
        endpoint=endpoint
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return log


def get_activity_logs_service(db: Session):
    return (
        db.query(ActivityLog)
        .order_by(ActivityLog.created_at.desc())
        .limit(100)
        .all()
    )


def get_forecasting_history_service(db: Session):
    return (
        db.query(Forecast)
        .order_by(Forecast.created_at.desc())
        .limit(100)
        .all()
    )


def capture_system_metrics_service(db: Session):
    start_time = time.time()

    cpu_usage = psutil.cpu_percent(interval=0.5)
    memory_usage = psutil.virtual_memory().percent

    api_response_time = round((time.time() - start_time) * 1000, 2)

    metric = SystemMetric(
        cpu_usage=cpu_usage,
        memory_usage=memory_usage,
        api_response_time=api_response_time,
        active_users=1
    )

    db.add(metric)
    db.commit()
    db.refresh(metric)

    return metric


def get_system_metrics_service(db: Session):
    return (
        db.query(SystemMetric)
        .order_by(SystemMetric.created_at.desc())
        .limit(50)
        .all()
    )