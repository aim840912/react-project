import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import { store } from "../../store"

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || '',
    timeout: 10000,
});

// 請求攔截器
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { token } = store.getState().authSlice

    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
},
    (error) => {
        message.error(error.message || "請求錯誤");
    }
)

// 響應攔截器
http.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error) => {
        const msg = error.response?.data?.message || error.message || '請求錯誤';
        message.error(msg);
        return Promise.reject(error);
    }
);

export function get<T = any>(url: string, params?: any): Promise<T> {
    return http.get(url, { params });
}

export function post<T = any>(url: string, data?: any): Promise<T> {
    return http.post(url, data);
}

export default http;