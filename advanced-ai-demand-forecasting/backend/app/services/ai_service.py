from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.dataset import Dataset
from app.models.forecast import Forecast
from app.ml.model_trainer import retrain_model, compare_models
from app.services.monitoring_service import create_activity_log


def retrain_model_service(db: Session, current_user):
    dataset_count = db.query(Dataset).count()
    forecast_count = db.query(Forecast).count()

    result = retrain_model(
        dataset_count=dataset_count,
        forecast_count=forecast_count
    )

    create_activity_log(
        db=db,
        user_id=current_user.id,
        activity_type="MODEL_RETRAINED",
        description="Automated model retraining completed",
        endpoint="/ai/retrain"
    )

    return result


def compare_models_service(db: Session, dataset_id: int):
    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()

    if not dataset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dataset not found"
        )

    return {
        "dataset_id": dataset.id,
        "dataset_name": dataset.name,
        "comparison": compare_models(dataset.total_sales)
    }