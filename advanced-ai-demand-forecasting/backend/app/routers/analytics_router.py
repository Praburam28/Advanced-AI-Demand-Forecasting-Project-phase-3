from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.services.analytics_service import (
    get_dashboard_summary_service,
    get_region_analytics_service,
    get_category_analytics_service,
    get_revenue_prediction_service,
    get_inventory_risk_service
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/dashboard-summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_dashboard_summary_service(db)


@router.get("/region-wise")
def region_wise_analytics(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_region_analytics_service(db)


@router.get("/category-wise")
def category_wise_analytics(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_category_analytics_service(db)


@router.get("/revenue-prediction")
def revenue_prediction(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_revenue_prediction_service(db)


@router.get("/inventory-risk")
def inventory_risk(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_inventory_risk_service(db)

@router.get("/live-dashboard")
def live_dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return {
        "summary": get_dashboard_summary_service(db),
        "region_analytics": get_region_analytics_service(db),
        "category_analytics": get_category_analytics_service(db),
        "revenue_prediction": get_revenue_prediction_service(db),
        "inventory_risk": get_inventory_risk_service(db),
        "refresh_interval_seconds": 30
    }