import { post, get } from "../utils/http/http";

import type {
    LoginRequest,
    AccountData,
    LoginResponse,
    MenuResponse,
    UserListResponse,
    ApiResponse,
    DataType,
    searchType,
    SearchData,
    SearchData2,
} from "../types/api";

export function login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return post("/api/login", data);
}

export function getMenu() {
    return get("/api/menu");
}

export function getAccountList(data: AccountData): Promise<ApiResponse<UserListResponse>> {
    return post("/api/accountList", data);
}

export function getUserList(params: Record<string, any>): Promise<ApiResponse<UserListResponse>> {
    return post("/api/userList", params);
}

export function deleteUser(id: string) {
    return post("/api/deleteUser", { id })
}

//批量删除客户
export function batchDeleteUser(ids: React.Key[]) {
    return post("/api/batchDeleteUser", { ids })
}

//編輯/新增 企業接口
export function editUser(data: DataType) {
    return post("/editUser", data)
}


export function getContractList(data: SearchData) {
    return post("/contractList", data)
}


export function getBillList(data: SearchData2) {
    return post("/billList", data)
}
