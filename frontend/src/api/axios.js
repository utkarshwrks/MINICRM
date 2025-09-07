import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend ka base URL
});

// har request ke sath token bhejne ke liye interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
