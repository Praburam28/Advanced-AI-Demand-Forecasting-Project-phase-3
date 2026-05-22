def detect_anomaly(total_sales: float):
    if total_sales <= 0:
        return 90.0

    if total_sales < 100:
        return 75.0

    if total_sales > 10000:
        return 65.0

    return 15.0