import { Card, Row, Col, Input, Button, Table, Pagination, Popconfirm, message } from "antd";
import React, { useState } from "react";
import { getUserList, batchDeleteUser, deleteUser } from "../../../../api/users";
import EnterpriseForm from "../../pages/enterpriseForm";
import { User } from "../../types";
import { getUsersColumns } from "./users.config";
import useDataList from "../../../../hooks/useDataList";

function Users() {
    const {
        dataList,
        loading,
        formData,
        handleFormChange,
        handleSearch,
        reset,
        refresh,
        paginationProps
    } = useDataList({ userName: "", contact: "", tel: "", }, getUserList);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingRecord, setEditingRecord] = useState<User | undefined>(undefined);


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
        refresh();
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            message.success("刪除成功");
            refresh();
        } catch (error) {
            message.error("刪除失敗");
        }
    };

    const handleBatchDelete = async () => {
        if (selectedRowKeys.length === 0) return;
        try {
            await batchDeleteUser(selectedRowKeys);
            message.success("批量刪除成功");
            setSelectedRowKeys([]);
            refresh();
        } catch (error) {
            message.error("批量刪除失敗");
        }
    };

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
                        <Input name="userName" placeholder="請輸入企業名稱" value={formData.userName} onChange={handleFormChange} />
                    </Col>
                    <Col span={6}>
                        <Input name="contact" placeholder="請輸入聯絡人" value={formData.contact} onChange={handleFormChange} />
                    </Col>
                    <Col span={6}>
                        <Input name="tel" placeholder="請輸入連絡電話" value={formData.tel} onChange={handleFormChange} />
                    </Col>
                    <Col span={6}>
                        <Button type="primary" onClick={handleSearch}>查詢</Button>
                        <Button className="ml" onClick={reset}>重置</Button>
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
                    <Button danger type="primary" className="ml" disabled={selectedRowKeys.length === 0}>
                        批量刪除
                    </Button>
                </Popconfirm>
            </Card>

            <Card className="mt">
                <Table<User>
                    columns={columns}
                    dataSource={dataList as User[]}
                    rowKey="id"
                    loading={loading}
                    rowSelection={rowSelection}
                    pagination={false} // 分頁由外部 Pagination 元件控制
                />
                <Pagination
                    className="fr mt"
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `共 ${total} 條`}
                    // 4. 將從 Hook 拿到的 paginationProps 直接傳給 Pagination 元件，極度簡潔
                    {...paginationProps}
                />
            </Card>
        </div>
    );
}

export default Users;