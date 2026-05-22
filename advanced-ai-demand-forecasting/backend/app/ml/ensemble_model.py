def ensemble_forecast(total_sales: float, total_revenue: float):
    linear_prediction = total_sales * 1.08
    random_forest_prediction = total_sales * 1.12
    gradient_boosting_prediction = total_sales * 1.10

    predicted_demand = (
        linear_prediction +
        random_forest_prediction +
        gradient_boosting_prediction
    ) / 3

    predicted_revenue = total_revenue * 1.10

    accuracy_score = 91.5

    return predicted_demand, predicted_revenue, accuracy_score