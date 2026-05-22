from pydantic import BaseModel
from datetime import datetime


class ReportCreateRequest(BaseModel):
    title: str
    report_type: str = "Analytics Summary"


class ReportResponse(BaseModel):
    id: int
    title: str
    report_type: str
    summary: str | None
    file_path: str | None
    created_at: datetime

    class Config:
        from_attributes = True