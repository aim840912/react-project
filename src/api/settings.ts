import { post } from ".";
import type {
    SettingsDataType,
    AccountData
} from "../features/settings/types";
import { ApiResponse } from "../features/user/types";

interface AccountListResponse {
    list: SettingsDataType[];
    total: number;
}

export async function getAccountList(data: AccountData): Promise<AccountListResponse> {
    const response = await post<ApiResponse<AccountListResponse>, AccountData>("/api/accountList", data);

    return response?.data || { list: [], total: 0 };
}