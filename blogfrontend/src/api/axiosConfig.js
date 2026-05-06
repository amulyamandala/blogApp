import axios from "axios";

const API_URL = "https://blogapp-xgks.onrender.com";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default apiClient;
