// lib/api.ts
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://localhost:7215/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔑 Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // Ensure config.headers exists before setting Authorization
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Response interceptor to catch unauthorized/expired tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Remove unused variable
    if (error.response) {
      const status = error.response.status;

      // 🔒 Token expired or invalid
      if (status === 401 || status === 403) {
        if (typeof window !== "undefined") {
          console.warn("🔒 Token expired or invalid, redirecting to /accessRequired...");

          try {
            // Clear all sensitive data
            localStorage.removeItem("token");
            localStorage.removeItem("roleID"); 
            localStorage.removeItem("employeeName");
            localStorage.removeItem("roleName");
            localStorage.removeItem("expiration");
            localStorage.removeItem("userId");

            // Prevent infinite redirect loop
            if (!window.location.pathname.includes("/accessRequired")) {
              window.location.href = "/accessRequired";
            }
          } catch (e) {
            console.error("Error clearing localStorage:", e);
          }
        }
      }
    } else {
      console.error("Network or server error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
