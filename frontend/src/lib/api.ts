// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7215/api",
});

// 🔑 Add interceptor for JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // token storage key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
