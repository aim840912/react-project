export interface BillDataType {
    key?: string;
    accountNo: string;
    status?: string;
    roomNo?: string;
    carNo?: string;
    tel?: string;
    costName1?: string;
    costName2?: string;
    costName3?: string;
    startDate?: string;
    endDate?: string;
    preferential?: number;
    money?: number;
    pay?: string;
}

export interface BillSearchType {
    startDate: string;
    endDate: string;
    no: string;
    status: string;
    page: number;
    pageSize: number
}

export interface ContractDataType {
    key: string;
    contractNo: string;
    type: string;
    name: string;
    startDate: string;
    endDate: string;
    jia: string;
    yi: string;
    status: string;
}

export interface ContractSearchType {
    contractNo: string;
    person: string;
    tel: string;
    page?: number;
    pageSize?: number
}
