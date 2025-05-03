import { Card, Table, Row, Col, Input, Button, Tag, Pagination, TableProps, PaginationProps } from "antd"
import { useCallback, useEffect, useState } from "react"
import { getContractList } from "../../api/users";
import { setData, setTotal, setCurrent, setFormList, setSize } from "../../store/finance/contractSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { ContractDataType, ContractSearchType } from "../../types";

function Dashboard() {
    const { data, total, formList, size, current } = useAppSelector((state) => state.contractSlice);
    const [formData, setFormData] = useState<ContractSearchType>({
        contractNo: "",
        person: "",
        tel: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isReturn = searchParams.get("return");
    const [pageSize, setPageSize] = useState<number>(10);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        dispatch(setFormList({
            ...formData,
            [name]: value
        }));
    };

    const loadData = useCallback(async (page: number, pageSize: number) => {
        setLoading(true);
        const { data: { list, total } } = await getContractList({ ...formData, page, pageSize });
        setLoading(false);
        dispatch(setData(list));
        dispatch(setTotal(total));
    }, [dispatch, formData]);

    const onChange: PaginationProps["onChange"] = (page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
        dispatch(setCurrent(page));
        dispatch(setSize(pageSize));
        loadData(page, pageSize);
    };

    const detail = (contractNo: string) => {
        navigate("/finance/surrender?contractNo=" + contractNo);
    };

    const reset = () => {
        setFormData({ contractNo: "", person: "", tel: "" });
        setPage(1);
        setPageSize(10);
        loadData(1, 10);
    };

    useEffect(() => {
        if (!isReturn || !data.length) {
            loadData(page, pageSize);
        }
        if (isReturn) {
            setFormData(formList);
            setPage(current);
            setPageSize(size);
        }
    }, [isReturn, data.length, loadData, page, pageSize, formList, current, size]);

    const columns: TableProps<ContractDataType>["columns"] = [
        { title: "No.", key: "index", render(value, record, index) { return index + 1; } },
        { title: "合同編號", dataIndex: "contractNo", key: "contractNo" },
        { title: "合同類別", dataIndex: "type", key: "type" },
        { title: "合同名稱", dataIndex: "name", key: "name" },
        { title: "合同開始日期", dataIndex: "startDate", key: "startDate" },
        { title: "合同結束如期", dataIndex: "endDate", key: "endDate" },
        { title: "甲方", dataIndex: "jia", key: "jia" },
        { title: "乙方", dataIndex: "yi", key: "yi" },
        {
            title: "審批狀態",
            dataIndex: "status",
            key: "status",
            render(value) {
                if (value === 1) return <Tag>未審批</Tag>;
                if (value === 2) return <Tag color="green">審批通過</Tag>;
                return <Tag color="red">審批拒絕</Tag>;
            }
        },
        {
            title: "操作",
            key: "operate",
            render(_value: unknown, record: ContractDataType) {
                return <Button type="primary" size="small" onClick={() => detail(record.contractNo)}>合同詳情</Button>;
            }
        }
    ];

    return <div>
        <Card className="search">
            <Row gutter={16}>
                <Col span={7}><p>合同編號：</p><Input name="contractNo" value={formData.contractNo} onChange={handleChange} /></Col>
                <Col span={7}><p>聯繫人：</p><Input name="person" value={formData.person} onChange={handleChange} /></Col>
                <Col span={7}><p>聯繫電話：</p><Input name="tel" value={formData.tel} onChange={handleChange} /></Col>
                <Col span={3}>
                    <Button type="primary" className="mr" onClick={() => loadData(page, pageSize)}>查詢</Button>
                    <Button onClick={reset}>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Table
                columns={columns}
                pagination={false}
                loading={loading}
                dataSource={data}
                rowKey={(record) => record.contractNo}
            />
            <Pagination
                className="mt fr"
                showQuickJumper
                defaultCurrent={1}
                total={total}
                onChange={onChange}
                current={page}
                pageSize={pageSize}
            />
        </Card>
    </div>
}

export default Dashboard;
