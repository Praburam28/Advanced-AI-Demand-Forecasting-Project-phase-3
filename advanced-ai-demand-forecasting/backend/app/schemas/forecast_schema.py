from pydantic import BaseModel
from datetime import datetime


class ForecastCreateRequest(BaseModel):
    dataset_id: int
    model_name: str = "Ensemble Model"


class ForecastResponse(BaseModel):
    id: int
    dataset_id: int
    model_name: str
    predicted_demand: float
    predicted_revenue: float
    accuracy_score: float
    anomaly_score: float
    seasonal_trend: str | None
    inventory_risk: str | None
    business_insight: str | None
    created_at: datetime

    class Config:
        from_attributes = True