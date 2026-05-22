import os
import shutil
import asyncio

import pandas as pd

from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session

from app.models.dataset import Dataset
from app.services.monitoring_service import create_activity_log
from app.utils.cache import clear_cache
from app.utils.websocket_manager import manager


UPLOAD_DIR = "uploads/datasets"

os.makedirs(UPLOAD_DIR, exist_ok=True)

async def upload_dataset_service(
    db: Session,
    file: UploadFile,
    name: str,
    product_category: str,
    region: str,
    current_user
):
    file_extension = file.filename.split(".")[-1].lower()

    if file_extension not in ["csv", "xlsx"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only CSV and XLSX files are allowed"
        )

    safe_file_name = file.filename.replace(" ", "_")

    file_path = os.path.join(
        UPLOAD_DIR,
        safe_file_name
    )

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        if file_extension == "csv":
            df = pd.read_csv(file_path)
        else:
            df = pd.read_excel(file_path)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unable to read dataset file: {str(e)}"
        )

    required_columns = ["sales", "revenue"]

    missing_columns = [
        column for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Missing required columns: {', '.join(missing_columns)}"
        )

    total_records = len(df)
    total_sales = float(df["sales"].fillna(0).sum())
    total_revenue = float(df["revenue"].fillna(0).sum())

    dataset = Dataset(
        name=name,
        product_category=product_category,
        region=region,
        file_name=safe_file_name,
        total_records=total_records,
        total_sales=total_sales,
        total_revenue=total_revenue,
        uploaded_by=current_user.id
    )

    db.add(dataset)
    db.commit()
    db.refresh(dataset)

    clear_cache("dashboard_summary")

    await manager.broadcast({
    "type": "DATASET_UPLOADED",
    "message": "New dataset uploaded successfully",
    "dataset_id": dataset.id,
    "dataset_name": dataset.name
})

    create_activity_log(
        db=db,
        user_id=current_user.id,
        activity_type="DATASET_UPLOAD",
        description=f"Uploaded dataset: {name}",
        endpoint="/datasets/upload"
    )

    return dataset


def get_datasets_service(
    db: Session,
    search: str | None = None,
    region: str | None = None,
    category: str | None = None,
    page: int = 1,
    limit: int = 10
):
    query = db.query(Dataset)

    if search:
        query = query.filter(
            Dataset.name.like(f"%{search}%")
        )

    if region:
        query = query.filter(
            Dataset.region == region
        )

    if category:
        query = query.filter(
            Dataset.product_category == category
        )

    total = query.count()

    datasets = (
        query
        .order_by(Dataset.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": datasets
    }