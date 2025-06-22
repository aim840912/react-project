import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { EquipmentDataType, SearchType as EquipmentSearchType } from '../types';
import type { ApiResponse } from '../../user/types';

interface EquipmentListResponse {
    list: EquipmentDataType[];
    total: number;
}

export const equipmentApi = createApi({
    reducerPath: 'equipmentApi', // ✨ 唯一的 reducerPath
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Equipment'], // ✨ 只包含與設備相關的標籤

    endpoints: (builder) => ({
        getEquipmentList: builder.query<EquipmentListResponse, EquipmentSearchType>({
            query: (params) => ({
                url: '/equipmentList',
                method: 'POST',
                body: params,
            }),
            transformResponse: (response: ApiResponse<EquipmentListResponse>) => {
                return response.data || { list: [], total: 0 };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.list.map(({ id }) => ({ type: 'Equipment' as const, id })),
                        { type: 'Equipment', id: 'LIST' },
                    ]
                    : [{ type: 'Equipment', id: 'LIST' }],
        }),
    }),
});

export const { useGetEquipmentListQuery } = equipmentApi;