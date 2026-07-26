import axios from "axios";
import { safeReadStorage } from './utils/storage';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api/',
});

api.interceptors.request.use((configs) => {
    const token = safeReadStorage('token');
    if (token) {
        configs.headers = {
            ...configs.headers,
            Authorization: `Bearer ${token}`
        };
    }
    return configs;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem('token');
            }
        }
        return Promise.reject(error);
    }
);

export default api