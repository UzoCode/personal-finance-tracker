// client/src/lib/api.ts
import axios from "axios";

const API_URL = "http://localhost:3000"; // update if your backend uses another port
const api = axios.create({
  baseURL: API_URL,
});

// Attach token from localStorage (use same key "authToken")
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
