import { post } from ".";

export interface BillSearchType {
    startDate: string;
    endDate: string;
    no: string;
    status: string;
    page: number;
    pageSize: number
}

export function getBillList(data: BillSearchType) {
    return post("/api/billList", data)
}
