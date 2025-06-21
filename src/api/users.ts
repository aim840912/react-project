import { post, get } from ".";
import { MenuType } from "../features/settings/types";
import { ApiResponse, LoginCredentials, LoginResponse, UserListResponse } from "../features/user/types";

export function login(data: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    return post<ApiResponse<LoginResponse>, LoginCredentials>("/api/login", data);
}

export async function getMenu(): Promise<MenuType[]> {
    const response = await get<ApiResponse<MenuType[]>>("/api/menu");
    return response.data || [];
}

export async function getUserList(data: UserSearchType): Promise<UserListResponse> {
    const response = await post<ApiResponse<UserListResponse>, UserSearchType>("/api/userList", data);
    return response?.data || { list: [], total: 0 };
}

export async function deleteUser(id: string): Promise<void> {
    await post<ApiResponse<null>, { id: string }>("/api/deleteUser", { id });
}

export async function batchDeleteUser(ids: React.Key[]) {
    await post<ApiResponse<null>, { ids: React.Key[] }>("/api/batchDeleteUser", { ids });
}

interface UserSearchType {
    page: number;
    pageSize: number;
    userName?: string;
    contact?: string;
    tel?: string;
}

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


