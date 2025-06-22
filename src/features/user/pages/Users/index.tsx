import { Card, Row, Col, Input, Button, Table, Pagination, Popconfirm, message } from "antd";
import React, { useState } from "react";
import EnterpriseForm from "../../pages/enterpriseForm";
import type { User } from "../../types";
import { getUsersColumns } from "./users.config";
import {
    useGetUserListQuery,
    useDeleteUserMutation,
    useBatchDeleteUserMutation,
} from "../../api/userApi";
import { useDebounce } from "../../../../hooks/useDebounce";

function Users() {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [filters, setFilters] = useState({ userName: "", contact: "", tel: "" });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingRecord, setEditingRecord] = useState<User | undefined>(undefined);

    const debouncedFilters = useDebounce(filters, 500);

    const { data: userData, isFetching } = useGetUserListQuery({
        page,
        pageSize,
        // ...filters,//沒有延遲輸入
        ...debouncedFilters,//有延遲收入
    });
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [batchDeleteUser, { isLoading: isBatchDeleting }] = useBatchDeleteUserMutation();

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPage(1);
    };

    const handleReset = () => {
        setFilters({ userName: "", contact: "", tel: "" });
        setPage(1);
    };

    const handleAdd = () => {
        setEditingRecord(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (record: User) => {
        setEditingRecord(record);
        setIsModalOpen(true);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
        setEditingRecord(undefined);
    };

    const handleFormSuccess = () => {
        message.success("操作成功");
        handleCancelModal();
        // 表單成功後，RTK Query 會因為 invalidatesTags 自動重新獲取列表，無需手動 refresh
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id).unwrap();
            message.success("刪除成功");
        } catch (error) {
            message.error("刪除失敗");
        }
    };

    const handleBatchDelete = async () => {
        if (selectedRowKeys.length === 0) return;
        try {
            await batchDeleteUser(selectedRowKeys).unwrap();
            message.success("批量刪除成功");
            setSelectedRowKeys([]); // 清空選擇
        } catch (error) {
            message.error("批量刪除失敗");
        }
    };

    // 將 handleDelete 傳入 columns，以便點擊按鈕時觸發
    const columns = getUsersColumns({ onEdit: handleEdit, onDelete: handleDelete });

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    };

    return (
        <div className="users">
            <EnterpriseForm
                open={isModalOpen}
                isEditing={!!editingRecord}
                initialData={editingRecord}
                onCancel={handleCancelModal}
                onSuccess={handleFormSuccess}
            />
            <Card className="search">
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Input name="userName" placeholder="請輸入企業名稱" value={filters.userName} onChange={handleFilterChange} />
                    </Col>
                    <Col span={6}>
                        <Input name="contact" placeholder="請輸入聯絡人" value={filters.contact} onChange={handleFilterChange} />
                    </Col>
                    <Col span={6}>
                        <Input name="tel" placeholder="請輸入連絡電話" value={filters.tel} onChange={handleFilterChange} />
                    </Col>
                    <Col span={6}>
                        <Button type="primary">查詢</Button>
                        <Button className="ml" onClick={handleReset}>重置</Button>
                    </Col>
                </Row>
            </Card>

            <Card className="mt tr">
                <Button type="primary" onClick={handleAdd}>新增企業</Button>
                <Popconfirm
                    title="批量刪除確認"
                    description={`確定要刪除選擇的 ${selectedRowKeys.length} 項嗎？`}
                    onConfirm={handleBatchDelete}
                    disabled={selectedRowKeys.length === 0}
                >
                    <Button danger type="primary" className="ml" disabled={selectedRowKeys.length === 0} loading={isBatchDeleting}>
                        批量刪除
                    </Button>
                </Popconfirm>
            </Card>

            <Card className="mt">
                <Table<User>
                    columns={columns}
                    dataSource={userData?.list || []}
                    rowKey="id"
                    loading={isFetching || isDeleting || isBatchDeleting}
                    rowSelection={rowSelection}
                    pagination={false}
                />
                <Pagination
                    className="fr mt"
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `共 ${total} 條`}
                    current={page}
                    pageSize={pageSize}
                    total={userData?.total || 0}
                    onChange={(newPage, newPageSize) => {
                        setPage(newPage);
                        setPageSize(newPageSize || 10);
                    }}
                />
            </Card>
        </div>
    );
}

export default Users;