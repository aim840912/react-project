import { post } from "../src/utils/http/http";
import type { ApiResponse, UserItem } from "../src/types/api";

export default function editUser(data: Partial<UserItem>): Promise<ApiResponse<string>> {
    return post("/api/editUser", data);
}