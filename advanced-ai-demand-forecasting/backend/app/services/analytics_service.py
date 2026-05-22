from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.dataset import Dataset
from app.models.forecast import Forecast
from app.utils.cache import get_cache, set_cache
from app.utils.cache import get_cache, set_cache, clear_cache

def get_dashboard_summary_service(db: Session):
    cache_key = "dashboard_summary"

    cached_data = get_cache(cache_key)
    if cached_data:
        return cached_data

    total_datasets = db.query(Dataset).count()
    total_forecasts = db.query(Forecast).count()

    total_sales = db.query(func.sum(Dataset.total_sales)).scalar() or 0
    total_revenue = db.query(func.sum(Dataset.total_revenue)).scalar() or 0
    average_accuracy = db.query(func.avg(Forecast.accuracy_score)).scalar() or 0

    data = {
        "total_datasets": total_datasets,
        "total_forecasts": total_forecasts,
        "total_sales": round(total_sales, 2),
        "total_revenue": round(total_revenue, 2),
        "average_accuracy": round(average_accuracy, 2)
    }

    set_cache(cache_key, data, ttl=30)

    return data

def get_region_analytics_service(db: Session):
    results = (
        db.query(
            Dataset.region.label("name"),
            func.sum(Dataset.total_sales).label("total_sales"),
            func.sum(Dataset.total_revenue).label("total_revenue"),
            func.count(Forecast.id).label("forecast_count")
        )
        .outerjoin(Forecast, Dataset.id == Forecast.dataset_id)
        .group_by(Dataset.region)
        .all()
    )

    return [
        {
            "name": row.name or "Unknown",
            "total_sales": round(row.total_sales or 0, 2),
            "total_revenue": round(row.total_revenue or 0, 2),
            "forecast_count": row.forecast_count
        }
        for row in results
    ]


def get_category_analytics_service(db: Session):
    results = (
        db.query(
            Dataset.product_category.label("name"),
            func.sum(Dataset.total_sales).label("total_sales"),
            func.sum(Dataset.total_revenue).label("total_revenue"),
            func.count(Forecast.id).label("forecast_count")
        )
        .outerjoin(Forecast, Dataset.id == Forecast.dataset_id)
        .group_by(Dataset.product_category)
        .all()
    )

    return [
        {
            "name": row.name or "Unknown",
            "total_sales": round(row.total_sales or 0, 2),
            "total_revenue": round(row.total_revenue or 0, 2),
            "forecast_count": row.forecast_count
        }
        for row in results
    ]


def get_revenue_prediction_service(db: Session):
    latest_forecasts = (
        db.query(Forecast)
        .order_by(Forecast.created_at.desc())
        .limit(10)
        .all()
    )

    return [
        {
            "forecast_id": forecast.id,
            "predicted_revenue": forecast.predicted_revenue,
            "predicted_demand": forecast.predicted_demand,
            "accuracy_score": forecast.accuracy_score
        }
        for forecast in latest_forecasts
    ]


def get_inventory_risk_service(db: Session):
    results = (
        db.query(
            Forecast.inventory_risk.label("risk_type"),
            func.count(Forecast.id).label("count")
        )
        .group_by(Forecast.inventory_risk)
        .all()
    )

    return [
        {
            "risk_type": row.risk_type or "Unknown",
            "count": row.count
        }
        for row in results
    ]