import API from "./api";

export const getDatasets = () => {
  return API.get("/datasets");
};

export const uploadDataset = (formData) => {
  return API.post("/datasets/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};