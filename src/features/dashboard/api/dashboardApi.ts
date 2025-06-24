import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { EnergyItem, EnergyApiResponse } from '@/features/energy/types';

export interface SearchResult {
    type: 'user' | 'contract' | 'equipment' | 'action';
    id: string;
    name: string;
    url?: string;
    actionType?: 'TOGGLE_THEME' | 'LOGOUT'; // 定義具體的操作類型
}

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['EnergyData', 'GlobalSearch'],

    endpoints: (builder) => ({
        loadEnergyData: builder.query<EnergyItem[], void>({
            query: () => '/energyData',
            transformResponse: (response: EnergyApiResponse) => {
                return response.data || [];
            },

            providesTags: ['EnergyData'],
        }),
        globalSearch: builder.query<SearchResult[], string>({
            query: (keyword) => ({
                url: '/globalSearch',
                method: 'POST',
                body: { keyword },
            }),
            transformResponse: (response: { data: SearchResult[] }) => response.data || [],
            providesTags: ['GlobalSearch'],
        }),
    }),
});

export const { useLoadEnergyDataQuery, useGlobalSearchQuery } = dashboardApi;