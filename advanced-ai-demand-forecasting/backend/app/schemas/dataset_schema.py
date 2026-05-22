from pydantic import BaseModel
from datetime import datetime


class DatasetResponse(BaseModel):
    id: int
    name: str
    file_name: str | None
    product_category: str | None
    region: str | None
    total_records: int
    total_sales: float
    total_revenue: float
    created_at: datetime

    class Config:
        from_attributes = True