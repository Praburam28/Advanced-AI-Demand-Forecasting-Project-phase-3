from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.ai_service import (
    retrain_model_service,
    compare_models_service
)
from app.utils.permissions import require_roles


router = APIRouter(
    prefix="/ai",
    tags=["AI Optimization"]
)


@router.post("/retrain")
def retrain_model_api(
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst"]))
):
    return retrain_model_service(db, current_user)


@router.get("/compare-models")
def compare_models_api(
    dataset_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst", "Viewer"]))
):
    return compare_models_service(db, dataset_id)