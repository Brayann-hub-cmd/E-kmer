import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + 'api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((configs) => {
    const token = localStorage.getItem('token')
    if (token) {
        configs.headers['Authorization'] = token
    }
    return configs
})

export default api