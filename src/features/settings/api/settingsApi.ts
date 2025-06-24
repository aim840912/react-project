import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SettingsDataType, AccountData } from '../types';
import type { ApiResponse } from '@/features/user/types';

interface AccountListResponse {
    list: SettingsDataType[];
    total: number;
}

export const settingsApi = createApi({
    reducerPath: 'settingsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
    }),
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        getAccountList: builder.query<AccountListResponse, AccountData>({
            query: (params) => ({
                url: '/accountList',
                method: 'POST',
                body: params,
            }),

            transformResponse: (response: ApiResponse<AccountListResponse>) => {
                return response.data || { list: [], total: 0 };
            },

            providesTags: (result) =>
                result
                    ? [
                        ...result.list.map(({ id }) => ({ type: 'Account' as const, id })),
                        // 為整個列表提供一個總的標籤
                        { type: 'Account', id: 'LIST' },
                    ]
                    : [{ type: 'Account', id: 'LIST' }],
        }),
    }),
});

export const { useGetAccountListQuery } = settingsApi;