import { post } from "../utils/http/request";
import type { ApiResponse } from "../utils/http/request";


interface SearchData {
    contractNo: string;
    person: string;
    tel: string;
    page: number;
    pageSize: number
}
interface SearchData2 {
    page: number;
    pageSize: number;
    no: string;
    status: string;
    startDate: string;
    endDate: string;
}

export function getContractList<T = unknown>(data: SearchData): Promise<ApiResponse<T>> {
    return post<T>("/contractList", data);
}


export function getBillList<T = unknown>(data: SearchData2): Promise<ApiResponse<T>> {
    return post("/billList", data)
}
