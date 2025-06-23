import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { EnergyItem, EnergyApiResponse } from '../../energy/types';

export interface SearchResult {
    type: 'user' | 'contract' | 'equipment';
    id: string;
    name: string;
    url: string;
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