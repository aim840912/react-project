import { createHttpInstance } from '../shared/http/http';

const getTokenFromStore = (): string | null => {
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