import API from "./api";

export const getLiveDashboard = () => {
  return API.get("/analytics/live-dashboard");
};

export const getDashboardSummary = () => {
  return API.get("/analytics/dashboard-summary");
};

export const getRegionAnalytics = () => {
  return API.get("/analytics/region-wise");
};

export const getCategoryAnalytics = () => {
  return API.get("/analytics/category-wise");
};

export const getRevenuePrediction = () => {
  return API.get("/analytics/revenue-prediction");
};

export const getInventoryRisk = () => {
  return API.get("/analytics/inventory-risk");
};