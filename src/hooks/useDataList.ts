import { useState, useCallback, useEffect } from "react";

interface DataFetcher<T, R> {
    (args: T & { page: number; pageSize: number }): Promise<R>;
}
function useDataList<T extends { [K in keyof T]: string | number | boolean }, U>(initialFormData: T, fetchData: DataFetcher<T, { data: { list: U[]; total: number } }>) {
    const [dataList, setDataList] = useState<U[]>([])
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<T>(initialFormData);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const { data: { list, total } } = await fetchData({ page, pageSize, ...formData });
            setDataList(list);
            setTotal(total)
        } catch (error) {

            console.log(error)
        } finally {

            setLoading(false)
        }
    }, [formData, page, pageSize, fetchData])

    useEffect(() => {
        loadData()
    }, [loadData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const onChange = (page: number, pageSize: number) => {
        setPage(page);
        setPageSize(pageSize)
    }

    const reset = () => {
        setPage(1)
        setPageSize(10)
        setFormData(initialFormData)
    }
    return { dataList, page, pageSize, total, loading, formData, setDataList, setPage, setPageSize, setTotal, setLoading, setFormData, loadData, onChange, handleChange, reset }
}


export default useDataList