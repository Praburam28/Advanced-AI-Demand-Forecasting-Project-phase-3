import os
from sqlalchemy.orm import Session
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import pandas as pd

from app.models.report import Report
from app.models.dataset import Dataset
from app.models.forecast import Forecast
from app.services.monitoring_service import create_activity_log

REPORT_DIR = "uploads/reports"
os.makedirs(REPORT_DIR, exist_ok=True)


def generate_business_summary(db: Session):
    datasets = db.query(Dataset).count()
    forecasts = db.query(Forecast).count()

    latest_forecast = (
        db.query(Forecast)
        .order_by(Forecast.created_at.desc())
        .first()
    )

    if latest_forecast:
        return (
            f"AI analysis completed on {datasets} datasets and {forecasts} forecasts. "
            f"Latest predicted demand is {latest_forecast.predicted_demand}, "
            f"with predicted revenue of {latest_forecast.predicted_revenue}. "
            f"Inventory status: {latest_forecast.inventory_risk}. "
            f"Insight: {latest_forecast.business_insight}"
        )

    return f"AI analysis completed on {datasets} datasets. No forecast data available yet."


def create_pdf_report(title: str, summary: str):
    file_path = os.path.join(REPORT_DIR, f"{title.replace(' ', '_')}.pdf")

    pdf = canvas.Canvas(file_path, pagesize=letter)
    pdf.setTitle(title)

    pdf.drawString(50, 750, title)
    pdf.drawString(50, 720, "Advanced AI Demand Forecasting Report")

    y = 680
    for line in summary.split(". "):
        pdf.drawString(50, y, line[:90])
        y -= 25

    pdf.save()
    return file_path


def create_excel_report(title: str, summary: str):
    file_path = os.path.join(REPORT_DIR, f"{title.replace(' ', '_')}.xlsx")

    df = pd.DataFrame([
        {
            "title": title,
            "summary": summary
        }
    ])

    df.to_excel(file_path, index=False)
    return file_path


def generate_report_service(db: Session, data, current_user):
    summary = generate_business_summary(db)

    if data.report_type.lower() == "excel":
        file_path = create_excel_report(data.title, summary)
    else:
        file_path = create_pdf_report(data.title, summary)

    report = Report(
        title=data.title,
        report_type=data.report_type,
        summary=summary,
        file_path=file_path,
        generated_by=current_user.id
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    create_activity_log(
        db=db,
        user_id=current_user.id,
        activity_type="REPORT_GENERATED",
        description=f"Generated report: {data.title}",
        endpoint="/reports/generate"
    )

    return report


def get_reports_service(db: Session):
    return db.query(Report).order_by(Report.created_at.desc()).all()