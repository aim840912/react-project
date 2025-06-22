import { Card, Row, Col, Input, Table, Pagination, Statistic, DatePicker, Select, Button } from "antd";
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMemo, useState } from "react";
import { exportToExcel } from "../../../../utils/exportToExcel";
import type { RangePickerProps } from "antd/es/date-picker";
import type { BillDataType, BillSearchType } from "../../types";
import { billColumns } from "./bill.config";
import { useGetBillListQuery } from "../../api/financeApi";

const { RangePicker } = DatePicker;

function Bill() {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<BillDataType[]>([]);

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        no: "",
        status: "",
    });

    const {
        data: billData,
        error,
        isFetching,
    } = useGetBillListQuery({
        page,
        pageSize,
        ...filters,
    });

    const handleFilterChange = (changedValues: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...changedValues }));
        setPage(1);
    };

    const handleDateChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
        handleFilterChange({ startDate: dateStrings[0], endDate: dateStrings[1] });
    };

    const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFilterChange({ no: e.target.value });
    };

    const handleBillChange = (value: string) => {
        handleFilterChange({ status: value });
    };

    const handleReset = () => {
        setFilters({
            startDate: "",
            endDate: "",
            no: "",
            status: "",
        });
        setPage(1);
        setPageSize(10);
    };

    const onSelectChange = (selectedKeys: React.Key[], selectedItems: BillDataType[]) => {
        setSelectedRowKeys(selectedKeys);
        setSelectedRows(selectedItems);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const isExportDisabled = useMemo(() => selectedRows.length === 0, [selectedRows]);

    const header = {
        accountNo: "帳號",
        status: "狀態",
        roomNo: "房號",
        carNo: "車位號",
        tel: "電話",
        costName1: "物業費(年)",
        costName2: "車位費",
        costName3: "房屋租金",
        startDate: "起始日",
        endDate: "結束日",
        preferential: "優惠金額",
        money: "合計應收金額",
        pay: "支付方式",
    };

    return (
        <div>
            <Card>
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
                        <RangePicker style={{ width: "100%" }} onChange={handleDateChange} />
                    </Col>
                    <Col span={6}>
                        <p>房/車號：</p>
                        <Input
                            placeholder="請輸入門牌號或者車位號"
                            value={filters.no}
                            onChange={handleNumChange}
                        />
                    </Col>
                    <Col span={6}>
                        <p>繳費情況</p>
                        <Select
                            style={{ width: "100%" }}
                            value={filters.status || null}
                            placeholder="請選擇繳費情況"
                            options={[
                                { value: "1", label: "已繳納" },
                                { value: "2", label: "未繳納" }
                            ]}
                            onChange={handleBillChange}
                            allowClear
                        />
                    </Col>
                    <Col span={6} style={{ alignSelf: 'flex-end' }}>
                        <Button type="primary" className="mr">查詢</Button>
                        <Button onClick={handleReset}>重置</Button>
                    </Col>
                </Row>
            </Card>

            <Card className="mt">
                <Button type="primary" icon={<DownloadOutlined />} disabled={isExportDisabled} onClick={() => exportToExcel(selectedRows, header)}>
                    導出為Excel
                </Button>
                <Button icon={<DeleteOutlined />} danger className="ml" type="primary" disabled={isExportDisabled}>
                    批量作廢
                </Button>
            </Card>


            <Card className="mt">
                <Table
                    dataSource={billData?.list || []}
                    columns={billColumns}
                    pagination={false}
                    rowKey={(record) => record.accountNo}
                    rowSelection={rowSelection}
                    loading={isFetching}
                    scroll={{ x: 1200 }}
                />
                <Pagination
                    className="fr mt"
                    showQuickJumper
                    showSizeChanger
                    current={page}
                    pageSize={pageSize}
                    total={billData?.total || 0}
                    onChange={(newPage, newPageSize) => {
                        setPage(newPage);
                        setPageSize(newPageSize);
                    }}
                />
            </Card>
        </div>
    );
}

export default Bill;