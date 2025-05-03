export interface LoginData {
    username: string,
    password: string
}

export interface User {
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

export interface UserListResponse {
    list: User[];
    total: number;
}

export interface UserSearchType {
    page: number;
    pageSize: number;
    companyName?: string;
    contact?: string;
    tel?: string;
}


