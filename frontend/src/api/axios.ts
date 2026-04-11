import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-job-tracker-kglj.onrender.com", // your backend URL
});

// 🚀 ADD THIS INTERCEPTOR
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;