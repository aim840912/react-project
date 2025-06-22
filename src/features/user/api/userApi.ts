import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UserListResponse, UserSearchType, ApiResponse, LoginResponse, LoginCredentials } from '../types';
import { MenuType } from '../../settings/types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).authSlice.token; // 根據您的 store 結構獲取 token
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User', 'Menu'],

    endpoints: (builder) => ({

        login: builder.mutation<ApiResponse<LoginResponse>, LoginCredentials>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Menu'],
        }),

        getMenu: builder.query<MenuType[], void>({
            query: () => '/menu',
            transformResponse: (response: ApiResponse<MenuType[]>) => response.data || [],
            providesTags: ['Menu'],
        }),

        getUserList: builder.query<UserListResponse, UserSearchType>({
            query: (params) => ({
                url: '/userList',
                method: 'POST',
                body: params,
            }),
            transformResponse: (response: ApiResponse<UserListResponse>) => {
                return response?.data || { list: [], total: 0 };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.list.map(({ id }) => ({ type: 'User' as const, id })),
                        { type: 'User', id: 'LIST' },
                    ]
                    : [{ type: 'User', id: 'LIST' }],
        }),

        updateUser: builder.mutation<ApiResponse<string>, Partial<User>>({
            query: (userData) => ({
                url: '/editUser',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),

        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: '/deleteUser',
                method: 'POST',
                body: { id },
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),

        batchDeleteUser: builder.mutation<void, React.Key[]>({
            query: (ids) => ({
                url: '/batchDeleteUser',
                method: 'POST',
                body: { ids },
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
    }),
});

export const {
    useLoginMutation,
    useGetMenuQuery,
    useGetUserListQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useBatchDeleteUserMutation,
} = userApi;