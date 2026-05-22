from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(150), nullable=False)
    report_type = Column(String(100), nullable=False)

    summary = Column(Text, nullable=True)
    file_path = Column(String(255), nullable=True)

    generated_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())