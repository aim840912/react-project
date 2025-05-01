import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import { store } from "../../store"

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 5000,
})

// 請求攔截器
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { token } = store.getState().authSlice

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
});

// 響應攔截器
http.interceptors.response.use((response: AxiosResponse) => {
    const res = response.data;
    if (res.code !== 200) {
        message.error(res.code + " : " + res.message);
        return Promise.reject(new Error(res.message))
    }
    return response.data;
});

export default http;