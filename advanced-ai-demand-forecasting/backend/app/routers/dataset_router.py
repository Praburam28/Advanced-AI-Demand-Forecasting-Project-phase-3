from fastapi import APIRouter, Depends, UploadFile, File, Form, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.schemas.dataset_schema import DatasetResponse
from app.services.dataset_service import (
    upload_dataset_service,
    get_datasets_service
)
from app.utils.permissions import require_roles


router = APIRouter(
    prefix="/datasets",
    tags=["Datasets"]
)


@router.post("/upload", response_model=DatasetResponse)
async def upload_dataset(
    name: str = Form(...),
    product_category: str = Form(...),
    region: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst"]))
):
    return await upload_dataset_service(
        db=db,
        file=file,
        name=name,
        product_category=product_category,
        region=region,
        current_user=current_user
    )


@router.get("/")
def get_datasets(
    search: str | None = Query(default=None),
    region: str | None = Query(default=None),
    category: str | None = Query(default=None),
    page: int = Query(default=1),
    limit: int = Query(default=10),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_datasets_service(
        db=db,
        search=search,
        region=region,
        category=category,
        page=page,
        limit=limit
    )