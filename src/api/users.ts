import { post, get } from ".";
import { MenuType } from "../features/settings/types";
import { LoginData, LoginCredentials, LoginResponse } from "../features/user/types";

export const login = (credentials: LoginCredentials): Promise<LoginResponse> => {
    return post<LoginResponse, LoginCredentials>('/api/login', credentials);
};

export function getMenu(): Promise<MenuType[]> {
    // 3. 呼叫 get 時，在泛型中傳入我們期望的型別 <MenuType[]>
    return get<MenuType[]>("/api/menu");
}

export function getAccountList(data: AccountData) {
    return post("/api/accountList", data);
}

export function getUserList(data: UserSearchType) {
    return post("/api/userList", data);
}

export function deleteUser(id: string) {
    return post("/api/deleteUser", { id })
}

export function batchDeleteUser(ids: React.Key[]) {
    return post("/api/batchDeleteUser", { ids })
}

export function editUser(data: User) {
    return post("/editUser", data)
}


export function getContractList(data: ContractSearchType) {
    return post("/api/contractList", data)
}


export function getBillList(data: BillSearchType) {
    return post("/api/billList", data)
}


interface AccountData {
    accountName: string
}

interface UserSearchType {
    page: number;
    pageSize: number;
    companyName?: string;
    contact?: string;
    tel?: string;
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

interface ContractSearchType {
    contractNo: string;
    person: string;
    tel: string;
    page?: number;
    pageSize?: number
}
interface BillSearchType {
    startDate: string;
    endDate: string;
    no: string;
    status: string;
    page: number;
    pageSize: number
}

