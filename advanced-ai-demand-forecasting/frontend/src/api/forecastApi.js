import API from "./api";

export const generateForecast = (data) => {
  return API.post("/forecasts/generate", data);
};

export const getForecasts = () => {
  return API.get("/forecasts");
};

export const compareModels = (datasetId) => {
  return API.get(`/ai/compare-models?dataset_id=${datasetId}`);
};

export const retrainModel = () => {
  return API.post("/ai/retrain");
};