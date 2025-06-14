// useDataList.ts (已修正)

import { useState, useCallback, useEffect, useMemo } from "react";

// 響應數據結構
interface ResponseData<T> {
    list: T[];
    total: number;
}

// 可接受的表單字段值類型
type FormFieldValue = string | number | boolean | null | undefined;

// 【核心修正】使用 'type' 來定義函式類型
type DataFetcher<TParams, TData> = (params: TParams) => Promise<{ data: ResponseData<TData> }>;

/**
 * 用於處理分頁數據列表的Hook
 * @param initialFormData 初始表單數據
 * @param fetchData 數據獲取函數
 * @returns 包含數據狀態和操作方法的對象
 */
function useDataList<TFormData extends Record<string, FormFieldValue>, TItem>(
    initialFormData: TFormData,
    fetchData: DataFetcher<TFormData & { page: number; pageSize: number }, TItem>
) {
    const [dataList, setDataList] = useState<TItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [formData, setFormData] = useState<TFormData>(initialFormData);

    const loadData = useCallback(async (params: { page: number, pageSize: number, formData: TFormData }) => {
        setLoading(true);
        try {
            // 現在 fetchData 是可呼叫的，錯誤消失
            const response = await fetchData({ ...params.formData, page: params.page, pageSize: params.pageSize });
            if (response && response.data) {
                const { list, total } = response.data;
                setDataList(list);
                setTotal(total);
            }
        } catch (error) {
            console.error("Failed to load data:", error);
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    useEffect(() => {
        loadData({ page, pageSize, formData });
    }, [page, pageSize]);

    const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const handleSearch = useCallback(() => {
        setPage(1);
        loadData({ page: 1, pageSize, formData });
    }, [pageSize, formData, loadData]);

    const reset = useCallback(() => {
        const initialPage = 1;
        const initialPageSize = 10;
        setFormData(initialFormData);
        setPage(initialPage);
        setPageSize(initialPageSize);
        loadData({ page: initialPage, pageSize: initialPageSize, formData: initialFormData });
    }, [initialFormData, loadData]);

    const refresh = useCallback(() => {
        loadData({ page, pageSize, formData });
    }, [page, pageSize, formData, loadData]);

    const paginationProps = useMemo(() => ({
        current: page,
        pageSize: pageSize,
        total: total,
        onChange: (newPage: number, newPageSize?: number) => {
            setPage(newPage);
            if (newPageSize) {
                setPageSize(newPageSize);
            }
        }
    }), [page, pageSize, total]);

    return {
        dataList,
        loading,
        formData,
        handleFormChange,
        handleSearch,
        reset,
        refresh,
        paginationProps
    };
}

export default useDataList;