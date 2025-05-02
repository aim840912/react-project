import { post } from "../utils/http/http";
import type { ApiResponse, UserItem } from "../types/api";

export default function editUser(data: Partial<UserItem>): Promise<ApiResponse<string>> {
    return post("/api/editUser", data);
}