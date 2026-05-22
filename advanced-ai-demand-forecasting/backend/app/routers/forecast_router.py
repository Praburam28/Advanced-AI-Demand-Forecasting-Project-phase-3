from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.forecast_schema import ForecastCreateRequest, ForecastResponse
from app.services.forecast_service import (
    create_forecast_service,
    get_forecasts_service,
    get_forecast_by_id_service
)
from app.utils.permissions import require_roles


router = APIRouter(
    prefix="/forecasts",
    tags=["Forecasts"]
)


@router.post("/generate", response_model=ForecastResponse)
def generate_forecast(
    data: ForecastCreateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst"]))
):
    return create_forecast_service(
        db=db,
        dataset_id=data.dataset_id,
        model_name=data.model_name,
        current_user=current_user
    )


@router.get("/", response_model=list[ForecastResponse])
def get_forecasts(
    search: str | None = Query(default=None),
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst", "Viewer"]))
):
    return get_forecasts_service(db=db, search=search)


@router.get("/{forecast_id}", response_model=ForecastResponse)
def get_forecast_by_id(
    forecast_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst", "Viewer"]))
):
    return get_forecast_by_id_service(
        db=db,
        forecast_id=forecast_id
    )