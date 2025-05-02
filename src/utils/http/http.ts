import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import { store } from "../../store"

const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE || '',
    timeout: 5000,
};

const http: AxiosInstance = axios.create(config);

// 請求攔截器
http.interceptors.request.use((config) => {
    const { token } = store.getState().authSlice

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
});

// 響應攔截器
http.interceptors.response.use((response: AxiosResponse) => {
    // 直接回傳資料，不檢查 code
    return response.data;
}, (error) => {
    message.error(error.message || "請求錯誤");
    return Promise.reject(error);
});

// 封裝 get/post 方法
export function get(url: string, params?: any) {
    return http.get(url, { params });
}

export function post(url: string, data?: any,) {
    return http.post(url, data);
}


export default http;