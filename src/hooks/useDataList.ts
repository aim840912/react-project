import { useState, useCallback, useEffect, useMemo } from "react";

interface ListResponse<T> {
    list: T[];
    total: number;
}

type DataFetcher<TParams, TItem> = (params: TParams) => Promise<ListResponse<TItem>>;

type FormFieldValue = string | number | boolean | null | undefined;

function useDataList<TFormData extends Record<string, FormFieldValue>, TItem>(initialFormData: TFormData, fetchData: DataFetcher<TFormData & { page: number; pageSize: number }, TItem>) {
    const [dataList, setDataList] = useState<TItem[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [formData, setFormData] = useState<TFormData>(initialFormData);

    const loadData = useCallback(async (params: { page: number, pageSize: number, formData: TFormData }) => {
        setLoading(true);
        try {
            const { list, total } = await fetchData({ ...params.formData, page: params.page, pageSize: params.pageSize });
            setDataList(list);
            setTotal(total);
        } catch (error) {
            console.error("Failed to load data:", error);
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    useEffect(() => {
        loadData({ page, pageSize, formData });
    }, [page, pageSize, loadData]);

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