def detect_seasonal_trend(total_sales: float):
    if total_sales >= 10000:
        return "High Seasonal Demand"

    if total_sales >= 5000:
        return "Moderate Seasonal Demand"

    return "Stable Demand"