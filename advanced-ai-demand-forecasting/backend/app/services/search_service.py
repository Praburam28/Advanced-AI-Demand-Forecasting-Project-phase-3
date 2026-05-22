from sqlalchemy.orm import Session
from app.models.dataset import Dataset
from app.models.forecast import Forecast
from app.models.report import Report
from app.models.user import User


def global_search_service(db: Session, keyword: str):
    datasets = (
        db.query(Dataset)
        .filter(Dataset.name.like(f"%{keyword}%"))
        .all()
    )

    forecasts = (
        db.query(Forecast)
        .filter(Forecast.model_name.like(f"%{keyword}%"))
        .all()
    )

    reports = (
        db.query(Report)
        .filter(Report.title.like(f"%{keyword}%"))
        .all()
    )

    users = (
        db.query(User)
        .filter(User.full_name.like(f"%{keyword}%"))
        .all()
    )

    return {
        "datasets": [
            {
                "id": d.id,
                "name": d.name,
                "region": d.region
            }
            for d in datasets
        ],

        "forecasts": [
            {
                "id": f.id,
                "model_name": f.model_name,
                "predicted_demand": f.predicted_demand
            }
            for f in forecasts
        ],

        "reports": [
            {
                "id": r.id,
                "title": r.title
            }
            for r in reports
        ],

        "users": [
            {
                "id": u.id,
                "full_name": u.full_name,
                "role": u.role
            }
            for u in users
        ]
    }