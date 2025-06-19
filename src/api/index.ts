import { createHttpInstance } from '../shared/http/http';
import { store } from '../app/store'; // 匯入您的 Redux store

// 1. 定義如何從您的 Redux store 中獲取 token
const getTokenFromStore = (): string | null => {
    return store.getState().authSlice.token;
};

// 2. 呼叫工廠函式，將「獲取 token 的方法」傳入，產生一個配置好的實例
const http = createHttpInstance(getTokenFromStore);

// 3. 為了方便，我們可以在這裡重新匯出 get 和 post
export function get<T = any>(url: string, params?: any): Promise<T> {
    return http.get(url, { params });
}

export function post<T = any>(url: string, data?: any): Promise<T> {
    return http.post(url, data);
}

// 4. 將預設匯出的 http 實例也匯出，以防萬一
export default http;