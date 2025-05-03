import { post, get } from "../utils/http/http";
import { LoginData, User, UserSearchType, AccountData, ContractSearchType, BillSearchType } from "../types";

export function login(data: LoginData) {
    return post("/api/login", data);
}

export function getMenu() {
    return get("/api/menu");
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

