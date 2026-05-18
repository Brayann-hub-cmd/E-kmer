import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL;
const apiUrl = rawApiUrl ? rawApiUrl.replace(/\/$/, "") : "http://127.0.0.1:8000";
const api = axios.create({
    baseURL: `${apiUrl}/api/`,
});

console.log("[api] baseURL:", api.defaults.baseURL);

api.interceptors.request.use((configs) => {
    const token = localStorage.getItem('token');
    if (token) {
        configs.headers['Authorization'] = `Bearer ${token}`;
    }
    return configs;
});

export default api