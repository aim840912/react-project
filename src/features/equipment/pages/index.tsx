import { Card, Table, Row, Col, Input, Button, Pagination } from "antd";
import { useState } from "react";
import { equipmentColumns } from "../equipment.config";
import { useGetEquipmentListQuery } from "../api/equipmentApi";


function Equipment() {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const [filters, setFilters] = useState({
        name: "",
        person: "",
    });

    const {
        data: equipmentData,
        isFetching
    } = useGetEquipmentListQuery({
        page,
        pageSize,
        ...filters,
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPage(1);
    };

    const handleReset = () => {
        setFilters({ name: "", person: "" });
        setPage(1);
        setPageSize(10);
    };

    const onPaginationChange = (newPage: number, newPageSize?: number) => {
        setPage(newPage);
        if (newPageSize) {
            setPageSize(newPageSize);
        }
    };

    return (
        <div>
            {/* 搜尋卡片 */}
            <Card className="search">
                <Row gutter={16}>
                    <Col span={7}>
                        <p>設備名稱：</p>
                        <Input
                            value={filters.name}
                            name="name"
                            placeholder="請輸入設備名稱或編號"
                            onChange={handleFilterChange}
                        />
                    </Col>
                    <Col span={7}>
                        <p>負責人：</p>
                        <Input
                            value={filters.person}
                            name="person"
                            placeholder="請輸入負責人姓名"
                            onChange={handleFilterChange}
                        />
                    </Col>
                    <Col span={3} style={{ alignSelf: 'flex-end' }}>
                        {/* 查詢按鈕現在是視覺上的，實際觸發是靠 filter 變更 */}
                        <Button type="primary" className="mr">查詢</Button>
                        <Button onClick={handleReset}>重置</Button>
                    </Col>
                </Row>
            </Card>

            {/* 表格與分頁 */}
            <Card className="mt">
                <Table
                    columns={equipmentColumns}
                    dataSource={equipmentData?.list || []}
                    loading={isFetching}
                    rowKey={(record) => record.id}
                    pagination={false}
                />
                <Pagination
                    className="fr mt"
                    showQuickJumper
                    showSizeChanger
                    current={page}
                    pageSize={pageSize}
                    total={equipmentData?.total || 0}
                    onChange={onPaginationChange}
                />
            </Card>
        </div>
    );
}

export default Equipment;