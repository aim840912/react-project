import type { TreeDataNode } from 'antd';
import { Button, Popconfirm, type ButtonProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SettingsDataType, MenuType } from "./types";
import React from "react";

interface ColumnsParams {
    onEdit: (menu: MenuType[], accountName: string) => void;
    AuthButton: React.ComponentType<ButtonProps>;
}

export const getSettingsColumns = (params: ColumnsParams): ColumnsType<SettingsDataType> => {
    const { onEdit, AuthButton } = params;

    return [
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
            render(_value, record) {
                return (
                    <>
                        <Button size="small" type="primary" className="mr" onClick={() => onEdit(record.menu, record.accountName)}>
                            修改權限
                        </Button>
                        <Popconfirm
                            title="操作提示"
                            description="確認要刪除當前帳號嗎？"
                            okText="是"
                            cancelText="否"
                        >
                            <AuthButton size="small" type="primary" danger>
                                刪除帳號
                            </AuthButton>
                        </Popconfirm>
                    </>
                );
            },
        }
    ];
};


export const treeData: TreeDataNode[] = [
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

