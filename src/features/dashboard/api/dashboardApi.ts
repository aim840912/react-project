import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { EnergyItem, EnergyApiResponse } from '../../energy/types';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['EnergyData'],

    endpoints: (builder) => ({
        loadEnergyData: builder.query<EnergyItem[], void>({
            query: () => '/energyData',
            transformResponse: (response: EnergyApiResponse) => {
                return response.data || [];
            },

            providesTags: ['EnergyData'],
        }),
    }),
});

export const { useLoadEnergyDataQuery } = dashboardApi;