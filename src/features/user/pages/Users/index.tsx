import { Card, Row, Col, Input, Button, Table, Pagination, Popconfirm, message } from "antd";
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import EnterpriseForm from "../../pages/enterpriseForm";
import type { User } from "../../types";
import { getUsersColumns } from "./users.config";
import {
    useGetUserListQuery,
    useDeleteUserMutation,
    useBatchDeleteUserMutation,
} from "../../api/userApi";
import { useAppSelector } from "../../../../app/hooks";

function Users() {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    // 用於輸入框的狀態
    const [inputFilters, setInputFilters] = useState({
        userName: searchParams.get('userName') || '',
        contact: searchParams.get('contact') || '',
        tel: searchParams.get('tel') || '',
    });

    // 用於觸發 API 請求的狀態
    const [queryFilters, setQueryFilters] = useState(inputFilters);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingRecord, setEditingRecord] = useState<User | undefined>(undefined);
    const token = useAppSelector((state) => state.authSlice.token);

    const { data: userData, isFetching } = useGetUserListQuery({
        page,
        pageSize,
        ...queryFilters,
    }, {
        skip: !token
    });

    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const [batchDeleteUser, { isLoading: isBatchDeleting }] = useBatchDeleteUserMutation();

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('userName', queryFilters.userName);
        newParams.set('contact', queryFilters.contact);
        newParams.set('tel', queryFilters.tel);

        if (newParams.toString() !== searchParams.toString()) {
            setSearchParams(newParams, { replace: true });
        }
    }, [queryFilters, searchParams, setSearchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        setQueryFilters(inputFilters);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', '1');
        setSearchParams(newParams, { replace: true });
    };

    const handleReset = () => {
        setInputFilters({ userName: "", contact: "", tel: "" });
        setQueryFilters({ userName: "", contact: "", tel: "" });
        setSearchParams({ page: '1', pageSize: '10' }, { replace: true });
    };

    const onPaginationChange = (newPage: number, newPageSize?: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', String(newPage));
        if (newPageSize) {
            newParams.set('pageSize', String(newPageSize));
        }
        setSearchParams(newParams, { replace: true });
    }

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
            setSelectedRowKeys([]);
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
                        <Input name="userName" placeholder="請輸入企業名稱" value={inputFilters.userName} onChange={handleInputChange} />
                    </Col>
                    <Col span={6}>
                        <Input name="contact" placeholder="請輸入聯絡人" value={inputFilters.contact} onChange={handleInputChange} />
                    </Col>
                    <Col span={6}>
                        <Input name="tel" placeholder="請輸入連絡電話" value={inputFilters.tel} onChange={handleInputChange} />
                    </Col>
                    <Col span={6}>
                        <Button type="primary" onClick={handleSearch}>查詢</Button>
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
                    onChange={onPaginationChange}
                />
            </Card>
        </div>
    );
}

export default Users;