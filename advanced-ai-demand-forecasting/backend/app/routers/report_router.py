from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.report_schema import ReportCreateRequest, ReportResponse
from app.services.report_service import (
    generate_report_service,
    get_reports_service
)
from app.models.report import Report
from app.utils.permissions import require_roles


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.post("/generate", response_model=ReportResponse)
def generate_report(
    data: ReportCreateRequest,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst"]))
):
    return generate_report_service(
        db=db,
        data=data,
        current_user=current_user
    )


@router.get("/", response_model=list[ReportResponse])
def get_reports(
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst", "Viewer"]))
):
    return get_reports_service(db)


@router.get("/download/{report_id}")
def download_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(["Super Admin", "Analyst", "Viewer"]))
):
    report = db.query(Report).filter(Report.id == report_id).first()

    if not report or not report.file_path:
        return {
            "message": "Report file not found"
        }

    return FileResponse(
        path=report.file_path,
        filename=report.file_path.split("/")[-1],
        media_type="application/octet-stream"
    )