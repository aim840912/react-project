import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RoomType } from '../types';
import type { ApiResponse } from '../../user/types';

interface RoomListResponse {
    rooms: RoomType[];
}

export const estateApi = createApi({
    reducerPath: 'estateApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Room'],

    endpoints: (builder) => ({
        getRoomList: builder.query<RoomType[], string>({
            query: (roomid) => ({
                url: '/roomList',
                method: 'POST',
                body: { roomid },
            }),

            transformResponse: (response: ApiResponse<RoomListResponse>) => {
                return response.data?.rooms || [];
            },

            providesTags: (result, error, roomid) =>
                result
                    ? [{ type: 'Room', id: roomid }]
                    : [],
        }),
    }),
});

// 自動產生並導出對應的 React Hook
export const { useGetRoomListQuery } = estateApi;