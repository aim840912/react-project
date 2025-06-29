import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UserListResponse, UserSearchType, ApiResponse, LoginResponse, LoginCredentials } from '../types';
import { MenuType } from '@/features/settings/types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).authSlice.token;
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

        deleteUser: builder.mutation<void, { id: string; queryArgs: UserSearchType }>({
            query: ({ id }) => ({
                url: '/deleteUser',
                method: 'POST',
                body: { id },
            }),
            async onQueryStarted({ id, queryArgs }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    userApi.util.updateQueryData('getUserList', queryArgs, (draft) => {
                        const userIndex = draft.list.findIndex(user => user.id === id);
                        if (userIndex !== -1) {
                            draft.list.splice(userIndex, 1);
                        }
                    })
                );

                try {
                    await queryFulfilled;
                } catch {

                    patchResult.undo();
                }
            },
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