import { Card, Row, Col, Input, Table, Pagination, Statistic, DatePicker, Select, Button, Tag } from "antd"
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { TableProps } from "antd";
import { getBillList } from "../../api/contract";
import { useCallback, useEffect, useMemo, useState } from "react";
import { exportToExcel } from "../../utils/exportToExcel";
import { RangePickerProps } from "antd/es/date-picker";
const { RangePicker } = DatePicker

interface DataType {
    key?: string;
    accountNo: string;
    status?: string;
    roomNo?: string;
    carNo?: string;
    tel?: string;
    costName1?: string;
    costName2?: string;
    costName3?: string;
    startDate?: string;
    endDate?: string;
    preferential?: number;
    money?: number;
    pay?: string;

}

interface SearchType {
    date: string[];
    no: string;
    status: string;
    page: number;
    pageSize: number
}

interface BillListResponse {
    list: DataType[];
    total: number;
}

function Bill() {
    const columns: TableProps<DataType>["columns"] = [
        {
            title: "No.",
            key: "index",
            render(value, record, index) {
                return index + 1
            },
            width: 100,
            fixed: "left"
        },
        {
            title: "帳單號",
            dataIndex: "accountNo",
            key: "accountNo",
            width: 150,
        },
        {
            title: "繳費狀態",
            dataIndex: "status",
            key: "status",
            width: 100,
            render(value) {
                return value === 1 ? <Tag color="green">已繳費</Tag> : <Tag color="red">未繳費</Tag>
            }
        },
        {
            title: "房屋號",
            dataIndex: "roomNo",
            key: "roomNo",
            width: 100,
        },
        {
            title: "車位號",
            dataIndex: "carNo",
            key: "carNo",
            width: 100,
        },
        {
            title: "手機號",
            dataIndex: "tel",
            key: "tel",
            width: 150,
        },
        {
            title: "物業費(年)",
            dataIndex: "costName1",
            key: "costName1",
            width: 150,
        },

        {
            title: "車位費",
            dataIndex: "costName2",
            key: "costName2",
            width: 150,
        },
        {
            title: "房屋租金",
            dataIndex: "costName3",
            key: "costName3",
            width: 150,
        },

        {
            title: "開始時間",
            dataIndex: "startDate",
            key: "startDate",
            width: 150,
        },
        {
            title: "結束時間",
            dataIndex: "endDate",
            key: "endDate",
            width: 150,
        },
        {
            title: "優惠金額",
            dataIndex: "preferential",
            key: "preferential",
            width: 150,
        },
        {
            title: "合計應收金額",
            dataIndex: "money",
            key: "money",
            width: 150,
        },
        {
            title: "支付方式",
            dataIndex: "pay",
            key: "pay",
            width: 100,
        },
        {
            title: "操作",
            width: 230,
            key: "operate",
            fixed: "right",
            render(_value) {
                return <>
                    <Button type="primary" size="small">打印</Button>
                    <Button type="primary" size="small" danger className="ml mr">帳單作廢</Button>
                    <Button type="primary" size="small">退款</Button>
                </>
            }
        }
    ]

    const [formData, setFormData] = useState<SearchType>({
        date: [],
        no: "",
        status: "",
        page: 1,
        pageSize: 10
    })
    const [dataList, setDataList] = useState<DataType[]>([]);
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [selectedRows, setSelectedRows] = useState<DataType[]>([])

    const handleChange: RangePickerProps['onChange'] = (value, dateString) => {
        console.log(value, dateString)
        setFormData(prevState => ({
            ...prevState,
            date: dateString
        }))
    }

    const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            no: value
        }))
    }

    const handleChange2 = (value: string) => {
        setFormData(prevState => ({
            ...prevState,
            status: value
        }))
    }

    const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(selectedRows)
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        preserveSelectedRowKeys: true
    }

    const disabled = useMemo(() => {
        return selectedRowKeys.length ? false : true
    }, [selectedRowKeys])

    const loadData = useCallback(async () => {
        setLoading(true);
        const { data: { list, total } } = await getBillList<BillListResponse>({
            page,
            pageSize,
            startDate: formData.date[0],
            endDate: formData.date[1],
            no: formData.no,
            status: formData.status
        });
        setLoading(false);
        setDataList(list);
        setTotal(total);
    }, [formData, page, pageSize]);
    const header = {
        accountNo: "帳號",
        status: "狀態",
        roomNo: "房號",
        carNo: "車位號",
        tel: "電話",
        costName1: "費用1",
        costName2: "費用2",
        costName3: "費用3",
        startDate: "起始日",
        endDate: "結束日",
        preferential: "優惠",
        money: "金額",
        pay: "已繳",
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

    const onChange = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }
    return <div>
        <Card >
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title="應收帳單金額" value="16,876.38" />
                </Col>
                <Col span={6}>
                    <Statistic title="已繳帳單金額" value="6,952.00" />
                </Col>
                <Col span={6}>
                    <Statistic title="已退帳單金額" value="2,355.23" />
                </Col>
                <Col span={6}>
                    <Statistic title="未繳帳單金額" value="9,962.00" />
                </Col>
            </Row>
        </Card>
        <Card className="mt search">
            <Row gutter={16}>
                <Col span={6}>
                    <p>帳單日期</p>
                    <RangePicker name="date" style={{ width: "100%" }} onChange={handleChange} />
                </Col>
                <Col span={6}>
                    <p>房/車號：</p>
                    <Input placeholder="請輸入門牌號或者車位號" value={formData.no} onChange={handleChange1} />
                </Col>
                <Col span={6}>
                    <p>繳費情況</p>
                    <Select
                        style={{ width: "100%" }}
                        options={[
                            { value: "1", label: "全部" },
                            { value: "2", label: "已繳納" },
                            { value: "3", label: "未繳納" }
                        ]}
                        onChange={handleChange2}
                    ></Select>
                </Col>
                <Col span={6}>
                    <Button type="primary" className="mr" onClick={loadData}>查询</Button>
                    <Button>重置</Button>
                </Col>
            </Row>
        </Card>
        <Card className="mt">
            <Button type="primary" icon={<DownloadOutlined />} disabled={disabled} onClick={() => exportToExcel(selectedRows, header)}>導出為Excel</Button>
            <Button icon={<DeleteOutlined />} danger className="ml" type="primary" disabled={disabled}>批量作廢</Button>
        </Card>
        <Card className="mt">
            <Table
                dataSource={dataList}
                columns={columns}
                pagination={false}
                rowKey={(record) => record.accountNo}
                rowSelection={rowSelection}
                loading={loading}
                scroll={{ x: 1200 }}
            />
            <Pagination className="fr mt" showQuickJumper current={page} pageSize={pageSize} total={total} onChange={onChange} />
        </Card>
    </div>
}

export default Bill
