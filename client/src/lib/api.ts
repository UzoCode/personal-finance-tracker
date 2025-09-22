// client/src/lib/api.ts
import axios from "axios";

const API_URL = "http://localhost:3000"; // NestJS backend base URL

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token automatically to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
