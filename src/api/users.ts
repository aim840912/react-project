import { post, get } from "../utils/http/request";
import type { ApiResponse } from "../utils/http/request"; // 若未定義，請引入定義
interface LoginData {
    username: string,
    password: string
}

interface AccountData {
    accountName: string
}
export function login<T = unknown>(data: LoginData): Promise<ApiResponse<T>> {
    return post<T>("/login", data);
}

export function getMenu<T = unknown>() {
    return get<T>("/menu");
}

export function getAccountList<T = unknown>(data: AccountData): Promise<ApiResponse<T>> {
    return post<T>("/accountList", data);
}
