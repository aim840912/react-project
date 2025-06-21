import { post } from ".";
import { BillDataType } from "../features/finance/types";
import { ApiResponse } from "../features/user/types";

export interface BillSearchType {
    startDate: string;
    endDate: string;
    no: string;
    status: string;
    page: number;
    pageSize: number
}

interface BillListResponse {
    list: BillDataType[];
    total: number;
}

export async function getBillList(data: BillSearchType): Promise<BillListResponse> {
    // 2. 呼叫 post，並告知它預期的完整回應結構
    const response = await post<ApiResponse<BillListResponse>, BillSearchType>(
        "/api/billList",
        data
    );

    // 3. 在此處「拆包」，直接回傳裡面的 data 物件，並處理例外情況，確保總是回傳一個有效的物件
    return response?.data || { list: [], total: 0 };
}