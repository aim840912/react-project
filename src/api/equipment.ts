import { post } from "../utils/http/request";
import type { ApiResponse } from "../utils/http/request";

interface SearchData {
    name: string;
    person: string;
    page: number;
    pageSize: number;
}

export function getEquipmentList<T = unknown>(data: SearchData): Promise<ApiResponse<T>> {
    return post<T>("/equipmentList", data);
}
