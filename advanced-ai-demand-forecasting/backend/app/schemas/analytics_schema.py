from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_datasets: int
    total_forecasts: int
    total_sales: float
    total_revenue: float
    average_accuracy: float


class AnalyticsItem(BaseModel):
    name: str
    total_sales: float
    total_revenue: float
    forecast_count: int


class InventoryRiskItem(BaseModel):
    risk_type: str
    count: int