import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import { store } from '@/app/store';
import { logout } from '@/features/user/authSlice';

type GetTokenFunction = () => string | null;

export function createHttpInstance() {
    const http: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE || '',
        timeout: 10000,
    });

    // 請求攔截器
    http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const token = store.getState().authSlice.token;

        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    })

    // 響應攔截器
    http.interceptors.response.use(
        (response: AxiosResponse) => {
            return response.data;
        },
        (error) => {
            if (error.response?.status === 401) {
                message.error('您的登入已過期，請重新登入。');
                store.dispatch(logout());
                window.location.href = '/login';
            } else {
                const msg = error.response?.data?.message || error.message || '請求錯誤';
                message.error(msg);
            }
            return Promise.reject(error);
        }
    );

    return http;

}