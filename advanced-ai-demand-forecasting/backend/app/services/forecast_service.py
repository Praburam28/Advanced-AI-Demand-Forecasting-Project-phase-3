import asyncio

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.forecast import Forecast
from app.models.dataset import Dataset

from app.ml.predictor import generate_prediction
from app.services.monitoring_service import create_activity_log
from app.utils.cache import clear_cache
from app.utils.websocket_manager import manager


def create_forecast_service(
    db: Session,
    dataset_id: int,
    model_name: str,
    current_user
):
    dataset = (
        db.query(Dataset)
        .filter(Dataset.id == dataset_id)
        .first()
    )

    if not dataset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dataset not found"
        )

    prediction = generate_prediction(dataset)

    forecast = Forecast(
        dataset_id=dataset.id,
        model_name=model_name,
        predicted_demand=prediction["predicted_demand"],
        predicted_revenue=prediction["predicted_revenue"],
        accuracy_score=prediction["accuracy_score"],
        anomaly_score=prediction["anomaly_score"],
        seasonal_trend=prediction["seasonal_trend"],
        inventory_risk=prediction["inventory_risk"],
        business_insight=prediction["business_insight"],
        created_by=current_user.id
    )

    db.add(forecast)
    db.commit()
    db.refresh(forecast)

    clear_cache("dashboard_summary")

    try:
        asyncio.create_task(
            manager.broadcast({
                "type": "FORECAST_UPDATED",
                "message": "New forecast generated successfully",
                "forecast_id": forecast.id,
                "model_name": forecast.model_name
            })
        )
    except RuntimeError:
        pass

    create_activity_log(
        db=db,
        user_id=current_user.id,
        activity_type="FORECAST_GENERATED",
        description=f"Forecast generated using {model_name}",
        endpoint="/forecasts/generate"
    )

    return forecast


def get_forecasts_service(
    db: Session,
    search: str | None = None
):
    query = db.query(Forecast)

    if search:
        query = query.filter(
            Forecast.model_name.like(f"%{search}%")
        )

    return (
        query
        .order_by(Forecast.created_at.desc())
        .all()
    )


def get_forecast_by_id_service(
    db: Session,
    forecast_id: int
):
    forecast = (
        db.query(Forecast)
        .filter(Forecast.id == forecast_id)
        .first()
    )

    if not forecast:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Forecast not found"
        )

    return forecast