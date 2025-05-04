import { Card, Row, Col, Table, Input, Button, Pagination, Popconfirm, Tree } from "antd"
import type { TreeDataNode, TreeProps, ButtonProps } from 'antd';
import { getAccountList } from "../../api/users";
import useDataList from "../../hooks/useDataList";
import { useEffect, useState } from "react";
import withPermissions from "../../utils/withPermissions";
import { useAppSelector } from "../../store/hooks";
import { MenuType, SettingsDataType, SettingsSearchType } from "../../types";

const treeData: TreeDataNode[] = [
    {
        title: '工作台',
        key: '/dashboard',
    },
    {
        title: '租戶管理',
        key: '/users',
        children: [
            { title: '租戶列表', key: '/users/list' },
            { title: '新增租戶', key: '/users/add' },
        ],
    },
    {
        title: '物業管理',
        key: '/estate',
        children: [
            {
                title: "樓宇管理",
                key: "/estate/tenement"
            },
            {
                title: "房間管理",
                key: "/estate/room"
            },
            {
                title: "車輛信息",
                key: "/estate/car"
            }

        ]
    },
    {
        title: '報修管理',
        key: '/repair',
    },
    {
        title: '財務管理',
        key: '/finance',
        children: [
            {
                title: "合同管理",
                key: "/finance/contract"
            },
            {
                title: "合同詳情",
                key: "/finance/surrender"
            },
            {
                title: "帳單管理",
                key: "/finance/bill"
            }
        ]
    },
    {
        title: '招商管理',
        key: '/merchants',
    },
    {
        title: '運營管理',
        key: '/operation',
        children: [
            {
                title: "運營總覽",
                key: "/operation/all"
            },
            {
                title: "文章發布",
                key: "/operation/article"
            },
            {
                title: "內容評論",
                key: "/operation/comments"
            }
        ]
    },
    {
        title: '設備管理',
        key: '/equipment',
    },
    {
        title: '能源消耗',
        key: '/energy',
    },
    {
        title: '系統設置',
        key: "/settings",
    },
    {
        title: '個人中心',
        key: "/personal",
    },
];

function extractTreeKeys(data: MenuType[]): string[] {
    let keys: string[] = [];
    data.forEach((item) => {
        if (item.children && item.children.length > 0) {
            const childKeys = extractTreeKeys(item.children);
            keys = keys.concat(childKeys);
        } else {
            keys.push(item.key);
        }
    });
    return keys;
}

function Settings() {
    const authList = JSON.parse(sessionStorage.getItem("btnAuth") || "[]");
    const AuthButton = withPermissions<ButtonProps>(["delete"], authList)(Button);

    const edit = (menu: MenuType[], accountName: string) => {
        setAccountName(accountName);
        const newCheckedKeys = extractTreeKeys(menu)
        setCheckedKeys(newCheckedKeys)
    }

    const columns = [
        {
            title: "No.",
            key: "index",
            render: (_text: unknown, _record: SettingsDataType, index: number) => index + 1,
        },
        {
            title: "帳號名稱",
            dataIndex: "accountName",
            key: "accountName",
        },
        {
            title: "所屬權限",
            dataIndex: "auth",
            key: "auth",
        },
        {
            title: "使用人",
            dataIndex: "person",
            key: "person",
        },
        {
            title: "使用人電話",
            dataIndex: "tel",
            key: "tel",
        },
        {
            title: "所屬部門",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "操作",
            key: "operate",
            render(_value: unknown, record: SettingsDataType) {
                return <>
                    <Button size="small" type="primary" className="mr" onClick={() => edit(record.menu, record.accountName)}>修改權限</Button>
                    <Popconfirm
                        title="操作提示"
                        description="確認要刪除當前帳號嗎？"
                        okText="是"
                        cancelText="否"
                    >
                        <AuthButton size="small" type="primary" danger>刪除帳號</AuthButton>
                        {/* <Button size="small" type="primary" danger>刪除帳號</Button> */}
                    </Popconfirm>

                </>
            }
        }
    ]
    const [accountName, setAccountName] = useState<string>("當前用戶")
    const { menuList } = useAppSelector((state) => state.authSlice)
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([])
    const { dataList, page, pageSize, total, loading, formData, handlePageChange, handleChange } = useDataList<SettingsSearchType, SettingsDataType>({ accountName: "" }, getAccountList)

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
                    <Input name="accountName" value={formData.accountName} placeholder="請輸入帳戶名" onChange={handleChange} />
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
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={dataList}
                        rowKey={record => record.id}
                        pagination={false}
                    />
                    <Pagination className="fr mr" showQuickJumper total={total} current={page} pageSize={pageSize} onChange={handlePageChange} />
                </Card>

            </Col>
        </Row>

    </div>
}



export default Settings
