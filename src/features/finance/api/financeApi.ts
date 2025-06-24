import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BillDataType, BillSearchType, ContractDataType } from "../types";
import { EquipmentDataType, SearchType as EquipmentSearchType } from "@/features/equipment/types";

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

interface EquipmentListResponse {
    list: EquipmentDataType[];
    total: number;
}

export const financeApi = createApi({
    reducerPath: "financeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
    }),
    tagTypes: ["Contract", "Bill", "Equipment"],

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

        getContractById: builder.query<Contract, string>({
            query: (id) => ({
                url: `/contracts/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Contract", id }],
        }),

        addContract: builder.mutation<Contract, Partial<Contract>>({
            query: (payload) => ({
                url: "/contracts",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: [{ type: "Contract", id: "LIST" }],
        }),

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

        getBillList: builder.query<{ list: BillDataType[], total: number }, BillSearchType>({
            query: (params) => ({
                url: '/billList',
                method: 'POST',
                body: params,
            }),
            transformResponse: (response: { data: { list: BillDataType[], total: number } }) => response.data,
            providesTags: (result) =>
                result
                    ? [
                        ...result.list.map(({ accountNo }) => ({ type: 'Bill' as const, id: accountNo })),
                        { type: 'Bill', id: 'LIST' },
                    ]
                    : [{ type: 'Bill', id: 'LIST' }],
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
    useGetBillListQuery,
} = financeApi;
