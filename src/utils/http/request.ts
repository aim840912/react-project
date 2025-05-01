import http from "./http";

export interface ApiResponse<T = unknown> {
    code: number;
    message: string;
    data: T;
}

export function get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    return http.get(url, { params });
}

export function post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    return http.post(url, data);
}
