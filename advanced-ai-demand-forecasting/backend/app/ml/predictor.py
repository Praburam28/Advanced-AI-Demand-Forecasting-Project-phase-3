from app.ml.ensemble_model import ensemble_forecast
from app.ml.anomaly_detector import detect_anomaly
from app.ml.seasonal_detector import detect_seasonal_trend

def generate_prediction(dataset):
    predicted_demand, predicted_revenue, accuracy_score = ensemble_forecast(
        dataset.total_sales,
        dataset.total_revenue
    )

    anomaly_score = detect_anomaly(dataset.total_sales)
    seasonal_trend = detect_seasonal_trend(dataset.total_sales)

    if predicted_demand > dataset.total_sales * 1.2:
        inventory_risk = "High Stock Requirement"
    elif predicted_demand < dataset.total_sales * 0.8:
        inventory_risk = "Overstock Risk"
    else:
        inventory_risk = "Balanced Inventory"

    business_insight = (
        f"Forecast indicates {seasonal_trend.lower()} for "
        f"{dataset.product_category} in {dataset.region}. "
        f"Recommended inventory status: {inventory_risk}."
    )

    return {
        "predicted_demand": round(predicted_demand, 2),
        "predicted_revenue": round(predicted_revenue, 2),
        "accuracy_score": accuracy_score,
        "anomaly_score": anomaly_score,
        "seasonal_trend": seasonal_trend,
        "inventory_risk": inventory_risk,
        "business_insight": business_insight
    }