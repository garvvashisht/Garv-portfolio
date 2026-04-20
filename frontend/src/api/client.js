import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export const submitContact = (payload) => api.post("/contact", payload).then((r) => r.data);

export const cvDownloadUrl = (format = "pdf") => `${API_BASE}/cv?format=${format}`;

export default api;
