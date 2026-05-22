from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.database import Base


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    activity_type = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    endpoint = Column(String(255), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())