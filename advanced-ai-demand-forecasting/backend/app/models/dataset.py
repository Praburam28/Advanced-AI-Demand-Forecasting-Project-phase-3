from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    file_name = Column(String(255), nullable=True)

    product_category = Column(String(100), index=True)
    region = Column(String(100), index=True)

    total_records = Column(Integer, default=0)
    total_sales = Column(Float, default=0)
    total_revenue = Column(Float, default=0)

    uploaded_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    forecasts = relationship("Forecast", back_populates="dataset")