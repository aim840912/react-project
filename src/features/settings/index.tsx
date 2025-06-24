import { Card, Row, Col, Table, Input, Button, Popconfirm, Tree } from "antd";
import type { TreeProps } from 'antd';
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/hooks";
import { MenuType, SettingsDataType } from "./types";
import { treeData, getSettingsColumns } from "./settings.config";
import { extractTreeKeys } from "./settings.utils";
import { CheckPermission } from '@/guard/CheckPermission';
import { useGetAccountListQuery } from "./api/settingsApi";

function Settings() {
    const [accountName, setAccountName] = useState<string>("當前用戶");
    const { menuList, token } = useAppSelector((state) => state.authSlice);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

    const [filters, setFilters] = useState({ accountName: "" });

    const {
        data: accountData,
        isFetching,
    } = useGetAccountListQuery(filters, {
        skip: !token,
    });


    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ accountName: e.target.value });
    };

    const edit = (menu: MenuType[], accountName: string) => {
        setAccountName(accountName);
        const newCheckedKeys = extractTreeKeys(menu);
        setCheckedKeys(newCheckedKeys);
    };

    const columns = getSettingsColumns({ onEdit: edit });

    useEffect(() => {
        if (menuList.length > 0) {
            setCheckedKeys(extractTreeKeys(menuList));
        }
    }, [menuList]);

    const handlePermissionSubmit = () => {
        console.log("正在提交修改...", {
            accountName: accountName,
            permissions: checkedKeys
        });
    };

    const onCheck: TreeProps['onCheck'] = (keys) => {
        setCheckedKeys(keys as React.Key[]);
    };

    return (
        <div>
            <Card>
                <Row gutter={16}>
                    <Col span={8}>
                        <Input
                            name="accountName"
                            value={filters.accountName}
                            placeholder="請輸入帳戶名"
                            onChange={handleFilterChange}
                        />
                    </Col>
                    <Col span={8}>
                        <Button type="primary">搜尋</Button>
                    </Col>
                    <Col span={8} className="tr">
                        <CheckPermission required={['account:create']}>
                            <Button type="primary">新建帳號</Button>
                        </CheckPermission>
                    </Col>
                </Row>
            </Card>

            <Row gutter={16} className="mt">
                <Col span={8}>
                    <Card title={`${accountName}: 所擁權限`}>
                        <Tree
                            checkable
                            treeData={treeData}
                            checkedKeys={checkedKeys}
                            onCheck={onCheck}
                        />
                    </Card>
                    <Card className="mt">
                        <Popconfirm
                            title="操作提示"
                            description={`您確認要修改 ${accountName} 用戶的權限嗎？`}
                            okText="是"
                            cancelText="否"
                            onConfirm={handlePermissionSubmit}
                        >
                            <Button type="primary">提交修改</Button>
                        </Popconfirm>
                    </Card>
                </Col>

                <Col span={16}>
                    <Card>
                        <Table<SettingsDataType>
                            loading={isFetching}
                            columns={columns}
                            dataSource={accountData?.list || []}
                            rowKey={record => record.id}
                            pagination={false}
                        />

                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Settings;