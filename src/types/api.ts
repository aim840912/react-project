
export interface LoginRequest {
    username: string;
    password: string;
}

export interface PaginationRequest {
    pageSize?: number;
}

export interface DeleteUserRequest {
    key: string;
}

export interface UserListResponse {
    list: CompanyItem[];
    total: number;
}

export interface CompanyItem {
    id: string;
    name: string;
    status: string;
    tel: string;
    business: string;
    email: string;
    creditCode: string;
    industryNum: string;
    organizationCode: string;
    legalPerson: string;
}
export interface AccountData {
    pageSize?: number;
    keyword?: string;
    status?: string;
}

export interface searchType {
    page: number;
    pageSize: number;
    companyName?: string;
    contact?: string;
    tel?: string;
}

export interface SearchData {
    contractNo: string;
    person: string;
    tel: string;
    page: number;
    pageSize: number
}
export interface SearchData2 {
    page: number;
    pageSize: number;
    no: string;
    status: string;
    startDate: string;
    endDate: string;
}

export interface DataType {
    id: string;
    name: string;
    status: string;
    tel: number;
    business: string;
    email: string;
    creditCode: string;
    industryNum: string;
    organizationCode: string;
    legalPerson: string
}

// 📤 回傳型別
export interface ApiResponse<T = unknown> {
    message?: string;
    data?: T;
}

export interface UserItem {
    key: string;
    name: string;
    age: number;
    address: string;
}

export interface ContractItem {
    id: string;
    name: string;
    amount: number;
    startDate: string;
    endDate: string;
    status: string;
    contactPerson: string;
    phone: string;
}

export interface EquipmentItem {
    id: string;
    name: string;
    status: string;
}

export interface MenuItem {
    icon: string;
    label: string;
    key: string;
    children?: MenuItem[];
}

export type LoginResponse = {
    username: string;
    token: string;
    btnAuth: string[];
};

export type MenuResponse = ApiResponse<MenuItem[]>;


export type ContractListResponse = ApiResponse<{
    list: ContractItem[];
    total: number;
}>;

export type EquipmentListResponse = ApiResponse<{
    list: EquipmentItem[];
    total: number;
}>;

