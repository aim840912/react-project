import { post } from ".";
import type { EquipmentDataType, SearchType } from "../features/equipment/types";
import type { ApiResponse } from "../features/user/types";
interface EquipmentListResponse {
    list: EquipmentDataType[];
    total: number;
}

export async function getEquipmentList(data: SearchType): Promise<EquipmentListResponse> {
    const response = await post<ApiResponse<EquipmentListResponse>, SearchType>("/api/equipmentList", data);

    return response?.data || { list: [], total: 0 };
}