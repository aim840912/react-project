import { post } from "../utils/http/request";
import type { ApiResponse } from "../utils/http/request";

export function getRoomList<T = unknown>(roomid: string): Promise<ApiResponse<T>> {
    return post<T>("/roomList", { roomid });
}
