import { Card, Row, Col, Table, Input, Button, Pagination, Popconfirm, Tree } from "antd"
import type { TreeProps, ButtonProps } from 'antd';
import { getAccountList } from "../../api/users";
import useDataList from "../../hooks/useDataList";
import { useEffect, useState } from "react";
import withPermissions from "../../utils/withPermissions";
import { useAppSelector } from "../../app/hooks";
import { MenuType, SettingsDataType, SettingsSearchType } from "./types";
import { treeData, getSettingsColumns } from "./settings.config";
import { extractTreeKeys } from "./settings.utils";

const AuthButton = withPermissions<ButtonProps>(["delete"],)(Button)

function Settings() {
    const [accountName, setAccountName] = useState<string>("當前用戶")
    const { menuList } = useAppSelector((state) => state.authSlice)
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
    const { dataList,
        loading,
        formData,
        handleFormChange,
        handleSearch,
        reset,
        refresh,
        paginationProps } = useDataList<SettingsSearchType, SettingsDataType>({ accountName: "" }, getAccountList);

    const edit = (menu: MenuType[], accountName: string) => {
        setAccountName(accountName);
        const newCheckedKeys = extractTreeKeys(menu)
        setCheckedKeys(newCheckedKeys)
    }

    // 在這裡呼叫函式來動態產生 columns
    const columns = getSettingsColumns({ onEdit: edit, AuthButton });

    useEffect(() => {
        setCheckedKeys(extractTreeKeys(menuList))
    }, [menuList])

    const handle = () => {
        console.log(checkedKeys, accountName)
    }
    const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
        setCheckedKeys(checkedKeys as React.Key[])
    }

    return <div>
        <Card>
            <Row gutter={16}>
                <Col span={8}>
                    <Input name="accountName" value={formData.accountName} placeholder="請輸入帳戶名" onChange={handleFormChange} />
                </Col>
                <Col span={8}>
                    <Button type="primary"> 搜尋</Button>
                </Col>
                <Col span={8} className="tr">
                    <Button type="primary">新建帳號</Button>
                </Col>
            </Row>

        </Card>

        <Row gutter={16} className="mt">
            <Col span={8} >
                <Card title={accountName + ":所擁權限"}>
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
                        description={`您確認要修改${accountName}用戶的權限嗎？}`}
                        okText="是"
                        cancelText="否"
                        onConfirm={handle}
                    >
                        <Button type="primary">提交修改</Button>
                    </Popconfirm>
                </Card>
            </Col>

            <Col span={16}>
                <Card>
                    <Table<SettingsDataType>
                        loading={loading}
                        columns={columns}
                        dataSource={dataList}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                    <Pagination className="fr mr" showQuickJumper {...paginationProps} />
                </Card>

            </Col>
        </Row>

    </div>
}



export default Settings
