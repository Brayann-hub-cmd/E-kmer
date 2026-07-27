import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api/`;

const api = axios.create({
    baseURL,
})

api.interceptors.request.use((configs) => {
    const token = localStorage.getItem('token')
    if (token) {
        configs.headers['Authorization'] = `Bearer ${token}`
    }
    return configs
})

export default api