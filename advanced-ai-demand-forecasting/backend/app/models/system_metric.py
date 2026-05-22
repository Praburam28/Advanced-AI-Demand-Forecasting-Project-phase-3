from sqlalchemy import Column, Integer, Float, DateTime
from sqlalchemy.sql import func
from app.database import Base


class SystemMetric(Base):
    __tablename__ = "system_metrics"

    id = Column(Integer, primary_key=True, index=True)

    cpu_usage = Column(Float, default=0)
    memory_usage = Column(Float, default=0)
    api_response_time = Column(Float, default=0)
    active_users = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())