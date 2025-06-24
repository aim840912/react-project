import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { EquipmentDataType, SearchType as EquipmentSearchType } from '../types';
import type { ApiResponse } from '@/features/user/types';

interface EquipmentListResponse {
    list: EquipmentDataType[];
    total: number;
}

export const equipmentApi = createApi({
    reducerPath: 'equipmentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
    }),
    tagTypes: ['Equipment'],

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