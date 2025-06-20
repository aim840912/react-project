// index.ts (修正後)

import { createHttpInstance } from '../shared/http/http';
import { store } from '../app/store';
// 假設您的 http instance 是基於 axios，所以我們可以用它的型別
import { AxiosRequestConfig, AxiosResponse } from 'axios';

// (這部分維持不變)
const getTokenFromStore = (): string | null => {
    // 實務上要處理 store 還沒初始化完成的狀況，但這裡我們先簡化
    return store.getState().authSlice.token;
};
const http = createHttpInstance(getTokenFromStore);


/**
 * 重新封裝的 GET 請求
 * 我們將函式標記為 async，這樣才能使用 await
 */
export async function get<T, P = Record<string, any>>(url: string, params?: P): Promise<T> {
    const config: AxiosRequestConfig = { params };

    // 1. 等待 http.get() 完成，它會回傳一個 Promise<AxiosResponse<T>>
    //    所以 response 的型別是 AxiosResponse<T>
    const response: AxiosResponse<T> = await http.get(url, config);

    // 2. 從回應物件中，只回傳 data 屬性，它的型別就是 T
    return response.data;
}

/**
 * 重新封裝的 POST 請求
 */
export async function post<T, D = unknown>(url: string, data?: D): Promise<T> {
    // 1. 等待 http.post() 完成
    const response: AxiosResponse<T> = await http.post(url, data);

    // 2. 只回傳 data 屬性
    return response.data;
}

// (預設匯出維持不變)
export default http;