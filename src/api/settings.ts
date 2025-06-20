import { post } from ".";

interface AccountData {
    accountName: string
}

export function getAccountList(data: AccountData) {//settings
    return post("/api/accountList", data);
}
