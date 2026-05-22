from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Forecast(Base):
    __tablename__ = "forecasts"

    id = Column(Integer, primary_key=True, index=True)

    dataset_id = Column(Integer, ForeignKey("datasets.id"))
    model_name = Column(String(100), nullable=False)

    predicted_demand = Column(Float, default=0)
    predicted_revenue = Column(Float, default=0)

    accuracy_score = Column(Float, default=0)
    anomaly_score = Column(Float, default=0)

    seasonal_trend = Column(String(100), nullable=True)
    inventory_risk = Column(String(100), nullable=True)

    business_insight = Column(Text, nullable=True)

    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    dataset = relationship("Dataset", back_populates="forecasts")