import { useState, useCallback, useEffect } from "react";

// 定義更清晰的響應數據結構
interface ResponseData<T> {
    list: T[];
    total: number;
}

// 使用泛型定義數據獲取函數類型
interface DataFetcher<TParams, TData> {
    (params: TParams): Promise<{ data: ResponseData<TData> }>;
}

// 定義可接受的表單字段值類型
type FormFieldValue = string | number | boolean | null | undefined;

/**
 * 用於處理分頁數據列表的Hook
 * @param initialFormData 初始表單數據
 * @param fetchData 數據獲取函數
 * @returns 包含數據狀態和操作方法的對象
 */
function useDataList<TFormData extends Record<string, FormFieldValue>, TItem>(initialFormData: TFormData, fetchData: DataFetcher<TFormData & { page: number; pageSize: number }, TItem>) {
    // 數據狀態
    const [dataList, setDataList] = useState<TItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    // 分頁狀態
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    // 表單狀態
    const [formData, setFormData] = useState<TFormData>({ ...initialFormData });

    // 加載數據的核心方法
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchData({ ...formData, page, pageSize });
            const { list, total } = response.data;

            setDataList(list);
            setTotal(total);
        } catch (error) {
            console.error("Failed to load data:", error);
        } finally {
            setLoading(false);
        }
    }, [formData, page, pageSize, fetchData]);

    // 當依賴項變化時重新加載數據
    useEffect(() => {
        loadData();
    }, [loadData]);

    // 處理表單輸入變化
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    // 處理分頁變化
    const handlePageChange = useCallback((newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    }, []);

    // 重置所有狀態
    const reset = useCallback(() => {
        setPage(1);
        setPageSize(10);
        setFormData({ ...initialFormData });
    }, [initialFormData]);

    // 提供更新表單的便捷方法
    const updateFormData = useCallback((updates: Partial<TFormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    }, []);

    return {
        // 數據狀態
        dataList,
        total,
        loading,

        // 分頁狀態
        page,
        pageSize,

        // 表單狀態
        formData,

        // 直接操作狀態的方法
        setDataList,
        setTotal,
        setLoading,
        setPage,
        setPageSize,
        setFormData,

        // 高級操作方法
        loadData,
        handlePageChange,
        handleChange,
        updateFormData,
        reset
    };
}

export default useDataList;