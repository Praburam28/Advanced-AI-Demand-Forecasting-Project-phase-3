import API from "./api";

export const getReports = () => {
  return API.get("/reports");
};

export const generateReport = (data) => {
  return API.post("/reports/generate", data);
};