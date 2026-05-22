from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.search_service import global_search_service
from app.models.dataset import Dataset
from app.models.forecast import Forecast
from app.models.report import Report
from app.models.user import User
from app.utils.permissions import require_roles


router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


@router.get("/global")
def global_search(
    keyword: str = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst", "Viewer"]))
):
    return global_search_service(db, keyword)


@router.get("/datasets")
def search_datasets(
    keyword: str = Query(""),
    region: str | None = Query(default=None),
    category: str | None = Query(default=None),
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst", "Viewer"]))
):
    query = db.query(Dataset)

    if keyword:
        query = query.filter(Dataset.name.like(f"%{keyword}%"))

    if region:
        query = query.filter(Dataset.region == region)

    if category:
        query = query.filter(Dataset.product_category == category)

    return query.all()


@router.get("/forecasts")
def search_forecasts(
    keyword: str = Query(""),
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst", "Viewer"]))
):
    query = db.query(Forecast)

    if keyword:
        query = query.filter(Forecast.model_name.like(f"%{keyword}%"))

    return query.all()


@router.get("/reports")
def search_reports(
    keyword: str = Query(""),
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst", "Viewer"]))
):
    query = db.query(Report)

    if keyword:
        query = query.filter(Report.title.like(f"%{keyword}%"))

    return query.all()


@router.get("/users")
def search_users(
    keyword: str = Query(""),
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin"]))
):
    query = db.query(User)

    if keyword:
        query = query.filter(User.full_name.like(f"%{keyword}%"))

    return query.all()