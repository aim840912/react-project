import { Card, Row, Col, Input, Table, Pagination, Statistic, DatePicker, Select, Button, Tag, TableProps } from "antd"
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { getBillList } from "../../../../api/users";
import { useCallback, useEffect, useMemo, useState } from "react";
import { exportToExcel } from "../../../../utils/exportToExcel";
import { RangePickerProps } from "antd/es/date-picker";
import { BillDataType, BillSearchType } from "../../types";
import { billColumns } from "./bill.config";
const { RangePicker } = DatePicker

function Bill() {
    const [formData, setFormData] = useState<BillSearchType>({
        startDate: "",
        endDate: "",
        no: "",
        status: "",
        page: 1,
        pageSize: 10
    })

    const [dataList, setDataList] = useState<BillDataType[]>([]);
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [selectedRows, setSelectedRows] = useState<BillDataType[]>([])

    const handleDateChange: RangePickerProps['onChange'] = (value, dateString) => {
        setFormData(prevState => ({
            ...prevState,
            date: dateString
        }))
    }

    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            no: value
        }))
    }

    const handleBillChange = (value: string) => {
        setFormData(prevState => ({
            ...prevState,
            status: value
        }))
    }

    const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: BillDataType[]) => {
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
        const { data: { list, total } } = await getBillList({
            page,
            pageSize,
            startDate: formData.startDate,
            endDate: formData.endDate,
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
                    <RangePicker name="date" style={{ width: "100%" }} onChange={handleDateChange} />
                </Col>
                <Col span={6}>
                    <p>房/車號：</p>
                    <Input placeholder="請輸入門牌號或者車位號" value={formData.no} onChange={handleNumChange} />
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
                        onChange={handleBillChange}
                    ></Select>
                </Col>
                <Col span={6}>
                    <Button type="primary" className="mr" onClick={loadData}>查詢</Button>
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
                columns={billColumns}
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
