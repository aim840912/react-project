export interface User {
    id: string;
    name: string;
    status: string;
    tel: string;
    business: string;
    email: string;
    creditCode: string;
    industryNum: string;
    organizationCode: string;
    legalPerson: string;
}

export interface UserListResponse {
    list: User[];
    total: number;
}

export interface UserSearchType {
    userName?: string;
    contact?: string;
    tel?: string;
    page: number;
    pageSize: number;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

// 登入成功後 API 回傳的資料結構
export interface LoginResponse {
    token: string;
    btnAuth: string[];
    username: string;
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

