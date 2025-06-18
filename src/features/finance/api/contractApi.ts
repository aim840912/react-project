// src/features/contract/contractApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContractDataType } from "../types";

export interface Contract {
    id: string;
    contractNo: string;
    person: string;
    tel: string;
    page: number;
    pageSize: number;
}

export interface InnerPayload {
    list: ContractDataType[];
    total: number
}

export interface WrappedContractData {
    data: InnerPayload;
}

export const contractApi = createApi({
    reducerPath: "contractApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
    }),
    tagTypes: ["Contract"],

    endpoints: (builder) => ({

        getContracts: builder.query<WrappedContractData, {
            contractNo?: string;
            person?: string;
            tel?: string;
            page?: number;
            pageSize?: number;
        }>({
            query: (body) => {
                return {
                    url: "/contractList",
                    method: "POST",
                    // fetchBaseQuery 會自動把這些 params 串到查詢字串 (?…)
                    body,
                };
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data: result } = await queryFulfilled;
                    console.log('★ getContracts result:', result);
                } catch {

                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.list.map(c => ({ type: 'Contract' as const, id: c.id })),
                        { type: 'Contract', id: 'LIST' },
                    ]
                    : [{ type: 'Contract', id: 'LIST' }],
        }),

        /**
         * 2. 取得單筆合約 (GET /contracts/:id)
         *    回傳格式：Contract
         */
        getContractById: builder.query<Contract, string>({
            query: (id) => ({
                url: `/contracts/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Contract", id }],
        }),

        /**
         * 3. 新增合約 (POST /contracts)
         *    Body: Partial<Contract>（不包含 id，由後端自動產生）
         *    回傳格式：Contract
         */
        addContract: builder.mutation<Contract, Partial<Contract>>({
            query: (payload) => ({
                url: "/contracts",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: [{ type: "Contract", id: "LIST" }],
        }),

        /**
         * 4. 更新合約 (PUT /contracts/:id)
         *    Body: { id: string; data: Partial<Contract> }
         *    回傳格式：Contract
         */
        updateContract: builder.mutation<Contract, { id: string; data: Partial<Contract> }>({
            query: ({ id, data }) => ({
                url: `/contracts/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Contract", id },
                { type: "Contract", id: "LIST" },
            ],
        }),

        /**
         * 5. 刪除合約 (DELETE /contracts/:id)
         *    回傳格式：void
         */
        deleteContract: builder.mutation<void, string>({
            query: (id) => ({
                url: `/contracts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Contract", id },
                { type: "Contract", id: "LIST" },
            ],
        }),
    }),
});

// 自動產生的 React Hooks，直接 export 出來給元件使用
export const {
    useGetContractsQuery,
    useGetContractByIdQuery,
    useAddContractMutation,
    useUpdateContractMutation,
    useDeleteContractMutation,
} = contractApi;
