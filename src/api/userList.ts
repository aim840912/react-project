import { post } from "../utils/http/request";
import type { DataType } from "../page/users/interface";

interface searchType {
    page: number;
    pageSize: number;
    companyName?: string;
    contact?: string;
    tel?: string;
}

interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

export function getUserList<T = unknown>(data: searchType): Promise<ApiResponse<T>> {
    return post<T>("/userList", data);
}


// 刪除客戶
export function deleteUser(id: string) {
    return post("/deleteUser", { id })
}

// 批量刪除客戶
export function batchDeleteUser(ids: React.Key[]) {
    return post("/batchDeleteUser", { ids })
}

// 編輯/新增 企業接口
export function editUser(data: DataType) {
    return post("/editUser", data)
}
