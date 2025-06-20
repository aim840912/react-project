import { createHttpInstance } from '../shared/http/http';

const getTokenFromStore = (): string | null => {
    // 實務上要處理 store 還沒初始化完成的狀況，但這裡我們先簡化
    // return store.getState().authSlice.token;
    return sessionStorage.getItem("token");
};

const http = createHttpInstance(getTokenFromStore);

export function get<T, P = Record<string, any>>(url: string, params?: P): Promise<T> {
    return http.get<T>(url, { params }) as Promise<T>;
}

export function post<T, D>(url: string, data?: D): Promise<T> {
    return http.post<T>(url, data) as Promise<T>;
}


export default http;